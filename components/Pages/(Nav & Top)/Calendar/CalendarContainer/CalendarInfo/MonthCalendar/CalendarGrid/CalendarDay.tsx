import Dot from "@/components/Elements/General/Dot";
import { NavTypeType } from "@/interfaces/Calendar/CalendarType";
import CalendarUtils from "@/lib/CalendarUtils";
import { useCalendarStore } from "@/stores/calendarStore";

import { format, isSameDay } from "date-fns";
import { es } from "date-fns/locale";

import { Dispatch, memo, SetStateAction, useMemo } from "react";

type CalendarDayProps = {
  day: Date;
  currentMonth: number;
  setNavType: Dispatch<SetStateAction<NavTypeType>>;
};

const CalendarDay = memo(
  ({ day, currentMonth, setNavType }: CalendarDayProps) => {
    const { formatCalendar } = CalendarUtils({ navType: "day" });
    const { setDate } = useCalendarStore((state) => state.actions);

    const isToday = isSameDay(day, new Date());
    const isCurrentMonth = day.getMonth() === currentMonth;
    const dayCalendarItems = useMemo(
      () =>
        formatCalendar.filter((calendarItem) =>
          isSameDay(new Date(calendarItem.data.startDate), day)
        ),
      [formatCalendar, day]
    );

    const visibleCalendarItems = dayCalendarItems.slice(0, 2);
    const remainingCount =
      dayCalendarItems.length > 2 ? dayCalendarItems.length - 2 : 0;

    const handleSelectDay = () => {
      setDate(day);
      setNavType("Día");
    };

    return (
      <div
        className={`relative p-3 h-full cursor-pointer transition-all duration-300 group
          ${isCurrentMonth ? "bg-white/50" : "bg-gray-50/50"}
          ${
            isToday
              ? "bg-primary-50/80 border-primary-200 shadow-sm"
              : "hover:bg-white/80 border-gray-100 hover:shadow-md"
          }
          border rounded-lg backdrop-blur-sm`}
        aria-label={format(day, "EEEE, d MMMM yyyy", { locale: es })}
        onClick={handleSelectDay}
      >
        <div
          className={`text-right mb-2 ${isToday ? "text-primary-600 font-semibold" : "text-gray-600 group-hover:text-gray-900"}`}
        >
          {day.getDate()}
        </div>
        <div className="space-y-1.5">
          {visibleCalendarItems.map((calendarItem, i) => (
            <div
              key={`${i}-${day.toISOString()}`}
              className={`p-2 rounded-lg text-sm transition-all duration-200 ${
                isSameDay(new Date(calendarItem.data.startDate), new Date())
                  ? "bg-primary-100/80 text-primary-700 shadow-sm"
                  : "bg-gray-100/80 text-gray-700 group-hover:bg-white/80 group-hover:shadow-sm"
              }`}
              title={calendarItem.data.title}
            >
              <div className="flex items-center gap-2 truncate">
                <Dot
                  size={8}
                  backgroundColor={
                    isSameDay(new Date(calendarItem.data.startDate), new Date())
                      ? "#2563eb"
                      : "#6b7280"
                  }
                />
                <span className="truncate font-medium">
                  {calendarItem.data.title}
                </span>
              </div>
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="text-xs text-gray-500 text-center mt-2 group-hover:text-gray-600">
              +{remainingCount} más
            </div>
          )}
        </div>
      </div>
    );
  }
);

CalendarDay.displayName = "CalendarDay";

export default CalendarDay;
