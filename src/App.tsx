import { useEffect, useState } from "react";
import "./App.css";

interface Estudio {
  id: number;
  nombre: string;
  codigo: string;
  precio: number;
  activo: boolean;
}

const formatoPrecio = new Intl.NumberFormat("es-UY", {
  style: "currency",
  currency: "UYU",
  maximumFractionDigits: 0,
});

function App() {
  const [estudios, setEstudios] = useState<Estudio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/estudios")
      .then((res) => {
        if (!res.ok) throw new Error(`El servidor respondió ${res.status}`);
        return res.json() as Promise<Estudio[]>;
      })
      .then(setEstudios)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="container">
      <h1>Nexora Radiografía</h1>
      <h2>Estudios</h2>

      {loading && <p>Cargando...</p>}
      {error && <p className="error">No se pudo cargar la lista: {error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Código</th>
              <th>Precio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {estudios.map((estudio) => (
              <tr key={estudio.id}>
                <td>{estudio.nombre}</td>
                <td>{estudio.codigo}</td>
                <td>{formatoPrecio.format(estudio.precio)}</td>
                <td>{estudio.activo ? "Activo" : "Inactivo"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default App;
