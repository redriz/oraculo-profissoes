import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import { HeaderNoTitle } from "./components/HeaderNoTitle";
import { ArrowRight } from "lucide-react";
import About from "./pages/About";
import Questions from "./pages/Questions";

function Home() {
  return (
    <>
      <HeaderNoTitle />
      <div className="flex flex-col items-start justify-start gap-2 mt-20 max-w-6xl mx-auto px-6 h-full">
        <h1 className="text-4xl font-semibold tracking-tight">
          🔮 Oráculo das Profissões
        </h1>
        <p className="text-sm text-muted-foreground">
          Descubra qual curso é o ideal para você
        </p>
        <Button asChild size="lg" variant="github" className="mt-4">
          <Link to="/questions">
            INICIAR <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
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
