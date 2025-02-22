import React from "react";
import Container from "../components/container";

import { ReactNode } from "react";
import Sidebar from "../components/layout/sidebar";
import TopBar from "../components/layout/topbar";
import Wrapper from "../components/ui/wrapper";

function Layout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <TopBar />
        {children}
      </Wrapper>
    </Container>
  );
}

export default Layout;
