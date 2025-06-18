import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const StreaksBg1 = dynamic(
  () => import("@/components/Elements/Svg/Streaks/StreaksBg1")
);
const StreaksBg2 = dynamic(
  () => import("@/components/Elements/Svg/Streaks/StreaksBg2")
);
const StreaksBg3 = dynamic(
  () => import("@/components/Elements/Svg/Streaks/StreaksBg3")
);
const StreaksBgMax = dynamic(
  () => import("@/components/Elements/Svg/Streaks/StreaksBgMax")
);
const StreaksNull = dynamic(
  () => import("@/components/Elements/Svg/Streaks/StreaksNull")
);

export default function Streaks({ number }: { number: number }) {
  const t = useTranslations("Dashboard.streaks");

  const text = (): { title: string; desc: string } => {
    switch (number) {
      case 0:
        return {
          title: t("levels.level0.title"),
          desc: t("levels.level0.description"),
        };
      default:
        if (number >= 1 && number < 3)
          return {
            title: t("levels.level1.title"),
            desc: t("levels.level1.description"),
          };
        if (number >= 3 && number < 15) {
          return {
            title: t("levels.level2.title"),
            desc: t("levels.level2.description"),
          };
        }
        if (number >= 15 && number < 30)
          return {
            title: t("levels.level3.title"),
            desc: t("levels.level3.description"),
          };
        if (number >= 30)
          return {
            title: t("levels.level4.title"),
            desc: t("levels.level4.description"),
          };
        return {
          title: "",
          desc: "",
        };
    }
  };

  return (
    <TemplateDashboard
      title=""
      grid={`h-full flex flex-col justify-between lg:col-span-2 ${
        number <= 0
          ? "bg-gradient-to-br from-tertiary-700 to-tertiary-800 text-white"
          : "bg-gradient-to-br from-secondary-100 to-secondary-200 text-primary-700"
      }`}
      link=""
      id="streaks-component"
    >
      <div className="w-full z-20 space-y-2">
        <p className="text-2xl font-bold tracking-tight">{text().title}</p>
        <p className="text-sm text-secondary-700/80 text-">{text().desc}</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="w-full text-center px-4 py-2 text-sm bg-secondary-600/90 backdrop-blur-sm z-10 rounded-full text-white font-medium">
          {number} {number <= 1 ? t("days.single") : t("days.multiple")}
        </p>

        {/* <div className="absolute w-full">
          {number === 0 ? (
            <StreaksNull />
          ) : number >= 1 && number < 3 ? (
            <StreaksBg1 />
          ) : number >= 3 && number < 15 ? (
            <StreaksBg2 />
          ) : number >= 15 && number < 30 ? (
            <StreaksBg3 />
          ) : (
            number >= 30 && <StreaksBgMax />
          )}
        </div> */}
      </div>
    </TemplateDashboard>
  );
}
