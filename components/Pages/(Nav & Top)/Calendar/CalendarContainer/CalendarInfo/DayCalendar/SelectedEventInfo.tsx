import { Bell, LinkIcon, MapPin, Palette, Plus, User } from "lucide-react";
import { Clock } from "lucide-react";
import { Pen } from "lucide-react";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import Menu from "@/components/Reusable/Menu";
import Image from "next/image";
import { TimelineItem } from "@/components/Elements/Calendar/Timeline/TimelineCard";

const mockParticipants = [
  { name: "Alice", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { name: "Bob", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
  { name: "Charlie", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
];

export default function SelectedEventInfo({
  selectedCalendarItem,
}: {
  selectedCalendarItem: TimelineItem | null;
}) {
  const selectedEventData = selectedCalendarItem?.data;
  return (
    <div
      className={`h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg transition-all duration-300 flex-nowrap ${
        selectedEventData ? "w-1/3 p-8" : "w-0"
      }`}
    >
      {selectedEventData && (
        <div className="flex flex-col gap-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                Evento
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-1">
                {selectedEventData.title}
              </div>
            </div>
            <Menu
              items={[
                { label: "Modificar", icon: <Pen size={20} /> },
                { label: "Eliminar", icon: <Trash2 size={20} /> },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-gray-50/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <Clock size={18} />
                <span>Comienza</span>
              </div>
              <div className="text-sm text-gray-500">
                {format(selectedEventData.startDate, "HH:mm")}
              </div>
            </div>
            <div className="bg-gray-50/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <Clock size={18} />
                <span>Finaliza</span>
              </div>
              <div className="text-sm text-gray-500">
                {format(selectedEventData.endDate, "HH:mm")}
              </div>
            </div>
          </div>

          <div className="bg-gray-50/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-700 font-medium mb-3">
              <User size={18} />
              <span>Participantes</span>
            </div>
            <div className="flex items-center -space-x-2">
              {mockParticipants.map((p, i) => (
                <Image
                  key={i}
                  src={p.avatar}
                  alt={p.name}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform duration-200"
                  width={40}
                  height={40}
                />
              ))}
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-300 hover:text-gray-600 hover:scale-110 transition-all duration-200">
                <Plus size={24} />
              </button>
            </div>
          </div>

          <div className="bg-gray-50/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <MapPin size={18} />
              <span>Ubicación</span>
            </div>
            <div className="text-sm text-gray-500">
              {/* {selectedEvent.location || "San Rafael - Mendoza"} */}
            </div>
          </div>

          <div className="bg-gray-50/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <MapPin size={18} />
              <span>Categoria</span>
            </div>
            <div className="text-sm text-gray-500">
              {selectedEventData.category || "No Categoria"}
            </div>
          </div>

          <div className="bg-gray-50/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <Palette size={18} />
              <span>Color del Evento</span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full border border-gray-200 shadow-sm"
                style={{ backgroundColor: selectedEventData.color }}
              />
              <span className="text-sm text-gray-500">
                {selectedEventData.color}
              </span>
            </div>
          </div>

          <div className="bg-gray-50/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <LinkIcon size={18} />
              <span>Link</span>
            </div>
            <a
              className="text-sm text-blue-600 hover:text-blue-700 underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* {selectedEvent.link || "https://sherp-app.com/login"} */}
            </a>
          </div>

          <div className="bg-gray-50/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-700 font-medium mb-2">
              <Bell size={18} />
              <span>Recordatorios</span>
            </div>
            <div className="text-sm text-gray-500">
              {/* {selectedEvent.reminder || "30 min. antes"} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
