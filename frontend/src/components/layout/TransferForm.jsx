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

export default function TransferForm() {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const transfer = async () => {
    if (!receiver || !amount) {
      alert("Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      await API.post(
        `/transactions/transfer?receiver_username=${receiver}&amount=${amount}`
      );
      alert("Transferencia realizada con éxito");
      setReceiver("");
      setAmount("");
    } catch (err) {
      alert("Error al realizar la transferencia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Enviar Dinero
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="receiver">Usuario receptor</Label>
            <Input
              id="receiver"
              placeholder="Ej: juan_perez"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Monto</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Ej: 100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            onClick={transfer}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            Enviar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
