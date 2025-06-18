import { PromiseGetPomodoroStats } from "@/interfaces/Dashboard/DashboardType";

export default function ResumeStats(stats: PromiseGetPomodoroStats) {
  return (
    <div className="flex flex-col w-full gap-4 text-sm text-primary-500">
      <div className="flex w-full px-4 place-content-between">
        <p>Tiempo total concentrado</p>
        <p>{stats.totalActualPomodoros}</p>
      </div>
      <div className="flex w-full px-4 place-content-between">
        <p>Sesiones Iniciadas</p>
        <p>{stats.PomodoroWithoutInterruptions}</p>
      </div>
      <div className="flex w-full px-4 place-content-between">
        <p>Pausas Activadas Manualmente</p>
        <p>{stats.totalInterruptions}</p>
      </div>
      <div className="flex w-full px-4 place-content-between">
        <p>Mejor Racha Pomodoros</p>
        <p>{stats.totalPomodoros}</p>
      </div>
    </div>
  );
}
