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

  const getLabel = (tx) => {
    if (tx.type === "transfer" && tx.is_received)
      return "Transferencia recibida";

    if (tx.type === "transfer" && !tx.is_received)
      return "Transferencia enviada";

    if (tx.type === "buy")
      return "Compra de criptomoneda";

    if (tx.type === "sell")
      return "Venta de criptomoneda";

    return tx.type;
  };

  const getBadgeStyle = (tx) => {
    if (tx.type === "transfer" && tx.is_received) return "success";
    if (tx.type === "transfer" && !tx.is_received) return "warning";
    if (tx.type === "buy") return "default";
    if (tx.type === "sell") return "destructive";
    return "secondary";
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Historial de Actividad
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : txs.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">
              No tienes movimientos recientes.
            </p>
          ) : (
            <ul className="space-y-4">
              {txs.map((tx) => (
                <li
                  key={tx.id}
                  className="p-4 border rounded-lg flex flex-col gap-2 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 font-semibold">
                      {tx.type === "buy" && <span>💹</span>}
                      {tx.type === "sell" && <span>📉</span>}
                      {tx.type === "transfer" &&
                        (tx.is_received ? "➕" : "➖")}

                      {getLabel(tx)}
                    </div>

                    <Badge variant={getBadgeStyle(tx)}>
                      {getLabel(tx)}
                    </Badge>
                  </div>

                  {/* Detalles */}
                  <div className="text-sm opacity-80">
                    {tx.type === "transfer" && (
                      <>
                        {tx.is_received ? (
                          <p>
                            Recibiste <strong>${tx.amount.toFixed(2)}</strong>{" "}
                            de <strong>{tx.sender}</strong>
                          </p>
                        ) : (
                          <p>
                            Enviaste <strong>${tx.amount.toFixed(2)}</strong> a{" "}
                            <strong>{tx.receiver}</strong>
                          </p>
                        )}
                      </>
                    )}

                    {(tx.type === "buy" || tx.type === "sell") && (
                      <p>
                        {tx.type === "buy" ? "Compraste" : "Vendiste"}{" "}
                        <strong>
                          {tx.crypto_amount} {tx.crypto_symbol?.toUpperCase()}
                        </strong>{" "}
                        por <strong>${tx.amount.toFixed(2)}</strong>
                      </p>
                    )}
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
