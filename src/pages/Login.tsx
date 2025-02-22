import { useState, FormEvent } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons from lucide-react
import { useLogin } from "../hooks/useLogin";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    credentials,
    setCredentials,
    rememberMe,
    setRememberMe,
    handleLogin,
  } = useLogin();

  return (
    <form className="flex justify-center  items-center" onSubmit={handleLogin}>
      <Card className="w-full max-w-md rounded-md border-2 border-black-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({
                    email: e.target.value,
                    password: credentials.password,
                  })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({
                      password: e.target.value,
                      email: credentials.email,
                    })
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2" // Center the eye icon vertically
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-black" />
                  ) : (
                    <Eye size={18} className="text-black" />
                  )}{" "}
                  {/* Toggle eye icon */}
                </button>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row justify-center">
                <Label className="m-1 text-sm" htmlFor="remember">
                  Remember me
                </Label>
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button variant="defaultLinear" className="w-full mt-2">
            Login
          </Button>
          <Button
            variant="defaultGray"
            className="w-full mt-2 rounded-md"
            asChild
          >
            <Link to="/register">Don't have an account? Register</Link>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
