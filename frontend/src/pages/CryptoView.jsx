import { useParams, Link, useNavigate } from "react-router-dom";
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
import CryptoTradeModal from "@/components/layout/CryptoTradeModal";

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
  const navigate = useNavigate();

  const [crypto, setCrypto] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cryptos, setCryptos] = useState([]);
  const [tradeOpen, setTradeOpen] = useState(false);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      API.get(`/crypto/prices`),
      API.get(`/crypto/history?symbol=${symbol}`),
    ])
      .then(([pricesRes, historyRes]) => {
        const allCryptos = pricesRes.data || [];
        setCryptos(allCryptos);

        const found = allCryptos.find((c) => c.symbol === symbol);
        setCrypto(found || { name: symbol, symbol, price_usd: 0 });

        setHistory(
          (historyRes.data || []).map((p) => ({
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

  const onSelectCrypto = (s) => {
    if (s === symbol) return;
    navigate(`/crypto/${s}`);
  };

  return (
    <>
      <Navbar />

      <div className="p-8 max-w-7xl mx-auto space-y-4">
        <Link to="/home" className="text-primary hover:underline">
          ← Volver
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[70vh]">

          {/* SIDEBAR */}
          <aside className="md:col-span-1 h-full">
            <Card className="h-full sticky top-20 flex flex-col">
              <CardHeader>
                <CardTitle>Mercado</CardTitle>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto">
                <ul className="space-y-2">
                  {cryptos.map((c) => {
                    const isActive = c.symbol === symbol;
                    return (
                      <li
                        key={c.symbol}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "border hover:bg-muted/50"
                        }`}
                        onClick={() => onSelectCrypto(c.symbol)}
                      >
                        <div className="flex flex-col">
                          <span className="uppercase">{c.symbol}</span>
                          <span className="text-xs opacity-70">{c.name}</span>
                        </div>

                        <div className="text-sm font-medium">
                          ${c.price_usd.toFixed(2)}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </aside>


          {/* PANEL PRINCIPAL */}
          <main className="md:col-span-3 h-full flex flex-col">
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  {crypto?.name} ({crypto?.symbol?.toUpperCase()})
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-6 flex-1">
                <p className="text-xl">
                  Precio actual:{" "}
                  <strong className="text-primary">
                    ${Number(crypto?.price_usd || 0).toFixed(2)}
                  </strong>
                </p>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={history}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="black"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* BOTONES DENTRO DE LA TARJETA */}
                <div className="flex justify-center gap-4 mt-auto pb-2">
                  <Button
                    className="px-8 py-3 text-lg rounded-xl shadow-md hover:shadow-lg"
                    onClick={() => setTradeOpen(true)}
                  >
                    Comprar
                  </Button>

                  <Button
                    variant="destructive"
                    className="px-8 py-3 text-lg rounded-xl shadow-md hover:shadow-lg"
                    onClick={() => setTradeOpen(true)}
                  >
                    Vender
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      <CryptoTradeModal
        open={tradeOpen}
        onClose={setTradeOpen}
        cryptoSymbol={symbol}
      />
    </>
  );
}
