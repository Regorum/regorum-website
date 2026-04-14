import { useState } from "react";
import { Phone, Mail, ExternalLink, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.phone) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center font-display text-3xl font-bold text-foreground md:text-4xl">
          Get in Touch
        </h2>
        <p className="mb-16 text-center text-muted-foreground">
          Ready to transform your digital future? Let's talk.
        </p>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-lg border border-border bg-surface/50 px-4 py-2.5 text-foreground backdrop-blur-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Your name (optional)"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Email <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-lg border border-border bg-surface/50 px-4 py-2.5 text-foreground backdrop-blur-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Phone <span className="text-destructive">*</span>
              </label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full rounded-lg border border-border bg-surface/50 px-4 py-2.5 text-foreground backdrop-blur-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="+91 XXXXXXXXXX"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                rows={4}
                className="w-full rounded-lg border border-border bg-surface/50 px-4 py-2.5 text-foreground backdrop-blur-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                placeholder="Tell us about your project (optional)"
              />
            </div>
            <Button type="submit" className="w-full gap-2" size="lg">
              <Send size={16} />
              {submitted ? "Sent!" : "Send Message"}
            </Button>
          </form>

          {/* Contact info */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
              <h3 className="mb-6 text-lg font-semibold text-foreground font-display">
                Reach Us Directly
              </h3>
              <div className="space-y-5">
                <a
                  href="tel:+917219510036"
                  className="flex items-center gap-4 text-muted-foreground transition-colors hover:text-primary group"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <Phone size={18} />
                  </span>
                  <span className="text-sm font-medium">+91 7219510036</span>
                </a>
                <a
                  href="mailto:sales@regorum.com"
                  className="flex items-center gap-4 text-muted-foreground transition-colors hover:text-primary group"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <Mail size={18} />
                  </span>
                  <span className="text-sm font-medium">sales@regorum.com</span>
                </a>
              </div>
            </div>

            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-6 py-4 text-primary transition-all hover:bg-primary/10 hover:border-primary/50"
            >
              <ExternalLink size={18} />
              <span className="text-sm font-semibold font-display">Book a Slot With Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
