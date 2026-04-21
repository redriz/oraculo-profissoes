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
    relatedAnswersYes: [2, 4, 6, 9, 11]
  },
  {
    id: 3,
    name: "Perfil Cuidado e Bem-Estar",
    relatedAnswersYes: [3, 5, 9, 12],
    relatedAnswersNo: [1, 4, 11]
  },
  {
    id: 4,
    name: "Perfil Prático e Operacional",
    relatedAnswersYes: [5, 8, 12],
    relatedAnswersNo: [2]
  },
  {
    id: 5,
    name: "Tens um perfil extremamente versátil e adaptável.",
    relatedAnswersYes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    id: 6,
    name: "Não foi possível identificar o seu perfil, talvez uma oferta de formação abaixo possa te interessar.",
    relatedAnswersNo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }
];