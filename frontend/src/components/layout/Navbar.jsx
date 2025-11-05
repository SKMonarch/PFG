import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import LoginModal from "./LoginForm";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <nav className="w-full bg-background border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
  
          <Link to="/" className="text-2xl font-bold text-primary hover:opacity-80">
            AbanckOS
          </Link>

         
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>

                <Separator orientation="vertical" className="h-5" />

                <div className="flex items-center gap-3">
                 
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.username} />
                    <AvatarFallback>
                      {user?.username?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <span className="text-sm text-muted-foreground">
                    {user.username}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="ml-2"
                  >
                    Cerrar sesión
                  </Button>
                </div>
              </>
            ) : (
              <Button size="sm" onClick={() => setShowLogin(true)}>
                Iniciar sesión
              </Button>
            )}
          </div>
        </div>
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
