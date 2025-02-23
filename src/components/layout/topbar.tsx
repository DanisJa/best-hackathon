import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import LogoutButton from "../LogoutButton";
import Search from "../ui/search";
import { BsCoin } from "react-icons/bs";
import { useUserData } from "../../hooks/User";

export default function Navbar() {
  const { data: user, isError, isLoading } = useUserData();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching user data</div>;

  return (
    <Card className="mb-4">
      <div className="container flex items-center justify-around px-4 mx-auto my-2 pr-24">
        <Search />
        <Card className="flex flex-row gap-2 items-center px-4 py-2">
          <BsCoin />
          {user?.publicUser.total_points && (
            <span className="ml-1">{user.publicUser.total_points}</span>
          )}
        </Card>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-zinc-100"
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only ">Notifications</span>
          <div className="flex items-center gap-2 ">
            <span className="text-sm font-medium text-zinc-100 mr-2">
              Hi, {user?.authUser.email?.split("@")[0]}
            </span>
            <LogoutButton />
          </div>
        </Button>
      </div>
    </Card>
  );
}
