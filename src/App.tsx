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
import Leaderboard from "./components/Leaderboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ActivitiesPage from "./pages/ActivitiesPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="w-screen min-h-screen text-white"
        style={{
          background: "linear-gradient(45deg, #47554B , #333333)",
        }}
      >
        <Routes>
          {/* Routes outside of Layout */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Routes inside Layout */}
          <Route element={<Layout />}>
            <Route path="/test" element={<Test />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/devices"
              element={
                <ProtectedRoute>
                  <Devices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lights"
              element={
                <ProtectedRoute>
                  <Lights />
                </ProtectedRoute>
              }
            />
            <Route
              path="/activities"
              element={
                <ProtectedRoute>
                  <ActivitiesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
