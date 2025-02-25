import Logo from "../ui/Logo";
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
    <div className="w-3xs  flex flex-col relative ">
      <Logo />
      <div className="flex flex-col items-start justify-center space-y-8 mt-8 ml-2">
        <HighlightedButton linkTo="home">
          <HiOutlineHome className="size-6" />
        </HighlightedButton>
        <HighlightedButton linkTo="mypal">
          <HiOutlineDesktopComputer className="size-6" />
        </HighlightedButton>
        <HighlightedButton linkTo="statistics">
          <HiOutlineNewspaper className="size-6" />
        </HighlightedButton>
        <HighlightedButton linkTo="activities">
          <HiOutlineSparkles className="size-6" />
        </HighlightedButton>
      </div>

      <div className="mt-auto flex flex-col ml-2 space-y-8 mb-8 fixed bottom-0">
        <HighlightedButton linkTo="login">
          <HiOutlineQuestionMarkCircle className="size-6" />
        </HighlightedButton>
        <HighlightedButton linkTo="login">
          <HiOutlineCog className="size-6" />
        </HighlightedButton>
      </div>
    </div>
  );
}

export default Sidebar;
