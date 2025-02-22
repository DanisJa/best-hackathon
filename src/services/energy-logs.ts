import supabase from "../utils/supabase";

export async function fetchAllLogs() {
  const user = await supabase.auth.getUser();
  const userID = user.data.user?.id;

  // const channels = supabase
  //   .channel("custom-filter-channel")
  //   .on(
  //     "postgres_changes",
  //     {
  //       event: "*",
  //       schema: "public",
  //       table: "energy_logs",
  //       filter: `user_id=eq.${userID}`,
  //     },
  //     (payload) => {
  //       console.log("Change received!", payload);
  //     }
  //   )
  //   .subscribe();

  const { data, error } = await supabase
    .from("energy_logs")
    .select("*")
    .eq("user_id", userID);
  // console.log(channels);

  return { data, error };
}
