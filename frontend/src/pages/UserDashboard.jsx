import { useEffect, useState } from "react";
import API from "@/components/api/api";
import Navbar from "@/components/layout/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const [profile, setProfile] = useState(null);
  const [txs, setTxs] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get("/users/me"),
      API.get("/transactions/history"),
      API.get("/crypto/prices"),
      API.get("/users/all")
    ])
      .then(([userRes, txRes, cryptoRes, usersRes]) => {
        setProfile(userRes.data);
        setTxs(txRes.data.slice(0, 5));
        setCryptos(cryptoRes.data);
        setUsers(usersRes.data.slice(0, 4));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );

  return (
    <>
      <Navbar />

      <div className="p-8 max-w-6xl mx-auto space-y-8">

        
        <h1 className="text-3xl font-bold">
          Bienvenido, <span className="text-primary">{profile.username}</span>
        </h1>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          
          <Card className="col-span-1 md:col-span-1">
            <CardHeader>
              <CardTitle>Tu saldo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                ${profile.balance.toFixed(2)}
              </p>
            </CardContent>
          </Card>

         
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Acciones rápidas</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Link to="/home#transfer">
                <Button>Enviar dinero</Button>
              </Link>
              <Link to="/home#crypto">
                <Button>Comprar/Vender Crypto</Button>
              </Link>
              <Link to="/home#crypto-list">
                <Button variant="outline">Ver criptomonedas</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

       
        <Card>
          <CardHeader>
            <CardTitle>Últimas transacciones</CardTitle>
          </CardHeader>
          <CardContent>
            {txs.length === 0 ? (
              <p className="text-muted-foreground">Aún no tienes transacciones.</p>
            ) : (
              <ul className="space-y-3">
                {txs.map((tx) => (
                  <li
                    key={tx.id}
                    className="flex justify-between items-center border p-3 rounded-lg"
                  >
                    <span className="font-medium">{tx.type}</span>
                    <span>${tx.amount.toFixed(2)}</span>
                    <span className="text-sm opacity-70">
                      {new Date(tx.timestamp).toLocaleDateString("es-ES")}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        
        <Card>
          <CardHeader>
            <CardTitle>Usuarios frecuentes</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {users.map((u) => (
              <div key={u.username} className="border rounded-lg p-3 flex justify-between">
                <span>{u.username}</span>
                <Link to="/home#transfer">
                  <Button size="sm">Enviar</Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </>
  );
}
