import { useEffect, useState } from "react";
import LibroForm from "./components/LibroForm";
import LibroList from "./components/LibroList";
import * as libroService from "./services/libroService";

export default function App() {
  const [libros, setLibros] = useState([]);
  const [libroEditado, setLibroEditado] = useState(null);

  const cargarLibros = async () => {
    try {
      const res = await libroService.getLibros();
      console.log("📦 Datos desde API:", res.data);
      setLibros(res.data);
    } catch (error) {
      console.error("❌ Error al obtener libros:", error);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  const guardarLibro = async (libro) => {
    if (libro._id) {
      await libroService.actualizarLibro(libro._id, libro);
    } else {
      await libroService.crearLibro(libro);
    }
    setLibroEditado(null);
    cargarLibros();
  };

  const eliminarLibro = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este libro?")) {
      await libroService.eliminarLibro(id);
      cargarLibros();
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">📚 Gestión de Libros</h1>

      <div className="row">
        {/* Formulario a la izquierda */}
        <div className="col-md-5 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white fw-semibold">
              {libroEditado ? "✏️ Editar libro" : "📘 Registrar nuevo libro"}
            </div>
            <div className="card-body">
              <LibroForm
                onSubmit={guardarLibro}
                libroEditado={libroEditado}
                onCancel={() => setLibroEditado(null)}
              />
            </div>
          </div>
        </div>

        {/* Lista a la derecha */}
        <div className="col-md-7">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white fw-semibold">
              📖 Lista de Libros
            </div>
            <div className="card-body">
              <LibroList
                libros={libros}
                onDelete={eliminarLibro}
                onEdit={setLibroEditado}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
