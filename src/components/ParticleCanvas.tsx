import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
}

interface ParticleCanvasProps {
  isDark: boolean;
  scrollProgress: number;
}

export function ParticleCanvas({ isDark, scrollProgress }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.min(100, Math.floor((w * h) / 12000));
    const particles: Particle[] = [];
    // Place particles within the cloud region (centered ellipse)
    for (let i = 0; i < count; i++) {
      // Generate points within an ellipse centered at (50%, 40%) of the viewport
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()); // sqrt for uniform distribution
      const cx = w * 0.5;
      const cy = h * 0.4;
      const rx = w * 0.28; // horizontal radius of cloud
      const ry = h * 0.22; // vertical radius of cloud
      particles.push({
        x: cx + Math.cos(angle) * r * rx,
        y: cy + Math.sin(angle) * r * ry,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
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
      const sp = scrollRef.current;

      // Cloud boundary (ellipse)
      const cx = w * 0.5;
      const cy = h * 0.4;
      // Cloud radius scales with scroll (zoomed in = larger effective cloud on screen)
      const cloudScale = 4 - sp * 3;
      const rx = w * 0.28 * cloudScale;
      const ry = h * 0.22 * cloudScale;

      const glowR = isDark ? 100 : 130;
      const glowG = isDark ? 220 : 160;
      const glowB = isDark ? 180 : 200;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Keep particles within cloud ellipse by bouncing off the boundary
        const dx = (p.x - cx) / rx;
        const dy = (p.y - cy) / ry;
        const dist = dx * dx + dy * dy;
        if (dist > 1) {
          // Reflect velocity inward
          const nx = dx / Math.sqrt(dist);
          const ny = dy / Math.sqrt(dist);
          const dot = p.vx * nx + p.vy * ny;
          p.vx -= 2 * dot * nx;
          p.vy -= 2 * dot * ny;
          // Push back inside
          const scale = 0.98 / Math.sqrt(dist);
          p.x = cx + (p.x - cx) * scale;
          p.y = cy + (p.y - cy) * scale;
        }

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
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < connectDist) {
            const bDist = Math.hypot(b.x - mx, b.y - my);
            const nearness = Math.max(0, 1 - Math.min(aDist, bDist) / (hoverDist * 1.5));
            const lineAlpha = (1 - d / connectDist) * nearness * 0.6;
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
