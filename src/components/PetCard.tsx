import { useState } from "react";
import { Card } from "./ui/card";
import { MdPets } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa";
import ProgressBar from "./ProgressBar";
import { useQuery } from "@tanstack/react-query";
import supabase from "../utils/supabase"; // Import your Supabase client
import bear from "../assets/bear.svg";
import bear_happy from "../assets/bear_happy.svg";
import { useNavigate } from "react-router";
import { useUserData } from "../hooks/User";
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

const PetCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  // Get user ID from session or local storage
  const {
    data: user,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useUserData();
  if (isUserError) console.log(isUserError);
  if (isUserLoading) console.log(isUserLoading);

  const userId = user?.publicUser.id;
  // Fetch pet data using TanStack Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["petData", userId],
    queryFn: () => fetchPetData(userId),
    enabled: !!userId, // Only fetch if userId exists
  });

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
    // <Card className="p-6 rounded-lg shadow-md max-h-fit max-w-fit text-white flex flex-col">
    <>
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

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate("/mypal")}
        className="transition-transform duration-300 ease-in-out transform hover:scale-110"
      >
        <img
          src={isHovered ? bear_happy : bear}
          alt={isHovered ? "Happy Bear" : "Bear"}
          className="max-w-[300px] h-[300px] object-contain mx-auto"
        />
      </div>
    </>
    // </Card>
  );
};

export default PetCard;
