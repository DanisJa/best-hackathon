import React from "react";
import Logo from "../ui/logo";
import HighlightedButton from "../ui/highlightedButton";

import {
  HiOutlineCog,
  HiOutlineDesktopComputer,
  HiOutlineHome,
  HiOutlineNewspaper,
  HiOutlineQuestionMarkCircle,
  HiOutlineSparkles,
} from "react-icons/hi";

function Sidebar() {
  return (
    <div className="w-3xs h-screen flex flex-col ">
      <Logo />
      <div className="flex flex-col items-start justify-center space-y-8 mt-8 ml-2">
        <HighlightedButton linkTo="home">
          <HiOutlineHome className="size-6" />
        </HighlightedButton>
        <HighlightedButton linkTo="monitoring">
          <HiOutlineDesktopComputer className="size-6" />
        </HighlightedButton>
        <HighlightedButton linkTo="rizla">
          <HiOutlineNewspaper className="size-6" />
        </HighlightedButton>
        <HighlightedButton linkTo="tegla">
          <HiOutlineSparkles className="size-6" />
        </HighlightedButton>
      </div>

      <div className="mt-auto flex flex-col ml-2 space-y-8 mb-8">
        <HighlightedButton linkTo="#">
          <HiOutlineQuestionMarkCircle className="size-6" />
        </HighlightedButton>
        <HighlightedButton linkTo="#">
          <HiOutlineCog className="size-6" />
        </HighlightedButton>
      </div>
    </div>
  );
}

export default Sidebar;
