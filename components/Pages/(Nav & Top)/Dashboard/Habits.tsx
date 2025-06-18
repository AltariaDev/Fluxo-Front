"use client";

import { useEffect, useState } from "react";

import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import CircleProgressBar from "@/components/Elements/General/HabitsElements/CircleProgress";
import HabitsList from "@/components/Elements/General/HabitsElements/HabitsList";
import Button from "@/components/Reusable/Button";

import { HabitsType } from "@/interfaces/Habits/HabitsType";
import MountainHabits from "@/components/Elements/Svg/Mountain/MountainHabits";
import { useDashboardStore, useHabits } from "@/stores/dashboardStore";
import { useModalStore } from "@/stores/modalStore";
import { useTranslations } from "next-intl";

export default function Habits({ habitsList }: { habitsList: HabitsType[] }) {
  const habits = useHabits();
  const { setHabits } = useDashboardStore((state) => state.actions);
  const { setIsOpen } = useModalStore((state) => state.actions);

  const [porcent, setPorcent] = useState<number>(0);
  const [doneCount, setDoneCount] = useState(0);
  const t = useTranslations("Dashboard.habits");
  const t2 = useTranslations("Common.buttons");

  useEffect(() => {
    setHabits(habitsList);
  }, [habitsList, setHabits]);

  useEffect(() => {
    const completedHabits = habits.filter((habit) => habit.status).length;
    setDoneCount(completedHabits);
    const totalCount = habits.length;
    const percent =
      totalCount > 0 ? Math.round((completedHabits / totalCount) * 100) : 0;
    setPorcent(percent);
  }, [habits]);

  return (
    <TemplateDashboard
      grid={`h-full flex flex-col gap-6 lg:col-span-4 max-h-[calc(100vh-48px)]`}
      title={t("title")}
      link="/habits"
      id="habits-component"
    >
      <div className="flex flex-col items-center justify-between gap-2">
        <CircleProgressBar
          percent={porcent}
          doneCount={doneCount}
          habits={habits}
        />

        <div className="flex w-full items-center place-content-between gap-2">
          <div className="flex gap-3 bg-white p-2 rounded-xl border-2 border-secondary-200">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-secondary-700" />
              <p className="text-xs font-medium text-primary-500">
                {t("completed")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-secondary-200" />
              <p className="text-xs font-medium text-primary-500">
                {t("notCompleted")}
              </p>
            </div>
          </div>
          <Button
            size="compact"
            onClick={() => setIsOpen({ text: "habit" })}
            button="tertiary"
            type="button"
            className="text-xs"
          >
            {t2("newHabit")}
          </Button>
        </div>
      </div>

      {habits.length > 0 ? (
        <HabitsList habits={habits} setHabits={setHabits} />
      ) : (
        <div className="flex-1 bg-secondary-100 rounded-2xl p-5 flex flex-col items-center justify-center gap-4">
          <MountainHabits />
          <div className="flex flex-col items-center text-primary-500 text-center">
            <p className="2xl:text-xl font-medium">{t("noHabits")}</p>
          </div>
        </div>
      )}
    </TemplateDashboard>
  );
}
