import type { ProfileType } from "@/types";

export const profileTypes: ProfileType[] = [
  {
    id: 1,
    name: "Perfil analítico e digital.",
    relatedAnswersYes: [1, 2, 7, 10]
  },
  {
    id: 2,
    name: "Perfil organizacional e de negócios.",
    relatedAnswersYes: [2, 4, 6, 9, 11]
  },
  {
    id: 3,
    name: "Perfil cuidado e bem-estar.",
    relatedAnswersYes: [3, 5, 9, 12],
    relatedAnswersNo: [1, 4, 11]
  },
  {
    id: 4,
    name: "Perfil prático e operacional.",
    relatedAnswersYes: [5, 8, 12],
    relatedAnswersNo: [2]
  },
  {
    id: 5,
    name: "Perfil extremamente versátil e adaptável.",
    relatedAnswersYes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    id: 6,
    name: "Não foi possível identificar o seu perfil, talvez uma oferta de formação abaixo possa te interessar.",
    relatedAnswersNo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }
];