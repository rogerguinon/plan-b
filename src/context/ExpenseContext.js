import { createContext, useState, useContext } from 'react';

const ExpenseContext = createContext();

const mockExpenses = {
  '1': [  // Partido de fútbol
    {
      id: 1001,
      title: 'Cena en restaurante',
      amount: 45.5,
      payer: 'Ana',
      included: ['Ana', 'Arnau', 'Estela'],
      date: '2025-05-10T20:00:00Z',
    },
    {
      id: 1002,
      title: 'Entradas partido',
      amount: 90,
      payer: 'Martí',
      included: ['Martí', 'Omar', 'Roger'],
      date: '2025-05-16T19:00:00Z',
    },
  ],
  '2': [ // Concierto Bad Bunny
    {
      id: 3001,
      title: 'Entradas concierto Bad Bunny',
      amount: 150,
      payer: 'Sandra',
      included: ['Sandra', 'Carlos', 'Marta'],
      date: '2025-07-20T21:00:00Z',
    },
    {
      id: 3002,
      title: 'Taxi al recinto',
      amount: 35,
      payer: 'Carlos',
      included: ['Sandra', 'Carlos', 'Marta'],
      date: '2025-07-20T19:30:00Z',
    },
    {
      id: 3003,
      title: 'Merchandising oficial',
      amount: 80,
      payer: 'Marta',
      included: ['Marta'],
      date: '2025-07-20T22:30:00Z',
    },
  ],

  '3': [ // Cumpleaños de Sandra
    {
      id: 4001,
      title: 'Decoración y globos',
      amount: 45,
      payer: 'Estela',
      included: ['Sandra', 'Estela', 'Carlos', 'Marta', 'Arnau'],
      date: '2025-08-15T18:00:00Z',
    },
    {
      id: 4002,
      title: 'Pastel de cumpleaños',
      amount: 60,
      payer: 'Sandra',
      included: ['Sandra', 'Estela', 'Carlos', 'Marta', 'Arnau'],
      date: '2025-08-15T20:00:00Z',
    },
    {
      id: 4003,
      title: 'Cena y bebidas',
      amount: 180,
      payer: 'Carlos',
      included: ['Sandra', 'Estela', 'Carlos', 'Marta', 'Arnau'],
      date: '2025-08-15T20:30:00Z',
    },
  ],
};

export const ExpenseProvider = ({ children }) => {
  const [expensesByEvent, setExpensesByEvent] = useState(mockExpenses);

  // Add an expense to a specific event
  const addExpense = (eventId, expense) => {
    setExpensesByEvent(prev => ({
      ...prev,
      [eventId]: [...(prev[eventId] || []), { ...expense, id: Date.now() }],
    }));
  };

  // Get expenses for a specific event
  const getExpensesForEvent = (eventId) => {
    return expensesByEvent[eventId] || [];
  };

  return (
    <ExpenseContext.Provider value={{ expensesByEvent, addExpense, getExpensesForEvent }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);