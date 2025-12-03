"use client";

import BlockingImage from "../components/BlockingImage";
import { useEffect, useMemo, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

type Mark = { x: number; y: number; kind: "ok" | "bad"; label?: string };
type Rect = {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

export default function Level4Page() {
  const router = useRouter();
  const bgSrc = "/assets/background_level_4.png";
  const [hearts, setHearts] = useState<number>(3);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [hint, setHint] = useState<boolean>(false);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const targets = useMemo<Rect[]>(
    () => [
      { id: "papan_cukil", left: 0, top: 62, width: 19, height: 15 },
      { id: "gelang", left: 34, top: 16, width: 18, height: 8 },
      { id: "buku", left: 26, top: 70, width: 40, height: 14 },
    ],
    []
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.__musicSet)
        window.__musicSet("/assets/music/level2-clip.mp3", 0);
      if (window.__musicPlay) window.__musicPlay();
    }
    if (typeof window !== "undefined") {
      const a = new window.Image();
      a.src = "/assets/background_gift.png";
      const b = new window.Image();
      b.src = "/assets/background_final.png";
    }
  }, []);

  useEffect(() => {
    if (selectedIds.length === 3) {
      const t = setTimeout(() => setShowDetail(true), 300);
      return () => clearTimeout(t);
    }
  }, [selectedIds]);

  const inRect = (xPct: number, yPct: number, r: Rect) => {
    return (
      xPct >= r.left &&
      xPct <= r.left + r.width &&
      yPct >= r.top &&
      yPct <= r.top + r.height
    );
  };

  const findRect = (xPct: number, yPct: number): Rect | null => {
    for (const r of targets) {
      if (inRect(xPct, yPct, r)) return r;
    }
    return null;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (showDetail || gameOver) return;
    if (!wrapRef.current) return;
    if (hearts <= 0) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const hit = findRect(x, y);
    if (hit) {
      const anchorX =
        hit.id === "papan_cukil"
          ? hit.left + hit.width * 0.4
          : hit.id === "gelang"
          ? hit.left + hit.width * 0.52
          : hit.left + hit.width * 0.5;
      const anchorY =
        hit.id === "papan_cukil"
          ? hit.top + hit.height * 0.45
          : hit.id === "gelang"
          ? hit.top + hit.height * 0.35
          : hit.top + hit.height * 0.5;
      if (!selectedIds.includes(hit.id)) {
        setSelectedIds((prev) => [...prev, hit.id]);
        setMarks((prev) => [
          ...prev,
          { x: anchorX, y: anchorY, kind: "ok", label: hit.id },
        ]);
      } else {
        setMarks((prev) => [
          ...prev,
          { x: anchorX, y: anchorY, kind: "ok", label: hit.id },
        ]);
      }
    } else {
      setMarks([{ x, y, kind: "bad" }]);
      setSelectedIds([]);
      setWrongCount((w) => {
        const next = w + 1;
        if (next >= 3) {
          setHearts(0);
          setGameOver(true);
        } else {
          setHearts(() => Math.max(0, 3 - next));
        }
        return next;
      });
    }
  };

  const resetGame = () => {
    setHearts(3);
    setWrongCount(0);
    setHint(false);
    setMarks([]);
    setSelectedIds([]);
    setShowDetail(false);
    setGameOver(false);
    setHearts(3);
  };

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
          <BlockingImage
            containerClassName="absolute inset-0 flex items-center justify-center"
            src={bgSrc}
            alt="Level 4 Background"
            fill
            className="object-cover bg-parallax"
            sizes="100vw"
            priority
            onErrorSrc="/assets/background_duduk.png"
          />

          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className="bg-[#F5D7A1] px-4 py-1.5 rounded-2xl border-[6px] border-[#2A2A2A] shadow-xl flex items-center gap-3">
              <span
                className="font-black text-[#2A2A2A] tracking-widest"
                style={{ fontSize: "clamp(18px, 5.2vw, 24px)" }}
              >
                LEVEL 4
              </span>
              <div className="flex items-center gap-1 bg-[#4A3A2A] border-4 border-[#2D2018] px-2 py-0.5 rounded-xl shadow-xl">
                <Heart size={14} className="text-red-500" fill="currentColor" />
                <span className="text-[#F5D7A1] font-black text-xs">
                  {hearts}
                </span>
              </div>
              <div className="bg-[#4A3A2A] border-4 border-[#2D2018] px-2 py-0.5 rounded-xl shadow-xl">
                <span className="text-[#F5D7A1] font-black text-xs">
                  TRY: {Math.max(0, 3 - wrongCount)}
                </span>
              </div>
            </div>
          </div>

          <div
            className="absolute left-1/2 transform -translate-x-1/2 z-20 w-full max-w-[480px] px-4"
            style={{ bottom: "max(env(safe-area-inset-bottom), 16px)" }}
          >
            <div className="flex items-center justify-between">
              <button
                onClick={() => setHint((v) => !v)}
                className="bg-[#4A3A2A] border-4 border-[#2D2018] px-8 py-3 rounded-xl text-[#F5D7A1] font-black text-lg"
              >
                HINT
              </button>
              <button
                onClick={resetGame}
                className="bg-[#D97706] border-4 border-[#6B3F1D] px-8 py-3 rounded-xl text-white font-black text-lg"
              >
                RESET
              </button>
            </div>
          </div>

          {hint && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="absolute left-1/2 -translate-x-1/2 bottom-28 w-full max-w-[520px] px-4">
                <div
                  className="rounded-2xl p-3 shadow-xl border"
                  style={{
                    background: "rgba(0,0,0,0.35)",
                    borderColor: "rgba(255,210,120,0.5)",
                  }}
                >
                  <p
                    className="font-questTitle text-white text-center"
                    style={{ fontSize: "clamp(14px, 4vw, 17px)" }}
                  >
                    barang yang sudah kita miliki dan kita coba lakuin bareng
                  </p>
                </div>
              </div>
              {targets.map((t) => (
                <div
                  key={t.id}
                  className="absolute rounded-xl"
                  style={{
                    left: `${t.left}%`,
                    top: `${t.top}%`,
                    width: `${t.width}%`,
                    height: `${t.height}%`,
                    border: "2px dashed rgba(255,210,120,0.8)",
                    boxShadow: "0 0 10px rgba(255,210,120,0.3)",
                  }}
                />
              ))}
            </div>
          )}

          <div ref={wrapRef} className="absolute inset-0" onClick={handleClick}>
            {targets.map((t) => (
              <button
                key={`btn-${t.id}`}
                onClick={(ev) => {
                  ev.stopPropagation();
                  if (showDetail || gameOver) return;
                  const x =
                    t.id === "papan_cukil"
                      ? t.left + t.width * 0.4
                      : t.id === "gelang"
                      ? t.left + t.width * 0.52
                      : t.left + t.width * 0.5;
                  const y =
                    t.id === "papan_cukil"
                      ? t.top + t.height * 0.45
                      : t.id === "gelang"
                      ? t.top + t.height * 0.35
                      : t.top + t.height * 0.5;
                  if (!selectedIds.includes(t.id)) {
                    setSelectedIds((prev) => [...prev, t.id]);
                  }
                  setMarks((prev) => [
                    ...prev,
                    { x, y, kind: "ok", label: t.id },
                  ]);
                }}
                className="absolute"
                style={{
                  left: `${t.left}%`,
                  top: `${t.top}%`,
                  width: `${t.width}%`,
                  height: `${t.height}%`,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label={t.id}
              />
            ))}
          </div>

          <div className="absolute inset-0 pointer-events-none">
            {marks.map((m, i) => (
              <div
                key={`m-${i}`}
                className="absolute"
                style={{
                  left: `${m.x}%`,
                  top: `${m.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span
                  className={`${
                    m.kind === "ok" ? "text-green-500" : "text-red-500"
                  }`}
                  style={{
                    fontSize: "28px",
                    textShadow: "0 0 8px rgba(0,0,0,0.45)",
                    fontWeight: 900,
                  }}
                >
                  {m.kind === "ok" ? "✓" : "✕"}
                </span>
              </div>
            ))}
          </div>

          {showDetail && (
            <div
              className="absolute inset-0 flex items-center justify-end"
              style={{
                paddingBottom: "max(16px, env(safe-area-inset-bottom))",
              }}
            >
              <div className="w-full max-w-[420px] px-4 mb-3">
                <div className="bg-[#FFE8C8] py-4 px-5 rounded-2xl border-[6px] border-[#2A2A2A] shadow-xl text-center">
                  <h2
                    className="font-questTitle text-[#2A2A2A]"
                    style={{ fontSize: "clamp(16px, 4.6vw, 20px)" }}
                  >
                    Pilihan benar:
                  </h2>
                  <div className="mt-2">
                    {selectedIds.map((id) => (
                      <div key={id} className="mt-1">
                        <span
                          className="font-black text-[#2A2A2A]"
                          style={{ fontSize: "15px" }}
                        >
                          {id === "papan_cukil"
                            ? "papan cukil"
                            : id === "gelang"
                            ? "gelang couple"
                            : "buku/jurnal"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-4 justify-center">
                    <button
                      onClick={() => router.push("/congratulation")}
                      className="bg-[#2FA84F] border-4 border-[#1D6131] px-10 py-3 rounded-xl text-white font-black text-lg"
                    >
                      NEXT
                    </button>
                    <button
                      onClick={resetGame}
                      className="bg-[#D97706] border-4 border-[#6B3F1D] px-10 py-3 rounded-xl text-white font-black text-lg"
                    >
                      REPLAY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {gameOver && (
            <div
              className="absolute inset-0 flex items-center justify-end"
              style={{
                paddingBottom: "max(16px, env(safe-area-inset-bottom))",
              }}
            >
              <div className="w-full max-w-[420px] px-4 mb-3">
                <div className="bg-red-50 py-4 px-5 rounded-2xl border-[6px] border-red-600 shadow-xl text-center">
                  <h2
                    className="font-questTitle text-red-800"
                    style={{ fontSize: "clamp(16px, 4.6vw, 20px)" }}
                  >
                    Game Over — Try Again
                  </h2>
                  <div className="mt-3 flex items-center gap-4 justify-center">
                    <button
                      onClick={resetGame}
                      className="bg-[#D97706] border-4 border-[#6B3F1D] px-10 py-3 rounded-xl text-white font-black text-lg"
                    >
                      TRY AGAIN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
