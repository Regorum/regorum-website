import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { Shield, Cpu, Cloud, Zap, Users, TrendingUp } from "lucide-react";
import { AuroraBackground } from "@/components/AuroraBackground";
import { ParticleCanvas } from "@/components/ParticleCanvas";
import { ScrollNav } from "@/components/ScrollNav";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { ContactSection } from "@/components/ContactSection";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Regorum Technologies — Digital Innovation" },
      { name: "description", content: "Regorum Technologies builds cutting-edge digital solutions for the future." },
    ],
  }),
});

function Index() {
  const [isDark, setIsDark] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navVisible, setNavVisible] = useState(false);

  const toggleDark = useCallback(() => {
    setIsDark((d) => !d);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(1, window.scrollY / Math.max(1, maxScroll));
      setScrollProgress(progress);
      setNavVisible(window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-500">
      <AuroraBackground isDark={isDark} scrollProgress={scrollProgress} />
      <ParticleCanvas isDark={isDark} />
      <ScrollNav visible={navVisible} isDark={isDark} />

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <h1 className="animate-float-up text-center font-display text-5xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
          Regorum
          <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Technologies
          </span>
        </h1>
        <div className="mt-8 animate-float-up" style={{ animationDelay: "0.3s" }}>
          <DarkModeToggle isDark={isDark} onToggle={toggleDark} />
        </div>
      </section>

      {/* Who We Are */}
      <section id="who" className="relative z-10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-display text-3xl font-bold text-foreground md:text-4xl">
            Who We Are
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Regorum Technologies is a forward-thinking digital solutions company driven by innovation and precision.
            We partner with businesses to architect, build, and scale technology that defines the next era.
            Our multidisciplinary team blends deep technical expertise with creative vision.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Users, label: "Expert Team", desc: "Cross-functional specialists" },
              { icon: TrendingUp, label: "Growth Focus", desc: "Scalable from day one" },
              { icon: Shield, label: "Trusted", desc: "Enterprise-grade security" },
            ].map((item) => (
              <div
                key={item.label}
                className="group rounded-xl border border-border bg-card/40 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/60"
              >
                <item.icon className="mx-auto mb-3 text-primary transition-transform group-hover:scale-110" size={28} />
                <h3 className="font-display text-sm font-semibold text-foreground">{item.label}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section id="what" className="relative z-10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center font-display text-3xl font-bold text-foreground md:text-4xl">
            What We Do
          </h2>
          <p className="mb-16 text-center text-muted-foreground">
            End-to-end digital services that move at the speed of your ambition.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { icon: Cloud, title: "Cloud Architecture", desc: "Design and deploy resilient cloud infrastructure that scales effortlessly with your growth." },
              { icon: Cpu, title: "AI & Automation", desc: "Harness machine learning and intelligent automation to unlock efficiency and insight." },
              { icon: Zap, title: "Product Engineering", desc: "Full-stack development from concept to launch — performant, tested, and beautiful." },
              { icon: Shield, title: "Cybersecurity", desc: "Protect your digital assets with modern security practices and continuous monitoring." },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-xl border border-border bg-card/40 p-8 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/60"
              >
                <item.icon className="mb-4 text-primary transition-transform group-hover:scale-110" size={32} />
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why" className="relative z-10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-display text-3xl font-bold text-foreground md:text-4xl">
            Why Us
          </h2>
          <p className="mb-16 text-muted-foreground">
            Because the right technology partner changes everything.
          </p>
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              { num: "01", title: "Precision Engineering", desc: "We don't ship half-baked. Every line of code is deliberate and tested." },
              { num: "02", title: "Future-Ready", desc: "Our architectures are built to evolve, not to be replaced." },
              { num: "03", title: "Transparent Process", desc: "Real-time progress, open communication, no surprises." },
              { num: "04", title: "End-to-End Ownership", desc: "From ideation to post-launch support — we're with you all the way." },
            ].map((item) => (
              <div
                key={item.num}
                className="group rounded-xl border border-border bg-card/40 p-8 text-left backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/60"
              >
                <span className="font-mono text-xs font-bold text-primary">{item.num}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-background/50 px-6 py-8 backdrop-blur-sm">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Regorum Technologies. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
