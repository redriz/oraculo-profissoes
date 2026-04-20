import type { Course } from "@/types";

export const courses: Course[] = [
  {
    id: 1,
    name: "Engenharia Informática",
    description: "Formação em desenvolvimento de software e sistemas computacionais.",
    url: "/courses/engenharia-informatica",
    image: "/images/engenharia-informatica.jpg",
    relatedQuestions: [1, 7, 9],
  },
];
