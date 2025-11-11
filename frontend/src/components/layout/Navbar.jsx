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
        <Link to="/home" className="text-2xl font-bold text-primary hover:opacity-80">
          Abanck<span className="text-muted-foreground">OS</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/home"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Inicio
          </Link>
          <Link
            to="/home#crypto"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Criptomonedas
          </Link>
          <Link
            to="/home#transfer"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Transferencias
          </Link>
          <Link
            to="/home#history"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Historial
          </Link>
        </div>

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
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="ml-2"
            >
              Cerrar sesión
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
