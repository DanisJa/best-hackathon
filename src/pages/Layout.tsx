import { Outlet } from "react-router";
import Container from "../components/container";
import Sidebar from "../components/layout/sidebar";
import TopBar from "../components/layout/topbar";
import Wrapper from "../components/ui/wrapper";

function Layout() {
  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <TopBar />
        {/* Nested routes will appear here */}
        <Outlet />
      </Wrapper>
    </Container>
  );
}

export default Layout;
