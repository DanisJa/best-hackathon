import React from "react";
import { Button } from "./button";
import { NavLink, useLocation } from "react-router";

interface HighlightedButtonProps {
  linkTo: string;
  children: React.ReactNode;
}

function HighlightedButton({ linkTo, children }: HighlightedButtonProps) {
  const loc = useLocation();
  const isButtonActive = loc.pathname.includes(linkTo);

  return (
    <NavLink className="w-full" to={`/${linkTo}`}>
      <Button
        variant={isButtonActive ? "defaultLinear" : "higlightedGray"}
        className={`h-16 rounded-3xl p-0 flex items-center justify-center transition-all duration-300 gap-0!
          ${
            isButtonActive ? "w-9/12" : "w-16 shadow-[0px_3.67px_3px_#4B7644]"
          }`}
      >
        {React.cloneElement(children as React.ReactElement, {
          color: isButtonActive ? "#333" : "#3DFF94",
        })}
        <p
          className={`transition-opacity duration-300 ${
            isButtonActive ? "opacity-100 ml-2" : "opacity-0 w-0"
          }`}
        >
          {linkTo.at(0)?.toUpperCase() + linkTo.slice(1)}
        </p>
      </Button>
    </NavLink>
  );
}

export default HighlightedButton;
