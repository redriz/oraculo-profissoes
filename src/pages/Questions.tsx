import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, RotateCcw, CircleCheck, X } from "lucide-react";
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
  const [lastQuestionAnswered, setLastQuestionAnswered] = useState(false);

  useEffect(() => {
    document.title = "Perguntas - Oráculo das Profissões";
  }, []);

  // Inicializa na primeira pergunta não respondida (índice 0)
  useEffect(() => {
    if (!loading) {
      const firstUnanswered = getFirstUnansweredQuestionId();
      setCurrentQuestion(firstUnanswered - 1);
      // Verifica se a última pergunta (12) já foi respondida anteriormente
      setLastQuestionAnswered(hasAnsweredQuestion(12));
    }
  }, [loading]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Verifica se todas as 12 perguntas foram respondidas
  const allQuestionsAnswered = questions.every((q) =>
    hasAnsweredQuestion(q.id),
  );

  // Verifica se a pergunta atual é a última (pergunta 12)
  const isLastQuestion = currentQuestion === questions.length - 1;

  // Avanço automático é desativado se o usuário já respondeu a pergunta 12
  const autoAdvance = !lastQuestionAnswered;

  const handleConfirmReset = () => {
    resetQuiz();
    setCurrentQuestion(0);
    setShowResetDialog(false);
    setLastQuestionAnswered(false);
  };

  const handleAnswer = (answer: boolean) => {
    console.log(
      "handleAnswer called - currentQuestion:",
      currentQuestion,
      "questions.length:",
      questions.length,
    );

    // Guardar resposta
    saveAnswer(questions[currentQuestion].id, answer);

    // Verifica se esta foi a pergunta 12 (última pergunta)
    if (isLastQuestion) {
      setLastQuestionAnswered(true);
      return; // Não avançar
    }

    // Se avanço automático estiver desativado, permanece na pergunta atual
    if (!autoAdvance) {
      return;
    }

    // Delay de 1.5s APENAS para avanço AUTOMÁTICO depois da resposta
    setTimeout(() => {
      // Procura próxima pergunta não respondida e salta para ela
      for (let i = currentQuestion + 1; i < questions.length; i++) {
        if (!hasAnsweredQuestion(questions[i].id)) {
          setCurrentQuestion(i);
          return;
        }
      }

      // Todas as perguntas restantes respondidas, mas ainda não a 12
      // Permanecer na atual ou avançar normalmente
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 400);
  };

  const handleFinalize = () => {
    console.log("handleFinalize called");

    // Usar setTimeout para garantir que o localStorage seja atualizado
    setTimeout(() => {
      console.log("Calling completeQuiz()");
      completeQuiz();
      // Navegar após um pequeno atraso para garantir que o estado seja atualizado
      setTimeout(() => {
        console.log("Navigating to /results");
        navigate("/results");
      }, 50);
    }, 100);
  };

  // Barra de progresso real baseada em quantidade de perguntas RESPONDIDAS, não navegação atual
  const answeredCount = questions.filter(q => hasAnsweredQuestion(q.id)).length;
  const progress = (answeredCount / questions.length) * 100;

  const question = questions[currentQuestion];

  const currentAnswer = getAnswerForQuestion(question.id);

  const handleRestart = () => {
    // Pequeno atraso para garantir que os dados foram gravados no localStorage
    setTimeout(() => {
      navigate("/");
    }, 200);
  };

  return (
    <>
      <Header />

      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reiniciar Sessão?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja reiniciar? Todas as suas respostas serão
              perdidas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmReset}
              variant="destructive"
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
                  Questionário
                </h1>
                <span className="text-sm text-muted-foreground">
                  {answeredCount}/{questions.length} respondidas
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-lg">
              Responda às perguntas abaixo para descobrir qual formação do IEFP é a
              mais adequada para você.
            </p>
          </div>

          <section 
            key={currentQuestion}
            className={"rounded-[16px] border border-border bg-card/70 p-6 shadow-sm shadow-muted/10 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200 " + (currentAnswer === false ? "border-destructive/80" : currentAnswer === true ? "border-chart-3/80" : "")}
          >
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="text-1xl text-muted-foreground font-medium mr-2">
                  Pergunta #{currentQuestion + 1}
                </span>
                <Button variant="outline" size="icon" onClick={handleRestart}>
                  <X />
                </Button>
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
      <div className="sticky bottom-18 z-20 border-t border-border bg-background/90 backdrop-blur-xl px-6 py-4 sm:px-8">
        <div className="mx-auto flex max-w-6xl">
          <div className="flex gap-1 mr-auto">
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
          </div>
          <div className="flex gap-1">
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
      </div>
      <div className="sticky bottom-0 z-20 border-t border-border bg-background/90 backdrop-blur-xl px-6 py-4 sm:px-8">
        <div className="mx-auto flex max-w-6xl gap-3">
          <Button
            size="lg"
            onClick={() => handleAnswer(true)}
            variant={currentAnswer === false ? "sim" : "constructive"}
            className="flex-1"
          >
            SIM
          </Button>
          <Button
            size="lg"
            onClick={() => handleAnswer(false)}
            variant={currentAnswer === true ? "nao" : "destructive"}
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
