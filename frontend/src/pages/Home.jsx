import { useEffect, useState } from "react";
import API from "../components/api/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/crypto/prices")
      .then((res) => setPrices(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Criptomonedas disponibles
      </h1>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Cargando precios...</span>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {prices.map((c) => (
            <Card key={c.symbol} className="hover:shadow-lg transition">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{c.symbol.toUpperCase()}</span>
                  <Badge variant="outline">USD</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">
                  ${parseFloat(c.price_usd).toFixed(2)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

