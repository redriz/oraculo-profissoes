export function Footer() {
  return (
    <footer className="bg-background text-muted-foreground py-4 my-4 mx-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">
           Desenvolvido com ❤️ pelos formandos do IEFP &copy; {new Date().getFullYear()} Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}