import { useState } from "react";
import API from "../components/api/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";

export default function CryptoActions() {
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAction = async (type) => {
    if (!symbol || !amount) {
      alert("Por favor ingresa símbolo y cantidad");
      return;
    }

    setLoading(true);
    try {
      await API.post(`/crypto/${type}?symbol=${symbol}&amount=${amount}`);
      alert(`${type === "buy" ? "Compra" : "Venta"} realizada`);
      setSymbol("");
      setAmount("");
    } catch (err) {
      alert("Error en la operación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Operar Criptomonedas
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symbol">Símbolo</Label>
            <Input
              id="symbol"
              placeholder="Ej: btc, eth..."
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Cantidad</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Ej: 0.5"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="default"
            onClick={() => handleAction("buy")}
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Comprar
          </Button>

          <Button
            variant="destructive"
            onClick={() => handleAction("sell")}
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Vender
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
