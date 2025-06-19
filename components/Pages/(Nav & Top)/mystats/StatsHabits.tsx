"use client";
import TemplateBox from "@/components/Elements/General/TemplateBox";
import SelectTimeButtons from "@/components/Elements/Stats/SelectTimeButtons";
import { useState, useEffect } from "react";
import HabitsDotsPerDay from "./StatsHabits/HabitsDotsPerDay";

export default function StatsHabits() {
  const [selectedMonth, setSelectedMonth] = useState("start");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const monthOptions = [
    { label: "enero-junio", type: "start" },
    { label: "julio-diciembre", type: "end" },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Aquí iría la lógica de carga de datos
        setIsLoading(false);
      } catch (err) {
        setError("Error al cargar los datos" + err);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

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
    <TemplateBox grid="" title="Habits" link="/dashboard">
      <SelectTimeButtons
        monthOptions={monthOptions}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
      <div className="flex gap-4">
        <HabitsDotsPerDay
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
        <div className="flex-1 flex place-content-between gap-4">
          {/* <HabitsDotsPerDay /> */}
          <div className="w-full text-sm text-primary-500 flex flex-col justify-center gap-2">
            <div className="flex w-full place-content-between">
              <p>Tiempo total Concentrado </p>
              <p>10</p>
            </div>
            <div className="flex w-full place-content-between">
              <p>Sesiones Iniciadas</p>
              <p>15</p>
            </div>
            <div className="flex w-full place-content-between">
              <p>Pausas Activadas Manualmente </p>
              <p>50</p>
            </div>
            <div className="flex w-full place-content-between">
              <p>Mejor Racha Activa </p>
              <p>20</p>
            </div>
          </div>
        </div>
      </div>
    </TemplateBox>
  );
}
