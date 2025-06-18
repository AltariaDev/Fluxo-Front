import { BarChart } from "recharts";
import { useEffect, useState } from "react";
import {
  Bar,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GetMyStatsTaskMonth } from "@/services/MyStats/GetMyStatsTaskMonth";

interface MonthlyStatsData {
  completedTasks: number;
  createdTasks: number;
  droppedTasks: number;
  month: number;
  pendingTasks: number;
  year: number;
}

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

// Tooltip personalizado
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { color: string; name: string; value: string }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 backdrop-blur-sm">
        <p className="font-semibold text-gray-800 mb-2">{label} 2025</p>
        {payload.map(
          (
            entry: { color: string; name: string; value: string },
            index: number
          ) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></span>
              {entry.name}: <span className="font-semibold">{entry.value}</span>
            </p>
          )
        )}
      </div>
    );
  }
  return null;
};

const CustomLegend = ({
  payload,
}: {
  payload?: {
    color: string;
    name: string;
    value: string;
    stroke: string;
    payload: { stroke: string };
  }[];
}) => {
  return (
    <div className="flex justify-center gap-6 mt-4">
      {payload &&
        payload.map(
          (
            entry: {
              payload: { stroke: string };
              stroke: string;
              value: string;
            },
            index: number
          ) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full shadow-sm"
                style={{ backgroundColor: entry.payload.stroke }}
              ></div>
              {entry.stroke}
              <span className="text-sm font-medium text-gray-700">
                {entry.value}
              </span>
            </div>
          )
        )}
    </div>
  );
};

export default function StatsChard({
  selectedYear,
  selectedMonth,
}: {
  selectedYear: string;
  selectedMonth: string;
}) {
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStatsData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMonthlyStats = async () => {
      setError(null);
      setLoading(true);
      try {
        const { data, success } = await GetMyStatsTaskMonth({
          month: selectedMonth === "start" ? [1, 6] : [7, 12],
          year: selectedYear,
        });
        if (!success) {
          throw new Error(`Error en la API: ${data}`);
        }

        const formattedData = data.response.map((item: MonthlyStatsData) => ({
          ...item,
          monthName: monthNames[item.month - 1],
        }));

        setMonthlyStats(formattedData);
      } catch (error) {
        console.error("Error loading monthly stats:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    loadMonthlyStats();
  }, [selectedMonth, selectedYear]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded-lg w-48 mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-64 bg-gray-100 rounded-xl mt-6"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-6 bg-white/70 backdrop-blur-sm text-red-700 rounded-xl border border-red-200">
        <svg
          className="w-6 h-6 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <div>
          <h3 className="font-semibold">Error al cargar datos</h3>
          <p className="text-sm opacity-90">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={monthlyStats}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          barCategoryGap="20%"
        >
          <defs>
            <linearGradient id="createdGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#1E40AF" stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="droppedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#D97706" stopOpacity={0.6} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="monthName"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280", fontWeight: 500 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            domain={[0, "dataMax + 10"]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />

          <Bar
            dataKey="createdTasks"
            name="Tareas Creadas"
            fill="url(#createdGradient)"
            radius={[4, 4, 0, 0]}
            stroke="#1E40AF"
            strokeWidth={1}
          />
          <Bar
            dataKey="completedTasks"
            name="Tareas Completadas"
            fill="url(#completedGradient)"
            radius={[4, 4, 0, 0]}
            stroke="#059669"
            strokeWidth={1}
          />
          <Bar
            dataKey="droppedTasks"
            name="Tareas Abandonadas"
            fill="url(#droppedGradient)"
            radius={[4, 4, 0, 0]}
            stroke="#D97706"
            strokeWidth={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
