import { useQuery } from "@tanstack/react-query";
import { Card } from "./ui/card";
import supabase from "../utils/supabase";

interface User {
  id: string;
  email: string;
  eco_pet_level: number;
  eco_pet_xp: number;
}

const fetchLeaderboard = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, eco_pet_level, eco_pet_xp")
    .order("eco_pet_level", { ascending: false })
    .limit(5);
  if (error) throw new Error(error.message);
  return data || [];
};

const Leaderboard = () => {
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard,
  });

  if (isLoading)
    return (
      <div className="text-center text-gray-500">Loading leaderboard...</div>
    );
  if (isError)
    return (
      <div className="text-center text-red-500">
        Failed to load leaderboard.
      </div>
    );

  return (
    <Card className="p-6 rounded-lg shadow-md max-w-md mx-auto text-white">
      <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">
        Leaderboard
      </h2>
      <div className="flex justify-center items-end mb-4">
        <div className="text-center">
          <div className="bg-gray-700 p-4 rounded-lg text-white w-20 h-[100px]">
            <p>2nd</p>
            <p className="text-2xl">🥈</p>
          </div>
          <p>{users[1]?.email.split("@")[0]}</p>
          <p>Lvl {users[1]?.eco_pet_level ?? 0} </p>
          <p>{users[1]?.eco_pet_xp ?? 0} XP</p>
        </div>
        <div className="mx-4 text-center">
          <div className="bg-green-500 p-4 rounded-lg text-white w-24 h-[120px]">
            <p>1st</p>
            <p className="text-3xl">🥇</p>
          </div>
          <p>{users[0]?.email.split("@")[0]}</p>
          <p>Lvl {users[0]?.eco_pet_level ?? 0} </p>
          <p>{users[0]?.eco_pet_xp ?? 0} XP</p>
        </div>
        <div className="text-center">
          <div className="bg-orange-500 p-4 rounded-lg text-white w-20">
            <p>3rd</p>
            <p className="text-xl">🥉</p>
          </div>
          <p>{users[2]?.email.split("@")[0]}</p>
          <p>Lvl {users[2]?.eco_pet_level ?? 0} </p>
          <p>{users[2]?.eco_pet_xp ?? 0} XP</p>
        </div>
      </div>
      <p className="text-green-400 text-center font-semibold">
        {users[0]?.email.split("@")[0]} is on top of the leaderboard!
      </p>
      <div className="bg-[#252525] rounded-lg mt-4">
        <div className="grid grid-cols-4 gap-2 text-white bg-[#7a7a7a] p-4 rounded-t-lg">
          <span>Name</span>
          <span>Place</span>
          <span>Level</span>
          <span>XP Points</span>
        </div>
        {users.map((user, index) => (
          <div
            key={user.id}
            className="grid grid-cols-4 gap-2 mt-2 text-white p-4 "
          >
            <span>{user.email.split("@")[0]}</span>
            <span>{index + 1}</span>
            <span>{user.eco_pet_level}</span>
            <span>{user.eco_pet_xp}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Leaderboard;
