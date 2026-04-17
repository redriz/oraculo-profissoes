import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

function Questions() {
  useEffect(() => {
    document.title = "Perguntas - Oráculo das Profissões";
  }, []);

  return (
    <>
      <Header />

      <main className="relative min-h-screen bg-background text-foreground">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-8 sm:py-10">
          <div className="mb-8 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Perguntas
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              Responda às perguntas abaixo para descobrir qual profissão é a mais adequada para você.
            </p>
          </div>

          <section className="rounded-[32px] border border-border bg-card/70 p-8 shadow-sm shadow-muted/10 backdrop-blur-xl">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">
                  Pergunta 1
                </h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground">
                  Escolha uma opção:
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A resposta vai ajudar a definir a melhor área profissional para o seu perfil.
                </p>
              </div>

              <div className="space-y-3 rounded-3xl border border-border bg-background/80 p-6 shadow-inner shadow-muted/5">
                <p className="text-sm text-muted-foreground">
                  Pontos importantes:
                </p>
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>Você pode voltar atrás e mudar a resposta a qualquer momento.</li>
                  <li>As respostas são salvas localmente no navegador.</li>
                  <li>O resultado final mostrará uma recomendação personalizada.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 z-20 border-t border-border bg-background/90 backdrop-blur-xl px-6 py-4 sm:px-8">
          <div className="mx-auto flex max-w-6xl gap-3">
            <Button className="flex-1">Sim</Button>
            <Button variant="destructive" className="flex-1">
              Não
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Questions;

