"use client";
import { Lightbulb, HelpCircle, Bug, Star } from "lucide-react";
import Button from "@/components/Reusable/Button";
import { useModalStore } from "@/stores/modalStore";
import { useProfile } from "@/stores/profileStore";
import { useTranslations } from "next-intl";

export default function SupportClient() {
  const { setIsOpen } = useModalStore((state) => state.actions);
  const profile = useProfile();
  const t = useTranslations("Support");

  const supportOptions = [
    {
      icon: <Bug size={40} className="text-primary-500" />,
      title: t("bug.title"),
      description: t("bug.description"),
      type: "bug",
    },
    {
      icon: <Lightbulb size={40} className="text-primary-500" />,
      title: t("idea.title"),
      description: t("idea.description"),
      type: "idea",
    },
    {
      icon: <HelpCircle size={40} className="text-primary-500" />,
      title: t("help.title"),
      description: t("help.description"),
      type: "help",
    },
    {
      icon: <Star size={40} className="text-primary-500" />,
      title: t("feedback.title"),
      description: t("feedback.description"),
      type: "feedback",
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-8 w-full justify-center items-center min-h-screen">
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl font-bold text-primary-500 mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-gray-600">
          {t("description")}{" "}
          <span className="font-semibold capitalize">
            {profile?.user?.fullname}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {supportOptions.map((option) => (
          <div
            key={option.type}
            className="bg-white border border-primary-500 rounded-lg shadow-md p-6 flex flex-col items-center text-center gap-4 hover:shadow-lg transition-shadow duration-300"
          >
            {option.icon}
            <h2 className="text-xl font-semibold">{option.title}</h2>
            <p className="text-gray-600 text-sm flex-grow">
              {option.description}
            </p>
            <div className="mt-auto w-full">
              <Button
                type="button"
                size="large"
                button="secondary"
                onClick={() =>
                  setIsOpen({ text: "contact", other: option.type })
                }
                className="w-full"
              >
                {t("contact")}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>{t("responseTime")}</p>
        <p className="mt-2">{t("emergency")}</p>
      </div>
    </div>
  );
}
