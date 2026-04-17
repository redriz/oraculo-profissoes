import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { useQuizState } from "@/hooks/useQuizState";
import { questions } from "@/data/questions";

const STORAGE_KEY = "quiz_state";

function Results() {
  const navigate = useNavigate();
  const { lastResult, finishQuizAndSaveResult, resetQuiz, loading } = useQuizState();
  const [resultState, setResultState] = useState<typeof lastResult | null>(null);
  const [resultCached, setResultCached] = useState(lastResult);
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    document.title = "Resultados - Oráculo das Profissões";
  }, []);

  // Save results when quiz is completed or restore last result
  useEffect(() => {
    console.log("Results.tsx useEffect triggered - loading:", loading);
    if (loading || hasFinishedRef.current) return;

    const savedState = localStorage.getItem(STORAGE_KEY);
    console.log("Results.tsx - localStorage quiz_state:", savedState);

    let parsedState = null;
    if (savedState) {
      try {
        parsedState = JSON.parse(savedState);
      } catch (error) {
        console.error("Error parsing localStorage:", error);
      }
    }

    const isCompleted = parsedState?.completed === true;
    console.log("Results.tsx - parsed state completed:", isCompleted, "full state:", parsedState);

    if (isCompleted) {
      setResultState(parsedState);
      hasFinishedRef.current = true;
      console.log("Results.tsx - quiz completed, calling finishQuizAndSaveResult");
      finishQuizAndSaveResult();
      return;
    }

    if (lastResult) {
      setResultCached(lastResult);
      return;
    }

    console.log("Results.tsx - quiz not completed, redirecting to /questions");
    navigate("/questions");
  }, [loading, lastResult, finishQuizAndSaveResult, navigate]);

  const activeResult = resultState || resultCached;

  if (loading || !activeResult) {
    return null;
  }

  console.log("Results.tsx rendering - activeResult:", activeResult);
  console.log("Results.tsx rendering - activeResult.answers:", activeResult.answers);

  // Normalize answers: JSON converts numeric keys to strings, so convert back
  const normalizedAnswers = Object.keys(activeResult.answers || {}).reduce(
    (acc, key) => {
      acc[parseInt(key)] = (activeResult.answers as Record<string, boolean>)[key];
      return acc;
    },
    {} as Record<number, boolean>
  );
  console.log("Results.tsx rendering - normalizedAnswers:", normalizedAnswers);

  const handleRestart = () => {
    // Longer delay to ensure finishQuizAndSaveResult has persisted to localStorage
    setTimeout(() => {
      navigate("/");
    }, 200);
  };

  const handleDoAgain = () => {
    resetQuiz();
    navigate("/questions");
  };

  const getYesCount = () => {
    return Object.values(normalizedAnswers || {}).filter(
      (answer) => answer === true
    ).length;
  };

  const getNoCount = () => {
    return Object.values(normalizedAnswers || {}).filter(
      (answer) => answer === false
    ).length;
  };

  return (
    <>
      <Header />

      <main className="relative min-h-screen bg-background text-foreground">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-8 sm:py-10">
          <div className="mb-8 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Resultados
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              Aqui estão todas as suas respostas. Você respondeu <strong>SIM</strong> a {getYesCount()} perguntas e <strong>NÃO</strong> a {getNoCount()} perguntas.
            </p>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {questions.map((question) => {
              const answer = normalizedAnswers[question.id];
              console.log(`Question ${question.id}: answer =`, answer, "type:", typeof answer);
              return (
              <Alert key={question.id} className="border-l-4 border-l-primary">
                <AlertTitle className="text-lg font-semibold">
                  <div className="flex items-center justify-between">
                    <span>Pergunta {question.id}</span>
                  </div>
                </AlertTitle>
                <AlertDescription className="space-y-3 mt-2">
                  <p className="text-base text-foreground">{question.text}</p>
                  <div>
                    <Badge
                      variant={
                        answer === true
                          ? "default"
                          : "destructive"
                      }
                    //   className={`px-3 py-1 text-sm font-semibold ${
                    //     answer === true
                    //       ? "bg-green-600 hover:bg-green-700"
                    //       : "bg-red-600 hover:bg-red-700"
                    //   }`}
                    >
                      {answer === true ? "SIM" : "NÃO"}
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>
              );
            })}
          </section>

          <div className="mt-12 flex gap-4">
            <Button
              onClick={handleRestart}
              variant="outline"
              className="flex-1 sm:flex-none"
            >
              Voltar ao Início
            </Button>
            <Button
              onClick={handleDoAgain}
              className="flex-1 sm:flex-none"
            >
              Fazer Novamente
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Results;
