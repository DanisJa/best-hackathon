import { useQuery } from "@tanstack/react-query";
import supabase from "../utils/supabase";

export interface PetStatus {
  user_id: string;
  user_avg_consumption: number;
  all_avg_consumption: number;
  status: "HAPPY" | "CONTENT" | "SAD";
}

async function getUserConsumptionStatusForUser(userId: string) {
  const { data, error } = await supabase
    .rpc("get_user_consumption_status_for_user", { p_user_id: userId })
    .single();
  if (error) {
    console.error("Error fetching user consumption status:", error);
    throw error;
  }
  return data as PetStatus;
}

export function useUserConsumptionStatus(userId: string) {
  return useQuery({
    queryKey: ["userConsumptionStatus", userId],
    queryFn: () => getUserConsumptionStatusForUser(userId),
    enabled: !!userId, // Only run query if userId exists
  });
}
