import { useState } from "react";
import API from "@/components/api/api";
import Navbar from "@/components/layout/Navbar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Mortgage() {
  const [amount, setAmount] = useState("");
  const [years, setYears] = useState("");
  const [rate, setRate] = useState("");
  const [type, setType] = useState("fija");

  const [result, setResult] = useState(null);

  const calculate = async () => {
    try {
      const payload = {
        amount: Number(amount),
        years: Number(years),
        interest_rate: Number(rate),
        type,
      };

      const res = await API.post("/mortgage/calculate", payload);
      setResult(res.data);
    } catch {
      alert("Error calculando la hipoteca");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Calculadora Hipotecaria</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <Label>Importe (€)</Label>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                placeholder="Ej: 150000"
              />
            </div>

            <div>
              <Label>Años</Label>
              <Input
                value={years}
                onChange={(e) => setYears(e.target.value)}
                type="number"
                placeholder="Ej: 30"
              />
            </div>

            <div>
              <Label>Interés anual (%)</Label>
              <Input
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                type="number"
                placeholder="Ej: 3.5"
              />
            </div>

            <div>
              <Label>Tipo</Label>
              <select
                className="border p-2 rounded w-full"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="fija">Fija</option>
                <option value="variable">Variable</option>
              </select>
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full" onClick={calculate}>
              Calcular
            </Button>
          </CardFooter>
        </Card>

        {result && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Resultados</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Cuota mensual:</strong> €{result.monthly_payment}</p>
              <p><strong>Total pagado:</strong> €{result.total_paid}</p>
              <p><strong>Intereses totales:</strong> €{result.total_interest}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
