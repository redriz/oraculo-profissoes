import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";

function Questions() {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Perguntas</h1>
        <p className="text-muted-foreground">
          Responda às perguntas abaixo para descobrir qual profissão é a mais
          adequada para você.
        </p>
      </div>
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Pergunta 1</CardTitle>
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
    </>
  );
}

export default Questions;
