"use client";

import { useRouter } from "next/navigation";
import { HelpCircle, Puzzle, Plus, Play } from "lucide-react";

export default function GameIntro() {
  const router = useRouter();

  const handleStartGame = () => {
    router.push("/game/level1");
  };

  return (
    <div
      className="min-h-screen bg-[#87CEEB] relative overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Window bar with circular indicators */}
      <div className="absolute top-4 left-4 flex space-x-2 z-10">
        <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-gray-800 shadow-sm"></div>
        <div className="w-3 h-3 bg-yellow-400 rounded-full border-2 border-gray-800 shadow-sm"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800 shadow-sm"></div>
      </div>

      {/* Main Title */}
      <div className="text-center pt-6 pb-4">
        <h1
          className="text-3xl font-black text-white"
          style={{
            textShadow: `
            -4px -4px 0 #000,
            4px -4px 0 #000,
            -4px 4px 0 #000,
            4px 4px 0 #000,
            -4px 0 0 #000,
            4px 0 0 #000,
            0 -4px 0 #000,
            0 4px 0 #000,
            0 0 8px rgba(0,0,0,0.5)
          `,
          }}
        >
          Birthday Quest for Alice
        </h1>
      </div>

      {/* Game Scene Container */}
      <div className="relative w-full px-4 h-[360px]">
        {/* Left Side Buttons */}
        <div className="absolute left-0 top-1/3 transform -translate-y-1/2 space-y-4 z-10">
          {/* Level 1 Button */}
          <button className="bg-[#F5E6D3] hover:bg-[#E8D5B7] px-4 py-2 rounded-full border-4 border-gray-800 shadow-lg font-black text-gray-800 text-sm transition-all hover:scale-105">
            LEVEL 1
          </button>

          {/* Question Mark Button */}
          <button className="bg-[#F5E6D3] hover:bg-[#E8D5B7] w-14 h-14 rounded-lg border-4 border-gray-800 shadow-lg flex items-center justify-center transition-all hover:scale-105">
            <HelpCircle className="w-6 h-6 text-gray-800" />
          </button>

          {/* Puzzle Piece Button */}
          <button className="bg-[#F5E6D3] hover:bg-[#E8D5B7] w-14 h-14 rounded-lg border-4 border-gray-800 shadow-lg flex items-center justify-center transition-all hover:scale-105">
            <Puzzle className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Right Side Buttons */}
        <div className="absolute right-0 top-1/3 transform -translate-y-1/2 space-y-4 z-10">
          {/* Plus Puzzle Button */}
          <button className="bg-[#F5E6D3] hover:bg-[#E8D5B7] w-14 h-14 rounded-lg border-4 border-gray-800 shadow-lg flex items-center justify-center transition-all hover:scale-105">
            <Plus className="w-6 h-6 text-gray-800" />
          </button>

          {/* Play Button on Pedestal */}
          <div className="relative mt-8">
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-5 bg-[#8B4513] rounded-lg border-3 border-gray-800"></div>
            <button className="bg-blue-500 hover:bg-blue-600 w-14 h-14 rounded-lg border-4 border-gray-800 shadow-lg flex items-center justify-center transition-all hover:scale-105 relative z-10">
              <Play className="w-6 h-6 text-white fill-white" />
            </button>
          </div>
        </div>

        {/* Character/Scene Area */}
        <div className="flex justify-center items-center h-full relative">
          {/* Character Silhouette */}
          <div className="relative">
            {/* Head */}
            <div className="w-28 h-34 bg-pink-300 rounded-full border-5 border-gray-800 shadow-lg relative">
              {/* Face */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-pink-200 rounded-full border-4 border-gray-800"></div>
              {/* Eyes */}
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 flex space-x-4">
                <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
              </div>
              {/* Smile */}
              <div className="absolute top-18 left-1/2 transform -translate-x-1/2 w-8 h-4 border-b-5 border-gray-800 rounded-full"></div>
            </div>
            {/* Body */}
            <div className="w-24 h-16 bg-purple-300 rounded-lg border-5 border-gray-800 shadow-lg mx-auto -mt-3 relative z-10"></div>
          </div>

          {/* Decorative Trees */}
          <div className="absolute bottom-0 left-1/4 w-14 h-24 bg-green-500 rounded-t-full border-5 border-gray-800 shadow-lg"></div>
          <div className="absolute bottom-0 right-1/4 w-12 h-20 bg-green-600 rounded-t-full border-5 border-gray-800 shadow-lg"></div>
        </div>

        {/* Ground/Soil */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#8B4513] border-t-5 border-gray-800"></div>
      </div>

      {/* Instruction Text */}
      <div className="text-center py-4">
        <p
          className="text-xl font-black text-white"
          style={{
            textShadow: `
            -3px -3px 0 #000,
            3px -3px 0 #000,
            -3px 3px 0 #000,
            3px 3px 0 #000,
            -3px 0 0 #000,
            3px 0 0 #000,
            0 -3px 0 #000,
            0 3px 0 #000
          `,
          }}
        >
          Solve all the puzzles to view your goals!
        </p>
      </div>

      {/* Start Button */}
      <div
        className="text-center"
        style={{ paddingBottom: "max(24px, env(safe-area-inset-bottom))" }}
      >
        <button
          onClick={handleStartGame}
          className="bg-[#F5E6D3] hover:bg-[#E8D5B7] px-8 py-3 rounded-full border-4 border-gray-800 shadow-lg font-black text-gray-800 text-xl transition-all hover:scale-105 hover:shadow-xl"
        >
          START
        </button>
      </div>

      {/* Floating Cloud Elements */}
      <div className="absolute top-20 right-12 w-8 h-8 bg-white rounded-full border-3 border-gray-800 shadow-md opacity-80"></div>
      <div className="absolute top-32 left-12 w-6 h-6 bg-white rounded-full border-3 border-gray-800 shadow-md opacity-70"></div>
      <div className="absolute bottom-32 right-24 w-5 h-5 bg-white rounded-full border-3 border-gray-800 shadow-md opacity-60"></div>
    </div>
  );
}
