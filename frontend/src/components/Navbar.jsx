import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext.jsx";
import LoginModal from "./LoginModal";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";


export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); 
  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">AbanckOS</Link>
        {user ? (
          <>
            <Link  className="menu-item" to="/dashboard">Dashboard</Link>
            <button onClick={logout} className="menu-item">Cerrar sesión</button>
          </>
        ) : (
          <button onClick={() => setShowLogin(true)} className="menu-item">Iniciar sesión</button>
        )}
      </div>

      <div className="nav-actions">
        <ThemeToggle />
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </nav>
  );
}
