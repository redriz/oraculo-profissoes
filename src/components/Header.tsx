import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ToggleTheme } from "./ToggleTheme";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`w-full sticky top-0 z-10 transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-card/80 shadow-sm shadow-muted/10 backdrop-blur-sm"
            : "border-transparent bg-transparent shadow-none"
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-6 py-4 max-w-7xl mx-auto">
          <div>
            <Link to="/" className="text-2xl font-semibold tracking-tight inline-flex items-center">
              <span>🔮</span>
              <h1 className="hidden sm:inline ml-2">Oráculo das Profissões</h1>
            </Link>
          </div>
          <div className="flex gap-2">
            <a
              href="https://github.com/redriz/oraculo-profissoes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" variant="github">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1024"
                  height="1024"
                  viewBox="0 0 1024 1024"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                    transform="scale(64)"
                    fill="currentColor"
                  />
                </svg>
                Código Fonte
              </Button>
            </a>
            <Button asChild size="sm" variant="secondary">
              <Link to="/about">Sobre</Link>
            </Button>
            <ToggleTheme />
          </div>
        </div>
      </header>
    </>
  );
}
