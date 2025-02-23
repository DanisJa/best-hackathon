import { useState } from "react";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword(credentials);

    if (error) {
      console.error(error);
      toast("Email and password do not match");
      return;
    }

    toast("Login successful");

    if (rememberMe) {
      localStorage.setItem("sb-auth-token", JSON.stringify(data.session));
      localStorage.setItem("sb-user-data", JSON.stringify(data.user));
    } else {
      sessionStorage.setItem("sb-auth-token", JSON.stringify(data.session));
      sessionStorage.setItem("sb-user-data", JSON.stringify(data.user));
    }

    navigate("/home");
  };

  return {
    credentials,
    setCredentials,
    rememberMe,
    setRememberMe,
    handleLogin,
  };
};
