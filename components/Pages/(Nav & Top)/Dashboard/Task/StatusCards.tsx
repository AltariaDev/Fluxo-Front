import { TaskType } from "@/interfaces/Task/TaskType";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

export default function StatusCards({
  setFilter,
  filter,
  tasks,
}: {
  setFilter: Dispatch<SetStateAction<string>>;
  filter: string;
  tasks: TaskType[];
}) {
  const t = useTranslations("Dashboard.tasks");

  const items = [
    {
      id: "completed",
      label: t("completed"),
      number: tasks.filter((t) => t.status === "completed").length,
    },
    {
      id: "high",
      label: t("priority.high"),
      number: tasks
        .filter((t) => t.priority === "high")
        .filter((t) => t.status !== "completed").length,
    },
    {
      id: "medium",
      label: t("priority.medium"),
      number: tasks
        .filter((t) => t.priority === "medium")
        .filter((t) => t.status !== "completed").length,
    },
    {
      id: "low",
      label: t("priority.low"),
      number: tasks
        .filter((t) => t.priority === "low")
        .filter((t) => t.status !== "completed").length,
    },
  ];

  return (
    <ul className="grid grid-cols-4 gap-3">
      {items.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => setFilter(filter === item.id ? "" : item.id)}
            className={`w-full h-full cursor-pointer p-1 rounded-xl transition-all duration-300 ${
              filter === item.id
                ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                : "bg-white border-2 border-secondary-200 hover:border-secondary-400 text-primary-500"
            }`}
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium truncate">{item.label}</span>
              <span
                className={`text-lg font-bold ${
                  filter === item.id ? "text-white" : "text-primary-500"
                }`}
              >
                {item.number}
              </span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
