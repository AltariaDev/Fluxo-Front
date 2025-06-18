"use client";
import TemplateBox from "@/components/Elements/General/TemplateBox";
import SelectTimeButtons from "@/components/Elements/Stats/SelectTimeButtons";
import { useState, useEffect } from "react";
import StatsChard from "./StatsTask/StatsChard";
import { PromiseGetTasksStats } from "@/interfaces/Dashboard/DashboardType";

export default function StatsTask({ stats }: { stats: PromiseGetTasksStats }) {
  const [selectedMonth, setSelectedMonth] = useState("start");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const monthOptions = [
    { label: "enero-junio", type: "start" },
    { label: "julio-diciembre", type: "end" },
  ];

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
      <TemplateBox grid="" title="Tareas" link="">
        <SelectTimeButtons
          monthOptions={monthOptions}
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
        <StatsChard selectedMonth={selectedMonth} selectedYear={selectedYear} />
      </TemplateBox>
      <div className="flex flex-col w-full gap-4 text-sm text-primary-500">
        <div className="flex w-full px-4 place-content-between">
          <p>Tareas Incompletas</p>
          <p>{stats.droppedTasks}</p>
        </div>
        <div className="flex w-full px-4 place-content-between">
          <p>Tareas Completadas</p>
          <p>{stats.completedTasks}</p>
        </div>
        <div className="flex w-full px-4 place-content-between">
          <p>Creadas</p>
          <p>{stats.totalActualTasks}</p>
        </div>
        <div className="flex w-full px-4 place-content-between">
          <p>Pendientes</p>
          <p>{stats.pendingTasks}</p>
        </div>
      </div>
    </div>
  );
}
