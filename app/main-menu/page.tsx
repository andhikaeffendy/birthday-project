"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TitleBox from "../components/TitleBox";
import { ForestOverlay } from "../components/Ambience";

export default function MainMenu() {
  const router = useRouter();
  const handleStartGame = () => {
    if (typeof window !== "undefined" && window.__musicSet) {
      window.__musicSet("FjHGZj2IjBk", 0);
      if (window.__musicPlay) window.__musicPlay();
    }
    router.push("/level-1");
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.__musicSet) {
      window.__musicSet("FjHGZj2IjBk", 0);
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
            <button
              onClick={() => {
                if (typeof window !== "undefined" && window.__musicPlay) {
                  window.__musicPlay();
                }
              }}
              className="font-questTitle mt-6 px-5 py-2 rounded-2xl bg-[#F5D7A1] text-[#2A2A2A] border-[3px] border-[#2A2A2A] shadow-[0_6px_0_rgba(0,0,0,0.45)]"
              style={{ width: "min(40vw, 160px)" }}
            >
              ENABLE SOUND
            </button>
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
