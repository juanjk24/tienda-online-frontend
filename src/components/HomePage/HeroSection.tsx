import { ArrowRight } from "lucide-react";
import Button from "../Button";

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance animate-fade-in-up">
          Descubre los mejores productos para tu estilo de vida
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance animate-fade-in-up animate-delay-400">
          Explora nuestra colección cuidadosamente seleccionada de productos
          premium con envío a toda Colombia
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in-up animate-delay-800">
          <Button to="/products">
            Ver todos los productos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button to="/categories" outline>
            Explorar categorías
          </Button>
        </div>
      </div>
    </section>
  );
}
