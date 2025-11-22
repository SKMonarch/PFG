import { useEffect, useState } from "react";
import API from "@/components/api/api";
import Navbar from "@/components/layout/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransferModal from "@/components/layout/TransferModal";
import TransactionHistory from "@/components/layout/TransactionHistory";

export default function UserDashboard() {
  const [profile, setProfile] = useState(null);
  const [cryptos, setCryptos] = useState([]);
  const [users, setUsers] = useState([]);
  const [userCryptos, setUserCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const openTransfer = (username = "") => {
    setSelectedUser(username);
    setOpenTransferModal(true);
  };

  useEffect(() => {
    Promise.all([
      API.get("/users/me"),
      API.get("/crypto/prices"),
      API.get("/users/all"),
      API.get("/crypto/wallet"),
    ])
      .then(([userRes, cryptoRes, usersRes, walletRes]) => {
        setProfile(userRes.data);
        setCryptos(cryptoRes.data);
        setUsers(usersRes.data.slice(0, 4));
        setUserCryptos(walletRes.data || []);
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

         
          <Card>
            <CardHeader>
              <CardTitle>Tu saldo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">${profile.balance.toFixed(2)}</p>
            </CardContent>
          </Card>

         
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Tus criptomonedas</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {userCryptos.length === 0 ? (
                <p className="text-muted-foreground col-span-2">
                  No tienes criptomonedas en tu cartera.
                </p>
              ) : (
                userCryptos.map((c) => (
                  <div key={c.symbol} className="p-3 border rounded-xl bg-muted/40">
                    <p className="font-semibold">
                      {c.symbol.toUpperCase()} — {c.amount} u.
                    </p>
                    <p className="text-sm opacity-70">
                      ${c.value_usd.toFixed(2)} total
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Acciones rápidas</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 flex-wrap">
            <Button onClick={() => openTransfer()}>Enviar dinero</Button>

            <Button onClick={() => (window.location.href = "/home#crypto")}>
              Comprar/Vender Crypto
            </Button>

            <Button variant="outline" onClick={() => (window.location.href = "/home#crypto-list")}>
              Ver criptomonedas
            </Button>
          </CardContent>
        </Card>

       
        <Card>
            <TransactionHistory limit={5} />
        </Card>

        
        <Card>
          <CardHeader>
            <CardTitle>Usuarios frecuentes</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {users.map((u) => (
              <div key={u.username} className="border rounded-lg p-3 flex justify-between items-center">
                <span>{u.username}</span>
                <Button size="sm" onClick={() => openTransfer(u.username)}>
                  Enviar
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <TransferModal
        open={openTransferModal}
        onClose={setOpenTransferModal}
        presetUser={selectedUser}
      />
    </>
  );
}
