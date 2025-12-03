"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BlockingImage from "../components/BlockingImage";
import { NightOverlay } from "../components/Ambience";

interface PuzzlePiece {
  id: number;
  imageUrl: string;
  correctRow: number;
  correctCol: number;
  angle?: number;
}

export default function Level2Page() {
  const router = useRouter();
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const stars = [
    { top: 8, left: 18 },
    { top: 12, left: 28 },
    { top: 16, left: 14 },
    { top: 10, left: 68 },
    { top: 14, left: 78 },
    { top: 18, left: 56 },
    { top: 22, left: 36 },
    { top: 20, left: 86 },
    { top: 26, left: 22 },
    { top: 30, left: 72 },
    { top: 28, left: 48 },
    { top: 24, left: 10 },
  ];
  const hearts = [
    { left: 18, size: 12, duration: 7, delay: 0 },
    { left: 28, size: 10, duration: 6, delay: 1 },
    { left: 38, size: 12, duration: 8, delay: 2 },
    { left: 52, size: 11, duration: 7, delay: 0 },
    { left: 62, size: 10, duration: 6, delay: 1 },
    { left: 72, size: 12, duration: 8, delay: 2 },
    { left: 82, size: 11, duration: 7, delay: 1 },
    { left: 22, size: 10, duration: 9, delay: 3 },
  ];

  const makeInitialPieces = () => {
    const arr: PuzzlePiece[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        arr.push({
          id: row * 3 + col,
          imageUrl: `/assets/jig_${row}_${col}.png`,
          correctRow: row,
          correctCol: col,
        });
      }
    }
    return arr;
  };
  const [grid, setGrid] = useState<PuzzlePiece[][]>(() => {
    const arr = makeInitialPieces().map((p) => ({ ...p, angle: 0 }));
    return [arr.slice(0, 3), arr.slice(3, 6), arr.slice(6, 9)];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.__musicSet)
        window.__musicSet("/assets/music/level2-clip.mp3", 0);
      if (window.__musicPlay) window.__musicPlay();
    }
    if (typeof window !== "undefined") {
      const img = new window.Image();
      img.src = "/assets/background_level_3.png";
    }
  }, []);

  useEffect(() => {
    const randomAngle = () => [0, 90, 180, 270][Math.floor(Math.random() * 4)];
    const t = setTimeout(() => {
      setGrid((prev) => {
        const g = prev.map((row) =>
          row.map((p) => ({ ...p, angle: randomAngle() }))
        );
        const allZero = g.every((row) =>
          row.every((p) => (p.angle ?? 0) === 0)
        );
        if (allZero) {
          g[0][0] = { ...g[0][0], angle: 90 };
        }
        return g;
      });
      setInitialized(true);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const rotatePiece = (r: number, c: number) => {
    setGrid((prev) => {
      const g = prev.map((row) => row.map((p) => ({ ...p })));
      const current = g[r][c];
      const nextAngle = (current.angle ?? 0) + 90;
      g[r][c] = { ...current, angle: nextAngle };
      return g;
    });
    setMoves((m) => m + 1);
  };

  const handlePointerUp = (row: number, col: number) => rotatePiece(row, col);

  useEffect(() => {
    if (!initialized) return;
    const allOriented = grid.every((row) =>
      row.every((p) => (p.angle ?? 0) % 360 === 0)
    );
    if (allOriented) {
      setTimeout(() => setIsComplete(true), 300);
    }
  }, [grid, initialized]);

  const resetPuzzle = () => {
    const randomAngle = () => [0, 90, 180, 270][Math.floor(Math.random() * 4)];
    const arr = makeInitialPieces().map((p) => ({
      ...p,
      angle: randomAngle(),
    }));
    const g = [arr.slice(0, 3), arr.slice(3, 6), arr.slice(6, 9)];
    const allZero = g.every((row) => row.every((p) => (p.angle ?? 0) === 0));
    if (allZero) g[0][0].angle = 90;
    setGrid(g);
    setMoves(0);
    setShowHint(false);
    setIsComplete(false);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-[#2D2D2D]"
      style={{ minHeight: "100svh" }}
    >
      <BlockingImage
        containerClassName="absolute inset-0"
        src="/assets/bg_level_2.png"
        alt="Level 2 Background"
        fill
        className="object-cover bg-parallax"
        priority
        sizes="100vw"
      />
      <NightOverlay />

      {isComplete ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 romance-glow" />
            {stars.map((s, i) => (
              <div
                key={`s-${i}`}
                className="star absolute"
                style={{ top: `${s.top}%`, left: `${s.left}%` }}
              />
            ))}
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
          </div>
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <div className="bg-[#4A3A2A] px-6 py-2 rounded-2xl border-4 border-[#2D2018] shadow-2xl">
              <span
                className="font-black text-[#F5D7A1] tracking-widest"
                style={{ fontSize: "clamp(20px, 6vw, 28px)" }}
              >
                LEVEL 2
              </span>
            </div>
          </div>
          <div
            className="absolute left-1/2 -translate-x-1/2 w-full max-w-[420px] px-4"
            style={{ bottom: "max(env(safe-area-inset-bottom), 16px)" }}
          >
            <div className="flex items-center justify-center">
              <button
                onClick={() => router.push("/level-3")}
                className="bg-[#D97706] border-4 border-[#6B3F1D] px-10 py-4 rounded-xl text-white font-black text-lg"
              >
                NEXT LEVEL
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center">
          <div className="mt-4">
            <div className="bg-[#4A3A2A] px-6 py-2 rounded-2xl border-4 border-[#2D2018] shadow-2xl">
              <span
                className="font-black text-[#F5D7A1] tracking-widest"
                style={{ fontSize: "clamp(20px, 6vw, 28px)" }}
              >
                LEVEL 2
              </span>
            </div>
          </div>
          <div
            className="relative mt-4 rounded-2xl border-8 border-[#2D2018] bg-[#0D0F12] shadow-xl"
            style={{ width: "min(92vw, 360px)", height: "min(60svh, 480px)" }}
          >
            {showHint && (
              <Image
                src="/assets/bg_level_2.png"
                alt="Hint"
                fill
                className="object-contain opacity-20"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMScgaGVpZ2h0PScxJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxJyBoZWlnaHQ9JzEnIGZpbGw9JyMxMTEzMTMnIC8+PC9zdmc+"
              />
            )}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-1/3 top-0 w-[4px] h-full bg-black/40 rounded-full"></div>
              <div className="absolute left-2/3 top-0 w-[4px] h-full bg-black/40 rounded-full"></div>
              <div className="absolute top-1/3 left-0 h-[4px] w-full bg-black/40 rounded-full"></div>
              <div className="absolute top-2/3 left-0 h-[4px] w-full bg-black/40 rounded-full"></div>
            </div>
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
              {grid.map((rowItems, row) =>
                rowItems.map((piece, col) => (
                  <div
                    key={`${row}-${col}`}
                    className="relative border-[3px] border-black/40 overflow-hidden touch-none"
                    onPointerUp={() => handlePointerUp(row, col)}
                  >
                    <Image
                      src={piece.imageUrl}
                      alt={`Piece ${piece.id}`}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMScgaGVpZ2h0PScxJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxJyBoZWlnaHQ9JzEnIGZpbGw9JyMxMTEzMTMnIC8+PC9zdmc+"
                      style={{
                        transform: `rotate(${piece.angle ?? 0}deg)`,
                        transformOrigin: "50% 50%",
                        transition: "transform 150ms ease-out",
                      }}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="mt-3 w-full max-w-[420px] px-4">
            <div className="grid grid-cols-3 gap-3 items-center">
              <div className="col-span-1 w-20 h-20 rounded-xl overflow-hidden border-4 border-[#2D2018] bg-[#4A3A2A]">
                <Image
                  src="/assets/bg_level_2.png"
                  alt="Preview"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMScgaGVpZ2h0PScxJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxJyBoZWlnaHQ9JzEnIGZpbGw9JyMxMTEzMTMnIC8+PC9zdmc+"
                />
              </div>
              <div className="col-span-1 flex justify-center">
                <div className="bg-[#4A3A2A] border-4 border-[#2D2018] px-6 py-3 rounded-xl">
                  <span className="text-[#F5D7A1] font-black text-lg tracking-wide">
                    MOVES: {moves}
                  </span>
                </div>
              </div>
              <div className="col-span-1 flex justify-end" />
            </div>
            <div className="mt-3 flex items-center gap-4 justify-center">
              <button
                className="bg-[#D97706] border-4 border-[#6B3F1D] px-10 py-3 rounded-xl text-white font-black text-lg"
                onClick={resetPuzzle}
              >
                RESET
              </button>
              <button
                onClick={() => setShowHint(!showHint)}
                className="bg-[#4A3A2A] border-4 border-[#2D2018] px-8 py-3 rounded-xl text-[#F5D7A1] font-black text-lg"
              >
                HINT
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes clean-scale-in {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-clean-scale-in {
          animation: clean-scale-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
