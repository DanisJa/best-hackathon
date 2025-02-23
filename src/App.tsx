import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./components/ProtectedRoute";
import ActivitiesPage from "./pages/ActivitiesPage";
import MyPal from "./pages/MyPal";
import StatisticsPage from "./pages/StatisticsPage";
import UnprotectedRoute from "./components/UnprotectedRoute";

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
          <Route
            path="/login"
            element={
              <UnprotectedRoute>
                <LoginForm />
              </UnprotectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <UnprotectedRoute>
                <RegisterForm />
              </UnprotectedRoute>
            }
          />

          {/* Routes inside Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
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
              path="/mypal"
              element={
                <ProtectedRoute>
                  <MyPal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/statistics"
              element={
                <ProtectedRoute>
                  <StatisticsPage />
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
