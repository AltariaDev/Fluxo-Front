import { GetMyStatsHabitsMonth } from "@/services/MyStats/GetMyStatsHabitsMonth";
import { toNumber } from "lodash";
import { useEffect, useState } from "react";

type MonthlyStatsData = {
  month: number;
  year: number;
  completedDates: number[];
}[];

const monthNames = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

export default function HabitsDotsPerDay({
  selectedYear,
  selectedMonth,
}: {
  selectedYear: string;
  selectedMonth: string;
}) {
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStatsData>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMonthlyStats = async () => {
      setError(null);
      setLoading(true);
      try {
        const { data, success } = await GetMyStatsHabitsMonth({
          month: selectedMonth === "start" ? [1, 6] : [7, 12],
          year: toNumber(selectedYear),
        });
        if (!success) {
          throw new Error(`Error en la API: ${data}`);
        }

        setMonthlyStats(data);
      } catch (error) {
        console.error("Error loading monthly stats:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    loadMonthlyStats();
  }, [selectedMonth, selectedYear]);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const renderDotsForMonth = (monthData: {
    month: number;
    year: number;
    completedDates: number[];
  }) => {
    const daysInMonth = getDaysInMonth(monthData.month, monthData.year);
    const dots = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const number = monthData.completedDates[day];
      if (number < 0) return;
      dots.push(
        <div
          key={`${monthData.month}-${day}`}
          className={`size-5 rounded ${
            !number
              ? "bg-secondary-200"
              : number >= 1 && number <= 3
                ? "bg-secondary-400"
                : number >= 4 && number <= 6
                  ? "bg-secondary-600"
                  : "bg-secondary-700"
          } group relative`}
        >
          {number > 0 && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary-700 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {number} hábitos
            </div>
          )}
        </div>
      );
    }

    return dots;
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="space-y-2">
      {monthlyStats.map((monthData) => (
        <div
          key={`${monthData.year}-${monthData.month}`}
          className="flex gap-4 place-content-between "
        >
          <h3 className="text-sm text-primary-500">
            {monthNames[monthData.month - 1]}
          </h3>
          <div className="grid grid-cols-31 gap-2">
            {renderDotsForMonth(monthData)}
          </div>
        </div>
      ))}
    </div>
  );
}
