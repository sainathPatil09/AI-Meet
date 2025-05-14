import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import WorkspacePage from "./pages/WorkspacePage";
import { AuthProvider } from "./context/AuthContext";
import { TeamProvider } from "./context/TeamContext";
import "./App.css";

function App() {
  const navigate = useNavigate();
  return (
    // <BrowserRouter>
      <AuthProvider>
        <TeamProvider onNavigate={navigate}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard/:teamId" element={<DashboardPage />} />
            <Route path="/workspace" element={<WorkspacePage />} />
          </Routes>
        </TeamProvider>
      </AuthProvider>
    // </BrowserRouter>
  );
}

export default App;
