import React, { createContext, useContext, useState, useEffect } from 'react';

// Creamos el contexto
const EventContext = createContext();

// Hook para acceder fácilmente
export const useEventos = () => useContext(EventContext);

// QUEDADAS
const Events = [
  {
    id: '1',
    title: 'Partido Barça vs Espanyol',
    date: 'May 16, 2025',
    description: 'Partido de fútbol amistoso',
    location: 'Nou Camp Nou',
    participants: [
      { name: 'Marc', image: 'https://randomuser.me/api/portraits/men/10.jpg' },
      { name: 'Sergi', image: 'https://randomuser.me/api/portraits/men/22.jpg' },
      { name: 'Clara', image: 'https://randomuser.me/api/portraits/women/35.jpg' },
      { name: 'Laura', image: 'https://randomuser.me/api/portraits/women/45.jpg' },
      { name: 'Jordi', image: 'https://randomuser.me/api/portraits/men/52.jpg' },
      { name: 'Marta', image: 'https://randomuser.me/api/portraits/women/27.jpg' },
    ],
  },
  {
    id: '2',
    title: 'Concierto Bad Bunny',
    date: 'May 23, 2026',
    description: 'Llevad cena y bebida para la cola',
    location: 'Estadi Olímpic Lluís Companys',
    participants: [
      { name: 'Eva', image: 'https://randomuser.me/api/portraits/women/11.jpg' },
      { name: 'Pau', image: 'https://randomuser.me/api/portraits/men/33.jpg' },
      { name: 'Núria', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { name: 'Daniel', image: 'https://randomuser.me/api/portraits/men/55.jpg' },
      { name: 'Cristina', image: 'https://randomuser.me/api/portraits/women/66.jpg' },
      { name: 'Alex', image: 'https://randomuser.me/api/portraits/men/77.jpg' },
      { name: 'Carla', image: 'https://randomuser.me/api/portraits/women/88.jpg' },
    ],
  },
  {
    id: '3',
    title: 'Cumpleaños de Sandra',
    date: 'Feb 20, 2026',
    description: 'Estáis invitados a la fiesta de cumpleaños.',
    location: 'C/ de Vilamarí, 90, Barcelona',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    participants: [
      { name: 'Sandra', image: 'https://randomuser.me/api/portraits/women/32.jpg' },
      { name: 'Hugo', image: 'https://randomuser.me/api/portraits/men/12.jpg' },
      { name: 'Laia', image: 'https://randomuser.me/api/portraits/women/14.jpg' },
      { name: 'Oriol', image: 'https://randomuser.me/api/portraits/men/18.jpg' },
      { name: 'Nora', image: 'https://randomuser.me/api/portraits/women/21.jpg' },
      { name: 'Lucas', image: 'https://randomuser.me/api/portraits/men/25.jpg' },
      { name: 'Irene', image: 'https://randomuser.me/api/portraits/women/29.jpg' },
      { name: 'Marcelo', image: 'https://randomuser.me/api/portraits/men/31.jpg' },
    ],
  },
];

// ENCUESTAS (renombramos para evitar conflicto con el estado)
const initialSurveyMap = {
  '1': [
    {
      id: '1',
      question: '¿Qué bebida preferís?',
      description: 'Compraremos las que tengan más de 3 votos',
      options: [
        { text: 'Fanta', votes: 1, voted: false },
        { text: 'Coca Cola', votes: 3, voted: false },
        { text: 'Ron Pujol', votes: 7, voted: false },
        { text: 'Agua', votes: 1, voted: false },
      ]
    },
    {
      id: '4',
      question: '¿A qué hora quedamos para ir al partido?',
      options: [
        { text: '17:00', votes: 2, voted: false },
        { text: '17:30', votes: 4, voted: false },
        { text: '18:00', votes: 1, voted: false },
      ]
    },
    {
      id: '5',
      question: '¿Dónde nos encontramos antes del partido?',
      options: [
        { text: 'Puerta principal', votes: 3, voted: false },
        { text: 'Metro Collblanc', votes: 2, voted: false },
        { text: 'Bar de la esquina', votes: 2, voted: false },
      ]
    }
  ],
  '2': [
    {
      id: '2',
      question: '¿Qué día os va mejor?',
      options: [
        { text: '20/02/2026', votes: 3, voted: false },
        { text: '21/02/2026', votes: 4, voted: false },
      ]
    },
    {
      id: '6',
      question: '¿Queréis que llevemos pancarta?',
      description: 'Para hacer más ruido en el concierto 😎',
      options: [
        { text: 'Sí, con luces LED', votes: 2, voted: false },
        { text: 'Sí, pero algo sencillo', votes: 3, voted: false },
        { text: 'No hace falta', votes: 4, voted: false },
      ]
    },
    {
      id: '7',
      question: '¿Dónde quedamos antes del concierto?',
      options: [
        { text: 'Plaça Espanya', votes: 3, voted: false },
        { text: 'En la cola directamente', votes: 5, voted: false },
        { text: 'Parc de Montjuïc', votes: 2, voted: false },
      ]
    }
  ],
  '3': [
    {
      id: '8',
      question: '¿Qué tipo de música preferís para la fiesta?',
      options: [
        { text: 'Reggaetón', votes: 4, voted: false },
        { text: 'Pop', votes: 3, voted: false },
        { text: 'Electrónica', votes: 2, voted: false },
        { text: 'De todo un poco', votes: 5, voted: false },
      ]
    },
    {
      id: '9',
      question: '¿Qué llevamos para compartir?',
      description: 'Se aceptan bebidas y snacks 🎉',
      options: [
        { text: 'Patatas', votes: 3, voted: false },
        { text: 'Refrescos', votes: 5, voted: false },
        { text: 'Tarta casera', votes: 2, voted: false },
        { text: 'Nada, solo asistiré 😅', votes: 1, voted: false },
      ]
    }
  ]
};


// Componente proveedor del contexto
export const EventProvider = ({ children }) => {
  // Estado inicial de eventos con los Events definidos
  const [eventos, setEventos] = useState(Events);

  // Estado inicial de encuestas con initialSurveyMap
  const [surveyMap, setSurveyMap] = useState(initialSurveyMap);

  // Estado participantesPorEvento: lo generamos a partir de los participantes dentro de cada evento
  const [participantesPorEvento, setParticipantesPorEvento] = useState(() => {
    const map = {};
    Events.forEach(evento => {
      map[evento.id] = evento.participants || [];
    });
    return map;
  });

  const agregarEvento = (nuevoEvento) => {
    setEventos((prev) => [...prev, nuevoEvento]);
    // También actualizamos participantesPorEvento si tiene participantes
    if (nuevoEvento.participants) {
      setParticipantesPorEvento((prev) => ({
        ...prev,
        [nuevoEvento.id]: nuevoEvento.participants,
      }));
    }
  };

  const agregarParticipante = (eventoId, participante) => {
    setParticipantesPorEvento((prev) => ({
      ...prev,
      [eventoId]: [...(prev[eventoId] || []), participante],
    }));
  };

  const agregarEncuesta = (eventoId, encuesta) => {
    setSurveyMap((prev) => ({
      ...prev,
      [eventoId]: [...(prev[eventoId] || []), encuesta],
    }));
  };

  return (
    <EventContext.Provider value={{
      eventos,
      setEventos,
      agregarEvento,
      participantesPorEvento,
      agregarParticipante,
      surveyMap,
      agregarEncuesta
    }}>
      {children}
    </EventContext.Provider>
  );
};
