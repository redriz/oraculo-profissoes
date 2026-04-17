function About() {
    return (
        <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">
                        Sobre o Oráculo de Profissões
                    </h1>
                    <p className="text-lg text-slate-600">
                        Uma ferramenta desenvolvida para explorar caminhos profissionais
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
                    {/* O Projeto */}
                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                            O Projeto
                        </h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            O Oráculo de Profissões é uma aplicação web interativa desenvolvida como parte do curso de Técnico Especialista em Aplicações Informáticas de Gestão. A plataforma auxilia usuários a descobrirem carreiras alinhadas com seus interesses e habilidades através de um processo intuitivo e envolvente.
                        </p>
                        <p className="text-slate-700 leading-relaxed">
                            O objetivo principal é democratizar o acesso à informação sobre oportunidades profissionais, permitindo que estudantes e profissionais em transição de carreira explorem possibilidades de forma prática e eficaz.
                        </p>
                    </section>

                    {/* Sobre o Curso */}
                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                            Técnico Especialista em Aplicações Informáticas de Gestão
                        </h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Este projeto foi desenvolvido como atividade avaliativa do curso de formação profissional em Aplicações Informáticas de Gestão. O curso capacita profissionais para o desenvolvimento e manutenção de soluções tecnológicas que otimizam processos administrativos e empresariais.
                        </p>
                        <p className="text-slate-700 leading-relaxed">
                            O desenvolvimento do Oráculo de Profissões permitiu aplicar conhecimentos practicamente em uma aplicação real, integrando conceitos de design, funcionalidade e experiência do usuário.
                        </p>
                    </section>

                    {/* Equipa */}
                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                            Equipa Responsável
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { name: 'Adonai Rodriguez', role: 'Desenvolvimento e Programação' },
                                { name: 'Larissa Chaves', role: 'Contribuidor' },
                                { name: 'Alhóna Lytsia', role: 'Contribuidor' },
                                { name: 'Juliana Silva', role: 'Contribuidor' },
                                { name: 'Matheus Deodato', role: 'Contribuidor' },
                            ].map((member) => (
                                <div key={member.name} className="p-4 bg-slate-50 rounded-lg">
                                    <p className="font-medium text-slate-900">{member.name}</p>
                                    <p className="text-sm text-slate-600">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Funcionalidades */}
                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                            Funcionalidades Principais
                        </h2>
                        <ul className="space-y-2 text-slate-700">
                            <li className="flex items-start">
                                <span className="mr-3 text-blue-600 font-bold">•</span>
                                <span>Exploração interativa de profissões e suas características</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 text-blue-600 font-bold">•</span>
                                <span>Recomendações personalizadas baseadas em preferências</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 text-blue-600 font-bold">•</span>
                                <span>Informações detalhadas sobre diferentes áreas profissionais</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 text-blue-600 font-bold">•</span>
                                <span>Interface amigável e responsiva</span>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default About;