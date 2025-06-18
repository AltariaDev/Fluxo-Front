"use client";
import CurrentDate from "@/components/Elements/General/CurrentDate";
import { useDashboardData } from "@/hooks/UserDashboardData";
import { useTour } from "@/hooks/UseTour";
import { useProfile } from "@/stores/profileStore";
import Streaks from "./Dashboard/Streaks";
import Pomodoro from "./Dashboard/Pomodoro";
import Habits from "./Dashboard/Habits";
import Agenda from "./Dashboard/Agenda";
import Task from "./Dashboard/Task";

export default function Dashboard() {
  const userInfo = useProfile();
  const { streaks, tasks, habits } = useDashboardData();

  useTour(userInfo);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full h-full p-6">
      <CurrentDate />

      <Streaks number={streaks} />

      <Agenda />

      <Pomodoro />

      <Task tasksList={tasks} />

      <Habits habitsList={habits} />
    </div>
  );
}
