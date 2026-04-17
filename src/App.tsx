import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import { HeaderNoTitle } from "./components/HeaderNoTitle";
import { ArrowRight } from "lucide-react";
import About from "./pages/About";
import Questions from "./pages/Questions";

function Home() {
  useEffect(() => {
    document.title = "Oráculo das Profissões";
  }, []);

  return (
    <>
      <HeaderNoTitle />
      <div className="flex min-h-screen flex-col items-start justify-center gap-2 max-w-6xl mx-auto px-6">
        <span className="text-6xl mb-2">🔮</span>
        <div className="pl-3">
          <h1 className="text-5xl font-semibold tracking-tight">
            Oráculo das Profissões
          </h1>
          <p className="text-1xl text-muted-foreground pl-1">
            Descubra qual curso é o ideal para você
          </p>
          <Button asChild size="lg" variant="start" className="mt-8">
            <Link to="/questions">
              INICIAR <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
