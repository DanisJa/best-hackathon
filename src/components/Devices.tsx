import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../utils/supabase";
import { Card, CardContent } from "./ui/card";
import Switch from "./ui/Switch";
import { FaTv } from "react-icons/fa";
import { CgMusicSpeaker } from "react-icons/cg";
import { LuCable } from "react-icons/lu";
import { TbAirConditioningDisabled } from "react-icons/tb";
import { MdOutlineRouter } from "react-icons/md";

// Define the type for a device
type Device = {
  id: number;
  name: string;
  status: boolean;
  energy_limit: number;
  icon_id: number; // New field for icon mapping
};

// Icon mapping based on icon_id
const iconMap: { [key: number]: React.ElementType } = {
  1: FaTv,
  2: CgMusicSpeaker,
  3: LuCable,
  4: TbAirConditioningDisabled,
  5: MdOutlineRouter,
};

const fetchDevices = async (): Promise<Device[]> => {
  try {
    const userData =
      localStorage.getItem("sb-user-data") ||
      sessionStorage.getItem("sb-user-data");
    if (!userData) {
      throw new Error("User data not found in localStorage or sessionStorage");
    }
    const user = JSON.parse(userData).id;

    const { data, error } = await supabase
      .from("devices")
      .select("*")
      .eq("user_id", user)
      .order("id", { ascending: true });
    if (error) throw new Error(error.message);
    return data as Device[];
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }
};

const updateDeviceStatus = async (
  id: number,
  status: boolean
): Promise<void> => {
  try {
    const { error } = await supabase
      .from("devices")
      .update({ status })
      .eq("id", id);
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error("Error updating device status:", error);
    throw error;
  }
};

const Devices = () => {
  const queryClient = useQueryClient();

  const {
    data: devices,
    isLoading,
    isError,
  } = useQuery<Device[]>({
    queryKey: ["devices"],
    queryFn: fetchDevices,
  });

  const [deviceStates, setDeviceStates] = useState<{ [key: number]: boolean }>(
    {}
  );

  // Synchronize local state with fetched data
  useEffect(() => {
    if (devices) {
      const initialState = devices.reduce((acc, device) => {
        acc[device.id] = device.status;
        return acc;
      }, {} as { [key: number]: boolean });
      setDeviceStates(initialState);
    }
  }, [devices]);

  const mutation = useMutation<void, Error, { id: number; status: boolean }>({
    mutationFn: ({ id, status }) => updateDeviceStatus(id, status),
    onMutate: async ({ id, status }) => {
      setDeviceStates((prev) => ({
        ...prev,
        [id]: status,
      }));
      return { previousStates: deviceStates };
    },
    onError: (err, variables, context) => {
      if (context?.previousStates) {
        setDeviceStates(context.previousStates);
      }
      console.error("Error updating device status:", err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });

  const onToggle = (id: number) => {
    const newStatus = !deviceStates[id];
    mutation.mutate({ id, status: newStatus });
  };

  if (isLoading) {
    return (
      <div className="text-center text-themeGray-500">Loading devices...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Failed to load devices.</div>
    );
  }

  return (
    <Card className="p-6 rounded-lg shadow-md max-h-fit">
      <h2 className="text-2xl font-bold mb-4">My Devices</h2>
      <div className="space-y-4 grid grid-cols-3 gap-6">
        {devices?.map((device) => {
          const IconComponent = iconMap[device.icon_id] || FaTv; // Default to FaTv if missing
          return (
            <Card
              key={device.id}
              className="bg-[#252525] border-0 w-[200px] max-h-fit"
            >
              <CardContent>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between w-full p-2 rounded-lg">
                    <IconComponent className="w-8 h-8 text-white" />{" "}
                    {/* Dynamic icon */}
                    <Switch
                      checked={deviceStates[device.id] ?? device.status}
                      onCheckedChange={() => onToggle(device.id)}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {device.name}
                    </h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-400">Active for 3 hours</p>
                    <div className="flex items-center gap-8">
                      <span className="text-sm font-bold text-emerald-500">
                        {device.energy_limit}kWh
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};

export default Devices;
