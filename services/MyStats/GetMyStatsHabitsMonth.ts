"use server";
import { apiClient } from "../api";

export async function GetMyStatsHabitsMonth({
  month,
  year,
}: {
  month: number[];
  year: number;
}): Promise<{
  success: boolean;
  data: any;
}> {
  try {
    const res = await apiClient.get(
      `user-logs/habits/${month[0]}-${year}/${month[1]}-${year}`
    );

    return { success: true, data: res.response };
  } catch (error: any) {
    console.error("Error gettin stats of user:", error);

    return { success: false, data: error.message };
  }
}
