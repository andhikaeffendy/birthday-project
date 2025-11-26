"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    __musicPlay?: () => void;
    __musicStop?: () => void;
    __musicSet?: (vid?: string, st?: number) => void;
  }
}

export default function MusicPlayer() {
  const [playing, setPlaying] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("music:auto") === "on";
  });
  const [videoId, setVideoId] = useState<string>("FjHGZj2IjBk");
  const [start, setStart] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem("music:auto", playing ? "on" : "off");
  }, [playing]);

  const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&rel=0&loop=1&playlist=${videoId}&start=${start}`;

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.__musicPlay = () => setPlaying(true);
    window.__musicStop = () => setPlaying(false);
    window.__musicSet = (vid?: string, st?: number) => {
      if (vid) setVideoId(vid);
      if (typeof st === "number") setStart(st);
    };
    return () => {
      if (window.__musicPlay) delete window.__musicPlay;
      if (window.__musicStop) delete window.__musicStop;
      if (window.__musicSet) delete window.__musicSet;
    };
  }, []);

  return playing ? (
    <iframe
      key={`${videoId}-${start}-${playing ? 1 : 0}`}
      src={url}
      width="0"
      height="0"
      allow="autoplay"
      style={{ border: 0, opacity: 0, pointerEvents: "none" }}
    />
  ) : null;
}
