import React from "react";
import Sidebar from "../components/ui/sidebar";
import Container from "../components/container";

import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <Sidebar />
      {children}
    </Container>
  );
}

export default Layout;
