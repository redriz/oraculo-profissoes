import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div id="oraculo-app">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Oráculo das Profissões</CardTitle>
            <CardDescription>
              Descubra qual curso é o ideal para você
            </CardDescription>
            <CardAction>...</CardAction>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex gap-2">
              <Button className="flex-1">Sim</Button>
              <Button variant="destructive" className="flex-1">
                Não
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default App;
