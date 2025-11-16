import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function CryptoChart({ data }) {
  const formatted = data.map(p => ({
    date: new Date(p.date).toLocaleDateString("es-ES"),
    price: p.price
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={formatted}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="black" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
