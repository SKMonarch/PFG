import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full bg-card shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* LOGO */}
        <Link to="/home" className="text-2xl font-bold text-primary hover:opacity-80">
          Abanck<span className="text-muted-foreground">OS</span>
        </Link>

        {/* MENÚ PRINCIPAL */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/home" className="hover:text-primary transition-colors">
            Inicio
          </Link>

          <Link to="/dashboard" className="hover:text-primary transition-colors">
            Cuenta
          </Link>

          <Link to="/mortgage" className="hover:text-primary transition-colors">
            Servicios
          </Link>
        </div>

        {/* PANEL DE USUARIO */}
        {user && (
          <div className="flex items-center gap-4">
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {user.username?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user.username}</span>
              <span className="text-sm font-semibold text-primary">
                ${user.balance.toFixed(2)}
              </span>
            </div>

            <Button variant="outline" size="sm" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
