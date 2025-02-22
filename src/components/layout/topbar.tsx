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

import { Bell } from "lucide-react";
import { Input } from "../ui/input";
// import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
<<<<<<< HEAD
import LogoutButton from "../LogoutButton";
=======
import Search from "../ui/search";
>>>>>>> f6ed82d69b36fb74774e98cfb3e4c82fddb737d3
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <Card className="mb-4">
      <div className="container flex items-center justify-between px-4 mx-auto my-2">
        <div className="flex items-center gap-4">
          <Search />
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
