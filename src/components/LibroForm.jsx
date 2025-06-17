// src/components/LibroForm.jsx
import { useState, useEffect } from "react";

const initialState = {
  titulo: "",
  autor: "",
  anio: "",
  genero: "",
  cantidad: 0,
};

export default function LibroForm({ onSubmit, libroEditado, onCancel }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (libroEditado) setForm(libroEditado);
    else setForm(initialState);
  }, [libroEditado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "cantidad" || name === "anio" ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Título</label>
        <input
          className="form-control"
          name="titulo"
          placeholder=""
          value={form.titulo}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Autor</label>
        <input
          className="form-control"
          name="autor"
          placeholder=""
          value={form.autor}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Año de publicación</label>
        <input
          className="form-control"
          name="anio"
          type="number"
          placeholder=""
          value={form.anio}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Género</label>
        <input
          className="form-control"
          name="genero"
          placeholder=""
          value={form.genero}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Cantidad disponible</label>
        <input
          className="form-control"
          name="cantidad"
          type="number"
          min={0}
          placeholder=""
          value={form.cantidad}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-flex justify-content-between gap-2 mt-3">
        <button className="btn btn-success w-50" type="submit">
          Guardar
        </button>

        <button
          className="btn btn-secondary w-50"
          type="button"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
