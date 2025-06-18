"use client";
import TemplateBox from "@/components/Elements/General/TemplateBox";
import { PromiseGetPomodoroStats } from "@/interfaces/Dashboard/DashboardType";
import { useState, useEffect } from "react";
import ResumeStats from "./StatsPomodoro/ResumeStats";
import CirclePorcent from "./StatsPomodoro/CirclePorcent";
import StatsChard from "./StatsPomodoro/StatsChard";
import InputModal from "@/components/Reusable/InputModal";
import { format, getWeek, getYear } from "date-fns";
import { enUS, es } from "date-fns/locale";
import ModalDatePicker from "@/components/Elements/General/Modal/ModalDatePicker/ModalDatePicker";
import { Calendar } from "lucide-react";

export default function StatsPomodoro({
  stats,
  locale,
}: {
  stats: PromiseGetPomodoroStats;
  locale: string;
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stats) {
      setError("No hay datos disponibles");
    }
  }, [stats]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-primary-500">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <TemplateBox grid="" title="Pomodoro" link="">
        <InputModal
          type="select"
          placeholder={format(selectedDate, "dd MMMM yyyy", {
            locale: locale === "es" ? es : enUS,
          })}
          option={
            <ModalDatePicker
              date={selectedDate}
              onChange={(e) => {
                setSelectedDate(new Date(e.target.value ?? ""));
              }}
            />
          }
          propagand={false}
          icon={<Calendar />}
        />
        <div className="flex">
          <CirclePorcent {...stats} />
          <StatsChard
            selectedWeek={getWeek(selectedDate)}
            selectedYear={getYear(selectedDate)}
          />
        </div>
      </TemplateBox>
      <ResumeStats {...stats} />
    </div>
  );
}
