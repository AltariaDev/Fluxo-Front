import PriorityBadge from "@/components/Elements/General/PriorityBadge";
import { useModalStore } from "@/stores/modalStore";
import Menu from "@/components/Reusable/Menu";
import { TaskType } from "@/interfaces/Task/TaskType";
import { Pen, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useToastStore } from "@/stores/toastStore";

export default function TaskCard({
  task,
  setIsChange,
  isChange,
}: {
  setIsChange: (taskId: string) => void;
  isChange: boolean;
  task: TaskType;
}) {
  const { setIsOpen } = useModalStore((state) => state.actions);
  const { removeTask, updateTask } = useDashboardStore(
    (state) => state.actions
  );
  const { addToast } = useToastStore();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChange && cardRef.current) {
      const keyframes = [
        { transform: "scale(1)" },
        { transform: "scale(0.97)", offset: 0.1 },
        { transform: "scale(0.97)", offset: 0.5 },
        {
          transform: `scale(0.97) translateX(${
            task.status === "completed" ? "" : "-"
          }30px)`,
          offset: 0.9,
        },
        {
          transform: `scale(1) translateX(${
            task.status === "completed" ? "" : "-"
          }40px)`,
          opacity: 0,
          offset: 1,
        },
      ];

      const options = {
        duration: 1000,
        easing: "ease-in-out",
        fill: "forwards" as FillMode,
      };

      cardRef.current.animate(keyframes, options);
    }
  }, [isChange]);

  const handleStatus = async () => {
    setIsChange(task._id);
    setTimeout(async () => {
      const res = await updateTask(
        task._id,
        task.status === "completed"
          ? { status: "pending" }
          : { status: "completed" }
      );
      if (res.success) {
        addToast({
          message: "Tarea actualizada correctamente",
          description: "La tarea ha sido actualizada correctamente",
          type: "success",
        });
      } else {
        addToast({
          message: "Error al actualizar la tarea",
          type: "error",
          description: res.res as string,
        });
      }
    }, 1000);
  };

  const handleDelete = async () => {
    setIsChange(task._id);
    setTimeout(async () => {
      const res = await removeTask(task._id);
      if (res.success) {
        addToast({
          message: "Tarea eliminada correctamente",
          description: "La tarea ha sido eliminada correctamente",
          type: "success",
        });
      } else {
        addToast({
          message: "Error al eliminar la tarea",
          type: "error",
          description: res.res as string,
        });
      }
    }, 1000);
  };

  return (
    <div
      ref={cardRef}
      className="group transform transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
    >
      <div className="flex items-center gap-3 bg-white rounded-xl border-2 border-secondary-200 hover:border-secondary-400 transition-colors duration-300 p-4">
        <input
          type="checkbox"
          checked={task.status === "completed"}
          onChange={handleStatus}
          className={`cursor-pointer size-5 border-2 rounded-full appearance-none transition-colors duration-300 ${
            task.status === "completed"
              ? "bg-primary-500 border-primary-500"
              : "bg-white border-gray-300 hover:border-primary-500"
          }`}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-primary-500 font-medium truncate">
              {task.title}
            </p>
            <PriorityBadge priority={task.priority} status={task.status} />
          </div>

          <p className="text-sm text-gray-500 truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {task.description}
          </p>
        </div>

        <Menu
          items={[
            {
              label: "Estado",
              subMenu: [
                {
                  label: "Alta",
                  onClick: () => updateTask(task._id, { priority: "high" }),
                  color: "red",
                },
                {
                  label: "Media",
                  onClick: () => updateTask(task._id, { priority: "medium" }),
                  color: "orange",
                },
                {
                  label: "Baja",
                  onClick: () => updateTask(task._id, { priority: "low" }),
                  color: "green",
                },
              ],
            },
            {
              label: "Modificar",
              icon: <Pen size={18} />,
              onClick: () => setIsOpen({ text: "task", other: task }),
            },
            {
              label: "Eliminar",
              color: "red",
              icon: <Trash2 size={18} />,
              onClick: () => handleDelete(),
            },
          ]}
        />
      </div>
    </div>
  );
}
