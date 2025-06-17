import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function LibroList({ libros, onDelete, onEdit }) {
  const [libroDetalle, setLibroDetalle] = useState(null);

  const cerrarModal = () => setLibroDetalle(null);

  return (
    <>
      {libros.length ? (
        libros.map((libro) => (
          <div
            key={libro._id}
            className="d-flex justify-content-between align-items-center border rounded p-3 mb-2 shadow-sm bg-light-subtle"
          >
            <div>
              <div className="fw-bold fs-5">{libro.titulo}</div>
              <div className="text-muted">
                ✍️ {libro.autor} — 📅 {libro.anio || "-"}
              </div>
              <div className="text-muted">
                📚 {libro.genero || "Sin género"} — 🔢 {libro.cantidad}{" "}
                disponibles
              </div>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <Button
                variant="info"
                size="sm"
                onClick={() => setLibroDetalle(libro)}
              >
                Ver
              </Button>
              <Button variant="warning" size="sm" onClick={() => onEdit(libro)}>
                Editar
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(libro._id)}
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted">No hay libros registrados 💤</p>
      )}

      {/* Modal de detalles */}
      {libroDetalle && (
        <Modal show onHide={cerrarModal}>
          <Modal.Header closeButton>
            <Modal.Title>📘 Detalles del Libro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Título:</strong> {libroDetalle.titulo}
            </p>
            <p>
              <strong>Autor:</strong> {libroDetalle.autor}
            </p>
            <p>
              <strong>Año:</strong> {libroDetalle.anio || "No registrado"}
            </p>
            <p>
              <strong>Género:</strong> {libroDetalle.genero || "Sin género"}
            </p>
            <p>
              <strong>Cantidad:</strong> {libroDetalle.cantidad}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cerrarModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
