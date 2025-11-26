"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    __musicPlay?: () => void;
    __musicStop?: () => void;
    __musicSet?: (vid?: string, st?: number) => void;
  }
}

export default function MusicPlayer() {
  const [playing, setPlaying] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const v = localStorage.getItem("music:auto");
    return v === null ? true : v === "on";
  });
  const [videoId, setVideoId] = useState<string>("FjHGZj2IjBk");
  const [start, setStart] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(true);
  const [mode, setMode] = useState<"local" | "youtube">("youtube");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const localMap: Record<string, string> = {
    FjHGZj2IjBk: "/assets/music/main-menu.mp3",
    s6oZ6LJeDws: "/assets/music/story-128.mp3",
  };
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("music:auto", playing ? "on" : "off");
  }, [playing]);

  const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&rel=0&loop=1&playlist=${videoId}&start=${start}&mute=${
    muted ? 1 : 0
  }`;
  // dynamic audio source based on video id; set via __musicSet

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.__musicPlay = () => {
      setPlaying(true);
      setMuted(false);
      if (mode === "local" && audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.play().catch(() => {});
      }
    };
    window.__musicStop = () => setPlaying(false);
    window.__musicSet = (vid?: string, st?: number) => {
      if (vid && localMap[vid]) {
        setMode("local");
        setAudioSrc(localMap[vid]);
        if (typeof st === "number" && audioRef.current) {
          audioRef.current.currentTime = st;
        }
      } else {
        if (vid) setVideoId(vid);
        if (typeof st === "number") setStart(st);
        setMode("youtube");
      }
    };
    const unmute: EventListener = () => {
      setMuted(false);
      if (mode === "local" && audioRef.current) {
        audioRef.current.muted = false;
      }
    };
    window.addEventListener("pointerdown", unmute, { once: true });
    window.addEventListener("touchstart", unmute, { once: true });
    window.addEventListener("keydown", unmute, { once: true });
    return () => {
      if (window.__musicPlay) delete window.__musicPlay;
      if (window.__musicStop) delete window.__musicStop;
      if (window.__musicSet) delete window.__musicSet;
      window.removeEventListener("pointerdown", unmute);
      window.removeEventListener("touchstart", unmute);
      window.removeEventListener("keydown", unmute);
    };
  }, [mode]);

  useEffect(() => {
    if (mode !== "local") return;
    if (!audioRef.current) return;
    audioRef.current.loop = true;
    audioRef.current.muted = muted;
    if (playing) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [mode, playing, muted]);

  if (mode === "local" && audioSrc) {
    return (
      <audio
        ref={audioRef}
        src={audioSrc}
        autoPlay
        muted
        loop
        style={{ display: "none" }}
        onError={() => setMode("youtube")}
      />
    );
  }
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
