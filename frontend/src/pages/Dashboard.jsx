import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
/*
import BalanceWidget from "../components/widgets/BalanceWidget";
import TransactionsWidget from "../components/widgets/TransactionsWidget";
import CryptoWidget from "../components/widgets/CryptoWidget";
*/

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-8">
      <h2>Hola, {user.username}</h2>
      <div className="">
        {/* <BalanceWidget /> */}
        {/* <TransactionsWidget /> */}
        {/* <CryptoWidget /> */}
      </div>
    </div>
  );
}
