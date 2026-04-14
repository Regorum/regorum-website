import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
}

export function ParticleCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.min(80, Math.floor((w * h) / 15000));
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        baseAlpha: Math.random() * 0.5 + 0.3,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    const connectDist = 150;
    const hoverDist = 200;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const particles = particlesRef.current;

      const glowR = isDark ? 100 : 130;
      const glowG = isDark ? 220 : 160;
      const glowB = isDark ? 180 : 200;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const distToMouse = Math.hypot(p.x - mx, p.y - my);
        const isNearMouse = distToMouse < hoverDist;
        const alpha = isNearMouse
          ? Math.min(1, p.baseAlpha + (1 - distToMouse / hoverDist) * 0.6)
          : p.baseAlpha * 0.4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (isNearMouse ? 1.5 : 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${glowR},${glowG},${glowB},${alpha})`;
        ctx.fill();

        if (isNearMouse) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${glowR},${glowG},${glowB},${alpha * 0.15})`;
          ctx.fill();
        }
      }

      // Draw connections near mouse
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const aDist = Math.hypot(a.x - mx, a.y - my);
        if (aDist > hoverDist * 1.5) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < connectDist) {
            const bDist = Math.hypot(b.x - mx, b.y - my);
            const nearness = Math.max(0, 1 - Math.min(aDist, bDist) / (hoverDist * 1.5));
            const lineAlpha = (1 - dist / connectDist) * nearness * 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${glowR},${glowG},${glowB},${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [isDark, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
