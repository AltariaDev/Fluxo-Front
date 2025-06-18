"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "¿Fluxo es gratuito?",
    answer:
      "Fluxo ofrece una prueba gratuita de 14 días con todas las funcionalidades. Después, puedes elegir entre nuestros planes según tus necesidades. El plan gratuito incluye características básicas para que puedas empezar a organizarte.",
  },
  {
    question: "¿Necesito descargar algo para usar Fluxo?",
    answer:
      "No, Fluxo es una aplicación web que funciona directamente desde tu navegador. No necesitas descargar ni instalar nada. Solo necesitas una conexión a internet y un navegador moderno.",
  },
  {
    question: "¿Fluxo funciona para equipos de trabajo?",
    answer:
      "Sí, Fluxo tiene funcionalidades específicas para equipos, permitiendo la colaboración y gestión de proyectos en grupo. Puedes asignar tareas, compartir calendarios y mantener a todo el equipo sincronizado.",
  },
  {
    question: "¿Qué tan segura es mi información en Fluxo?",
    answer:
      "Tu información está protegida con encriptación de nivel bancario. Utilizamos los más altos estándares de seguridad para proteger tus datos. Además, realizamos copias de seguridad regulares y cumplimos con las normativas de protección de datos.",
  },
  {
    question: "¿Puedo usar Fluxo sin conexión a internet?",
    answer:
      "Sí, Fluxo tiene funcionalidades offline que te permiten seguir trabajando sin conexión. Tus datos se sincronizarán automáticamente cuando vuelvas a conectarte. Esto es especialmente útil cuando estás en movimiento o en áreas con conexión limitada.",
  },
  {
    question: "¿Cómo puedo obtener ayuda si tengo problemas?",
    answer:
      "Ofrecemos múltiples canales de soporte: chat en vivo, email, documentación detallada y una comunidad activa de usuarios. Nuestro equipo de soporte está disponible para ayudarte con cualquier pregunta o problema que puedas tener.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div
      className="bg-gradient-to-b from-secondary-200 to-white py-24"
      id="faq"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-primary-500 sm:text-5xl animate-fade-in">
            Preguntas Frecuentes
          </h2>
          <p className="mt-6 text-xl text-primary-500 max-w-3xl mx-auto animate-slide-up">
            Todo lo que necesitas saber sobre Fluxo.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-primary-200 hover:border-primary-300 animate-fade-in-up group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center cursor-pointer hover:bg-primary-200/50 transition-colors"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <span className="text-lg font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">
                    {faq.question}
                  </span>
                  <span className="ml-6 flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="h-6 w-6 text-primary-500 transform transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-primary-500 transform transition-transform duration-300" />
                    )}
                  </span>
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100 pb-6"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-base text-gray-500">
            ¿No encuentras la respuesta que buscas?{" "}
            <a
              href="#contacto"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
