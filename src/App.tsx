import "./App.css";
import { Route, Routes } from "react-router";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import Test from "./pages/Test";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Devices from "./components/Devices";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Lights from "./components/Lights";
import PetCard from "./components/PetCard";
import Leaderboard from "./components/Leaderboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="w-screen h-screen  
      text-white
    "
        style={{
          background: "linear-gradient(45deg, #47554B , #333333)",
        }}
      >
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/test" element={<Test />} />
            <Route path="/home" element={<Home />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/lights" element={<Lights />} />
            <Route path="/petcard" element={<PetCard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </Layout>
      </div>
    </QueryClientProvider>
  );
}

export default App;
