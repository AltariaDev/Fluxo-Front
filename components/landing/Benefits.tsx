"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Clock, Zap, Users, Target } from "lucide-react";

const benefits = [
  {
    id: 1,
    title: "Ahorro de Tiempo",
    description:
      "Reduce el tiempo perdido entre aplicaciones y maximiza tu productividad con una interfaz unificada.",
    icon: Clock,
    color: "from-primary-500 to-primary-700",
  },
  {
    id: 2,
    title: "Flujo de trabajo más claro",
    description:
      "Visualiza y organiza tus tareas de manera intuitiva y efectiva con nuestro sistema de gestión visual.",
    icon: Target,
    color: "from-secondary-500 to-secondary-600 ",
  },
  {
    id: 3,
    title: "Menos distracciones",
    description:
      "Mantén el foco en lo importante con una interfaz limpia y organizada que elimina el ruido visual.",
    icon: Zap,
    color: "from-primary-300 to-primary-500",
  },
  {
    id: 4,
    title: "Experiencia unificada",
    description:
      "Accede a todas tus herramientas desde cualquier dispositivo con una experiencia consistente.",
    icon: Users,
    color: "from-secondary-300 to-secondary-500",
  },
];

export default function Benefits() {
  const [openBenefit, setOpenBenefit] = useState<number | null>(null);

  return (
    <div
      className="bg-gradient-to-b from-white to-secondary-200 py-24"
      id="beneficios"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold sm:text-5xl text-primary-500 animate-fade-in">
            Beneficios
          </h2>
          <p className="mt-6 text-xl text-primary-500 max-w-3xl mx-auto animate-slide-up">
            Descubre cómo Fluxo puede transformar tu manera de trabajar.
          </p>
        </div>

        <div className="mt-20 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div className="relative animate-fade-in">
            <div className="relative rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
              <Image
                className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                src="/images/dashboard-preview.png"
                alt="Dashboard Preview"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent animate-pulse-slow" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute -top-6 -left-6 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
          </div>

          <div className="mt-12 lg:mt-0">
            <dl className="space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.id}
                  className="relative bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-primary-200 hover:border-primary-200 animate-fade-in-up group"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() =>
                    setOpenBenefit(
                      openBenefit === benefit.id ? null : benefit.id
                    )
                  }
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <dt className="relative">
                    <button className="flex w-full items-center justify-between text-left cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`h-12 w-12 rounded-lg bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                        >
                          <benefit.icon className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-xl font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                          {benefit.title}
                        </p>
                      </div>
                      <ArrowRight
                        className={`h-6 w-6 transform transition-transform duration-300 ${
                          openBenefit === benefit.id ? "rotate-90" : ""
                        } text-primary-500`}
                      />
                    </button>
                  </dt>
                  <dd
                    className={`mt-4 text-base text-gray-600 overflow-hidden transition-all duration-300 ease-in-out ${
                      openBenefit === benefit.id
                        ? "max-h-24 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {benefit.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
