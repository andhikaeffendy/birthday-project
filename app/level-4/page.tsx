"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Level4Overlay } from "../components/Ambience";
import { slides, heartsData, petalsData } from "../config/level4";

export default function Level4Page() {
  const router = useRouter();
  const [warmup, setWarmup] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setWarmup(false), 900);
    return () => clearTimeout(t);
  }, []);
  const [index, setIndex] = useState(0);
  const current = slides[index];

  const next = () => setIndex((i) => Math.min(i + 1, slides.length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  const hearts = heartsData;
  const petals = petalsData;

  const moodStyle = (m: string) => {
    if (m === "golden")
      return {
        background:
          "radial-gradient( circle at 50% 60%, rgba(255,210,120,0.25) 0%, rgba(0,0,0,0) 60% )",
      } as React.CSSProperties;
    if (m === "pink")
      return {
        background:
          "radial-gradient( circle at 40% 70%, rgba(255,160,180,0.22) 0%, rgba(0,0,0,0) 60% )",
      } as React.CSSProperties;
    if (m === "twilight")
      return {
        background:
          "radial-gradient( circle at 50% 30%, rgba(140,170,255,0.18) 0%, rgba(0,0,0,0) 60% )",
      } as React.CSSProperties;
    return {
      background:
        "radial-gradient( circle at 50% 65%, rgba(255,180,200,0.22) 0%, rgba(0,0,0,0) 60% )",
    } as React.CSSProperties;
  };

  const boxStyle = (m: string) => {
    if (m === "golden")
      return {
        background:
          "linear-gradient(180deg, rgba(255,210,120,0.30), rgba(255,210,120,0.20))",
        border: "1px solid rgba(255,210,120,0.55)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      } as React.CSSProperties;
    if (m === "pink")
      return {
        background:
          "linear-gradient(180deg, rgba(255,160,180,0.28), rgba(255,160,180,0.18))",
        border: "1px solid rgba(255,160,180,0.50)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      } as React.CSSProperties;
    if (m === "twilight")
      return {
        background:
          "linear-gradient(180deg, rgba(140,170,255,0.24), rgba(140,170,255,0.16))",
        border: "1px solid rgba(140,170,255,0.50)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      } as React.CSSProperties;
    return {
      background:
        "linear-gradient(180deg, rgba(255,180,200,0.28), rgba(255,180,200,0.18))",
      border: "1px solid rgba(255,180,200,0.50)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    } as React.CSSProperties;
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={current.background ?? "/assets/background_final.png"}
          alt="Romantic Background"
          fill
          className={`object-cover ${current.kb ?? "kb-zoom"}`}
          sizes="100vw"
          priority
          style={{ objectPosition: "center bottom" }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="tv-scanlines" />
        <div className="tv-vignette" />
        {warmup && <div className="tv-warmup" />}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={moodStyle(current.mood)}
      />

      <Level4Overlay
        currentId={current.id}
        twinkles={current.twinkles}
        hearts={current.hearts}
        petals={current.petals}
        rain={current.rain}
        steam={current.steam}
        sparkles={current.sparkles}
        heartsData={hearts}
        petalsData={petals}
      />

      <div
        className="absolute inset-0 flex flex-col items-center justify-end"
        style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
      >
        <div
          key={index}
          className="w-full max-w-[420px] px-4 mb-3 story-enter self-center"
        >
          <div
            className="rounded-2xl p-3 shadow-xl border"
            style={{
              ...(boxStyle(current.mood) as React.CSSProperties),
              backdropFilter:
                current.boxBlur === "strong" ? "blur(14px)" : "blur(8px)",
              backgroundColor: "rgba(0,0,0,0.18)",
            }}
          >
            <p
              className="font-questTitle text-[#2A2A2A] text-center"
              style={{
                fontSize: "clamp(14px, 4vw, 17px)",
                lineHeight: "1.28",
                color: current.textTone === "light" ? "#FFFFFF" : "#2A2A2A",
                textShadow:
                  current.textTone === "light"
                    ? "0 1px 0 rgba(0,0,0,0.45)"
                    : "0 1px 0 rgba(255,255,255,0.35)",
              }}
            >
              {current.text}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={prev}
                disabled={index === 0}
                className="h-9 w-9 rounded-full bg-black/40 text-white flex items-center justify-center shadow-md active:translate-y-px disabled:opacity-40"
              >
                ‹
              </button>
              <span
                className="font-questTitle"
                style={{
                  fontSize: "12px",
                  color: current.textTone === "light" ? "#FFFFFF" : "#2A2A2A",
                  textShadow:
                    current.textTone === "light"
                      ? "0 1px 0 rgba(0,0,0,0.45)"
                      : "0 1px 0 rgba(255,255,255,0.35)",
                }}
              >
                {index + 1} / {slides.length}
              </span>
              {index < slides.length - 1 ? (
                <button
                  onClick={next}
                  className="h-9 w-9 rounded-full bg-black/40 text-white flex items-center justify-center shadow-md active:translate-y-px"
                >
                  ›
                </button>
              ) : (
                <button
                  onClick={() => router.push("/congratulation")}
                  className="font-questTitle px-6 py-2 rounded-xl bg-[#2FA84F] text-white border-[3px] border-[#1D6131] shadow-[0_4px_0_rgba(0,0,0,0.35)] active:translate-y-px"
                >
                  FINISH
                </button>
              )}
            </div>
          </div>
        </div>

        {index === slides.length - 1 && (
          <div className="w-full max-w-[420px] px-4">
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => router.push("/main-menu")}
                className="font-questTitle px-6 py-2 rounded-2xl bg-amber-300 text-slate-900 border-[3px] border-amber-600 shadow-[0_6px_0_rgba(0,0,0,0.45)] active:translate-y-[2px]"
              >
                MENU
              </button>
            </div>
          </div>
        )}
      </div>
      {warmup && <div className="enter-curtain" />}
    </div>
  );
}
