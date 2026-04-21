import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useQuizState } from "@/hooks/useQuizState";
import { questions } from "@/data/questions";
import { profileTypes } from "@/data/profileTypes";
import { courses } from "@/data/courses";
import { Footer } from "@/components/Footer";
import type { ProfileType, Course } from "@/types";
import { ExternalLink } from "lucide-react";

const STORAGE_KEY = "quiz_state";

function Results() {
  const navigate = useNavigate();
  const { lastResult, finishQuizAndSaveResult, resetQuiz, loading } =
    useQuizState();
  const [resultState, setResultState] = useState<typeof lastResult | null>(
    null,
  );
  const [resultCached, setResultCached] = useState(lastResult);
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    document.title = "Resultados - Oráculo das Profissões";
  }, []);

  // Guardar resultados quando questionário é concluído ou restaurar último resultado
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
    console.log(
      "Results.tsx - parsed state completed:",
      isCompleted,
      "full state:",
      parsedState,
    );

    if (isCompleted) {
      setResultState(parsedState);
      hasFinishedRef.current = true;
      console.log(
        "Results.tsx - quiz completed, calling finishQuizAndSaveResult",
      );
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
  console.log(
    "Results.tsx rendering - activeResult.answers:",
    activeResult.answers,
  );

  // Normalizar respostas: JSON converte chaves numéricas para texto, converter de volta
  const normalizedAnswers = Object.keys(activeResult.answers || {}).reduce(
    (acc, key) => {
      acc[parseInt(key)] = (activeResult.answers as Record<string, boolean>)[
        key
      ];
      return acc;
    },
    {} as Record<number, boolean>,
  );
  console.log("Results.tsx rendering - normalizedAnswers:", normalizedAnswers);

  const handleRestart = () => {
    // Pequeno atraso para garantir que os dados foram gravados no localStorage
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
      (answer) => answer === true,
    ).length;
  };

  const getNoCount = () => {
    return Object.values(normalizedAnswers || {}).filter(
      (answer) => answer === false,
    ).length;
  };

  const getMatchingProfile = (): ProfileType => {
    const yesAnswers = Object.entries(normalizedAnswers || {})
      .filter(([_, value]) => value === true)
      .map(([key]) => parseInt(key));

    const noAnswers = Object.entries(normalizedAnswers || {})
      .filter(([_, value]) => value === false)
      .map(([key]) => parseInt(key));

    // Caso especial: todas as respostas SIM = perfil 5
    if (yesAnswers.length === 12) {
      return profileTypes[4];
    }

    // Caso especial: todas as respostas NÃO = perfil 6
    if (noAnswers.length === 12) {
      return profileTypes[5];
    }

    // Primeiro procurar correspondência EXATA
    for (const profile of profileTypes) {
      let allYesMatch = true;
      let allNoMatch = true;

      // Verificar todas as respostas SIM obrigatórias estão presentes
      if (profile.relatedAnswersYes && profile.relatedAnswersYes.length > 0) {
        allYesMatch = profile.relatedAnswersYes.every((id) =>
          yesAnswers.includes(id),
        );
      }

      // Verificar todas as respostas NÃO obrigatórias estão presentes
      if (profile.relatedAnswersNo && profile.relatedAnswersNo.length > 0) {
        allNoMatch = profile.relatedAnswersNo.every((id) =>
          noAnswers.includes(id),
        );
      }

      if (allYesMatch && allNoMatch) {
        return profile;
      }
    }

    // Se nenhuma correspondência exata, usar melhor taxa de correspondência
    let bestMatch = profileTypes[5];
    let bestMatchRate = -1;

    for (const profile of profileTypes) {
      const totalRequired =
        (profile.relatedAnswersYes?.length || 0) +
        (profile.relatedAnswersNo?.length || 0);

      if (totalRequired === 0) continue;

      let matchCount = 0;

      if (profile.relatedAnswersYes) {
        for (const answerId of profile.relatedAnswersYes) {
          if (yesAnswers.includes(answerId)) {
            matchCount++;
          }
        }
      }

      if (profile.relatedAnswersNo) {
        for (const answerId of profile.relatedAnswersNo) {
          if (noAnswers.includes(answerId)) {
            matchCount++;
          }
        }
      }

      const matchRate = matchCount / totalRequired;

      if (matchRate > bestMatchRate) {
        bestMatchRate = matchRate;
        bestMatch = profile;
      }
    }

    return bestMatch;
  };

  const getCoursesForProfile = (profileId: number): Course[] => {
    return courses.filter((course) => course.profileType.includes(profileId));
  };

  const matchingProfile = getMatchingProfile();

  return (
    <>
      <Header />

      <main className="relative min-h-screen bg-background text-foreground">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-8 sm:py-10">
          <div className="mb-8 w-full">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Resultados
            </h2>

            <div className={`mt-6 p-6 bg-linear-to-r rounded-xl border border-border ${
              matchingProfile.id === 6 
                ? 'from-yellow-500/10 to-secondary/10' 
                : 'from-primary/15 to-secondary/10'
            }`}>
              <p className="text-lg text-foreground font-medium">
                {matchingProfile.name}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">
                Ofertas de formações recomendadas para o seu perfil
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {getCoursesForProfile(getMatchingProfile().id).map((course) => (
                  <Card
                    key={course.id}
                    className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow animate-in fade-in slide-in-from-bottom-2 duration-200"
                  >
                    <div className="aspect-video relative overflow-hidden bg-muted -mt-6 -mx-6 mb-4 rounded-t-lg">
                       <img 
                         src={course.image} 
                         alt={course.name}
                         className="object-cover w-full h-full rounded-t-lg"
                       />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base leading-tight min-h-12">
                        {course.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grow pt-0">
                      {course.habilitation === 2 && (
                        <Badge
                          variant="outline"
                          className="w-fit text-foreground/80"
                        >
                          Habilitação 12º Ano
                        </Badge>
                      )}
                      {course.habilitation === 1 && (
                        <Badge
                          variant="outline"
                          className="w-fit text-foreground/80"
                        >
                          Habilitação 9º Ano
                        </Badge>
                      )}
                      {course.habilitation === 0 && (
                        <Badge
                          variant="outline"
                          className="w-fit text-foreground/80"
                        >
                          Ler/Escrever
                        </Badge>
                      )}
                    </CardContent>
                    <CardFooter className="mt-auto pt-0">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="w-full" variant="outline">
                            Ver detalhes
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-xl text-balance">
                              {course.name}
                            </AlertDialogTitle>
                            <AlertDialogDescription asChild className="text-left">
                              <div className="space-y-4 mt-4">
                                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                                   <img 
                                     src={course.image} 
                                     alt={course.name}
                                     className="object-cover w-full h-full"
                                   />
                                </div>
                                {course.habilitation === 2 && (
                                  <Badge
                                    variant="outline"
                                    className="mb-4 text-foreground/80"
                                  >
                                    Habilitação 12º Ano
                                  </Badge>
                                )}
                                {course.habilitation === 1 && (
                                  <Badge
                                    variant="outline"
                                    className="mb-4 text-foreground/80"
                                  >
                                    Habilitação 9º Ano
                                  </Badge>
                                )}
                                {course.habilitation === 0 && (
                                  <Badge
                                    variant="outline"
                                    className="mb-4 text-foreground/80"
                                  >
                                    Ler/Escrever
                                  </Badge>
                                )}
                                <p className="text-foreground leading-relaxed">
                                  {course.description}
                                </p>
                              </div>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
                            <AlertDialogCancel asChild>
                              <Button variant="outline">Fechar</Button>
                            </AlertDialogCancel>
                            <Button
                              onClick={() => window.open(course.url, "_blank")}
                              className="w-full sm:w-auto"
                            >
                              Ver no IEFP <ExternalLink />
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <p className="mt-8 text-base leading-7 text-muted-foreground sm:text-lg">
              Aqui estão todas as suas respostas. Você respondeu{" "}
              <strong>SIM</strong> a {getYesCount()} perguntas e{" "}
              <strong>NÃO</strong> a {getNoCount()} perguntas.
            </p>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {questions.map((question) => {
              const answer = normalizedAnswers[question.id];
              console.log(
                `Question ${question.id}: answer =`,
                answer,
                "type:",
                typeof answer,
              );
              return (
                <Alert
                  key={question.id}
                  className="border-l-4 border-l-secondary-foreground/70 flex flex-col items-left justify-between gap-4"
                >
                  <div>
                    <AlertTitle className="text-lg font-semibold">
                      <div className="flex items-center justify-between">
                        <span>Pergunta {question.id}</span>
                      </div>
                    </AlertTitle>
                    <AlertDescription className="space-y-3 mt-2">
                      <p className="text-base text-foreground">
                        {question.text}
                      </p>
                    </AlertDescription>
                  </div>
                  <AlertDescription>
                    <div>
                      <Badge
                        variant={
                          answer === true ? "constructive" : "destructive"
                        }
                        className="px-3 py-1 text-1xl"
                      >
                        {answer === true ? "Sim" : "Não"}
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
            <Button onClick={handleDoAgain} className="flex-1 sm:flex-none">
              Reiniciar
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default Results;
