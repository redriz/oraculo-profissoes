import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQuizState } from "@/hooks/useQuizState";
import { questions } from "@/data/questions";

function Questions() {
  const navigate = useNavigate();
  const {
    loading,
    saveAnswer,
    completeQuiz,
    resetQuiz,
    getAnswerForQuestion,
  } = useQuizState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResetDialog, setShowResetDialog] = useState(false);

  useEffect(() => {
    document.title = "Perguntas - Oráculo das Profissões";
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const handleConfirmReset = () => {
    resetQuiz();
    setCurrentQuestion(0);
    setShowResetDialog(false);
  };

  const handleAnswer = (answer: boolean) => {
    console.log("handleAnswer called - currentQuestion:", currentQuestion, "questions.length:", questions.length);
    if (currentQuestion === questions.length - 1) {
      console.log("Last question! Saving answer and preparing to complete quiz");
      saveAnswer(questions[currentQuestion].id, answer);
      
      // Use setTimeout to ensure localStorage is updated
      setTimeout(() => {
        console.log("Calling completeQuiz()");
        completeQuiz();
        // Navigate after a longer delay to ensure state is updated
        setTimeout(() => {
          console.log("Navigating to /results");
          navigate("/results");
        }, 50);
      }, 100);
    } else {
      // For other questions, just save and move to next
      saveAnswer(questions[currentQuestion].id, answer);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const currentAnswer = getAnswerForQuestion(question.id);

  return (
    <>
      <Header />

      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reiniciar Sessão?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja reiniciar? Todas as suas respostas serão perdidas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmReset}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Reiniciar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <main className="relative min-h-screen bg-background text-foreground">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-8 sm:py-10">
          <div className="mb-8 max-w-3xl">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Perguntas
                </h1>
                <span className="text-sm text-muted-foreground">
                  {currentQuestion + 1}/{questions.length}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              Responda às perguntas abaixo para descobrir qual profissão é a mais adequada para você.
            </p>
          </div>

          <section className="rounded-[16px] border border-border bg-card/70 p-8 shadow-sm shadow-muted/10 backdrop-blur-xl">
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground font-medium">
                  Pergunta #{currentQuestion + 1}
                </span>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowResetDialog(true)}
                    variant="destructive"
                    size="icon"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => {
                      if (currentQuestion > 0) {
                        setCurrentQuestion(currentQuestion - 1);
                      }
                    }}
                    disabled={currentQuestion === 0}
                    variant="outline"
                    size="icon"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => {
                      if (currentQuestion < questions.length - 1) {
                        setCurrentQuestion(currentQuestion + 1);
                      }
                    }}
                    disabled={currentQuestion === questions.length - 1}
                    variant="outline"
                    size="icon"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground">
                  {question.text}
                </h2>
              </div>
            </div>
          </section>
        </div>
      </main>

      <div className="sticky bottom-0 z-20 border-t border-border bg-background/90 backdrop-blur-xl px-6 py-4 sm:px-8">
        <div className="mx-auto flex max-w-6xl gap-3">
          <Button
            size="lg"
            onClick={() => handleAnswer(true)}
            variant={currentAnswer === true ? "default" : "outline"}
            className="flex-1"
          >
            SIM
          </Button>
          <Button
            size="lg"
            onClick={() => handleAnswer(false)}
            variant={currentAnswer === false ? "default" : "outline"}
            className="flex-1"
          >
            NÃO
          </Button>
        </div>
      </div>
    </>
  );
}

export default Questions;