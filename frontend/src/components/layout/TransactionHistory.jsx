import { useEffect, useState } from "react";
import API from "../components/api/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Loader2 } from "lucide-react";
import { Badge } from "../components/ui/badge";

export default function TransactionHistory() {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/transactions/history")
      .then((res) => setTxs(res.data))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (ts) =>
    new Date(ts).toLocaleString("es-AR", {
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
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">
                Cargando historial...
              </span>
            </div>
          ) : txs.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">
              No hay transacciones registradas aún.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Monto (USD)</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {txs.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <Badge
                        variant={
                          tx.type === "buy"
                            ? "default"
                            : tx.type === "sell"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {tx.type.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${parseFloat(tx.amount).toFixed(2)}
                    </TableCell>
                    <TableCell>{formatDate(tx.timestamp)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
