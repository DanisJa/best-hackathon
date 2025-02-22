import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import supabase from "../utils/supabase";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        navigate("/home");
      }
    };
    getUser();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      toast("Passwords do not match. Please check your input.");
      return;
    }

    // Check if email already exists
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

    // Sign up with Supabase
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: formData.email,
        password: formData.password,
      }
    );

    if (signUpError) {
      console.error(signUpError.message);
      toast("An error occurred during registration. Please try again.");
      return;
    }

    toast("Registration successful! You can now log in.");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <Card className="w-full max-w-md mx-auto  rounded-md border-2 border-black-100 ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold ">Register</CardTitle>
          <CardDescription>Create your account today!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password*</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password*</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <input
                id="showPassword"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <Label htmlFor="showPassword">Show Passwords</Label>
            </div>
          </div>

          <Button type="submit" variant="defaultLinear" className="w-full mb-2">
            Register
          </Button>

          <div className="text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="bg-gradient-to-r from-[#3DFF94] to-[#B9FF5E] bg-clip-text text-transparent hover:underline"
            >
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
