import { getData, storeData } from '../utils/storage';

const KEY = "EVENTOS";

// Obtener todos los eventos
export const getEventos = async () => {
  return await getData(KEY) || [];
};

// Obtener un evento por su ID
export const getEventoById = async (id) => {
  const eventos = await getData(KEY);
  return eventos?.find(evento => evento.id === id);
};

// Añadir nuevo evento
export const addEvento = async ({ title, description, date = '', time = '', location = '', participants = '', image = 'https://randomuser.me/api/portraits/men/32.jpg' }) => {
  const eventos = await getData(KEY) || [];
  const nuevoEvento = {
    id: Date.now().toString(),
    title,
    description,
    date,
    time,
    location,
    participants,
    image,
  };
  await storeData(KEY, [...eventos, nuevoEvento]);
};

// Editar evento existente
export const updateEvento = async (id, updatedFields) => {
  const eventos = await getData(KEY) || [];
  const eventosActualizados = eventos.map(evento =>
    evento.id === id ? { ...evento, ...updatedFields } : evento
  );
  await storeData(KEY, eventosActualizados);
};

// Eliminar evento
export const deleteEvento = async (id) => {
  const eventos = await getData(KEY) || [];
  const eventosFiltrados = eventos.filter(evento => evento.id !== id);
  await storeData(KEY, eventosFiltrados);
};