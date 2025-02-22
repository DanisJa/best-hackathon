// import React from "react";
// import { Card } from "../ui/card";
// import Search from "../ui/search";

// function TopBar() {
//   return (
//     <Card className="w-full flex justify-between items-center py-0">

//       {/* <Search /> */}
//       {/* <p>Zed</p> */}
//     </Card>
//   );
// }

// export default TopBar;

import { Bell, Search } from "lucide-react";
import { Input } from "../ui/input";
// import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import LogoutButton from "../LogoutButton";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <Card className="mb-4">
      <div className="container flex items-center justify-between px-4 mx-auto my-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="search"
            placeholder="Search"
            className="w-full pl-10 bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 focus-visible:ring-zinc-700"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-zinc-100"
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <div className="flex items-center gap-2">
            {/* <Avatar className="h-8 w-8"> */}
            {/* <AvatarImage src="https://v0.dev/placeholder.svg" /> */}
            {/* <AvatarFallback>DN</AvatarFallback> */}
            {/* </Avatar> */}
            <span className="text-sm font-medium text-zinc-100">Hi, Danis</span>
            <LogoutButton />
          </div>
        </div>
      </div>
    </Card>
  );
}
