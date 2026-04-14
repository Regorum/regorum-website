import { Sun, Moon } from "lucide-react";

interface DarkModeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export function DarkModeToggle({ isDark, onToggle, className = "" }: DarkModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-sm text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:border-primary/30 ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
