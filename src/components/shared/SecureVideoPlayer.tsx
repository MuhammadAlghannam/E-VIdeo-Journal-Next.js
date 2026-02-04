
'use client';

import Spinner from '@/components/shared/Spinner';
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerFullscreenButton,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange
} from '@/components/ui/video-player';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';
import { useEffect, useRef, useState } from 'react';

type SecureVideoPlayerProps = {
  src: string;
  poster?: string;
  className?: string;
  preload?: ComponentProps<'video'>['preload'];
  muted?: boolean;
  crossOrigin?: '' | 'anonymous' | 'use-credentials';
};

export default function SecureVideoPlayer({
  src,
  poster,
  className,
  preload = 'none',
  muted = false,
  crossOrigin = '',
}: SecureVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const handlePlay = () => {
      setIsBuffering(true);
    };
    const handleCanPlay = () => setIsBuffering(false);
    const handlePlaying = () => setIsBuffering(false);
    const handleWaiting = () => setIsBuffering(true);
    const handleEnded = () => {
      setIsBuffering(false);
    };
    el.addEventListener('play', handlePlay);
    el.addEventListener('canplay', handleCanPlay);
    el.addEventListener('playing', handlePlaying);
    el.addEventListener('waiting', handleWaiting);
    el.addEventListener('ended', handleEnded);
    return () => {
      el.removeEventListener('play', handlePlay);
      el.removeEventListener('canplay', handleCanPlay);
      el.removeEventListener('playing', handlePlaying);
      el.removeEventListener('waiting', handleWaiting);
      el.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <VideoPlayer className={cn('relative overflow-hidden rounded-lg border', className)}>
      {isBuffering && (
        <div className="absolute inset-0 z-[2] flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <VideoPlayerContent
        ref={videoRef}
        crossOrigin={crossOrigin}
        muted={muted}
        preload={preload}
        slot="media"
        src={src}
        poster={poster}
        onContextMenu={(e) => e.preventDefault()}
      />
      <VideoPlayerControlBar className='z-[3]'>
        <VideoPlayerPlayButton />
        {/* <VideoPlayerSeekBackwardButton />
        <VideoPlayerSeekForwardButton /> */}
        <VideoPlayerTimeRange />
        <VideoPlayerTimeDisplay showDuration className='sm:text-[16px] text-[12px]' />
        <VideoPlayerMuteButton />
        <VideoPlayerVolumeRange />
        <VideoPlayerFullscreenButton />
      </VideoPlayerControlBar>
    </VideoPlayer>
  );
}
