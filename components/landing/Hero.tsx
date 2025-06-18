import Button from "../Reusable/Button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-white to-secondary-200 pt-20 pb-32 overflow-hidden">
      <div className="relative">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:gap-24">
          <div className="px-4 max-w-7xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-200 text-secondary-700 text-sm font-medium mb-6 animate-fade-in">
                  <span className="flex h-2 w-2 rounded-full bg-secondary-500 mr-2 animate-pulse"></span>
                  ¡Nueva versión disponible!
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl bg-clip-text bg-gradient-to-r from-secondary-600 to-secondary-400 animate-fade-in">
                  Tu productividad, simplificada.
                </h1>
                <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-2xl animate-slide-up">
                  Fluxo centraliza tus herramientas de organización y
                  planificación en un solo lugar: calendario, tareas, horarios y
                  objetivos sin saltar de una app a otra.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-delayed">
                  <Button
                    type="button"
                    button="primary"
                    size="large"
                    href="/login"
                    className="w-full sm:w-auto px-8 py-3 text-lg hover:scale-105 transition-transform"
                  >
                    Prueba Gratuita
                  </Button>
                  <Button
                    type="button"
                    button="secondary"
                    size="large"
                    href="#como-funciona"
                    className="w-full sm:w-auto px-8 py-3 text-lg hover:scale-105 transition-transform"
                  >
                    Ver cómo funciona
                  </Button>
                </div>
                <div className="mt-12 flex flex-col items-center lg:items-start">
                  <p className="text-sm text-gray-500 mb-4">
                    Confían en nosotros
                  </p>
                  {/* <div className="flex items-center space-x-8">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                        >
                          <Image
                            src={`/images/avatar-1.png`}
                            alt={`User ${i}`}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">+2.5k</span> usuarios
                      activos
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative w-full h-[600px] animate-float">
                  <Image
                    src="/images/dashboard-preview2.png"
                    alt="Fluxo Dashboard"
                    fill
                    className="object-contain"
                    priority
                  />
                  <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                  <div className="absolute -top-6 -left-6 w-72 h-72 bg-secondary-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary-100/20 via-transparent to-transparent animate-pulse-slow" />
      </div>
    </div>
  );
}
