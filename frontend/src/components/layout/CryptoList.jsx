import { useEffect, useState } from "react";
import API from "../api/api";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Link } from "react-router-dom";

export default function CryptoList() {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    API.get("/crypto/prices")
      .then((res) => setCryptos(res.data))
      .catch((err) => console.error("Error cargando criptos:", err));
  }, []);

  return (
    <div className="h-full min-h-full">
      <Card className="h-full min-h-full flex flex-col p-4">
        <CardHeader>
          <CardTitle>Criptomonedas Disponibles</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto">
          <ul className="space-y-3 min-h-full">
            {cryptos.length > 0 ? (
              cryptos.map((c) => (
                <li
                  key={c.symbol}
                  className="flex items-center justify-between border p-2 rounded"
                >
                  <Link
                    to={`/crypto/${c.symbol}`}
                    className="font-semibold text-primary hover:underline"
                  >
                    {c.symbol.toUpperCase()}
                  </Link>

                  <span>${c.price_usd.toFixed(2)}</span>
                </li>
              ))
            ) : (
              <div className="h-full flex items-center justify-center opacity-60">
                No hay criptomonedas disponibles
              </div>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
