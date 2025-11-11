import { useEffect, useState } from "react";
import API from "@/components/api/api";
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
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  const [prices, setPrices] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userRes, priceRes, txRes] = await Promise.all([
          API.get("/users/me"),
          API.get("/crypto/prices"),
          API.get("/transactions/history"),
        ]);
        setProfile(userRes.data);
        setPrices(priceRes.data);
        setTransactions(txRes.data);
      } catch (err) {
        alert("Error al cargar datos. Verifica tu sesión o backend.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

 
  const handleBuy = async () => {
    if (!symbol || !amount) return alert("Completa símbolo y cantidad");
    try {
      await API.post(`/crypto/buy?symbol=${symbol}&amount=${amount}`);
      alert("Compra realizada correctamente");
    } catch {
      alert("Error al comprar cripto");
    }
  };

 
  const handleSell = async () => {
    if (!symbol || !amount) return alert("Completa símbolo y cantidad");
    try {
      await API.post(`/crypto/sell?symbol=${symbol}&amount=${amount}`);
      alert("Venta realizada correctamente");
    } catch {
      alert("Error al vender cripto");
    }
  };

  const handleTransfer = async () => {
    if (!receiver || !transferAmount)
      return alert("Completa usuario y monto");
    try {
      await API.post(
        `/transactions/transfer?receiver_username=${receiver}&amount=${transferAmount}`
      );
      alert("Transferencia realizada correctamente");
    } catch {
      alert("Error al transferir fondos");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        <span className="ml-3 text-muted-foreground">Cargando datos...</span>
      </div>
    );

  return (
    <>
    <Navbar/>
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
     
      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          {profile ? (
            <div>
              <p><strong>Usuario:</strong> {profile.username}</p>
              <p><strong>Email:</strong> {profile.email}</p>
            </div>
          ) : (
            <p>No hay datos de usuario</p>
          )}
        </CardContent>
      </Card>

     
      <Card>
        <CardHeader>
          <CardTitle>Criptomonedas disponibles</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {prices.map((c) => (
            <Card key={c.symbol}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{c.symbol.toUpperCase()}</span>
                  <Badge variant="outline">USD</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold">
                  ${parseFloat(c.price_usd).toFixed(2)}
                </p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      
      <Card>
        <CardHeader>
          <CardTitle>Operar Criptomonedas</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Símbolo</Label>
            <Input
              placeholder="Ej: bitcoin"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </div>
          <div>
            <Label>Cantidad</Label>
            <Input
              type="number"
              placeholder="Ej: 0.5"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button onClick={handleBuy}>Comprar</Button>
          <Button variant="destructive" onClick={handleSell}>
            Vender
          </Button>
        </CardFooter>
      </Card>

    
      <Card>
        <CardHeader>
          <CardTitle>Transferir Dinero</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Usuario receptor</Label>
            <Input
              placeholder="Ej: juan_perez"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />
          </div>
          <div>
            <Label>Monto (USD)</Label>
            <Input
              type="number"
              placeholder="Ej: 100"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleTransfer}>Enviar</Button>
        </CardFooter>
      </Card>

     
      <Card>
        <CardHeader>
          <CardTitle>Historial de Transacciones</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p>No hay transacciones aún.</p>
          ) : (
            <ul className="space-y-2">
              {transactions.map((tx) => (
                <li
                  key={tx.id}
                  className="flex justify-between border-b py-1 text-sm"
                >
                  <span>{tx.type}</span>
                  <span>${tx.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  
  </>
  );
}
