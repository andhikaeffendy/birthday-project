"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

type Props = {
  containerClassName?: string;
  onErrorSrc?: string;
} & Omit<ImageProps, "onLoadingComplete" | "onError">;

export default function BlockingImage({
  containerClassName,
  onErrorSrc,
  src,
  alt,
  className,
  style,
  sizes,
  priority,
  fill,
  placeholder = "blur",
  blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMScgaGVpZ2h0PScxJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxJyBoZWlnaHQ9JzEnIGZpbGw9JyMyQjJCMkInIC8+PC9zdmc+",
  ...rest
}: Props) {
  const [ready, setReady] = useState(false);
  const [errorSrc, setErrorSrc] = useState<string | undefined>(undefined);
  const imgSrc = errorSrc ?? (typeof src === "string" ? src : src);
  return (
    <div className={containerClassName}>
      <Image
        src={imgSrc}
        alt={alt}
        className={className}
        style={style}
        sizes={sizes}
        priority={priority}
        fill={fill}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoadingComplete={() => setReady(true)}
        onError={() => {
          if (onErrorSrc) setErrorSrc(onErrorSrc);
          setReady(true);
        }}
        {...rest}
      />
      {!ready && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
          <div className="rounded-xl px-4 py-2 bg-[#2A2A2A] border-4 border-black/60 shadow-2xl">
            <span className="font-questTitle text-white" style={{ fontSize: "clamp(14px,4vw,18px)" }}>Loading…</span>
          </div>
        </div>
      )}
    </div>
  );
}

