import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./components/ui/button";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div
        id="oraculo-app"
        className="min-h-screen bg-background text-foreground flex items-center justify-center p-6"
      >
        <div className="w-full max-w-md">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Pergunta 1
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm leading-6 text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex gap-2 border-t border-border pt-4">
                <Button className="flex-1">Sim</Button>
                <Button variant="destructive" className="flex-1">
                  Não
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
