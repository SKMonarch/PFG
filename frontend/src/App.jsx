import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import CryptoView from "./pages/CryptoView";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
         
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/crypto/:symbol" element={<CryptoView />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
