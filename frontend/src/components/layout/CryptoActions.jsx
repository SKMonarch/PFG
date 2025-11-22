import { useEffect, useState } from "react";
import API from "../api/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";

export default function CryptoActions({ presetCrypto = "" }) {
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
  if (presetCrypto) setSymbol(presetCrypto);
  }, [presetCrypto]);

  useEffect(() => {
    API.get("/crypto/prices")
      .then((res) => {
        setCryptos(res.data);
      })
      .catch(() => alert("Error cargando criptomonedas"));
  }, []);

  const selectedCrypto = cryptos.find((c) => c.symbol === symbol);
  const price = selectedCrypto?.price_usd || 0;
  const total = amount ? price * parseFloat(amount) : 0;

  const handleAction = async (type) => {
    if (!symbol || !amount) {
      alert("Por favor selecciona un símbolo y cantidad");
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

          <div>
            <Label>Símbolo</Label>
            <Select value={symbol} onValueChange={setSymbol}>
              <SelectTrigger className="w-full p-2 border rounded-lg">
                <SelectValue placeholder="Selecciona una criptomoneda" />
              </SelectTrigger>
              <SelectContent>
                {cryptos.map((c) => (
                  <SelectItem key={c.symbol} value={c.symbol}>
                    {c.symbol.charAt(0).toUpperCase() + c.symbol.slice(1)} ({c.symbol.toUpperCase()})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            
            {selectedCrypto && (
              <p className="text-sm mt-1 opacity-70">
                Precio actual: <strong>${price.toFixed(2)}</strong>
              </p>
            )}
          </div>

          <div>
            <Label>Cantidad</Label>
            <Input
              type="number"
              placeholder="Ej: 0.5"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

          
            {amount && selectedCrypto && (
              <p className="text-sm font-semibold mt-1">
                Total: <strong>${total.toFixed(2)}</strong>
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button onClick={() => handleAction("buy")} disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Comprar
          </Button>

          <Button
            variant="destructive"
            onClick={() => handleAction("sell")}
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Vender
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
