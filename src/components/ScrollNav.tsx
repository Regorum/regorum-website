import { cn } from "@/lib/utils";

interface ScrollNavProps {
  visible: boolean;
  isDark: boolean;
}

const navItems = [
  { label: "Who We Are", href: "#who" },
  { label: "What We Do", href: "#what" },
  { label: "Why Us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export function ScrollNav({ visible }: ScrollNavProps) {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500",
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="mt-4 flex gap-1 rounded-full border border-border bg-background/70 px-2 py-1.5 backdrop-blur-xl shadow-lg">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
