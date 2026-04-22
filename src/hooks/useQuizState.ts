import { useState, useEffect } from "react";
import type { QuizState, LastResult } from "@/types";

const STORAGE_KEY = "quiz_state";
const LAST_RESULT_KEY = "quiz_last_result";

export function useQuizState() {
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [lastResult, setLastResult] = useState<LastResult | null>(null);
  const [loading, setLoading] = useState(true);

  // Carregamento inicial do estado do quiz e do último resultado
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    const savedLastResult = localStorage.getItem(LAST_RESULT_KEY);
    
    if (savedState) {
      try {
        setQuizState(JSON.parse(savedState));
      } catch {
        setQuizState({ answers: {}, completed: false });
      }
    } else {
      setQuizState({ answers: {}, completed: false });
    }

    if (savedLastResult) {
      try {
        setLastResult(JSON.parse(savedLastResult));
      } catch {
        setLastResult(null);
      }
    }

    setLoading(false);
  }, []);

  const saveAnswer = (questionId: number, answer: boolean) => {
    const newState: QuizState = {
      answers: {
        ...quizState?.answers,
        [questionId]: answer,
      },
      completed: quizState?.completed ?? false,
    };
    setQuizState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  };

  const completeQuiz = () => {
    // Ler o estado mais recente do localStorage para garantir que temos todas as respostas atualizadas
    const savedState = localStorage.getItem(STORAGE_KEY);
    console.log("completeQuiz called - STORAGE_KEY found:", !!savedState, "content:", savedState);
    if (!savedState) return;

    try {
      const latestState = JSON.parse(savedState) as QuizState;
      console.log("completeQuiz - latestState before:", latestState);
      const newState: QuizState = {
        ...latestState,
        completed: true,
      };
      console.log("completeQuiz - newState after:", newState);
      setQuizState(newState);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      console.log("completeQuiz - state saved to localStorage");
    } catch (error) {
      console.error("Error in completeQuiz:", error);
    }
  };

  const finishQuizAndSaveResult = () => {
    console.log("finishQuizAndSaveResult called");
    // Read the latest state from localStorage to ensure we have all answers
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (!savedState) {
      console.error("Cannot finishQuizAndSaveResult: STORAGE_KEY not found");
      return;
    }

    try {
      const latestState = JSON.parse(savedState) as QuizState;

      // Criar o resultado final a ser salvo, incluindo as respostas e a data de conclusão
      const result: LastResult = {
        answers: latestState.answers,
        completedAt: Date.now(),
      };
      
      // Salva no localStorage primeiro (sinconizado, garante sucesso antes de atualizar estado)
      localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(result));
      
      // Atualiza o estado local
      setLastResult(result);

      // Dispara evento personalizado para componentes na mesma aba que estão ouvindo
      window.dispatchEvent(new CustomEvent('lastResultUpdated', { detail: result }));

      // Finalmente, limpar o estado ativo do quiz
      localStorage.removeItem(STORAGE_KEY);
      setQuizState({ answers: {}, completed: false });
    } catch (error) {
      console.error("Error in finishQuizAndSaveResult:", error);
    }
  };

  const resetQuiz = () => {
    const newState: QuizState = {
      answers: {},
      completed: false,
    };
    setQuizState(newState);
    localStorage.removeItem(STORAGE_KEY);
  };

  const hasAnsweredQuestion = (questionId: number): boolean => {
    return quizState?.answers[questionId] !== undefined && quizState?.answers[questionId] !== null;
  };

  const getAnswerForQuestion = (questionId: number): boolean | null => {
    return quizState?.answers[questionId] ?? null;
  };

  const hasStartedQuiz = (): boolean => {
    return Object.keys(quizState?.answers ?? {}).length > 0;
  };

  const getFirstUnansweredQuestionId = (): number => {
    // Encontrar a primeira questão que não foi respondida
    for (let i = 1; i <= 12; i++) {
      if (!hasAnsweredQuestion(i)) {
        return i;
      }
    }
    // Se todas as questões foram respondidas, retornar 1 (ou a última)
    return 1;
  };

  const isQuizCompleted = (): boolean => {
    return quizState?.completed ?? false;
  };

  const getLastResult = (): LastResult | null => {
    return lastResult;
  };

  return {
    quizState,
    lastResult,
    loading,
    saveAnswer,
    completeQuiz,
    finishQuizAndSaveResult,
    resetQuiz,
    hasAnsweredQuestion,
    getAnswerForQuestion,
    hasStartedQuiz,
    getFirstUnansweredQuestionId,
    isQuizCompleted,
    getLastResult,
  };
}
