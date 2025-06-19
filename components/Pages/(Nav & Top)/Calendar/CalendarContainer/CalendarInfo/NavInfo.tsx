import { Dispatch, SetStateAction } from "react";

import { ChevronLeft, ChevronRight, ListFilter, Search } from "lucide-react";

import { addDays, addMonths, format } from "date-fns";
import { es } from "date-fns/locale";

import CurrentDate from "@/components/Elements/General/CurrentDate";
import ButtonDropDown from "@/components/Reusable/ButtonDropDown";
import { NavTypeType } from "@/interfaces/Calendar/CalendarType";
import { useCalendarStore, useDate } from "@/stores/calendarStore";

export default function NavInfo({
  navType,
  setNavType,
}: {
  navType: NavTypeType;
  setNavType: Dispatch<SetStateAction<NavTypeType>>;
}) {
  const date = useDate() ?? new Date();
  const { setDate } = useCalendarStore((state) => state.actions);

  const handleCalendar = (item: NavTypeType) => {
    setNavType(item);
    if (localStorage) localStorage.setItem("navCalendar", item);
  };
  const items = [
    { label: "Día", onClick: () => handleCalendar("Día") },
    { label: "Semana", onClick: () => handleCalendar("Semana") },
    { label: "Mes", onClick: () => handleCalendar("Mes") },
  ];

  return (
    <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-6 mb-8">
      <div className="flex items-center gap-4">
        <CurrentDate background={false} />
        <div className="h-8 w-px bg-gray-200" />
        <div className="flex items-center gap-2">
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
            onClick={() =>
              setDate(
                navType === "Mes" ? addMonths(date, -1) : addDays(date, -1)
              )
            }
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <p className="font-medium text-gray-700 min-w-[120px] text-center">
            {format(date, navType === "Mes" ? "MMMM" : "dd MMMM", {
              locale: es,
            })}
          </p>
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
            onClick={() =>
              setDate(navType === "Mes" ? addMonths(date, 1) : addDays(date, 1))
            }
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ButtonDropDown
          items={items}
          className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:scale-105"
        >
          {navType}
        </ButtonDropDown>
        <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105">
          <ListFilter className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105">
          <Search className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
