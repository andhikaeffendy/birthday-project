"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
  const [muted, setMuted] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const localMap = useMemo<Record<string, string>>(
    () => ({
      FjHGZj2IjBk: "/assets/music/mainmenu-clip.mp3",
    }),
    []
  );
  const pickStoryClip = (st?: number): string | null => {
    if (typeof st !== "number") return null;
    if (Math.abs(st - 610) < 10) return "/assets/music/level1-clip.mp3";
    if (Math.abs(st - 522) < 10) return "/assets/music/level2-clip.mp3";
    if (Math.abs(st - 3770) < 15) return "/assets/music/level3-clip.mp3";
    if (st <= 5) return "/assets/music/congrats-clip.mp3";
    return null;
  };
  const [audioSrc, setAudioSrc] = useState<string | null>(
    "/assets/music/mainmenu-clip.mp3"
  );

  useEffect(() => {
    localStorage.setItem("music:auto", playing ? "on" : "off");
  }, [playing]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.__musicPlay = () => {
      setPlaying(true);
      setMuted(false);
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.play().catch(() => {});
      }
    };
    window.__musicStop = () => setPlaying(false);
    window.__musicSet = (vid?: string, st?: number) => {
      // Prefer explicit local asset path
      if (vid && vid.startsWith("/")) {
        setAudioSrc(vid);
        if (audioRef.current) audioRef.current.currentTime = 0;
        return;
      }
      // Backward compatibility: map known IDs to local clips
      if (vid && localMap[vid]) {
        setAudioSrc(localMap[vid]);
        if (audioRef.current) audioRef.current.currentTime = 0;
        return;
      }
      if (vid === "s6oZ6LJeDws") {
        const clip = pickStoryClip(st);
        if (clip) {
          setAudioSrc(clip);
          if (audioRef.current) audioRef.current.currentTime = 0;
          return;
        }
      }
      // Fallback: keep current audio source or default to main menu clip
      if (!audioSrc) setAudioSrc("/assets/music/mainmenu-clip.mp3");
    };
    const unmute: EventListener = () => {
      setMuted(false);
      if (audioRef.current) {
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
  }, [localMap, audioSrc]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.loop = true;
    audioRef.current.muted = muted;
    if (playing) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [playing, muted]);

  return audioSrc ? (
    <audio
      ref={audioRef}
      src={audioSrc}
      autoPlay
      muted
      loop
      onError={() => {
        setAudioSrc("/assets/music/mainmenu-clip.mp3");
      }}
      style={{ display: "none" }}
    />
  ) : null;
}
