import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import { HeaderNoTitle } from "./components/HeaderNoTitle";
import { LastResult } from "./components/LastResult";
import { ArrowRight } from "lucide-react";
import About from "./pages/About";
import Questions from "./pages/Questions";
import Results from "./pages/Results";

function Home() {
  useEffect(() => {
    document.title = "Oráculo das Profissões";
  }, []);

  return (
    <>
      <HeaderNoTitle />
      <div className="flex flex-col md:flex-row min-h-screen items-center justify-center gap-2 max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-6 md:gap-8">
          <div className="flex-1">
            <span className="text-6xl mb-2 block">🔮</span>
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
          <div className="shrink-0 lastresult-mobile lastresult-desktop">
            <LastResult />
          </div>
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
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
