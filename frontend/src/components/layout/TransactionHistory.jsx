import { useEffect, useState } from "react";
import API from "@/components/api/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowUpRight, ArrowDownLeft, Coins } from "lucide-react";

export default function TransactionHistory() {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/transactions/history")
      .then((res) => setTxs(res.data))
      .finally(() => setLoading(false));
  }, []);

  const formatDateGroup = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(Date.now() - 86400000);

    if (date.toDateString() === today.toDateString()) return "Hoy";
    if (date.toDateString() === yesterday.toDateString()) return "Ayer";

    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const groupByDate = () => {
    const groups = {};
    txs.forEach((tx) => {
      const day = formatDateGroup(tx.timestamp);
      if (!groups[day]) groups[day] = [];
      groups[day].push(tx);
    });
    return groups;
  };

  const getIcon = (tx) => {
    if (tx.type === "transfer" && tx.is_received)
      return <ArrowDownLeft className="text-green-500" />;

    if (tx.type === "transfer" && !tx.is_received)
      return <ArrowUpRight className="text-red-500" />;

    if (tx.type === "compra_crypto" || tx.type === "venta_crypto")
      return <Coins className="text-blue-500" />;

    return <Coins />;
  };

  const getAmountColor = (tx) => {
    if (tx.type === "transfer" && tx.is_received) return "text-green-600";
    if (tx.type === "transfer" && !tx.is_received) return "text-red-600";
    return "text-blue-600";
  };

  const getLabel = (tx) => {
    if (tx.type === "transfer" && tx.is_received) return "Transferencia recibida";
    if (tx.type === "transfer" && !tx.is_received) return "Transferencia enviada";

    if (tx.type === "compra_crypto")
      return `Compra ${tx.crypto_symbol?.toUpperCase()}`;

    if (tx.type === "venta_crypto")
      return `Venta ${tx.crypto_symbol?.toUpperCase()}`;

    return tx.type;
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );

  const grouped = groupByDate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Historial</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {Object.keys(grouped).map((date) => (
          <div key={date} className="space-y-3">
            {/* Group title */}
            <h3 className="text-sm font-semibold opacity-70">{date}</h3>

            {/* Transactions of this date */}
            <div className="space-y-2">
              {grouped[date].map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 border rounded-xl flex items-center justify-between hover:bg-muted/50 transition"
                >
                  {/* Izquierda: icono + descripción */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-full">
                      {getIcon(tx)}
                    </div>

                    <div className="flex flex-col">
                      <span className="font-medium">{getLabel(tx)}</span>
                      <span className="text-xs opacity-70">
                        {tx.type === "compra_crypto" ||
                        tx.type === "venta_crypto"
                          ? `${tx.crypto_amount} ${tx.crypto_symbol?.toUpperCase()}`
                          : tx.sender && tx.receiver
                          ? `${tx.sender} → ${tx.receiver}`
                          : ""}
                      </span>
                    </div>
                  </div>

                  {/* Derecha: monto */}
                  <div className="text-right">
                    <span className={`font-semibold ${getAmountColor(tx)}`}>
                      {tx.is_received ? "+" : "-"}${tx.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
