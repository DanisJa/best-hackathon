import supabase from "../utils/supabase";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        navigate("/login");
      }
    };

    checkUserSession();
  }, [location.pathname, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
