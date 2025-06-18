"use client";

import { useEffect, useState } from "react";
import { TaskType } from "@/interfaces/Task/TaskType";
import ListTask from "@/components/Pages/(Nav & Top)/Dashboard/Task/ListTask";
import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import StatusCards from "@/components/Pages/(Nav & Top)/Dashboard/Task/StatusCards";
import {
  useDashboardStore,
  useLoadingTask,
  useTasks,
} from "@/stores/dashboardStore";
import { useTranslations } from "next-intl";
import Button from "@/components/Reusable/Button";
import { useModalStore } from "@/stores/modalStore";

export default function Task({ tasksList }: { tasksList: TaskType[] }) {
  const { setTasks } = useDashboardStore((state) => state.actions);
  const { setIsOpen } = useModalStore((state) => state.actions);
  const tasks = useTasks();
  const loadingTask = useLoadingTask();

  const [filter, setFilter] = useState<string>("");
  const t = useTranslations("Dashboard.tasks");
  const t2 = useTranslations("Common.buttons");

  useEffect(() => {
    setTasks(tasksList);
  }, [tasksList, setTasks]);

  return (
    <TemplateDashboard
      grid={`h-full flex flex-col gap-6 lg:col-span-8 max-h-screen`}
      title={t("title")}
      link="/task"
      id="tasks-component"
    >
      <StatusCards filter={filter} setFilter={setFilter} tasks={tasks} />

      <div className="flex flex-col gap-4 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium text-primary-500">
            {filter === ""
              ? t("pending")
              : filter !== "Completada"
                ? t("priority.title")
                : t("completed")}
          </p>

          <Button
            size="compact"
            onClick={() => setIsOpen({ text: "task" })}
            button="tertiary"
            type="button"
            className="text-sm"
          >
            {t2("newTask")}
          </Button>
        </div>

        <ListTask filter={filter} tasks={tasks} loadingTask={loadingTask} />
      </div>
    </TemplateDashboard>
  );
}
