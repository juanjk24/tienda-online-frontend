import { Check, Clock, ShieldCheckIcon } from "lucide-react";

const featuresInfo = [
  {
    title: "Calidad garantizada",
    description:
      "Todos nuestros productos pasan rigurosos controles de calidad",
    icon: <Check />,
  },
  {
    title: "Envío rápido",
    description: "Entrega en 3-7 días hábiles a toda Colombia",
    icon: <Clock />,
  },
  {
    title: "Compra segura",
    description: "Protegemos tus datos con encriptación de última generación",
    icon: <ShieldCheckIcon />,
  },
];

export default function FeaturesSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuresInfo.map((feature, index) => (
          <div key={index} className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              {feature.icon}
            </div>

            <h3 className="font-semibold text-lg">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
