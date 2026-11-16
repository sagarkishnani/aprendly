import { useState } from "react";
import { tinaField } from "tinacms/dist/react";

interface Props {
  video: any;
  fallbackImage?: string | null;
  fallbackAlt?: string | null;
  playLabel: string;
}

function toEmbedUrl(url: string): string | null {
  const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  if (youtube) return `https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=1&rel=0`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return null;
}

function VideoPlayer({ url, title }: { url: string; title: string }) {
  const embed = toEmbedUrl(url);
  if (embed) {
    return <iframe src={embed} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="h-full w-full" />;
  }
  return <video src={url} controls autoPlay playsInline className="h-full w-full bg-brand-night object-contain" />;
}

function PlayButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-out-expo hover:scale-110 sm:h-24 sm:w-24"
    >
      <svg viewBox="0 0 24 24" className="h-[30px] w-[30px] fill-brand-primary" aria-hidden>
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  );
}

export default function CourseMedia({ video, fallbackImage, fallbackAlt, playLabel }: Props) {
  const [playing, setPlaying] = useState(false);
  const poster = video?.poster || fallbackImage;
  const alt = video?.poster ? video?.posterAlt : fallbackAlt;
  const videoUrl: string = video?.url || "";
  if (!poster && !videoUrl) return null;

  return (
    <div suppressHydrationWarning data-reveal="scale" className="relative mb-14 h-[240px] overflow-hidden rounded-3xl bg-brand-night sm:h-[360px] lg:h-[460px] lg:rounded-[32px]">
      {playing && videoUrl ? (
        <VideoPlayer url={videoUrl} title={video?.caption || playLabel} />
      ) : (
        <>
          {poster && (
            <img
              src={poster}
              alt={alt || ""}
              className="block h-full w-full object-cover"
              data-tina-field={video?.poster ? tinaField(video, "poster") : undefined}
            />
          )}
          {videoUrl && (
            <>
              <div className="absolute inset-0 bg-brand-ink/25" />
              <PlayButton label={playLabel} onClick={() => setPlaying(true)} />
              {video?.caption && (
                <p className="absolute bottom-6 left-7 text-body-sm font-medium text-white" data-tina-field={tinaField(video, "caption")}>
                  {video.caption}
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
