"use server";
import { apiClient } from "../api";

export async function GetMyStatsPomodoroWeek({
  week,
  year,
}: {
  week: number;
  year: number;
}): Promise<{
  success: boolean;
  data: any;
}> {
  try {
    const res = await apiClient.get(`user-logs/pomodoro/${year}/${week}`);

    return { success: true, data: res };
  } catch (error: any) {
    console.error("Error gettin stats of user:", error);

    return { success: false, data: error.message };
  }
}
