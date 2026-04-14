interface AuroraBackgroundProps {
  isDark: boolean;
  scrollProgress: number;
}

export function AuroraBackground({ isDark, scrollProgress }: AuroraBackgroundProps) {
  // Cloud zoom: starts very zoomed in (scale 4), zooms out to 1 as user scrolls
  const cloudScale = 4 - scrollProgress * 3;
  const cloudOpacity = 0.2 + scrollProgress * 0.5;

  // Aurora only visible in dark mode, fades in as scroll reveals the cloud edges
  const auroraOpacity = isDark ? Math.min(1, scrollProgress * 1.5) * 0.35 : 0;

  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      {/* Base background */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 50% 40%, oklch(0.18 0.04 260), oklch(0.08 0.02 270))"
            : "radial-gradient(ellipse at 50% 40%, oklch(0.95 0.01 220), oklch(0.88 0.02 230))",
        }}
      />

      {/* Digital cloud layer - central mass */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: cloudOpacity,
          transform: `scale(${cloudScale})`,
          transformOrigin: "50% 40%",
          background: isDark
            ? `radial-gradient(ellipse 55% 40% at 50% 45%, oklch(0.22 0.05 260 / 90%), oklch(0.18 0.04 260 / 40%), transparent 70%),
               radial-gradient(ellipse 35% 28% at 45% 48%, oklch(0.2 0.04 250 / 70%), transparent 65%),
               radial-gradient(ellipse 30% 22% at 58% 42%, oklch(0.19 0.06 270 / 55%), transparent 60%)`
            : `radial-gradient(ellipse 55% 40% at 50% 45%, oklch(0.88 0.025 220 / 90%), oklch(0.92 0.015 220 / 40%), transparent 70%),
               radial-gradient(ellipse 35% 28% at 45% 48%, oklch(0.86 0.03 230 / 70%), transparent 65%),
               radial-gradient(ellipse 30% 22% at 58% 42%, oklch(0.9 0.02 210 / 55%), transparent 60%)`,
        }}
      />

      {/* Aurora lights - ONLY in dark mode, positioned OUTSIDE the cloud */}
      {/* Top-left green aurora */}
      <div
        className="absolute animate-aurora-1"
        style={{
          top: "-25%",
          left: "-20%",
          width: "70%",
          height: "65%",
          opacity: auroraOpacity,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 70%, oklch(0.45 0.2 150 / 50%), oklch(0.4 0.18 160 / 25%), transparent)",
          filter: "blur(80px)",
        }}
      />

      {/* Top-right blue aurora */}
      <div
        className="absolute animate-aurora-2"
        style={{
          top: "-20%",
          right: "-25%",
          width: "65%",
          height: "60%",
          opacity: auroraOpacity * 0.85,
          background:
            "radial-gradient(ellipse 75% 55% at 50% 65%, oklch(0.5 0.18 240 / 45%), oklch(0.45 0.15 260 / 20%), transparent)",
          filter: "blur(75px)",
        }}
      />

      {/* Bottom-left blue aurora */}
      <div
        className="absolute animate-aurora-2"
        style={{
          bottom: "-20%",
          left: "-15%",
          width: "60%",
          height: "55%",
          opacity: auroraOpacity * 0.7,
          background:
            "radial-gradient(ellipse 85% 65% at 55% 35%, oklch(0.48 0.16 230 / 40%), oklch(0.42 0.14 250 / 18%), transparent)",
          filter: "blur(90px)",
          animationDelay: "-5s",
        }}
      />

      {/* Bottom-right green aurora */}
      <div
        className="absolute animate-aurora-1"
        style={{
          bottom: "-25%",
          right: "-20%",
          width: "65%",
          height: "55%",
          opacity: auroraOpacity * 0.6,
          background:
            "radial-gradient(ellipse 80% 60% at 45% 30%, oklch(0.42 0.19 145 / 35%), oklch(0.38 0.16 165 / 15%), transparent)",
          filter: "blur(85px)",
          animationDelay: "-12s",
        }}
      />
    </div>
  );
}
