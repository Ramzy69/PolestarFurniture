import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";

type ThemeToggleProps = {
  variant?: "icon" | "text";
  className?: string;
};

export function ThemeToggle({ variant = "icon", className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={className}
      aria-label="Toggle theme"
    >
      {variant === "icon" ? (
        theme === "light" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )
      ) : (
        <div className="flex items-center gap-2">
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">Theme</span>
        </div>
      )}
    </Button>
  );
}
