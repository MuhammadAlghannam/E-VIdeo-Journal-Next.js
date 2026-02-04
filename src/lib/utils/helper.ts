import { format, formatDistanceToNow, isValid, parseISO } from "date-fns";

// To Formate Date
export function formatDate(dateStr: string | number | Date) {
  let date: Date;

  if (dateStr instanceof Date) {
    date = dateStr;
  } else if (typeof dateStr === "number") {
    date = new Date(dateStr); // timestamp
  } else {
    // normalize string input
    const raw = String(dateStr).trim();
    if (!raw) return "";
    // if looks like ISO use parseISO, else fallback to new Date
    date = raw.includes("T") ? parseISO(raw) : new Date(raw.replace(" ", "T"));
  }

  if (!isValid(date)) return ""; // ✅ prevents "Invalid time value"

  return format(date, "d MMM ,yyyy");
}

// Generate serial number: mediaId + month + year
export function generateSerialNumber(
  mediaId: string | number,
  dateStr: string | number | Date,
): string {
  let date: Date;

  if (dateStr instanceof Date) {
    date = dateStr;
  } else if (typeof dateStr === "number") {
    date = new Date(dateStr); // timestamp
  } else {
    // normalize string input
    const raw = String(dateStr).trim();
    if (!raw) return "";
    // if looks like ISO use parseISO, else fallback to new Date
    date = raw.includes("T") ? parseISO(raw) : new Date(raw.replace(" ", "T"));
  }

  if (!isValid(date)) return ""; // ✅ prevents "Invalid time value"

  const month = format(date, "M"); // Single digit month (1-12)
  const year = format(date, "yyyy"); // Full year (2025)

  return `${mediaId}${month}${year}`;
}

// Relative time: "2 minutes ago"
export function timeAgo(input: unknown): string {
  const raw = coerceToString(input).trim();
  if (!raw) return "";
  const date = new Date(raw);
  if (isNaN(date.getTime())) return "";
  try {
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return "";
  }
}

// Normalize image paths into safe, Next.js-compatible src values
export const DEFAULT_PLACEHOLDER_SRC = "/images/global/plane-image.svg";

export function resolveImageSrc(
  imagePath: unknown,
  placeholderSrc: string = DEFAULT_PLACEHOLDER_SRC,
): string {
  if (!imagePath || typeof imagePath !== "string") return placeholderSrc;

  const trimmed = imagePath.trim();
  if (!trimmed) return placeholderSrc;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  return `/${trimmed}`;
}

// Resolve profile image sources coming from mixed backends (null, relative storage path, absolute URL, or public asset)
export function resolveProfileImageSrc(imagePath: unknown): string {
  const avatarFallback = "/images/global/avatar.svg";

  if (!imagePath || (typeof imagePath === "string" && imagePath.trim() === "")) {
    return avatarFallback;
  }

  const trimmed = coerceToString(imagePath).trim();
  if (!trimmed) return avatarFallback;

  // Absolute remote URL (e.g., Googleusercontent)
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // Public asset inside Next.js public folder
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  // Backend storage-style relative path like "images/abc.jpg" → build absolute via base URL
  return noLinkImage(trimmed);
}

// Safely coerce any value to a string
export function coerceToString(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}

// Convert simple HTML to plain text: strip tags and decode common entities
export function htmlToPlainText(input: unknown): string {
  const raw = coerceToString(input);
  if (!raw) return "";
  const withoutTags = raw.replace(/<[^>]*>/g, " ");
  // Decode a few common HTML entities
  return withoutTags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

// Replace underscores with spaces and capitalize the first letter
export function prettifyLabel(input: unknown): string {
  const raw = coerceToString(input).trim();
  if (!raw) return "";
  const noUnderscores = raw.replace(/_/g, " ");
  return noUnderscores.charAt(0).toUpperCase() + noUnderscores.slice(1);
}

// No Link Image
export function noLinkImage(imagePath: string | null) {
  if (!imagePath || imagePath.trim() === "") {
    return "/images/global/avatar.svg";
  }

  // Remove any leading slash to prevent double slashes in the URL
  const cleanImagePath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  const baseUrl = process.env.IMAGE_BASE_URL || "";

  // Ensure there's no double slash between base URL and image path
  return `${baseUrl}/${cleanImagePath}`;
}

// Convert a plain object to FormData, supporting Files/Blobs and arrays
export function toFormData(input: Record<string, unknown>): FormData {
  const formData = new FormData();

  const appendValue = (key: string, value: unknown) => {
    if (value === undefined || value === null) return;

    // Handle File/Blob objects
    if (value instanceof File || value instanceof Blob) {
      // Only append if file has content (size > 0)
      if (value.size > 0) {
        formData.append(key, value);
      }
      return;
    }

    // Handle arrays - use bracket notation so PHP/Laravel parses as arrays
    if (Array.isArray(value)) {
      const arrayKey = `${key}[]`;
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          if (item instanceof File || item instanceof Blob) {
            if (item.size > 0) {
              formData.append(arrayKey, item);
            }
          } else {
            formData.append(arrayKey, typeof item === "string" ? item : String(item));
          }
        }
      });
      return;
    }

    // Handle empty strings for optional fields
    if (typeof value === "string" && value.trim() === "") {
      return; // Skip empty strings
    }

    // Fallback to string conversion for primitives/objects
    formData.append(key, typeof value === "string" ? value : String(value));
  };

  Object.entries(input).forEach(([key, value]) => appendValue(key, value));

  return formData;
}

// Convert form data for updates - only includes changed files and non-file fields
export function toUpdateFormData(
  input: Record<string, unknown>,
  originalData?: SingleVideoMedia,
): FormData {
  const formData = new FormData();

  const appendValue = (key: string, value: unknown) => {
    if (value === undefined || value === null) return;

    // Handle File/Blob objects - these are new uploads
    if (value instanceof File || value instanceof Blob) {
      // Only append if file has content (size > 0)
      if (value.size > 0) {
        formData.append(key, value);
      }
      return;
    }

    // Handle arrays - use bracket notation so PHP/Laravel parses as arrays
    if (Array.isArray(value)) {
      const arrayKey = `${key}[]`;
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          if (item instanceof File || item instanceof Blob) {
            if (item.size > 0) {
              formData.append(arrayKey, item);
            }
          } else {
            formData.append(arrayKey, typeof item === "string" ? item : String(item));
          }
        }
      });
      return;
    }

    // Handle empty strings for optional fields
    if (typeof value === "string" && value.trim() === "") {
      return; // Skip empty strings
    }

    // For file path fields, only append if it's a new File object or if it's different from original
    if (
      typeof value === "string" &&
      (key === "file" || key === "thumbnail_path" || key === "image_path" || key === "pdf")
    ) {
      // Map form field names to original data field names
      const fieldMapping: Record<string, keyof SingleVideoMedia> = {
        file: "file_path",
        thumbnail_path: "thumbnail_path",
        image_path: "image_path",
        pdf: "pdf",
      };

      const originalFieldName = fieldMapping[key];
      const originalValue = originalData?.[originalFieldName] as string;

      // If it's the same as original data, skip it (no change)
      if (value === originalValue) {
        return; // Skip unchanged file paths
      }
    }

    // Fallback to string conversion for primitives/objects
    formData.append(key, typeof value === "string" ? value : String(value));
  };

  Object.entries(input).forEach(([key, value]) => appendValue(key, value));

  return formData;
}

// Format a duration (in seconds or string) to mm:ss or hh:mm:ss
export function formatDuration(input: unknown): string {
  const numeric = Number(input);
  if (!isFinite(numeric) || isNaN(numeric)) return "00:00";

  const totalSeconds = Math.max(0, Math.round(numeric));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  if (hours > 0) {
    const hh = String(hours).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  }
  return `${mm}:${ss}`;
}

// Normalize mentions: accept array of strings or a JSON string and return a clean array
export function normalizeMentions(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input
      .filter((m) => typeof m === "string")
      .map((m) => m.trim())
      .filter(Boolean);
  }
  if (typeof input === "string") {
    const trimmed = input.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed
          .filter((m) => typeof m === "string")
          .map((m) => m.trim())
          .filter(Boolean);
      }
    } catch {
      // not JSON, ignore
    }
  }
  return [];
}

// Convert month name (e.g., "October", "oct", case-insensitive) or numeric input to two-digit month value
export function monthNameToValue(input: unknown): string {
  const raw = coerceToString(input).trim();
  if (!raw) return "";

  // If already numeric, normalize and validate range
  if (/^\d{1,2}$/.test(raw)) {
    const n = Number(raw);
    if (n >= 1 && n <= 12) return String(n).padStart(2, "0");
    return "";
  }

  const normalized = raw.toLowerCase();

  const map: Record<string, string> = {
    january: "01",
    jan: "01",
    february: "02",
    feb: "02",
    march: "03",
    mar: "03",
    april: "04",
    apr: "04",
    may: "05",
    june: "06",
    jun: "06",
    july: "07",
    jul: "07",
    august: "08",
    aug: "08",
    september: "09",
    sept: "09",
    sep: "09",
    october: "10",
    oct: "10",
    november: "11",
    nov: "11",
    december: "12",
    dec: "12",
  };

  // Handle common misspellings like "oncober" → try closest key by first 3 letters
  if (map[normalized]) return map[normalized];
  const firstThree = normalized.slice(0, 3);
  if (map[firstThree]) return map[firstThree];

  return "";
}
