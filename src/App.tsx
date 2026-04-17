import { Button } from "./components/ui/button";
import { HeaderNoTitle } from "./components/HeaderNoTitle";
import { ArrowRight } from "lucide-react";

function App() {
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
        <Button size="lg" variant="github" className="mt-4">
          INICIAR <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );
}

export default App;
