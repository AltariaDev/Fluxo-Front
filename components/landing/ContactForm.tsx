import Button from "../Reusable/Button";
import { Mail, MessageSquare, Phone, User } from "lucide-react";

export default function ContactForm() {
  return (
    <div
      className="bg-gradient-to-b from-secondary-200 to-white py-24"
      id="contacto"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-primary-500 sm:text-5xl animate-fade-in">
              Contacto
            </h2>
            <p className="mt-6 text-xl text-primary-500 max-w-3xl mx-auto animate-slide-up">
              ¿Tienes alguna pregunta? Estaremos encantados de ayudarte.
            </p>
          </div>
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-primary-200 animate-fade-in-up">
            <form className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8">
              <div
                className="animate-fade-in"
                style={{ animationDelay: "150ms" }}
              >
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Tu nombre"
                    autoComplete="given-name"
                    className="py-3 pl-10 pr-4 block w-full border border-primary-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-300"
                  />
                </div>
              </div>
              <div
                className="animate-fade-in"
                style={{ animationDelay: "300ms" }}
              >
                <label
                  htmlFor="correo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo
                </label>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="correo"
                    id="correo"
                    placeholder="tu@email.com"
                    autoComplete="email"
                    className="py-3 pl-10 pr-4 block w-full border border-primary-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-300"
                  />
                </div>
              </div>
              <div
                className="animate-fade-in"
                style={{ animationDelay: "450ms" }}
              >
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium text-gray-700"
                >
                  Teléfono
                </label>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="telefono"
                    id="telefono"
                    placeholder="Tu teléfono"
                    autoComplete="tel"
                    className="py-3 pl-10 pr-4 block w-full border border-primary-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-300"
                  />
                </div>
              </div>
              <div
                className="animate-fade-in"
                style={{ animationDelay: "600ms" }}
              >
                <label
                  htmlFor="asunto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Asunto
                </label>
                <div className="mt-2">
                  <select
                    id="asunto"
                    name="asunto"
                    className="py-3 px-4 block w-full border border-primary-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-300"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="soporte">Soporte técnico</option>
                    <option value="ventas">Información de ventas</option>
                    <option value="prensa">Prensa</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>
              <div
                className="sm:col-span-2 animate-fade-in"
                style={{ animationDelay: "750ms" }}
              >
                <label
                  htmlFor="mensaje"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mensaje
                </label>
                <div className="mt-2 relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    placeholder="Tu mensaje aquí..."
                    className="py-3 pl-10 pr-4 block w-full border border-primary-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-300"
                  />
                </div>
              </div>
              <div
                className="sm:col-span-2 animate-fade-in"
                style={{ animationDelay: "900ms" }}
              >
                <Button
                  type="submit"
                  button="primary"
                  size="large"
                  className="w-full py-4 text-lg font-semibold hover:scale-105 transition-transform"
                >
                  Enviar mensaje
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
