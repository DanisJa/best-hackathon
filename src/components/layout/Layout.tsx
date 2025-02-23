import { Outlet, useLocation, useNavigate } from "react-router";
import Container from "../container";
import Sidebar from "../layout/sidebar";
import TopBar from "../layout/topbar";
import Wrapper from "../ui/wrapper";

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname.endsWith("/")) {
    console.log("im here");
    navigate("/home");
  }

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
