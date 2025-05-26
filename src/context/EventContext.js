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
    description: 'La idea es quedar antes para ir todos juntos',
    date: 'May 16, 2025',
    time: '21:00',
    location: 'Nou Camp Nou',
    participants: [
      { name: 'Marc', image: 'https://randomuser.me/api/portraits/men/10.jpg', asistencia: '-' },
      { name: 'Sergi', image: 'https://randomuser.me/api/portraits/men/22.jpg', asistencia: 'no' },
      { name: 'Clara', image: 'https://randomuser.me/api/portraits/women/35.jpg', asistencia: '-' },
      { name: 'Laura', image: 'https://randomuser.me/api/portraits/women/45.jpg', asistencia: 'si' },
    ],
  },
  {
    id: '2',
    title: 'Concierto Bad Bunny',
    description: 'Llevad cena y bebida para la cola',
    date: 'May 23, 2026',
    time: '20:00',
    location: 'Estadi Olímpic Lluís Companys',
    image: 'https://legendswillneverdie.com/wp-content/uploads/2025/01/photo-output-3.jpg?w=1024',
    participants: [
      { name: 'Eva', asistencia: 'no' },
      { name: 'Pau', asistencia: 'si' },
      { name: 'Núria', image: 'https://randomuser.me/api/portraits/women/44.jpg', asistencia: '-' },
      { name: 'Daniel', image: 'https://randomuser.me/api/portraits/men/55.jpg', asistencia: 'si' },
      { name: 'Cristina', image: 'https://randomuser.me/api/portraits/women/66.jpg',asistencia: '-' },
      { name: 'Alex', image: 'https://randomuser.me/api/portraits/men/77.jpg', asistencia: 'si' },
      { name: 'Carla', image: 'https://randomuser.me/api/portraits/women/88.jpg', asistencia: 'no' },
    ],
  },
  {
    id: '3',
    title: 'Cumpleaños de Sandra',
    description: 'Estáis invitados a la fiesta de cumpleaños.',
    date: 'Feb 20, 2026',
    time: '18:00',
    location: 'C/ de Vilamarí, 90, Barcelona',
    image: 'https://m.media-amazon.com/images/I/617kglB+Y6L._AC_UF1000,1000_QL80_.jpg',
    participants: [
      { name: 'Sandra', image: 'https://randomuser.me/api/portraits/women/32.jpg', asistencia: 'si' },
      { name: 'Hugo', image: 'https://randomuser.me/api/portraits/men/12.jpg', asistencia: 'si' },
      { name: 'Laia', image: 'https://randomuser.me/api/portraits/women/14.jpg', asistencia: 'si' },
      { name: 'Oriol', image: 'https://randomuser.me/api/portraits/men/18.jpg', asistencia: 'si' },
      { name: 'Nora', image: 'https://randomuser.me/api/portraits/women/21.jpg', asistencia: 'no' },
      { name: 'Lucas', image: 'https://randomuser.me/api/portraits/men/25.jpg', asistencia: 'si' },
      { name: 'Irene', image: 'https://randomuser.me/api/portraits/women/29.jpg', asistencia: 'si' },
      { name: 'Marcelo', image: 'https://randomuser.me/api/portraits/men/31.jpg', asistencia: '-' },
    ],
  },
];

// ENCUESTAS (renombramos para evitar conflicto con el estado)
export const SurveyMap = {
  '1': [
    {
      id: '1',
      question: '¿A qué hora quedamos para ir al partido?',
      options: [
        { text: '17:00', votes: 2, voted: false },
        { text: '17:30', votes: 4, voted: false },
        { text: '18:00', votes: 1, voted: false },
      ],
      votersCount: 5,
    },
    {
      id: '2',
      question: '¿Dónde nos encontramos antes del partido?',
      options: [
        { text: 'Puerta principal', votes: 3, voted: false },
        { text: 'Metro Collblanc', votes: 2, voted: false },
        { text: 'Bar de la esquina', votes: 2, voted: false },
      ],
      votersCount: 4,
    }
  ],
  '2': [
    {
      id: '1',
      question: '¿Qué día os va mejor?',
      options: [
        { text: '20/02/2026', votes: 3, voted: false },
        { text: '21/02/2026', votes: 4, voted: false },
      ],
      votersCount: 5,
    },
    {
      id: '2',
      question: '¿Queréis que llevemos pancarta?',
      description: 'Para hacer más ruido en el concierto 😎',
      options: [
        { text: 'Sí, con luces LED', votes: 2, voted: false },
        { text: 'Sí, pero algo sencillo', votes: 3, voted: false },
        { text: 'No hace falta', votes: 4, voted: false },
      ],
      votersCount: 4,
    },
    {
      id: '3',
      question: '¿Dónde quedamos antes del concierto?',
      options: [
        { text: 'Plaça Espanya', votes: 3, voted: false },
        { text: 'En la cola directamente', votes: 5, voted: false },
        { text: 'Parc de Montjuïc', votes: 2, voted: false },
      ],
      votersCount: 7,
    }
  ],
  '3': [
    {
      id: '1',
      question: '¿Qué tipo de música preferís para la fiesta?',
      options: [
        { text: 'Reggaetón', votes: 4, voted: false },
        { text: 'Pop', votes: 3, voted: false },
        { text: 'Electrónica', votes: 2, voted: false },
        { text: 'De todo un poco', votes: 5, voted: false },
      ],
      votersCount: 8,
    },
    {
      id: '2',
      question: '¿Qué llevamos para compartir?',
      description: 'Se aceptan bebidas y snacks 🎉',
      options: [
        { text: 'Patatas', votes: 3, voted: false },
        { text: 'Refrescos', votes: 5, voted: false },
        { text: 'Tarta casera', votes: 2, voted: false },
        { text: 'Nada, solo asistiré 😅', votes: 1, voted: false },
      ],
      votersCount: 10,
    }
  ]
};


// Componente proveedor del contexto
import { getData, storeData } from '../utils/storage'; // asegúrate de tener esto
const KEY_EVENTOS = "EVENTOS"; // clave para AsyncStorage

export const EventProvider = ({ children }) => {
  const [eventos, setEventos] = useState([]);
  const [surveyMap, setSurveyMap] = useState(SurveyMap);
  const [participantesPorEvento, setParticipantesPorEvento] = useState({});

  // Cargar eventos desde almacenamiento al inicio
  useEffect(() => {
    const cargarEventos = async () => {
      const almacenados = await getData(KEY_EVENTOS);
      if (almacenados && almacenados.length > 0) {
        setEventos(almacenados);
        // cargar participantes por evento desde los almacenados
        const map = {};
        almacenados.forEach(ev => {
          map[ev.id] = ev.participants || [];
        });
        setParticipantesPorEvento(map);
      } else {
        // si no hay nada almacenado, usar los mock-ups
        setEventos(Events);
        const map = {};
        Events.forEach(ev => {
          map[ev.id] = ev.participants || [];
        });
        setParticipantesPorEvento(map);
        await storeData(KEY_EVENTOS, Events); // guardar los mock-up como datos iniciales
      }
    };
    cargarEventos();
  }, []);


  const agregarEvento = async (nuevoEvento) => {
    setEventos((prev) => {
      const actualizados = [...prev, nuevoEvento];
      storeData(KEY_EVENTOS, actualizados); // guardar en storage
      return actualizados;
    });

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
