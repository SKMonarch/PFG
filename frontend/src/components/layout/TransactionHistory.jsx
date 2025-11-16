import { useEffect, useState } from "react";
import API from "../api/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";
import { Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";

export default function TransactionHistory() {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/transactions/history")
      .then((res) => setTxs(res.data))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (ts) =>
    new Date(ts).toLocaleString("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
    });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Historial de Transacciones
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : txs.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">
              No hay transacciones aún.
            </p>
          ) : (
            <ul className="space-y-3">
              {txs.map((tx) => (
              <li key={tx.id} className="p-3 border rounded-lg">
                <div className="flex justify-between">
                  <span className="font-semibold">
                    {tx.sender} → {tx.receiver}
                  </span>
                  <Badge variant={tx.type === "transfer" ? "secondary" : tx.type.includes("compra") ? "default" : "destructive"}>
                    {tx.type}
                  </Badge>
                  <span>${tx.amount.toFixed(2)}</span>
                </div>
                <p className="text-xs opacity-60">{formatDate(tx.timestamp)}</p>
              </li>

              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
