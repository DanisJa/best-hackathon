import Leaderboard from "../components/Leaderboard";
import MyPalCard from "../components/MyPalCard";

function MyPal() {
  return (
    <div className="flex flex-row gap-4">
      <MyPalCard />
      <Leaderboard />
    </div>
  );
}

export default MyPal;
