import { useEffect, useRef, useState } from "react";
import Resumable from "resumablejs";

type UseResumableUploadOptions = {
  target: string;
  headers?: Record<string, string>;
  query?: Record<string, string>;
  chunkSize?: number;
  simultaneousUploads?: number;
  fileType?: string[];
  maxFiles?: number;
  maxFileSizeBytes?: number;
  throttleProgressCallbacks?: number; // seconds; e.g., 0.5
  maxChunkRetries?: number; // how many times to retry a failed chunk
  chunkRetryIntervalMs?: number; // wait time between retries
};

type ResumableFileLike = { size: number; progress: () => number };

export function useResumableUpload(opts: UseResumableUploadOptions) {
  const [progress, setProgress] = useState<number>(0); // 0..1
  const [isUploading, setIsUploading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverPath, setServerPath] = useState<string | null>(null);
  const [mediaId, setMediaId] = useState<number | null>(null);
  const [totalBytes, setTotalBytes] = useState<number>(0);
  const [uploadedBytes, setUploadedBytes] = useState<number>(0);

  const resumableRef = useRef<Resumable | null>(null);

  useEffect(() => {
    const resumableConfig: Record<string, unknown> = {
      target: opts.target,
      query: opts.query,
      headers: opts.headers,
      fileType: opts.fileType ?? ["mp4", "avi", "mov"],
      chunkSize: opts.chunkSize ?? 15 * 1024 * 1024,
      simultaneousUploads: opts.simultaneousUploads ?? 3,
      // Laravel endpoint only supports POST; disable GET preflight checks
      testChunks: false,
      // Not always in type definitions, but supported by library
      throttleProgressCallbacks: opts.throttleProgressCallbacks ?? 0.5,
      maxChunkRetries: typeof opts.maxChunkRetries === 'number' ? opts.maxChunkRetries : 5,
      chunkRetryInterval: typeof opts.chunkRetryIntervalMs === 'number' ? opts.chunkRetryIntervalMs : 2000,
      // Ensure the uploaded field name matches backend expectation
      fileParameterName: "file",
      maxFiles: opts.maxFiles ?? 1,
    };

    const r = new Resumable(resumableConfig as Resumable.ConfigurationHash);

    resumableRef.current = r;

    r.on("fileAdded", (file: ResumableFileLike) => {
      setProgress(0);
      setUploadedBytes(0);
      setTotalBytes(typeof file?.size === 'number' ? file.size : 0);
      setError(null);
      setIsFinished(false);
      setServerPath(null);
      setMediaId(null);

      if (opts.maxFileSizeBytes && file.size > opts.maxFileSizeBytes) {
        setError(`File exceeds size limit of ${Math.round(opts.maxFileSizeBytes / (1024 * 1024 * 1024))}GB.`);
        r.cancel();
        return;
      }
    });

    r.on("fileProgress", (file: ResumableFileLike) => {
      setProgress(file.progress());
      const size = typeof file?.size === 'number' ? file.size : totalBytes;
      setUploadedBytes(Math.floor((file.progress() || 0) * (size || 0)));
      if (!totalBytes && size) setTotalBytes(size);
    });

    r.on("fileSuccess", (_file: ResumableFileLike, response: string) => {
      setIsUploading(false);
      setIsFinished(true);
      setError(null);

      try {
        const parsed = JSON.parse(response);
        // Laravel returns either { path: string } or { success, data: { path } }
        const dataPath = parsed?.data?.path || parsed?.path;
        const dataMediaId = parsed?.data?.media_id || parsed?.media_id;
        if (dataPath) setServerPath(String(dataPath));
        if (dataMediaId) setMediaId(Number(dataMediaId));
        if (!dataPath && !dataMediaId && !parsed?.success) {
          setError(parsed?.message || parsed?.error || "Upload completed but no valid response received.");
        }
      } catch {
        setError("Upload finished but server response invalid.");
      }
    });

    r.on("fileError", (_file: ResumableFileLike, message: string) => {
      setIsUploading(false);
      try {
        const obj = JSON.parse(message);
        setError(obj.error || obj.message || message);
      } catch {
        setError(String(message));
      }
    });

    r.on("pause", () => {
      setIsUploading(false);
    });

    r.on("uploadStart", () => {
      setIsUploading(true);
      setError(null);
    });

    return () => {
      r.cancel();
      resumableRef.current = null;
    };
  }, [
    opts.target,
    opts.chunkSize,
    opts.simultaneousUploads,
    Array.isArray(opts.fileType) ? opts.fileType.join(',') : String(opts.fileType),
    opts.maxFiles,
    opts.maxFileSizeBytes,
    opts.throttleProgressCallbacks,
    opts.maxChunkRetries,
    opts.chunkRetryIntervalMs,
    opts.headers,
    opts.query,
    // headers/query objects can cause frequent re-inits; avoid unless explicitly needed
  ]);

  function start() {
    if (!resumableRef.current) return;
    setIsUploading(true);
    setError(null);
    resumableRef.current.upload();
  }

  function retry() {
    if (!resumableRef.current) return;
    setError(null);
    resumableRef.current.upload();
  }

  function addFile(file: File) {
    if (!resumableRef.current) return;
    // Clear previous state
    setProgress(0);
    setIsFinished(false);
    setServerPath(null);
    setMediaId(null);
    setError(null);
    resumableRef.current.addFile(file);
  }

  return {
    progress,
    isUploading,
    isFinished,
    error,
    serverPath,
    mediaId,
    totalBytes,
    uploadedBytes,
    start,
    retry,
    addFile,
    // Convenience percent for UI components that expect 0..100
    progressPercent: Math.round((progress || 0) * 100),
  };
}
