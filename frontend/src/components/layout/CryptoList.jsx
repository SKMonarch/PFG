import { useEffect, useState } from "react";
import API from "../api/api";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function CryptoList() {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    API.get("/crypto/prices")
      .then((res) => setCryptos(res.data))
      .catch((err) => console.error("Error cargando criptos:", err));
  }, []);

  return (
    <Card className="p-4 mt-6">
      <CardHeader>
        <CardTitle>Criptomonedas Disponibles</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {cryptos.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between border p-2 rounded"
            >
              <span className="font-semibold">{c.name}</span>
              <span className="text-sm opacity-70">{c.symbol}</span>
              <span>${c.price_usd.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
