interface AuroraBackgroundProps {
  isDark: boolean;
  scrollProgress: number;
}

export function AuroraBackground({ isDark, scrollProgress }: AuroraBackgroundProps) {
  // Cloud starts very zoomed in (scale 6) and zooms out to normal (scale 1)
  const cloudScale = 6 - scrollProgress * 5;
  // Glow intensity decreases as we zoom out, revealing the cloud shape
  const glowIntensity = 1 - scrollProgress * 0.6;
  // Cloud becomes more defined as we zoom out
  const cloudDefinition = 0.3 + scrollProgress * 0.7;

  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      {/* Base background */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 50% 40%, oklch(0.14 0.03 260), oklch(0.06 0.015 270))"
            : "radial-gradient(ellipse at 50% 40%, oklch(0.96 0.01 220), oklch(0.90 0.015 230))",
        }}
      />

      {/* Shining cloud core — bright glow when zoomed in */}
      <div
        className="absolute inset-0"
        style={{
          opacity: glowIntensity,
          transform: `scale(${cloudScale})`,
          transformOrigin: "50% 40%",
          background: isDark
            ? `radial-gradient(ellipse 40% 30% at 50% 45%, oklch(0.35 0.08 250 / 95%), oklch(0.25 0.06 260 / 50%), transparent 70%)`
            : `radial-gradient(ellipse 40% 30% at 50% 45%, oklch(1 0 0 / 90%), oklch(0.96 0.02 220 / 50%), transparent 70%)`,
          filter: `blur(${40 - scrollProgress * 20}px)`,
        }}
      />

      {/* Cloud structure — becomes visible as zoom reveals it */}
      <div
        className="absolute inset-0"
        style={{
          opacity: cloudDefinition,
          transform: `scale(${cloudScale})`,
          transformOrigin: "50% 40%",
          background: isDark
            ? `radial-gradient(ellipse 50% 35% at 50% 45%, oklch(0.22 0.05 255 / 85%), oklch(0.18 0.04 260 / 45%), transparent 68%),
               radial-gradient(ellipse 35% 25% at 42% 48%, oklch(0.20 0.045 250 / 65%), transparent 60%),
               radial-gradient(ellipse 30% 20% at 60% 42%, oklch(0.19 0.055 265 / 50%), transparent 55%),
               radial-gradient(ellipse 25% 18% at 48% 38%, oklch(0.24 0.06 245 / 40%), transparent 50%)`
            : `radial-gradient(ellipse 50% 35% at 50% 45%, oklch(0.90 0.025 220 / 85%), oklch(0.93 0.015 220 / 45%), transparent 68%),
               radial-gradient(ellipse 35% 25% at 42% 48%, oklch(0.88 0.03 225 / 65%), transparent 60%),
               radial-gradient(ellipse 30% 20% at 60% 42%, oklch(0.91 0.02 215 / 50%), transparent 55%),
               radial-gradient(ellipse 25% 18% at 48% 38%, oklch(0.87 0.025 230 / 40%), transparent 50%)`,
        }}
      />

      {/* Outer shimmer ring — visible when zoomed out */}
      <div
        className="absolute inset-0"
        style={{
          opacity: scrollProgress * 0.5,
          transform: `scale(${cloudScale})`,
          transformOrigin: "50% 40%",
          background: isDark
            ? `radial-gradient(ellipse 60% 45% at 50% 45%, transparent 50%, oklch(0.3 0.07 250 / 25%) 65%, transparent 75%)`
            : `radial-gradient(ellipse 60% 45% at 50% 45%, transparent 50%, oklch(0.85 0.03 220 / 30%) 65%, transparent 75%)`,
        }}
      />

      {/* Aurora lights — dark mode only, appear outside the cloud as it zooms out */}
      {isDark && (
        <>
          <div
            className="absolute animate-aurora-1"
            style={{
              top: "-25%",
              left: "-20%",
              width: "70%",
              height: "65%",
              opacity: Math.min(1, scrollProgress * 1.8) * 0.3,
              background:
                "radial-gradient(ellipse 80% 60% at 50% 70%, oklch(0.45 0.2 150 / 50%), oklch(0.4 0.18 160 / 25%), transparent)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute animate-aurora-2"
            style={{
              top: "-20%",
              right: "-25%",
              width: "65%",
              height: "60%",
              opacity: Math.min(1, scrollProgress * 1.8) * 0.25,
              background:
                "radial-gradient(ellipse 75% 55% at 50% 65%, oklch(0.5 0.18 240 / 45%), oklch(0.45 0.15 260 / 20%), transparent)",
              filter: "blur(75px)",
            }}
          />
          <div
            className="absolute animate-aurora-2"
            style={{
              bottom: "-20%",
              left: "-15%",
              width: "60%",
              height: "55%",
              opacity: Math.min(1, scrollProgress * 1.8) * 0.2,
              background:
                "radial-gradient(ellipse 85% 65% at 55% 35%, oklch(0.48 0.16 230 / 40%), oklch(0.42 0.14 250 / 18%), transparent)",
              filter: "blur(90px)",
              animationDelay: "-5s",
            }}
          />
          <div
            className="absolute animate-aurora-1"
            style={{
              bottom: "-25%",
              right: "-20%",
              width: "65%",
              height: "55%",
              opacity: Math.min(1, scrollProgress * 1.8) * 0.18,
              background:
                "radial-gradient(ellipse 80% 60% at 45% 30%, oklch(0.42 0.19 145 / 35%), oklch(0.38 0.16 165 / 15%), transparent)",
              filter: "blur(85px)",
              animationDelay: "-12s",
            }}
          />
        </>
      )}
    </div>
  );
}
