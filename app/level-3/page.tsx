"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

function Level3Inner() {
  const router = useRouter();

  const [input, setInput] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [completed, setCompleted] = useState(false);
  const [animWrong, setAnimWrong] = useState(false);
  const [animSuccess, setAnimSuccess] = useState(false);
  const expected = useMemo(() => "101025", []);
  const embers = useMemo(
    () => [
      { left: 14, size: 3, duration: 6, delay: 0 },
      { left: 22, size: 2, duration: 7, delay: 1 },
      { left: 30, size: 3, duration: 8, delay: 2 },
      { left: 38, size: 2, duration: 6, delay: 0 },
      { left: 46, size: 4, duration: 9, delay: 3 },
      { left: 54, size: 3, duration: 7, delay: 2 },
      { left: 62, size: 2, duration: 5, delay: 1 },
      { left: 70, size: 3, duration: 8, delay: 0 },
      { left: 78, size: 2, duration: 6, delay: 1 },
      { left: 86, size: 3, duration: 10, delay: 2 },
      { left: 18, size: 2, duration: 7, delay: 2 },
      { left: 44, size: 3, duration: 5, delay: 1 },
      { left: 66, size: 2, duration: 9, delay: 3 },
      { left: 82, size: 3, duration: 6, delay: 0 },
    ],
    []
  );

  const hearts = useMemo(
    () => [
      { left: 18, size: 12, duration: 7, delay: 0 },
      { left: 28, size: 10, duration: 6, delay: 1 },
      { left: 38, size: 12, duration: 8, delay: 2 },
      { left: 52, size: 11, duration: 7, delay: 0 },
      { left: 62, size: 10, duration: 6, delay: 1 },
      { left: 72, size: 12, duration: 8, delay: 2 },
      { left: 82, size: 11, duration: 7, delay: 1 },
    ],
    []
  );

  const handleDigit = (d: string) => {
    if (completed) return;
    if (input.length >= 6) return;
    setInput((prev) => prev + d);
    setMessage("");
  };

  const handleClear = () => {
    setInput("");
    setMessage("");
  };

  const handleOk = () => {
    if (input.length !== 6) {
      setMessage("Masukkan 6 digit");
      return;
    }
    if (input === expected) {
      setAnimSuccess(true);
      setMessage("");
      setTimeout(() => {
        setAnimSuccess(false);
        setCompleted(true);
      }, 1200);
    } else {
      setMessage("Kode salah");
      setAnimWrong(true);
      setTimeout(() => setAnimWrong(false), 1500);
    }
  };

  const displayDigits = useMemo(() => {
    const arr = input.split("");
    while (arr.length < 6) arr.push("");
    return arr;
  }, [input]);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/background_level_3.png"
          alt="Level 3 Background"
          fill
          className="object-cover dungeon-pan"
          unoptimized
        />
        <div className="absolute inset-0 pointer-events-none dungeon-flicker" />
        <div className="top-banner-mask" />
        <div className="absolute inset-0 pointer-events-none">
          {embers.map((p, i) => (
            <div
              key={`ember-${i}`}
              className="ember absolute"
              style={{
                left: `${p.left}%`,
                bottom: "-8px",
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-5">
        {animSuccess && (
          <>
            <div className="absolute inset-0 romance-glow" />
            {hearts.map((h, i) => (
              <span
                key={`h-${i}`}
                className="heart absolute"
                style={{
                  left: `${h.left}%`,
                  bottom: "-10px",
                  fontSize: `${h.size}px`,
                  animationDuration: `${h.duration}s`,
                  animationDelay: `${h.delay}s`,
                }}
              >
                ♥
              </span>
            ))}
          </>
        )}
        {animWrong && (
          <>
            <div className="absolute inset-0 sad-overlay" />
            <div className="absolute inset-0 sad-tint" />
            <div className="absolute inset-0 sad-vignette" />
            <div className="sad-fog" />
          </>
        )}
      </div>

      <div
        className="absolute z-10"
        style={{
          top: "clamp(118px, 22vh, 168px)",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div className="neo-banner px-6 py-2 rounded-2xl">
          <span
            className="font-questTitle text-[#CDE7F6] tracking-widest"
            style={{ fontSize: "clamp(20px, 6vw, 28px)" }}
          >
            LEVEL 3
          </span>
        </div>
      </div>

      {completed ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-end"
          style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
        >
          <button
            onClick={() => router.push("/level-4")}
            className="bg-[#2FA84F] border-4 border-[#1D6131] px-10 py-4 rounded-xl text-white font-black text-lg"
          >
            NEXT
          </button>
        </div>
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-end"
          style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
        >
          <div className="w-full max-w-[420px] px-4 mb-3">
            <div className="flex items-center justify-center">
              <div className="flex justify-center">
                <div
                  className={`neo-panel rounded-xl px-2 py-2 grid grid-cols-6 gap-1 animate-in-up ${
                    animWrong ? "animate-wrong" : ""
                  } ${animSuccess ? "animate-correct" : ""} relative shadow-xl`}
                  style={{
                    width: "min(62vw, 220px)",
                    background:
                      "linear-gradient(180deg, rgba(30,24,20,0.85), rgba(22,18,14,0.75))",
                    border: "1.5px solid rgba(245, 215, 161, 0.25)",
                    boxShadow:
                      "0 8px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  {animSuccess && <div className="success-aura" />}
                  {displayDigits.map((d, i) => (
                    <div
                      key={`${i}-${d}`}
                      className={`h-7 w-full rounded-lg flex items-center justify-center shadow-sm ${
                        d ? "animate-pop" : ""
                      }`}
                      style={{
                        background: "linear-gradient(180deg, #1b1b1e, #111214)",
                        border: "1px solid rgba(245, 215, 161, 0.25)",
                      }}
                    >
                      <span className="text-[#F9E5B8] font-questTitle text-sm">
                        {d}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`mt-1 neo-panel rounded-2xl p-2 shadow-2xl mx-auto animate-in-up ${
                animWrong ? "animate-wrong" : ""
              } ${animSuccess ? "animate-correct" : ""}`}
              style={{
                width: "min(62vw, 220px)",
                background:
                  "linear-gradient(180deg, rgba(30,24,20,0.85), rgba(22,18,14,0.75))",
                border: "1.5px solid rgba(245, 215, 161, 0.25)",
                boxShadow:
                  "0 8px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <div className="grid grid-cols-3 gap-1">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map(
                  (d, idx) => (
                    <button
                      key={d}
                      onClick={() => handleDigit(d)}
                      className={`${
                        idx === 9 ? "col-span-3" : "col-span-1"
                      } rounded-lg py-0.5 font-questTitle text-sm transition-transform active:scale-95`}
                      style={{
                        background: "linear-gradient(180deg, #2a2a2a, #1f1f1f)",
                        border: "1px solid rgba(245, 215, 161, 0.28)",
                        color: "#F5D7A1",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
                      }}
                    >
                      {d}
                    </button>
                  )
                )}
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={handleOk}
                  className="neo-ok text-white rounded-xl py-1 font-questTitle text-sm transition-transform active:scale-95"
                >
                  OK
                </button>
                <button
                  onClick={handleClear}
                  className="neo-clear text-white rounded-xl py-1 font-questTitle text-sm transition-transform active:scale-95"
                >
                  CLEAR
                </button>
              </div>
              {message && (
                <div className="mt-2 text-center animate-shake">
                  <span className="text-[#F9E5B8] font-black">{message}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Level3Page() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.__musicSet) {
      window.__musicSet("/assets/music/level3-clip.mp3", 0);
      if (window.__musicPlay) window.__musicPlay();
    }
  }, []);
  return (
    <Suspense fallback={null}>
      <Level3Inner />
    </Suspense>
  );
}
