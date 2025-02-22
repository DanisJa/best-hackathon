import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../utils/supabase";
import { toast } from "sonner";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export function useRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast("Passwords do not match. Please check your input.");
      return;
    }

    const { data: emailData, error: emailError } = await supabase
      .from("users")
      .select("email")
      .eq("email", formData.email)
      .maybeSingle();

    if (emailError) {
      console.error(emailError);
      toast("An error occurred. Please try again.");
      return;
    }

    if (emailData) {
      toast("Email already exists. Please use a different email.");
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (signUpError) {
      console.error(signUpError.message);
      toast("An error occurred during registration. Please try again.");
      return;
    }

    toast("Registration successful! You can now log in.");
    navigate("/home");
  };

  return {
    formData,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
  };
}
