import { Button } from "@/components/ui/button";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Theme = "system" | "light" | "dark";

export function ToggleTheme() {
    const [theme, setTheme] = useState<Theme>("system");

    useEffect(() => {
        const saved = localStorage.getItem("theme") as Theme | null;
        const initialTheme = saved || "system";
        
        setTheme(initialTheme);
        applyTheme(initialTheme);
    }, []);

    useEffect(() => {
        // Listener para mudanças no sistema quando o tema é "system"
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        
        const handleSystemChange = () => {
            if (theme === "system") {
                applyTheme("system");
            }
        };

        mediaQuery.addEventListener("change", handleSystemChange);
        return () => mediaQuery.removeEventListener("change", handleSystemChange);
    }, [theme]);

    const applyTheme = (selectedTheme: Theme) => {
        let shouldBeDark: boolean;

        if (selectedTheme === "system") {
            shouldBeDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        } else {
            shouldBeDark = selectedTheme === "dark";
        }

        if (shouldBeDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    const selectTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Selecionar tema"
                >
                    {theme === "dark" ? (
                        <Moon className="h-4 w-4" />
                    ) : theme === "light" ? (
                        <Sun className="h-4 w-4" />
                    ) : (
                        <SunMoon className="h-4 w-4" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem 
                    onClick={() => selectTheme("system")}
                    className="gap-2 cursor-pointer"
                >
                    <SunMoon className="h-4 w-4" />
                    <span>Automático</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                    onClick={() => selectTheme("light")}
                    className="gap-2 cursor-pointer"
                >
                    <Sun className="h-4 w-4" />
                    <span>Claro</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                    onClick={() => selectTheme("dark")}
                    className="gap-2 cursor-pointer"
                >
                    <Moon className="h-4 w-4" />
                    <span>Escuro</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}