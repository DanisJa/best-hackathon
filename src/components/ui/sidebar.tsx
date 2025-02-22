import React from "react";
import Logo from "./Logo";
import HighlightedButton from "./highlightedButton";
import homeIcon from "../../assets/home.svg";
import monitoring from "../../assets/monitoring.svg";
import rizla from "../../assets/rizla.svg";
import tegla from "../../assets/tegla.svg";

import { HiOutlineHome } from "react-icons/hi";

function Sidebar() {
  return (
    <div className="w-3xs border-r-2 border-[#333] h-screen">
      <Logo />
      <div className="flex flex-col items-start justify-center space-y-8 mt-8 ml-2">
        <HighlightedButton linkTo="home">
          <HiOutlineHome className="size-6" />
          {/* <img src={homeIcon} alt="home" /> */}
        </HighlightedButton>
        <HighlightedButton linkTo="monitoring">
          <img src={monitoring} alt="monitoring" />
        </HighlightedButton>
        <HighlightedButton linkTo="rizla">
          <img src={rizla} alt="rizla" />
        </HighlightedButton>
        <HighlightedButton linkTo="tegla">
          <img src={tegla} alt="tegla" />
        </HighlightedButton>
      </div>
    </div>
  );
}

export default Sidebar;
