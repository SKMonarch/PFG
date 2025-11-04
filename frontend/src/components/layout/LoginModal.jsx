import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LoginModal({ onClose }) {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(form.username, form.password);
    onClose();
  };

  
  return (
    <div className="">
      <div className="">
        <h2 className="">Iniciar sesión</h2>
        <form onSubmit={handleLogin} className="">
          <input type="text" placeholder="Usuario" onChange={e => setForm({ ...form, username: e.target.value })} />
          <input type="password" placeholder="Contraseña" onChange={e => setForm({ ...form, password: e.target.value })} />
          <button className="">Entrar</button>
        </form>
        <button onClick={onClose} className="">Cerrar</button>
      </div>
    </div>
  );
}