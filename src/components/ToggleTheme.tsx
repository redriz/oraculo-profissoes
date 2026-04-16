import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ToggleTheme() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const shouldBeDark = saved ? saved === "dark" : prefersDark;
        
        setIsDark(shouldBeDark);
        applyTheme(shouldBeDark);
    }, []);

    const applyTheme = (dark: boolean) => {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    const toggleTheme = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        localStorage.setItem("theme", newDark ? "dark" : "light");
        applyTheme(newDark);
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            {isDark ? (
                <Sun className="h-4 w-4" />
            ) : (
                <Moon className="h-4 w-4" />
            )}
        </Button>
    );
}

export default ToggleTheme;