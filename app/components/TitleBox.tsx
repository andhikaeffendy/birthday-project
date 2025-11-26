import React from "react";

export default function TitleBox({ lines }: { lines: string[] }) {
  return (
    <div
      className="relative inline-block rounded-2xl"
      style={{
        background: "linear-gradient(180deg, #8C6A3D, #6B4E2E)",
        border: "4px solid #2A2A2A",
        boxShadow: "0 6px 0 rgba(0,0,0,0.45), inset 0 2px 0 rgba(255,255,255,0.05)",
        padding: "10px 16px",
      }}
    >
      <h1 className="font-questTitle text-amber-50" style={{ fontSize: "clamp(22px,6.5vw,28px)", lineHeight: "1.06", textAlign: "center" }}>
        {lines.map((l, i) => (
          <span key={i}>
            {l}
            {i !== lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </h1>
      <div className="leaf" style={{ position: "absolute", left: "-18px", top: "-14px", transform: "scale(0.8)" }} />
      <div className="leaf" style={{ position: "absolute", right: "-16px", bottom: "-12px", transform: "scale(0.7) rotate(8deg)" }} />
    </div>
  );
}

