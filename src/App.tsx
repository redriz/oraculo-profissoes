import { Button } from "./components/ui/button";
import { HeaderNoTitle } from "./components/HeaderNoTitle";

function App() {
  return (
    <>
      <HeaderNoTitle />
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Oráculo das Profissões
        </h1>
        <p className="text-sm text-muted-foreground">
          Descubra qual curso é o ideal para você
        </p>
        <Button size="sm" variant="github">
          INICIAR
        </Button>
      </div>
    </>
  );
}

export default App;
