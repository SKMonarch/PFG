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
                <li
                  key={tx.id}
                  className="p-3 border rounded-lg flex justify-between items-center"
                >
                  <Badge>{tx.type}</Badge>
                  <span>${tx.amount.toFixed(2)}</span>
                  <span>{formatDate(tx.timestamp)}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
