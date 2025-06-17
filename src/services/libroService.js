// src/services/libroService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/libros"; // ajusta si usas otra URL

export const getLibros = () => axios.get(API_URL);
export const getLibro = (id) => axios.get(`${API_URL}/${id}`);
export const crearLibro = (data) => axios.post(API_URL, data);
export const actualizarLibro = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);
export const eliminarLibro = (id) => axios.delete(`${API_URL}/${id}`);
