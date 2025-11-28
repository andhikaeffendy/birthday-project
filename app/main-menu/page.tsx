"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TitleBox from "../components/TitleBox";
import { ForestOverlay } from "../components/Ambience";
import { useState } from "react";

export default function MainMenu() {
  const router = useRouter();
  const [soundOn, setSoundOn] = useState<boolean>(false);
  const handleStartGame = () => {
    if (typeof window !== "undefined" && window.__musicSet) {
      window.__musicSet("/assets/music/mainmenu-clip.mp3", 0);
      if (window.__musicPlay) window.__musicPlay();
    }
    router.push("/level-1");
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.__musicSet) {
      const auto = localStorage.getItem("music:auto");
      const preferOn = auto !== "off";
      window.__musicSet("/assets/music/mainmenu-clip.mp3", 0);
      if (preferOn) {
        if (window.__musicPlay) window.__musicPlay();
      } else {
        if (window.__musicStop) window.__musicStop();
      }
    }
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/background_main.png"
          alt="Main Menu Background"
          fill
          className="object-cover bg-parallax"
          sizes="100vw"
          priority
          style={{ objectPosition: "center bottom" }}
        />
      </div>

      <ForestOverlay />

      <div
        className="flex flex-col items-center justify-between min-h-screen"
        style={{ minHeight: "100svh" }}
      >
        <div className="w-full pt-8 mt-10 flex justify-center text-center">
          <TitleBox lines={["Birthday Quest", "for Tenten"]} />
        </div>

        <div className="flex-1" />

        <div
          className="w-full"
          style={{ paddingBottom: "max(env(safe-area-inset-bottom), 24px)" }}
        >
          <div className="flex items-center justify-between pr-6 pl-6">
            <div className="mt-6">
              <div className="flex items-center gap-2">
                <span className="font-questTitle text-xs text-white/90">
                  Sound
                </span>
                <button
                  onClick={() => {
                    const next = !soundOn;
                    setSoundOn(next);
                    if (typeof window !== "undefined") {
                      localStorage.setItem("music:auto", next ? "on" : "off");
                      if (next) {
                        if (window.__musicPlay) window.__musicPlay();
                      } else {
                        if (window.__musicStop) window.__musicStop();
                      }
                    }
                  }}
                  aria-label="Toggle sound"
                  suppressHydrationWarning
                  className={`relative h-6 w-10 rounded-full border-[2px] transition-colors ${
                    soundOn
                      ? "bg-green-400 border-green-600"
                      : "bg-gray-300 border-gray-500"
                  }`}
                >
                  <span
                    suppressHydrationWarning
                    className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white shadow ${
                      soundOn ? "right-1" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
            <button
              onClick={handleStartGame}
              className="btn-cozy font-questTitle mt-6 px-10 py-2.5 text-xl rounded-2xl bg-[#C9E4A7] text-[#2A2A2A] border-[3px] border-[#2A2A2A] shadow-[0_6px_0_rgba(0,0,0,0.45)]"
              style={{ width: "min(50vw, 180px)" }}
            >
              START
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
