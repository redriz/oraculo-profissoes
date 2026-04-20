import type { ProfileType } from "@/types";

export const profileTypes: ProfileType[] = [
  {
    id: 1,
    name: "Perfil Analítico e Digital",
    relatedAnswersYes: [1, 2, 7, 10]
  },
  {
    id: 2,
    name: "Perfil Organizacional e de Negócios",
    relatedAnswersYes: [2, 4, 9, 11]
  },
  {
    id: 3,
    name: "Perfil Cuidado e Bem-Estar",
    relatedAnswersYes: [3, 5, 8, 12]
  },
  {
    id: 4,
    name: "Perfil Prático e Operacional",
    relatedAnswersYes: [5, 8, 12],
    relatedAnswersNo: [2]
  }
];