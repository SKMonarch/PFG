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
  const [result, setResult] = useState(null);

  const calculate = async () => {
    try {
      const payload = {
        amount: Number(amount),
        years: Number(years),
        interest_rate: Number(rate),
        type: "fija",   // <-- fijo siempre
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

      <div className="p-8 max-w-4xl mx-auto space-y-10">

        {/* TÍTULO */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary tracking-tight">
            Calculadora Hipotecaria
          </h1>
          <p className="text-muted-foreground text-sm">
            Calcula tu cuota mensual fácilmente con una hipoteca fija.
          </p>
        </div>

        {/* FORMULARIO */}
        <Card className="shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Datos de la Hipoteca
            </CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-2">
              <Label>Importe total (€)</Label>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                placeholder="Ej: 150000"
              />
            </div>

            <div className="space-y-2">
              <Label>Años</Label>
              <Input
                value={years}
                onChange={(e) => setYears(e.target.value)}
                type="number"
                placeholder="Ej: 30"
              />
            </div>

            <div className="space-y-2">
              <Label>Interés anual (%)</Label>
              <Input
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                type="number"
                placeholder="Ej: 3.5"
              />
            </div>

          </CardContent>

          <CardFooter>
            <Button
              className="w-full text-lg py-3 rounded-xl"
              onClick={calculate}
            >
              Calcular
            </Button>
          </CardFooter>
        </Card>

        {/* RESULTADOS */}
        {result && (
          <Card className="shadow-lg rounded-2xl border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary">
                Resultados de la Hipoteca
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-lg">
              <div className="bg-muted/30 p-4 rounded-lg space-y-1">
                <p><strong>Cuota mensual:</strong> €{result.monthly_payment}</p>
                <p><strong>Total pagado:</strong> €{result.total_paid}</p>
                <p><strong>Intereses totales:</strong> €{result.total_interest}</p>
              </div>

              <p className="text-sm text-muted-foreground">
                * Los cálculos son aproximados y pueden variar según la entidad bancaria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
