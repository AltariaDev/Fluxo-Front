import { Calendar, CheckCircle, Clock, Target, Users, Zap } from "lucide-react";

const features = [
  {
    name: "Gestión de Tareas",
    description:
      "Organiza tus tareas de manera eficiente con nuestro sistema de gestión intuitivo. Prioriza, categoriza y realiza un seguimiento de tu progreso.",
    icon: CheckCircle,
  },
  {
    name: "Calendario Integrado",
    description:
      "Sincroniza todos tus eventos y compromisos en un calendario unificado. Visualiza tu agenda diaria, semanal y mensual de un vistazo.",
    icon: Calendar,
  },
  {
    name: "Gestión de Tiempo",
    description:
      "Optimiza tu tiempo con herramientas de seguimiento y análisis. Identifica patrones y mejora tu productividad día a día.",
    icon: Clock,
  },
  {
    name: "Objetivos y Metas",
    description:
      "Establece objetivos claros y realiza un seguimiento de tu progreso. Celebra tus logros y mantén el impulso hacia tus metas.",
    icon: Target,
  },
  {
    name: "Colaboración en Equipo",
    description:
      "Trabaja de manera eficiente con tu equipo. Comparte tareas, coordina proyectos y mantén a todos alineados.",
    icon: Users,
  },
  {
    name: "Automatizaciones",
    description:
      "Automatiza tareas repetitivas y flujos de trabajo. Ahorra tiempo y enfócate en lo que realmente importa.",
    icon: Zap,
  },
];

export default function Features() {
  return (
    <div
      className="py-24 bg-gradient-to-b from-secondary-200 to-white"
      id="caracteristicas"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold sm:text-5xl text-primary-500 animate-fade-in">
            Características
          </h2>
          <p className="mt-6 text-xl text-primary-500 max-w-3xl mx-auto animate-slide-up">
            Todo lo que necesitas para mantener tu productividad al máximo
            nivel.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className="relative group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-primary-200 hover:border-primary-200 animate-fade-in-up gap-3"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="absolute -top-4 -left-4 h-14 w-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <feature.icon
                      className="h-7 w-7 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-15">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-500 transition-colors duration-300">
                      {feature.name}
                    </h3>
                    <p className="mt-3 text-base text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
