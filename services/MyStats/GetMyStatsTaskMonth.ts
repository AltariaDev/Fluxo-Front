"use server";
import { apiClient } from "../api";

export async function GetMyStatsTaskMonth({
  month,
  year,
}: {
  month: number[];
  year: string;
}): Promise<{
  success: boolean;
  data: any;
}> {
  try {
    const res = await apiClient.get(
      `user-logs/tasks/${month[0]}-${year}/${month[1]}-${year}`
    );

    return { success: true, data: res };
  } catch (error: any) {
    console.error("Error gettin stats of user:", error);

    return { success: false, data: error.message };
  }
}
