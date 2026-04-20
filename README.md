# 🔮 Oráculo das Profissões IEFP

Um webApp interativo que ajuda você a descobrir qual curso profissional do IEFP melhor se adequa ao seu perfil através de um sistema inteligente de perguntas e recomendações personalizadas.

**Desenvolvido por formandos do IEFP.**

---

## ✨ Características

- 🎮 **Interface Interativa**: Perguntas dinâmicas personalizadas
- 🧠 **Recomendações Inteligentes**: Análise das respostas para sugerir cursos adequados
- 💾 **Persistência Local**: Todos os dados são salvos no LocalStorage do navegador
- 🎨 **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🌓 **Tema Claro/Escuro ou Automático**: Alterne entre temas para sua comodidade
- 🔓 **Código Aberto**: Totalmente open-source

---

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://react.dev/)** - Biblioteca para construção de interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - TypeScript para segurança de tipos
- **[Vite](https://vitejs.dev/)** - Build tool moderno e rápido
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes React de alta qualidade
- **[Lucide React](https://lucide.dev/)** - Ícones vetoriais

---

## 📋 Pré-requisitos

Antes de começar, verifique se tem instalado:

- **Node.js** (versão 16 ou superior) - [Download aqui](https://nodejs.org/)
- **npm** (geralmente vem com Node.js) ou **yarn**
- **Git** (opcional, para clonar o repositório) - [Download aqui](https://git-scm.com/)

Para verificar se está tudo instalado, abra o terminal e execute:

```bash
node --version
npm --version
```

---

## 🚀 Como Instalar e Rodar

### 1️⃣ Clone ou baixe o código

**Se tem Git instalado:**
```bash
git clone https://github.com/redriz/oraculo-profissoes.git
cd oraculo-profissoes
```

**Se não tem Git, baixe como ZIP:**
- Clique em `Code` → `Download ZIP`
- Descompacte o arquivo
- Abra o terminal na pasta do projeto

### 2️⃣ Instale as dependências

```bash
npm install
```

Este comando irá ler o arquivo `package.json` e instalar todas as bibliotecas necessárias na pasta `node_modules`.

### 3️⃣ Execute o servidor de desenvolvimento

```bash
npm run dev
```

Você verá no terminal uma mensagem similar a:
```
VITE v8.0.0 ready in 1234 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

Abra o link no seu navegador (geralmente `http://localhost:5173/`) e a aplicação estará rodando!

---

## 📖 Como Usar

1. **Abra a aplicação** no seu navegador
2. **Responda as perguntas** sinceramente - cada resposta é importante
3. **Receberá uma recomendação personalizada** de cursos do IEFP
4. **Seus dados são salvos** automaticamente no navegador
5. **Pode recomeçar** a qualquer momento para explorar outras opções

---

## 📦 Compilar para Produção

Quando estiver pronto para publicar a aplicação:

```bash
npm run build
```

Isto irá gerar uma pasta `dist/` com os arquivos otimizados e prontos para serem enviados para um servidor web.

Para testar a build localmente:

```bash
npm run preview
```

---

## ✅ Verificar Qualidade do Código

Para executar o linter e verificar possíveis problemas:

```bash
npm run lint
```

---

## 📋 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento com hot reload |
| `npm run build` | Compila TypeScript e cria build otimizada para produção |
| `npm run preview` | Visualiza a build de produção localmente |
| `npm run lint` | Verifica qualidade do código com ESLint |

---

## 💾 Como Funciona o LocalStorage

A aplicação salva automaticamente:
- Respostas às perguntas
- Histórico de sessões
- Preferências de tema (claro/escuro)

Todos os dados ficarão no seu navegador. Para limpar os dados, abra o DevTools (F12 → Application → Local Storage) e limpe manualmente.

---

## 📄 Licença

Este projeto é fornecido sob licença aberta. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 👥 Sobre o IEFP

O **Instituto de Emprego e Formação Profissional** oferece programas de formação profissional de qualidade para desenvolver competências e facilitar a empregabilidade dos portugueses.

Este projeto foi desenvolvido como parte do evento do IEFP.

---

**Desenvolvido com ❤️ pelos formandos do IEFP**
