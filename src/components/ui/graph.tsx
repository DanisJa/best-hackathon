import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { fetchAllLogs } from "../../services/energy-logs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import supabase from "../../utils/supabase";

export default function Graph() {
  let graphData = [];
  graphData = Array(9).fill(Math.random() * 1.5);
  console.log(graphData);

  const [xLogs, setXLogs] = React.useState([]);

  React.useEffect(() => {
    async function subscribeToEngergyLogs() {
      const user = await supabase.auth.getUser();
      const userID = user.data.user?.id;

      console.log(userID);

      const channels = supabase
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
            // queryClient.invalidateQueries({ queryKey: ["energy_logs"] });
            // refetchEnergyLogs();
            const podaci = await fetchAllLogs();
            setXLogs(podaci.data);
          }
        )
        .subscribe();

      console.log(channels);
    }

    subscribeToEngergyLogs();
  }, [setXLogs]);

  // console.log(
  const totalEnergyUsedLastHour = xLogs.reduce((acc, log) => {
    return new Date(log.created_at).getHours() === new Date().getHours()
      ? acc + log.energy_used
      : acc;
  }, 0);

  const totalEnergyUsedLastTwoHours = xLogs.reduce((acc, log) => {
    return new Date(log.created_at).getHours() - new Date().getHours() == -1
      ? acc + log.energy_used
      : acc;
  }, 0);
  const totalEnergyUsedLastThreeHours = xLogs.reduce((acc, log) => {
    return new Date(log.created_at).getHours() - new Date().getHours() == -1
      ? acc + log.energy_used
      : acc;
  }, 0);
  const totalEnergyUsedLastFourthHours = xLogs.reduce((acc, log) => {
    return new Date(log.created_at).getHours() - new Date().getHours() == -1
      ? acc + log.energy_used
      : acc;
  }, 0);
  const totalEnergyUsedLastFifthHours = xLogs.reduce((acc, log) => {
    return new Date(log.created_at).getHours() - new Date().getHours() == -1
      ? acc + log.energy_used
      : acc;
  }, 0);
  const totalEnergyUsedLastSixthHours = xLogs.reduce((acc, log) => {
    return new Date(log.created_at).getHours() - new Date().getHours() == -1
      ? acc + log.energy_used
      : acc;
  }, 0);
  const totalEnergyUsedLastSeventhHours = xLogs.reduce((acc, log) => {
    return new Date(log.created_at).getHours() - new Date().getHours() == -1
      ? acc + log.energy_used
      : acc;
  }, 0);
  const totalEnergyUsedLastEightHours = xLogs.reduce((acc, log) => {
    return new Date(log.created_at).getHours() - new Date().getHours() == -1
      ? acc + log.energy_used
      : acc;
  }, 0);

  graphData = [
    totalEnergyUsedLastEightHours || 0.7,
    totalEnergyUsedLastSeventhHours || 0.2,
    totalEnergyUsedLastSixthHours || 0.92,
    totalEnergyUsedLastFifthHours || 0.4,
    totalEnergyUsedLastFourthHours || 1.4,
    totalEnergyUsedLastThreeHours || 1.2,
    totalEnergyUsedLastTwoHours || 1.1,
    totalEnergyUsedLastHour || 0.5,
  ];

  console.log("Total Energy Used:", totalEnergyUsedLastHour);

  // console.log(xLogs);

  // console.log(xLogs);

  function onItemClick(event, d) {
    Array.from(event.target.parentElement.parentElement.children).forEach(
      (child: HTMLElement) => {
        const firstChild = Array.from(child.children)[0] as
          | HTMLElement
          | undefined;
        if (firstChild) {
          firstChild.style.fill = "#535754";
        }
      }
    );
    event.target.style.fill = "#3DFF94";
  }

  // const now = new Date().now().toHours();
  const now = new Date().getHours();

  const data = graphData;
  const labels = [
    `${now - 7}:00`,
    `${now - 6}:00`,
    `${now - 5}:00`,
    `${now - 4}:00`,
    `${now - 3}:00`,
    `${now - 2}:00`,
    `${now - 1}:00`,
    `${now}:00`,
  ];

  return (
    <BarChart
      onItemClick={onItemClick}
      xAxis={[
        {
          scaleType: "band",
          data: labels,
          colorMap: {
            type: "ordinal",
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
      width={800}
      height={300}
    />
  );
}
