import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Home() {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <section className="">
        <h1 >Bienvenido a AbanckOS</h1>
        <p>
          Tu banco digital de nueva generación: rápido, seguro y transparente.  
          Gestiona tus finanzas, invierte en criptos y controla tu economía desde un solo lugar.
        </p>
      </section>

      <section >
        <div >
          <h3>Cuenta inteligente</h3>
          <p>Consulta tus movimientos, gastos e ingresos en tiempo real.</p>
        </div>
        <div>
          <h3 >Inversiones</h3>
          <p>Compra y vende criptomonedas con información actualizada del mercado.</p>
        </div>
        <div >
          <h3>Pagos entre usuarios</h3>
          <p>Envía dinero de forma instantánea y segura a tus contactos.</p>
        </div>
      </section>
    </div>
  );
}
