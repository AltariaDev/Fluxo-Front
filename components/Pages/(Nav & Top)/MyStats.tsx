import {
  AlarmClockCheck,
  BookText,
  FireExtinguisher,
  Hourglass,
  NotepadText,
} from "lucide-react";
import { Suspense } from "react";
import StatsCard from "./mystats/StatsCard";
import { GetUserLogs } from "@/services/User/GetUserLogs";
import StatsTask from "./mystats/StatsTask";
import StatsPomodoro from "./mystats/StatsPomodoro";
import { getLocale } from "next-intl/server";
import StatsHabits from "./mystats/StatsHabits";

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-primary-500">Loading...</p>
    </div>
  );
}

export default async function MyStats() {
  const userLogs = await GetUserLogs();
  const locale = await getLocale();

  const items = [
    {
      label: "Tareas Completadas",
      number: userLogs.res.Tasks.completedTasks,
      icon: <BookText />,
    },
    {
      label: "Ciclos Pomodoro",
      number: userLogs.res.Pomodoros.completedPomodoros,
      icon: <AlarmClockCheck />,
    },
    {
      label: "Habitos Completados",
      number: userLogs.res.Habits.activeHabits,
      icon: <NotepadText />,
    },
    {
      label: "Tiempo estudiado",
      number: userLogs.res.Pomodoros.totalTimeDone / 3600,
      icon: <Hourglass />,
    },
    {
      label: "Streaks",
      number: userLogs.res.Streak.currentStreak,
      icon: <FireExtinguisher />,
    },
  ];

  return (
    <main className="flex flex-col pl-28 w-full h-full gap-6 p-6">
      <p className="text-primary-500 text-2xl">Informacion General</p>
      <div className="flex w-full gap-6">
        {items.map((item) => (
          <StatsCard key={item.label} item={item} />
        ))}
      </div>
      <div className="w-full grid grid-cols-2 gap-6">
        <Suspense fallback={<LoadingFallback />}>
          <StatsTask stats={userLogs.res.Tasks} />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <StatsPomodoro stats={userLogs.res.Pomodoros} locale={locale} />
        </Suspense>
      </div>
      <Suspense fallback={<LoadingFallback />}>
        <StatsHabits />
      </Suspense>
    </main>
  );
}
