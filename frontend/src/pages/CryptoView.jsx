import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "@/components/api/api";
import Navbar from "@/components/layout/Navbar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CryptoView() {
  const { symbol } = useParams();
  const [crypto, setCrypto] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get(`/crypto/prices`),
      API.get(`/crypto/history?symbol=${symbol}`),
    ])
      .then(([pricesRes, historyRes]) => {
        const data = pricesRes.data.find((c) => c.symbol === symbol);
        setCrypto(data);
        setHistory(
          historyRes.data.map((p) => ({
            date: new Date(p.date).toLocaleDateString("es-ES"),
            price: p.price,
          }))
        );
      })
      .finally(() => setLoading(false));
  }, [symbol]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );

  return (
    <>
      <Navbar />

      <div className="p-8 max-w-5xl mx-auto space-y-10">
        <Link to="/home" className="text-primary hover:underline">
          ← Volver
        </Link>

 
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl mb-3">
              Precio actual:{" "}
              <strong className="text-primary">
                ${crypto.price_usd.toFixed(2)}
              </strong>
            </p>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="black" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Link to="/home#crypto">
            <Button>Comprar</Button>
          </Link>
          <Link to="/home#crypto">
            <Button variant="destructive">Vender</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
