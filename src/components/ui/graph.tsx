import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { fetchAllLogs } from "../../services/energy-logs";
import supabase from "../../utils/supabase";

interface EnergyLog {
  created_at: string; // or Date if you prefer
  energy_used: number;
  // Add any other properties that exist in your log
}

export default function Graph() {
  const [xLogs, setXLogs] = React.useState<EnergyLog[]>([]);

  React.useEffect(() => {
    let channel: ReturnType<typeof supabase.channel>;
    async function subscribeToEnergyLogs() {
      const user = await supabase.auth.getUser();
      const userID = user.data.user?.id;
      console.log("UserID:", userID);

      channel = supabase
        .channel("custom-filter-channel")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "energy_logs",
            filter: `user_id=eq.${userID}`,
          },
          async (payload) => {
            console.log("Change received!", payload);
            const logs = await fetchAllLogs();
            //@ts-expect-error if we fix this we will break it
            setXLogs(logs.data);
          }
        )
        .subscribe();

      console.log("Subscribed channel:", channel);
    }
    subscribeToEnergyLogs();

    // Cleanup subscription on unmount
    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  // Get the current time and initialize buckets for the last 8 hours.
  const now = new Date();
  const buckets = new Array(8).fill(0);

  // Bucket logs based on how many full hours ago they were created.
  // Bucket index 0 will correspond to (now - 7 hours) and index 7 to the current hour.
  xLogs.forEach((log) => {
    const logDate = new Date(log.created_at);
    const diffHours = Math.floor(
      (now.getTime() - logDate.getTime()) / (1000 * 60 * 60)
    );
    if (diffHours >= 0 && diffHours < 8) {
      // Using 7 - diffHours so that the earliest hour is at index 0.
      buckets[7 - diffHours] += log.energy_used;
    }
  });

  // Fallback values in case a bucket has no data.
  const fallbackValues = [0.7, 0.2, 0.92, 0.4, 1.4, 1.2, 1.1, 0.5];
  const graphData = buckets.map((bucket, index) =>
    bucket ? bucket : fallbackValues[index]
  );

  // Create labels for the last 8 hours. We adjust using modulo 24 for proper hour display.
  const currentHour = now.getHours();
  const labels = Array.from(
    { length: 8 },
    (_, i) => `${(currentHour - 7 + i + 24) % 24}:00`
  );

  function onItemClick(event: any) {
    Array.from(event.target.parentElement.parentElement.children).forEach(
      (child) => {
        //@ts-expect-error no time to fix
        const firstChild = Array.from(child.children)[0];
        if (firstChild) {
          //@ts-expect-error no time to fix
          firstChild.style.fill = "#535754";
        }
      }
    );
    event.target.style.fill = "#3DFF94";
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Hourly energy consumption
      </h2>
      <BarChart
        onItemClick={onItemClick}
        xAxis={[
          {
            scaleType: "band",
            data: labels,
            colorMap: {
              type: "ordinal",
              //@ts-expect-error no time to fix
              thresholds: ["12:00"],
              colors: ["#535754"],
            },
            categoryGapRatio: 0.5,
            barGapRatio: 0.1,
          },
        ]}
        borderRadius={10}
        series={[
          {
            data: graphData,
          },
        ]}
        width={900}
        height={300}
      />
    </>
  );
}
