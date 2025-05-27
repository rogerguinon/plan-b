// data/ExpensesStorage.js
import { getData, storeData } from '../utils/storage';

const EXPENSES_KEY = 'GASTOS';

// Obtener todos los gastos
export const getGastos = async () => {
  return (await getData(EXPENSES_KEY)) || [];
};

// Obtener todos los gastos de una quedada específica
export const getGastosPorEvento = async (eventId) => {
  const todos = await getGastos();
  return todos.filter(g => g.eventId === eventId);
};

// Añadir un nuevo gasto
export const addGasto = async ({ eventId, pagadoPor, participantes, cantidad, descripcion }) => {
  if (!eventId || !pagadoPor || !participantes || participantes.length === 0 || !cantidad) return;

  const todos = await getGastos();

  const nuevo = {
    id: Date.now().toString(),
    eventId,
    pagadoPor,
    participantes,
    cantidad,
    descripcion: descripcion || '',
  };

  await storeData(EXPENSES_KEY, [...todos, nuevo]);
};

// Editar gasto existente
export const updateGasto = async (id, actualizado) => {
  const todos = await getGastos();
  const nuevos = todos.map(g =>
    g.id === id ? { ...g, ...actualizado } : g
  );
  await storeData(EXPENSES_KEY, nuevos);
};

// Eliminar gasto
export const deleteGasto = async (id) => {
  const todos = await getGastos();
  const nuevos = todos.filter(g => g.id !== id);
  await storeData(EXPENSES_KEY, nuevos);
};
