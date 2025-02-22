import React from "react";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="grow py-4 px-4">{children}</div>;
}

export default Wrapper;
