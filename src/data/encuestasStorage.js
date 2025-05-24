// data/encuestasStorage.js
import { getData, storeData } from '../utils/storage';

const KEY = "ENCUESTAS";

// Obtener todas las encuestas
export const getEncuestas = async () => {
  return await getData(KEY);
};

// Obtener una encuesta por su ID
export const getEncuestaById = async (id) => {
  const todas = await getData(KEY);
  return todas.find(encuesta => encuesta.id === id);
};

// Añadir nueva encuesta
export const addEncuesta = async ({ titulo, descripcion, opciones, eventId }) => {
  if (!titulo || opciones.length < 2 || !eventId) return;

  const todas = await getData(KEY);
  const nueva = {
    id: Date.now().toString(),
    titulo,
    descripcion,
    opciones,
    votos: new Array(opciones.length).fill(0),
    eventId,
  };
  await storeData(KEY, [...todas, nueva]);
};


// Editar encuesta existente
export const updateEncuesta = async (id, actualizada) => {
  const todas = await getData(KEY);
  const nuevas = todas.map(e =>
    e.id === id ? { ...e, ...actualizada } : e
  );
  await storeData(KEY, nuevas);
};

// Eliminar encuesta
export const deleteEncuesta = async (id) => {
  const todas = await getData(KEY);
  const nuevas = todas.filter(e => e.id !== id);
  await storeData(KEY, nuevas);
};
