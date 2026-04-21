import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function About() {
  useEffect(() => {
    document.title = "Sobre - Oráculo das Profissões";
  }, []);
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Sobre o Oráculo das Profissões
            </h1>
            <p className="text-lg text-muted-foreground">
              Uma ferramenta desenvolvida para explorar caminhos profissionais
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-card rounded-lg shadow-md border border-border p-8 space-y-8">
            {/* O Projeto */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                O Projeto
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                O Oráculo das Profissões é uma aplicação web interativa
                desenvolvida como parte do curso de Técnico Especialista em
                Aplicações Informáticas de Gestão promovido pelo IEFP. A plataforma auxilia usuários
                a descobrirem carreiras alinhadas com seus interesses e
                habilidades através de um processo intuitivo.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                O objetivo principal é democratizar o acesso à informação sobre
                oportunidades profissionais, permitindo que estudantes e
                profissionais em transição de carreira explorem possibilidades
                de forma prática e eficaz.
              </p>
            </section>

            {/* Sobre o Curso */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Técnico Especialista em Aplicações Informáticas de Gestão
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Este projeto foi desenvolvido como um projeto para apresentação
                em um evento do IEFP - Instituto do Emprego e Formação
                Profissional. O curso capacita profissionais para o
                desenvolvimento e manutenção de soluções tecnológicas que
                otimizam processos administrativos e empresariais.
              </p>
            </section>

            {/* Equipa */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Equipa Responsável
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: "Adonai Rodriguez",
                    role: "Desenvolvimento e Programação",
                  },
                  { name: "Larissa Chaves", role: "Contribuidor" },
                  { name: "Alona Lysytsia", role: "Contribuidor" },
                  { name: "Juliana Silva", role: "Contribuidor" },
                  { name: "Matheus Deodato", role: "Contribuidor" },
                ].map((member) => (
                  <div
                    key={member.name}
                    className="p-4 bg-background rounded-lg border border-border"
                  >
                    <p className="font-medium text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Funcionalidades */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Funcionalidades Principais
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-3 text-accent font-bold">•</span>
                  <span>Recomendação personalizada do curso</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-accent font-bold">•</span>
                  <span>Questionário de descoberta de interesses</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-accent font-bold">•</span>
                  <span>Interface amigável e responsiva</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
