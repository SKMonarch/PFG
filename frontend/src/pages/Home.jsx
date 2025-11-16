import Navbar from "@/components/layout/Navbar";
import CryptoList from "@/components/layout/CryptoList";
import CryptoActions from "@/components/layout/CryptoActions";
import TransferForm from "@/components/layout/TransferForm";
import TransactionHistory from "@/components/layout/TransactionHistory";
import { useEffect, useState } from "react";
import API from "@/components/api/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/users/me")
      .then((res) => setProfile(res.data))
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

      <div className="p-8 space-y-10 max-w-6xl mx-auto">

      
        <section id="profile">
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
        </section>
        <section id="crypto-list">
          <CryptoList />
        </section>
     
      
        <section id="crypto">
          <CryptoActions />
        </section>

        <section id="transfer">
          <TransferForm />
        </section>

        <section id="history">
          <TransactionHistory />
        </section>
      </div>
    </>
  );
}
