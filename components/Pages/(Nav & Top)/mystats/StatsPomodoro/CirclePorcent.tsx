import { timeUtils } from "@/components/Provider/TimerProvider/TimeUtils";
import { PromiseGetPomodoroStats } from "@/interfaces/Dashboard/DashboardType";
import { useMemo, useState } from "react";

export default function CirclePorcent(stats: PromiseGetPomodoroStats) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const percent = (stats.totalTimeDone * 100) / stats.totalTimePlanned;

  const safePercent = useMemo(() => {
    return isNaN(percent) ? 100 : Math.min(Math.max(percent, 0), 100);
  }, [percent]);

  const progressDetails = useMemo(() => {
    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
      circumference - (safePercent / 100) * circumference;
    const angle = (safePercent / 100) * 360;

    return {
      radius,
      circumference,
      strokeDashoffset,
      angle,
    };
  }, [safePercent]);

  const handleMouseMove = (e: React.MouseEvent<SVGCircleElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const categorias = [
    { label: "Completadas", color: "#248277" },
    { label: "No Completadas", color: "#d5ede2" },
  ];

  return (
    <div className="w-1/2 flex flex-col items-center ">
      <div className="relative flex items-center justify-center text-primary-500">
        <svg
          className="transform -rotate-90 scale-y-[-1] size-62"
          aria-label={`Progress: ${safePercent}%`}
          role="img"
        >
          <circle
            cx="125"
            cy="125"
            r={progressDetails.radius}
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            fill="transparent"
            className="text-secondary-200"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />

          <circle
            cx="125"
            cy="125"
            r={progressDetails.radius}
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={progressDetails.circumference}
            strokeDashoffset={progressDetails.strokeDashoffset}
            className="transition-all duration-300 ease-in-out text-secondary-700"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
        </svg>

        {showTooltip && (
          <div
            className="fixed bg-secondary-700 text-white px-2 py-1 rounded text-sm pointer-events-none z-50 "
            style={{
              left: mousePosition.x + 10,
              top: mousePosition.y + 10,
            }}
          >
            <p className="text-center font-medium">Sessiones</p>
            <p className="text-center">{Math.round(safePercent)}%</p>
          </div>
        )}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4">
          <svg
            className="transform -rotate-90 scale-y-[-1] size-62"
            aria-label={`Progress: ${safePercent}%`}
            role="img"
            onMouseMove={(e: React.MouseEvent<SVGSVGElement>) =>
              handleMouseMove(
                e as unknown as React.MouseEvent<SVGCircleElement>
              )
            }
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <circle
              cx="125"
              cy="125"
              r={progressDetails.radius - 35}
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              fill="transparent"
              className="text-secondary-200"
            />

            <circle
              cx="125"
              cy="125"
              r={progressDetails.radius - 35}
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={progressDetails.circumference}
              strokeDashoffset={progressDetails.strokeDashoffset}
              className="transition-all duration-300 ease-in-out text-secondary-700"
            />
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-11.25 -translate-y-11.25 flex text-white flex-col items-center justify-center size-22 bg-secondary-600 rounded-full">
            <p className="font-bold">
              {timeUtils
                .secondsToTime(stats.totalTimeDone)
                .hours.toString()
                .padStart(2, "0")}
              h
              {timeUtils
                .secondsToTime(stats.totalTimeDone)
                .min.toString()
                .padStart(2, "0")}
              m
            </p>
            <p className="text-xs text-center">Tiempo total</p>
          </div>
        </div>
      </div>
      <ul className="w-full flex-1 grid grid-cols-2 gap-2">
        {categorias.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-center gap-2 text-sm"
          >
            <div
              style={{ backgroundColor: item.color }}
              className="size-4 rounded-full"
            />
            <p className="truncate">{item.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
