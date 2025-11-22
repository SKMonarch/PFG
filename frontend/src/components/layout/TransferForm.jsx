import { useEffect, useState } from "react";
import API from "../api/api";
import {
  Card,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";

export default function TransferForm({ presetUser = "", onSuccess }) {
  const [receiver, setReceiver] = useState(presetUser);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  
  useEffect(() => {
    setReceiver(presetUser || "");
  }, [presetUser]);

  
  useEffect(() => {
    API.get("/users/all")
      .then((res) => setUsers(res.data))
      .catch(() => alert("Error cargando usuarios"));
  }, []);

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

      
      if (onSuccess) onSuccess();

      setReceiver("");
      setAmount("");
    } catch (err) {
      alert("Error al realizar la transferencia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      <Card className="shadow-none border-none">
        <CardContent className="space-y-4">

          <div>
            <Label>Usuario receptor</Label>

            <Select value={receiver} onValueChange={setReceiver}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un usuario" />
              </SelectTrigger>
              <SelectContent>
                {users.map((u) => (
                  <SelectItem key={u.username} value={u.username}>
                    {u.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Monto</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ej: 150"
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={transfer} disabled={loading} className="w-full">
            {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Enviar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
