interface AuroraBackgroundProps {
  isDark: boolean;
  scrollProgress: number;
}

export function AuroraBackground({ isDark, scrollProgress }: AuroraBackgroundProps) {
  // Cloud zoom: starts very zoomed in (scale 4), zooms out to 1 as user scrolls
  const cloudScale = 4 - scrollProgress * 3;
  const cloudOpacity = 0.15 + scrollProgress * 0.45;

  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      {/* Base gradient */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 50% 40%, oklch(0.18 0.04 260), oklch(0.08 0.02 270))"
            : "radial-gradient(ellipse at 50% 40%, oklch(0.95 0.01 220), oklch(0.88 0.02 230))",
        }}
      />

      {/* Digital cloud layer */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: cloudOpacity,
          transform: `scale(${cloudScale})`,
          transformOrigin: "50% 40%",
          background: isDark
            ? `radial-gradient(ellipse 60% 45% at 50% 45%, oklch(0.25 0.05 260 / 80%), transparent),
               radial-gradient(ellipse 40% 30% at 45% 50%, oklch(0.22 0.04 250 / 60%), transparent),
               radial-gradient(ellipse 35% 25% at 55% 40%, oklch(0.2 0.06 270 / 50%), transparent)`
            : `radial-gradient(ellipse 60% 45% at 50% 45%, oklch(0.9 0.02 220 / 80%), transparent),
               radial-gradient(ellipse 40% 30% at 45% 50%, oklch(0.88 0.025 230 / 60%), transparent),
               radial-gradient(ellipse 35% 25% at 55% 40%, oklch(0.92 0.015 210 / 50%), transparent)`,
        }}
      />

      {/* Aurora effects */}
      <div
        className="absolute animate-aurora-1"
        style={{
          top: "-20%",
          left: "-10%",
          width: "120%",
          height: "60%",
          opacity: isDark ? 0.25 : 0.12,
          background: isDark
            ? "radial-gradient(ellipse 80% 50% at 40% 60%, oklch(0.5 0.2 150 / 60%), oklch(0.45 0.18 170 / 30%), transparent)"
            : "radial-gradient(ellipse 80% 50% at 40% 60%, oklch(0.6 0.15 200 / 40%), oklch(0.65 0.12 250 / 20%), transparent)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute animate-aurora-2"
        style={{
          top: "-10%",
          right: "-15%",
          width: "100%",
          height: "50%",
          opacity: isDark ? 0.2 : 0.1,
          background: isDark
            ? "radial-gradient(ellipse 70% 40% at 60% 50%, oklch(0.55 0.22 140 / 50%), oklch(0.5 0.2 160 / 25%), transparent)"
            : "radial-gradient(ellipse 70% 40% at 60% 50%, oklch(0.55 0.18 175 / 30%), oklch(0.6 0.12 220 / 15%), transparent)",
          filter: "blur(70px)",
        }}
      />

      {/* Bottom aurora glow */}
      <div
        className="absolute animate-aurora-1"
        style={{
          bottom: "-15%",
          left: "-5%",
          width: "110%",
          height: "40%",
          opacity: isDark ? 0.15 : 0.08,
          background: isDark
            ? "radial-gradient(ellipse 90% 60% at 50% 30%, oklch(0.45 0.18 155 / 40%), transparent)"
            : "radial-gradient(ellipse 90% 60% at 50% 30%, oklch(0.6 0.12 200 / 25%), transparent)",
          filter: "blur(80px)",
          animationDelay: "-8s",
        }}
      />
    </div>
  );
}
