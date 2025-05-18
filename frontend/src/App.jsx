import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import WorkspacePage from "./pages/WorkspacePage";
import { AuthProvider } from "./context/AuthContext";
import { TeamProvider } from "./context/TeamContext";
import "./App.css";
import RoutingPage from "./pages/RoutingPage";
import VideoRoomWrapper from "./components/meeting/VideoRoomWrapper";
import VideoRoom from "./components/meeting/VideoRoom";
import RoomPage from "./components/meeting/RoomPage";

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
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/dashboard/:teamId" element={<DashboardPage />} />
          <Route path="/dashboard/:teamId/:section" element={<RoutingPage />}/> 
          {/* <Route path="/dashboard/:teamId/hostmeeting/room/:roomId" element={<VideoRoomWrapper/>}/>  */}
          <Route path="/dashboard/:teamId/hostmeeting/room/:roomName" element={<RoomPage/>}/> 
          {/* Add more routes as needed */}
        </Routes>
      </TeamProvider>
    </AuthProvider>
    // </BrowserRouter>
  );
}

export default App;
