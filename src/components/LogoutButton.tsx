import supabase from "../utils/supabase";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = async () => {
    // Clear session data from both localStorage and sessionStorage
    localStorage.removeItem("sb-auth-token");
    localStorage.removeItem("sb-user-data");
    sessionStorage.removeItem("sb-auth-token");
    sessionStorage.removeItem("sb-user-data");

    // Sign out from Supabase
    await supabase.auth.signOut();

    // Reset user and userData

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <Button variant="defaultLinear" onClick={logout}>
      Log out
    </Button>
  );
};

export default LogoutButton;
