import React from "react";

export function ForestOverlay() {
  const fireflies = [
    { left: 12, top: 68 },
    { left: 22, top: 72 },
    { left: 78, top: 70 },
    { left: 86, top: 66 },
    { left: 34, top: 64 },
    { left: 66, top: 62 },
  ];
  const leaves = [
    { left: 8, top: 74 },
    { left: 18, top: 78 },
    { left: 82, top: 76 },
    { left: 90, top: 80 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="sunbeam" />
      {fireflies.map((p, i) => (
        <span
          key={`ff-${i}`}
          className="firefly"
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
        />
      ))}
      {leaves.map((p, i) => (
        <div
          key={`leaf-${i}`}
          className="leaf"
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
        />
      ))}
    </div>
  );
}

export function BeachOverlay() {
  const clouds = [
    { left: 12, top: 10, w: 42, h: 18 },
    { left: 68, top: 14, w: 36, h: 16 },
    { left: 30, top: 18, w: 28, h: 12 },
    { left: 80, top: 12, w: 24, h: 10 },
    { left: 20, top: 16, w: 22, h: 10 },
  ];
  return (
    <div className="absolute inset-0">
      <div className="sunbeam" />
      <div className="sun" style={{ right: "10%", top: "8%" }} />
      <div
        className="waves"
        style={{
          bottom: "24%",
          height: "26px",
          opacity: 0.6,
          animationDuration: "20000ms",
        }}
      />
      <div
        className="waves"
        style={{
          bottom: "22%",
          height: "20px",
          opacity: 0.45,
          animationDuration: "26000ms",
        }}
      />
      <div
        className="foam"
        style={{
          bottom: "24%",
          height: "8px",
          opacity: 0.5,
          animationDuration: "12000ms",
        }}
      />
      <div
        className="foam"
        style={{
          bottom: "22%",
          height: "6px",
          opacity: 0.35,
          animationDuration: "15000ms",
        }}
      />
      {clouds.map((c, i) => (
        <div
          key={`cl-${i}`}
          className="cloud"
          style={{
            left: `${c.left}%`,
            top: `${c.top}%`,
            width: `${c.w}px`,
            height: `${c.h}px`,
          }}
        />
      ))}
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={`sg-${i}`}
          className="sand-glint"
          style={{
            left: `${6 + (i % 8) * 11}%`,
            animationDelay: `${i * 200}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function NightOverlay() {
  const stars = [
    { left: 10, top: 12 },
    { left: 22, top: 16 },
    { left: 34, top: 10 },
    { left: 46, top: 14 },
    { left: 58, top: 12 },
    { left: 70, top: 16 },
    { left: 82, top: 10 },
    { left: 94, top: 14 },
  ];
  const fireflies = [
    { left: 10, top: 78 },
    { left: 18, top: 82 },
    { left: 84, top: 80 },
    { left: 90, top: 76 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((s, i) => (
        <div
          key={`s-top-${i}`}
          className="star absolute"
          style={{ top: `${s.top}%`, left: `${s.left}%` }}
        />
      ))}
      {fireflies.map((p, i) => (
        <span
          key={`ff-${i}`}
          className="firefly"
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
        />
      ))}
    </div>
  );
}

type Heart = { left: number; size: number; duration: number; delay: number };
type Petal = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rot: number;
  variant: string;
};

export function Level4Overlay({
  currentId,
  twinkles,
  hearts,
  petals,
  rain,
  steam,
  sparkles,
  heartsData,
  petalsData,
}: {
  currentId: number;
  twinkles?: boolean;
  hearts?: boolean;
  petals?: boolean;
  rain?: boolean;
  steam?: boolean;
  sparkles?: boolean;
  heartsData?: Heart[];
  petalsData?: Petal[];
}) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {hearts && heartsData && (
        <>
          <div className="absolute inset-0 romance-glow" />
          {heartsData.map((h, i) => (
            <span
              key={`h-${i}`}
              className="heart absolute"
              style={{
                left: `${h.left}%`,
                bottom: "-10px",
                fontSize: `${h.size}px`,
                animationDuration: `${h.duration}s`,
                animationDelay: `${h.delay}s`,
                animationTimingFunction: "ease-in-out",
              }}
            >
              ♥
            </span>
          ))}
        </>
      )}
      {petals && petalsData && (
        <>
          {petalsData.map((p, i) => (
            <span
              key={`p-${i}`}
              className={`petal ${p.variant}`}
              style={
                {
                  left: `${p.left}%`,
                  fontSize: `${p.size}px`,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                  animationTimingFunction: "ease-in-out",
                  "--drift": `${p.drift}px`,
                  "--rot": `${p.rot}deg`,
                } as React.CSSProperties & Record<string, string>
              }
            >
              ✿
            </span>
          ))}
        </>
      )}
      {rain && (
        <>
          <div className="absolute inset-0 sad-overlay" />
          <div className="absolute inset-0 sad-tint" />
          <div className="absolute inset-0 sad-vignette" />
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={`r-${i}`}
              className="raindrop absolute"
              style={{
                left: `${(i + 1) * 6}%`,
                animationDuration: `${2.6 + (i % 5) * 0.3}s`,
                animationDelay: `${(i % 7) * 0.2}s`,
                animationTimingFunction: "ease-in",
              }}
            />
          ))}
          <div className="puddle">
            <div className="ripple" />
          </div>
        </>
      )}
      {steam && (
        <>
          {[
            { left: 49, w: 22, h: 10, dur: 8, delay: 0 },
            { left: 52, w: 18, h: 9, dur: 7.5, delay: 0.8 },
            { left: 47, w: 16, h: 8, dur: 7.8, delay: 1.4 },
          ].map((s, i) => (
            <span
              key={`st-${i}`}
              className="steam"
              style={{
                left: `${s.left}%`,
                width: `${s.w}px`,
                height: `${s.h}px`,
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
                animationTimingFunction: "ease-out",
              }}
            />
          ))}
        </>
      )}
      {sparkles && (
        <>
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={`sp-${i}`}
              className="sparkle"
              style={{
                left: `${10 + (i % 12) * 7}%`,
                bottom: "-8px",
                animationDuration: `${6 + (i % 3)}s`,
                animationDelay: `${(i % 6) * 0.25}s`,
                animationTimingFunction: "ease-in-out",
              }}
            />
          ))}
        </>
      )}
      {twinkles && (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={`st-${i}`}
              className="star absolute"
              style={{
                left: `${10 + (i % 12) * 7}%`,
                top: `${8 + (i % 5) * 10}%`,
                animationDuration: `${2 + (i % 3) * 0.5}s`,
                animationTimingFunction: "ease-in-out",
              }}
            />
          ))}
        </>
      )}
      {currentId === 0 && (
        <>
          <div
            className="wind-line"
            style={{
              top: "42%",
              animationDuration: "5s",
              animationTimingFunction: "ease-in-out",
            }}
          />
          <div
            className="wind-line"
            style={{
              top: "46%",
              animationDelay: "2s",
              animationDuration: "5s",
              animationTimingFunction: "ease-in-out",
            }}
          />
          <div
            className="wind-line"
            style={{
              top: "50%",
              animationDelay: "4s",
              animationDuration: "5s",
              animationTimingFunction: "ease-in-out",
            }}
          />
        </>
      )}
      {currentId === 2 && <div className="sad-fog" />}
      {currentId === 3 && (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={`du-${i}`}
              className="dust"
              style={{
                left: `${12 + (i % 10) * 8}%`,
                bottom: "12%",
                animationDuration: `${8 + (i % 3)}s`,
                animationDelay: `${(i % 5) * 0.3}s`,
                animationTimingFunction: "ease-out",
              }}
            />
          ))}
        </>
      )}
      {(currentId === 11 || currentId === 14) && (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={`cf-${i}`}
              className="confetti"
              style={
                {
                  left: `${6 + (i % 12) * 7}%`,
                  top: "-10px",
                  animationDuration: `${10 + (i % 4)}s`,
                  animationDelay: `${(i % 6) * 0.25}s`,
                  animationTimingFunction: "ease-in",
                  "--drift": `${i % 2 ? 10 : -8}px`,
                  "--rot": `${30 + (i % 5) * 10}deg`,
                  "--c":
                    i % 3 === 0
                      ? "rgba(255,215,120,0.85)"
                      : i % 3 === 1
                      ? "rgba(255,160,180,0.85)"
                      : "rgba(180,220,255,0.85)",
                } as React.CSSProperties & Record<string, string>
              }
            />
          ))}
        </>
      )}
      {currentId === 12 && (
        <>
          <div
            className="wind-line"
            style={{
              top: "18%",
              animationDuration: "5s",
              animationTimingFunction: "ease-in-out",
            }}
          />
          <div
            className="wind-line"
            style={{
              top: "22%",
              animationDelay: "2s",
              animationDuration: "5s",
              animationTimingFunction: "ease-in-out",
            }}
          />
        </>
      )}
      {(currentId === 5 || currentId === 8) && (
        <>
          {[
            { left: 8, top: 78 },
            { left: 92, top: 80 },
          ].map((p, i) => (
            <div
              key={`leaf-${i}`}
              className="leaf"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                animationDuration: "6s",
                animationTimingFunction: "ease-in-out",
              }}
            />
          ))}
        </>
      )}
      {currentId === 7 && <div className="sunbeam" />}
    </div>
  );
}
