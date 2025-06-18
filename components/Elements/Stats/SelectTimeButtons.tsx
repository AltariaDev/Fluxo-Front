import ButtonDropDown from "@/components/Reusable/ButtonDropDown";
import { Dispatch, SetStateAction } from "react";

export default function SelectTimeButtons({
  monthOptions,
  weekOptions,
  selectedWeek,
  setSelectedMonth,
  setSelectedYear,
  selectedMonth,
  selectedYear,
}: {
  monthOptions: { label: string; type: string }[];
  weekOptions?: {
    label: string;
    onClick: () => void;
  }[];
  selectedWeek?: string;
  setSelectedMonth: Dispatch<SetStateAction<string>>;
  setSelectedYear: Dispatch<SetStateAction<string>>;
  selectedMonth: string;
  selectedYear: string;
}) {
  const yearOptions = ["2023", "2024", "2025", "2026"];

  return (
    <div className="w-full flex justify-end gap-2">
      {selectedWeek && weekOptions && (
        <ButtonDropDown
          className="border-2 border-secondary-700 py-0.5"
          items={weekOptions}
        >
          Semana: {selectedWeek}
        </ButtonDropDown>
      )}
      <ButtonDropDown
        className="border-2 border-secondary-700 py-0.5"
        items={monthOptions.map((month) => ({
          label: month.label,
          onClick: () => setSelectedMonth(month.type),
        }))}
      >
        {monthOptions.find((month) => month.type === selectedMonth)?.label ||
          selectedMonth}
      </ButtonDropDown>
      <ButtonDropDown
        className="border-2 border-secondary-700 py-0.5"
        items={yearOptions.map((year) => ({
          label: year,
          onClick: () => setSelectedYear(year),
        }))}
      >
        {selectedYear}
      </ButtonDropDown>
    </div>
  );
}
