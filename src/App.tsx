import "./App.css";
import { Route, Routes } from "react-router";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import Test from "./pages/Test";
import Home from "./pages/Home";
import Layout from "./pages/Layout";

function App() {
  return (
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
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
