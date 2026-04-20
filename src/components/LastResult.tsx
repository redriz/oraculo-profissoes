import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import type { LastResult as LastResultType } from "@/types";

const LAST_RESULT_KEY = "quiz_last_result";

export function LastResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const [lastResult, setLastResult] = useState<LastResultType | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const loadLastResult = () => {
    const savedLastResult = localStorage.getItem(LAST_RESULT_KEY);
    if (savedLastResult) {
      try {
        setLastResult(JSON.parse(savedLastResult));
      } catch {
        setLastResult(null);
      }
    } else {
      setLastResult(null);
    }
  };

  // Carregar ao montar componente e quando rota mudar
  useEffect(() => {
    loadLastResult();
  }, [location.pathname]);

  // Ouvir atualizações tanto na mesma aba como em outras abas
  useEffect(() => {
    // Ouvir alterações no localStorage (para sincronizar múltiplas abas)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LAST_RESULT_KEY) {
        loadLastResult();
      }
    };

    // Ouvir evento personalizado para atualizações na mesma aba
    const handleLastResultUpdated = (event: Event) => {
      if (event instanceof CustomEvent) {
        setLastResult(event.detail);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("lastResultUpdated", handleLastResultUpdated);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("lastResultUpdated", handleLastResultUpdated);
    };
  }, []);

  if (!lastResult) {
    return null;
  }

  const getYesCount = () => {
    return Object.values(lastResult.answers || {}).filter(
      (answer) => answer === true
    ).length;
  };

  const getNoCount = () => {
    return Object.values(lastResult.answers || {}).filter(
      (answer) => answer === false
    ).length;
  };

  const handleDeleteResult = () => {
    localStorage.removeItem(LAST_RESULT_KEY);
    setLastResult(null);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apagar Resultados?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja apagar os últimos resultados? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteResult}
              variant="destructive"
            >
              Apagar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="w-full sm:w-80">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Último Resultado</CardTitle>
              <CardDescription>Seu questionário anterior</CardDescription>
            </div>
            <Button
              onClick={() => setShowDeleteDialog(true)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Respostas - <Badge variant="outline">Sim</Badge></span>
              <Badge variant="constructive">{getYesCount()}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Respostas - <Badge variant="outline">Não</Badge></span>
              <Badge variant="destructive">{getNoCount()}</Badge>
            </div>
          </div>
          <Button
            onClick={() => navigate("/results")}
            className="w-full"
            size="sm"
            variant="outline"
          >
            Ver detalhes
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

export default LastResult;
