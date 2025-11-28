"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CongratulationPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"none" | "blank" | "power">("none");
  useEffect(() => {
    if (typeof window !== "undefined" && window.__musicStop) {
      window.__musicStop();
    }
  }, []);
  useEffect(() => {
    if (phase !== "power") return;
    const t = setTimeout(() => {
      router.push("/final-game");
    }, 1600);
    return () => clearTimeout(t);
  }, [phase, router]);
  const twinkles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        left: 10 + (i % 12) * 7,
        top: 8 + (i % 5) * 10,
        dur: 1.6 + (i % 3) * 0.4,
      })),
    []
  );
  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        left: 8 + (i % 10) * 9,
        bottom: -8,
        dur: 5 + (i % 4),
        delay: (i % 6) * 0.2,
      })),
    []
  );

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/background_gift.png"
          alt="Gift Background"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 romance-glow" />
        {twinkles.map((s, i) => (
          <span
            key={`st-${i}`}
            className="star absolute"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
        {sparkles.map((sp, i) => (
          <span
            key={`sp-${i}`}
            className="sparkle"
            style={{
              left: `${sp.left}%`,
              bottom: `${sp.bottom}px`,
              animationDuration: `${sp.dur}s`,
              animationDelay: `${sp.delay}s`,
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 flex flex-col items-center justify-end"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 24px)" }}
      >
        <div className="w-full max-w-[420px] px-4">
          <div className="animate-in-up">
            <div className="bg-[#FFF2DE]/90 backdrop-blur-md border-[6px] border-[#2A2A2A] rounded-2xl p-5 shadow-[0_18px_30px_rgba(0,0,0,0.35)] text-center relative">
              <h1
                className="font-questTitle text-[#2A2A2A]"
                style={{
                  fontSize: "clamp(30px, 8vw, 44px)",
                  lineHeight: "1.06",
                }}
              >
                Happy Birthday
              </h1>
              <p
                className="mt-1 text-[#2A2A2A]/80 font-questTitle"
                style={{ fontSize: "clamp(14px, 4.5vw, 18px)" }}
              >
                Congratulations, you&apos;ve completed all levels.
              </p>
              <div className="mt-4">
                <button
                  onClick={() => {
                    if (typeof window !== "undefined" && window.__musicStop)
                      window.__musicStop();
                    setPhase("blank");
                    setTimeout(() => {
                      setPhase("power");
                      setTimeout(() => {
                        if (typeof window !== "undefined" && window.__musicSet)
                          window.__musicSet(
                            "/assets/music/congrats-clip.mp3",
                            0
                          );
                        if (typeof window !== "undefined" && window.__musicPlay)
                          window.__musicPlay();
                      }, 1800);
                    }, 650);
                  }}
                  disabled={phase !== "none"}
                  className="shiny-btn font-questTitle px-10 py-3 text-xl rounded-2xl bg-amber-300 text-[#2A2A2A] border-[3px] border-amber-600 shadow-[0_6px_0_rgba(0,0,0,0.45)] active:translate-y-[2px] disabled:opacity-90"
                  style={{ width: "min(80vw, 300px)" }}
                >
                  open ur gift
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {phase !== "none" && (
        <div className="gift-overlay">
          {phase === "blank" && <div className="tv-blank" />}
          {phase === "blank" && (
            <div className="chibi">
              <div className="head" />
              <div className="body" />
              <div className="arm" />
              <div className="tvbtn" />
            </div>
          )}
          {phase === "power" && (
            <>
              <div className="tv-black" />
              <div className="crt-beam" />
              <div className="tv-bloom" />
              <div className="crt-static" />
              <div className="tv-flicker" />
              <div className="tv-screendoor" />
            </>
          )}
        </div>
      )}
    </div>
  );
}
