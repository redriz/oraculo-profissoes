import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, RotateCcw, CircleCheck } from "lucide-react";
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
    hasAnsweredQuestion,
    getFirstUnansweredQuestionId,
  } = useQuizState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResetDialog, setShowResetDialog] = useState(false);

  useEffect(() => {
    document.title = "Perguntas - Oráculo das Profissões";
  }, []);

  // Initialize to first unanswered question (0-indexed)
  useEffect(() => {
    if (!loading) {
      const firstUnanswered = getFirstUnansweredQuestionId();
      setCurrentQuestion(firstUnanswered - 1);
    }
  }, [loading]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Check if all 12 questions have been answered
  const allQuestionsAnswered = questions.every((q) => hasAnsweredQuestion(q.id));

  // Check if current question is the last one (question 12)
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleConfirmReset = () => {
    resetQuiz();
    setCurrentQuestion(0);
    setShowResetDialog(false);
  };

  const handleAnswer = (answer: boolean) => {
    console.log("handleAnswer called - currentQuestion:", currentQuestion, "questions.length:", questions.length);
    
    if (isLastQuestion) {
      // Última pergunta - apenas salvar, não avançar
      saveAnswer(questions[currentQuestion].id, answer);
    } else {
      // Para outras perguntas, salvar e ir para próxima
      saveAnswer(questions[currentQuestion].id, answer);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleFinalize = () => {
    console.log("handleFinalize called");
    
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

          <section className="rounded-[16px] border border-border bg-card/70 p-6 shadow-sm shadow-muted/10 backdrop-blur-xl">
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground font-medium mr-2">
                  Pergunta #{currentQuestion + 1}
                </span>
                <div className="flex gap-1">
                  <Button
                    onClick={() => {
                      if (currentQuestion > 0) {
                        setCurrentQuestion(currentQuestion - 1);
                      }
                    }}
                    disabled={currentQuestion === 0}
                    variant="outline"
                    size="lg"
                    className="mr-0.5"
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
                    size="lg"
                    className="mr-1"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => setShowResetDialog(true)}
                    variant="destructive"
                    size="lg"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleFinalize()}
                    disabled={!allQuestionsAnswered}
                    variant={allQuestionsAnswered ? "default" : "secondary"}
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <CircleCheck />
                    Finalizar
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
            variant={currentAnswer === true ? "constructive" : "sim"}
            className="flex-1"
          >
            SIM
          </Button>
          <Button
            size="lg"
            onClick={() => handleAnswer(false)}
            variant={currentAnswer === false ? "destructive" : "nao"}
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
