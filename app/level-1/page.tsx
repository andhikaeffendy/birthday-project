"use client";

import Image from "next/image";
import { BeachOverlay } from "../components/Ambience";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Level1Page() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [animWrong, setAnimWrong] = useState(false);
  const [animSuccess, setAnimSuccess] = useState(false);
  const [overlay, setOverlay] = useState<"none" | "sad" | "happy">("none");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.__musicSet) window.__musicSet("s6oZ6LJeDws", 610);
      if (window.__musicPlay) window.__musicPlay();
    }
  }, []);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === "Banda Neira";
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      setAnimSuccess(true);
      setOverlay("happy");
      setTimeout(() => {
        setAnimSuccess(false);
        router.push("/level-2");
      }, 2000);
    } else {
      setAnimWrong(true);
      setOverlay("sad");
      setTimeout(() => {
        setAnimWrong(false);
        setSelectedAnswer(null);
        setShowResult(false);
        setIsCorrect(false);
        setOverlay("none");
        router.replace("/level-1");
      }, 5000);
    }
  };

  const options = [
    { id: "A", text: "Karimun jawa", isCorrect: false },
    { id: "B", text: "Vietnam", isCorrect: false },
    { id: "C", text: "Banda Neira", isCorrect: true },
    { id: "D", text: "Labuan Bajo", isCorrect: false },
  ];

  return (
    <div
      className="min-h-screen bg-[#2D2D2D] flex items-center justify-center"
      style={{ minHeight: "100svh" }}
    >
      <div
        className="relative w-full max-w-7xl mx-auto"
        style={{ height: "100svh" }}
      >
        <div className="bg-[#2D2D2D] h-full relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/assets/background_level_1.png"
              alt="Level 1 Background"
              fill
              className="object-cover bg-parallax"
              priority
              sizes="100vw"
            />
          </div>
          <BeachOverlay />

          <div className="absolute inset-0 pointer-events-none">
            {overlay === "happy" && (
              <>
                <div className="absolute inset-0 romance-glow" />
                {[
                  { left: 18, size: 12, duration: 7, delay: 0 },
                  { left: 28, size: 10, duration: 6, delay: 1 },
                  { left: 38, size: 12, duration: 8, delay: 2 },
                  { left: 52, size: 11, duration: 7, delay: 0 },
                  { left: 62, size: 10, duration: 6, delay: 1 },
                  { left: 72, size: 12, duration: 8, delay: 2 },
                  { left: 82, size: 11, duration: 7, delay: 1 },
                ].map((h, i) => (
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
            {overlay === "sad" && (
              <>
                <div className="absolute inset-0 sad-overlay" />
                <div className="absolute inset-0 sad-tint" />
                <div className="absolute inset-0 sad-vignette" />
                <div className="sad-fog" />
              </>
            )}
          </div>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
            <div
              className={`bg-[#F5D7A1] px-6 py-2 rounded-2xl border-[6px] border-[#2A2A2A] shadow-xl ${
                animWrong ? "animate-wrong" : ""
              } ${animSuccess ? "animate-correct" : ""} relative`}
            >
              {animSuccess && <div className="success-aura" />}
              <span
                className="font-black text-[#2A2A2A] tracking-widest"
                style={{ fontSize: "clamp(20px, 6vw, 28px)" }}
              >
                LEVEL 1
              </span>
            </div>
          </div>

          <div
            className="absolute left-1/2 transform -translate-x-1/2 z-20 w-full max-w-[420px] px-4"
            style={{ bottom: "max(env(safe-area-inset-bottom), 16px)" }}
          >
            <div
              className={`bg-[#FFE8C8] py-4 px-5 rounded-2xl border-[6px] border-[#2A2A2A] shadow-xl text-center ${
                animWrong ? "animate-wrong" : ""
              } ${animSuccess ? "animate-correct" : ""} relative`}
            >
              {animSuccess && <div className="success-aura" />}
              <h2
                className="font-questTitle text-[#2A2A2A] leading-snug"
                style={{ fontSize: "clamp(16px, 4.6vw, 20px)" }}
              >
                What&apos;s your dream vacation when you tell me
                <br />
                at the first chat?
              </h2>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.text)}
                  disabled={showResult}
                  className={`btn-cozy flex items-center justify-between bg-[#FFE8C8] rounded-2xl border-[6px] border-[#2A2A2A] px-3 py-3 shadow-xl disabled:opacity-60 ${
                    selectedAnswer === option.text
                      ? isCorrect && option.isCorrect
                        ? "ring-4 ring-green-400"
                        : !isCorrect && option.isCorrect
                        ? "ring-4 ring-yellow-400"
                        : "ring-4 ring-red-400"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="min-w-[36px] h-[28px] rounded-xl bg-[#F7DDAF] border-4 border-[#2A2A2A] flex items-center justify-center">
                      <span
                        className="font-black text-[#2A2A2A]"
                        style={{ fontSize: "14px" }}
                      >
                        {option.id}
                      </span>
                    </div>
                    <div className="flex-1">
                      <span
                        className="font-black text-[#2A2A2A]"
                        style={{ fontSize: "15px" }}
                      >
                        {option.text}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {showResult && (
              <div
                className={`mt-3 p-2 rounded-xl border-2 text-xs text-center ${
                  isCorrect
                    ? "bg-green-50 border-green-600 text-green-800"
                    : "bg-red-50 border-red-600 text-red-800"
                }`}
              >
                <p className="font-bold">
                  {isCorrect ? "🎉 Correct!" : "❌ Try again!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
