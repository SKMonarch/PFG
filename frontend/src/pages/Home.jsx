import Navbar from "@/components/layout/Navbar";
import CryptoList from "@/components/layout/CryptoList";
import { useEffect, useState } from "react";
import API from "@/components/api/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/users/me")
      .then((res) => setProfile(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );

  return (
    <>
      <Navbar />

      <div className="w-full bg-primary text-primary-foreground p-10 rounded-b-3xl shadow-md">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <h1 className="text-4xl font-bold">
            Bienvenido a AbanckOS{profile ? `, ${profile.username}` : ""}
          </h1>

          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            La plataforma donde tu dinero trabaja por ti. Controla tus finanzas,
            invierte con inteligencia y gestiona tus activos digitales desde un único
            panel moderno y seguro.
          </p>

          <Button
            size="lg"
            className="mt-2 bg-white text-primary hover:bg-gray-100"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Entrar a mi Panel
          </Button>
        </div>
      </div>

      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex gap-10 items-stretch min-h-[600px]">

         
          <div className="w-[70%] flex flex-col">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="text-2xl">Resumen general</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6 flex flex-col">

               
                <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                  <h3 className="font-semibold text-lg">Tu información personal</h3>
                  <p><strong>Usuario:</strong> {profile.username}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p className="text-sm opacity-80">
                    Esta información te identifica dentro del sistema. Asegúrate
                    de mantener tus datos al día para un acceso seguro y sin interrupciones.
                  </p>
                </div>

            
                <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                  <h3 className="font-semibold text-lg">Estado financiero actual</h3>
                  <p>
                    Con AbanckOS puedes observar en tiempo real el estado de tus activos,
                    tu balance y tus movimientos más importantes. Nuestro sistema se actualiza
                    constantemente para ofrecerte datos precisos y confiables.
                  </p>
                  <p className="text-sm opacity-80">
                    Utiliza la sección de transferencias, compra/venta de criptomonedas y gestión
                    de servicios financieros para mantener el control absoluto sobre tu economía.
                  </p>
                </div>

               
                <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                  <h3 className="font-semibold text-lg">Herramientas y análisis</h3>
                  <p>
                    Explora métricas avanzadas, historiales de criptomonedas, gráficas de
                    comportamiento y tendencias del mercado. Nuestro sistema integra información
                    procesada para ayudarte a tomar decisiones más acertadas.
                  </p>
                  <p className="text-sm opacity-80">
                    La sección de inversiones te proporciona una visión clara de las oportunidades
                    actuales del mercado, para que puedas posicionarte al mejor precio.
                  </p>
                </div>

              
                <div className="bg-muted/30 p-4 rounded-lg text-center mt-auto">
                  <h3 className="font-semibold text-lg mb-2">
                    ¿Quieres una visión más completa?
                  </h3>
                  <p className="text-sm opacity-80 mb-4">
                    Accede a tu panel para gestionar tu cartera, tus movimientos,
                    tus inversiones y tus herramientas personalizadas.
                  </p>
                  <Button size="lg" onClick={() => window.location.href = "/dashboard"}>
                    Ir al Panel Principal
                  </Button>
                </div>

              </CardContent>
            </Card>
          </div>

          <div className="w-[30%] h-full">
            <div className="h-full">
              <CryptoList />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
