import { Bell } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import LogoutButton from "../LogoutButton";
import Search from "../ui/search";

export default function Navbar() {
  return (
    <Card className="mb-4">
      <div className="container flex items-center justify-between px-4 mx-auto my-2 pr-24">
        <Search />

        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-zinc-100"
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
          <div className="flex items-center gap-2">
            {/* <Avatar className="h-8 w-8"> */}
            {/* <AvatarImage src="https://v0.dev/placeholder.svg" /> */}
            {/* <AvatarFallback>DN</AvatarFallback> */}
            {/* </Avatar> */}
            <span className="text-sm font-medium text-zinc-100">Hi, Danis</span>
            <LogoutButton />
          </div>
        </Button>
      </div>
    </Card>
  );
}
