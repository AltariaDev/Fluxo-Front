"use client";
import TemplateDashboard from "../../../Elements/General/TemplateBox";
import { Clock, Timer as TimerIcon } from "lucide-react";
import {
  useIsChronometer,
  useIsType,
  useStartedElement,
  useTimerStore,
} from "@/stores/timerStore";
import PomodoroContainer from "./Pomodoro/PomodoroContainer";
import AddTask from "./Pomodoro/AddTask";
import Commands from "@/components/Elements/Pomodoro/Commands";
import { useTranslations } from "next-intl";

export default function Pomodoro() {
  const { setIsType, toggleChronometerMode } = useTimerStore(
    (state) => state.actions
  );
  const isChronometer = useIsChronometer();
  const startedElement = useStartedElement();
  const isType = useIsType();

  const t = useTranslations("Dashboard.pomodoro");

  const handleChangeType = (
    e: "pomodoro" | "cronometro" | "temporizador",
    cronometro: boolean
  ) => {
    setIsType(e);
    toggleChronometerMode(cronometro);
  };

  return (
    <TemplateDashboard
      grid={`h-full flex flex-col gap-6 lg:col-span-4`}
      title={isType}
      link="/pomodoro"
      id="pomodoro-component"
      items={[
        {
          label: t("title"),
          icon: <Clock className="size-5" />,
          disabled: startedElement,
          onClick: () => handleChangeType("pomodoro", false),
        },
        {
          label: t("chronometer"),
          icon: <TimerIcon className="size-5" />,
          disabled: startedElement,
          onClick: () => handleChangeType("cronometro", true),
        },
        // {
        //   label: "Temporizador",
        //   icon: <AlarmClock />,
        //   disabled: startedElement,
        //   onClick: () => handleChangeType("temporizador", false),
        // },
      ]}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <PomodoroContainer size="medium" />
        {!isChronometer && <AddTask />}
        <Commands fullScreen={false} />
      </div>
    </TemplateDashboard>
  );
}
