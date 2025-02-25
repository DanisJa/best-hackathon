import { Card, CardTitle } from "./ui/card";
import { MdPets } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa";
import ProgressBar from "./ProgressBar";
import { useQuery } from "@tanstack/react-query";
import supabase from "../utils/supabase"; // Import your Supabase client
import bear from "../assets/bear.svg";
import bear_happy from "../assets/bear_happy.svg";
import bear_sad from "../assets/bear_sad.svg";
import { useUserData } from "../hooks/User";
import { useUserConsumptionStatus } from "../hooks/PetHappiness";

// Fetch pet data from Supabase
const fetchPetData = async (userId: string) => {
  const { data, error } = await supabase
    .from("users") // Replace "users" with your table name
    .select("eco_pet_level, eco_pet_xp")
    .eq("id", userId)
    .single(); // Assuming "id" is the column for user ID

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
};

const MyPalCard = () => {
  const { data: user } = useUserData();
  const userId = user?.publicUser.id;
  const { data: petStatus, isLoading: isPetStatusLoading } =
    useUserConsumptionStatus(userId);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["petData", userId],
    queryFn: () => fetchPetData(userId),
    enabled: !!userId, // Only fetch if userId exists
  });
  if (isPetStatusLoading) return <p>Loading...</p>;

  let bearStatusImage = bear;
  console.log(petStatus);
  if (isPetStatusLoading) {
    return <div>Still loading...</div>;
  }
  if (petStatus?.status === "HAPPY") {
    bearStatusImage = bear_happy;
  } else if (petStatus?.status === "CONTENT") {
    bearStatusImage = bear;
  } else if (petStatus?.status === "SAD") {
    bearStatusImage = bear_sad;
  }
  // Fetch pet data using TanStack Query

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching pet data</div>;

  // Extract eco_pet_level and eco_pet_exp from the fetched data
  const ecoPetLevel = data?.eco_pet_level || 0;
  const ecoPetExp = data?.eco_pet_xp || 0;

  // Process eco_pet_exp: get last two digits, round up to the nearest integer
  const lastTwoDigits = ecoPetExp % 100; // Get last two digits
  const roundedExp = Math.ceil(lastTwoDigits / 10) * 10; // Round up to nearest 10
  const progress = roundedExp / 10; // Convert to progress (e.g., 70 => 7)

  return (
    <Card className="p-6 rounded-lg shadow-md max-h-fit max-w-fit text-white flex flex-col">
      <CardTitle className="text-center text-3xl text-[#3DFF94]">
        Lewis, Polar Bear{" "}
        {petStatus?.user_avg_consumption &&
          `is spending ${Math.round(petStatus.user_avg_consumption)} kWh`}
      </CardTitle>
      <div className="flex flex-row gap-6 px-4 justify-center">
        <Card className="bg-[#252525] max-w-fit py-4 px-4">
          <MdPets className="text-3xl text-[#3DFF94]" />
        </Card>
        <div className="flex flex-col justify-around">
          <div className="flex flex-row justify-between">
            <p className="text-md">Level {ecoPetLevel}</p>
            <p className="text-md text-gray-400">{roundedExp}%</p>
          </div>
          <ProgressBar progress={progress}></ProgressBar>
        </div>
        <Card className="bg-[#252525] max-w-fit py-4 px-4 flex flex-row items-center">
          <span className="text-white">Daily Task</span>
          <FaHourglassHalf className="text-3xl text-[#3DFF94]" />
        </Card>
      </div>

      <div>
        <img
          src={bearStatusImage}
          className="max-w-[500px] h-[500px] object-contain mx-auto"
        />
      </div>
    </Card>
  );
};

export default MyPalCard;
