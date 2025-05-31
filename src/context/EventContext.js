import React, { createContext, useContext, useState, useEffect } from 'react';

// Creamos el contexto
const EventContext = createContext();

// Hook para acceder fácilmente
export const useEventos = () => useContext(EventContext);
import AsyncStorage from '@react-native-async-storage/async-storage';

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


// GRUPOS (mock-up)
const Groups = [
  {
    id: 'grupo1',
    nombre: 'Amigos UPF',
    participantes: 5,
    quedadas: 3,
    imagen: 'https://pbs.twimg.com/profile_images/926048284912873472/EEiD1L0S_400x400.jpg',
    quedadasActuales: [
      { id: 'q1', titulo: 'Partido Barça vs Espanyol', lugar: 'Nou Camp Nou', fecha: 'May 16, 2025' }
    ],
    quedadasPasadas: [
      { id: 'q2', titulo: 'Cena Erasmus', lugar: 'Restaurante Yaya', fecha: 'Jun 10, 2024' },
      { id: 'q3', titulo: 'Escape Room', lugar: 'Trap Barcelona', fecha: 'May 2, 2025' },
    ],
    miembros: [
      { id: 'm1', nombre: 'Laura', foto: 'https://randomuser.me/api/portraits/women/45.jpg'},
      { id: 'm2', nombre: 'Marc', foto:  'https://randomuser.me/api/portraits/men/10.jpg'},
      { id: 'm3', nombre: 'Sergi', foto:  'https://randomuser.me/api/portraits/men/22.jpg'},
      { id: 'm4', nombre: 'Clara', foto:  'https://randomuser.me/api/portraits/women/35.jpg'},
    ]
  },
  {
    id: 'grupo2',
    nombre: 'Familia',
    participantes: 5,
    quedadas: 2,
    imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // icono familia por ejemplo
    quedadasActuales: [

    ],
    
    quedadasPasadas: [
      { id: 'q1', titulo: 'Cena Navidad', lugar: 'Casa de mamá', fecha: 'Dec 24, 2025' },
      { id: 'q2', titulo: 'Barbacoa Verano', lugar: 'Parque Central', fecha: 'Jul 15, 2025' }
    ],
    miembros: [
      { id: 'm4', nombre: 'María', foto: 'https://randomuser.me/api/portraits/women/5.jpg' },
      { id: 'm5', nombre: 'Javier', foto: 'https://randomuser.me/api/portraits/men/7.jpg' },
      { id: 'm6', nombre: 'Carlos', foto: 'https://randomuser.me/api/portraits/men/40.jpg' },
      { id: 'm7', nombre: 'Elena', foto: 'https://randomuser.me/api/portraits/women/52.jpg' },
      { id: 'm8', nombre: 'Pablo' }
    ]
  }
]


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
const KEY_GROUPS = "GRUPOS"; // clave para AsyncStorage

export const EventProvider = ({ children }) => {
  const [eventos, setEventos] = useState([]);
  const [surveyMap, setSurveyMap] = useState(SurveyMap);
  const [participantesPorEvento, setParticipantesPorEvento] = useState({});
  const [groups, setGroups] = useState(Groups);

  // Cargar eventos desde almacenamiento al inicio
  useEffect(() => {
    const cargarEventos = async () => {

      // Cargar eventos
      const almacenados = await getData(KEY_EVENTOS);
      if (Array.isArray(almacenados) && almacenados.length > 0) {
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

  const refreshEventos = async () => {
    const almacenados = await getData(KEY_EVENTOS);
    if (Array.isArray(almacenados)) {
      setEventos(almacenados);
      const map = {};
      almacenados.forEach(ev => {
        map[ev.id] = ev.participants || [];
      });
      setParticipantesPorEvento(map);
    }
  };

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

  const editarEvento = async (eventoEditado) => {
    const nuevosEventos = eventos.map(e => e.id === eventoEditado.id ? eventoEditado : e);
    setEventos(nuevosEventos);
    await AsyncStorage.setItem('eventos', JSON.stringify(nuevosEventos));
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

  const deleteEvento = async (id) => {
    try {
      const nuevosEventos = eventos.filter(e => e.id !== id);
      setEventos(nuevosEventos);
      await AsyncStorage.setItem(KEY_EVENTOS, JSON.stringify(nuevosEventos));

      // También eliminamos del mapa de participantes si existe
      setParticipantesPorEvento((prev) => {
        const actualizado = { ...prev };
        delete actualizado[id];
        return actualizado;
      });

      // Y del mapa de encuestas, si lo deseas
      setSurveyMap((prev) => {
        const actualizado = { ...prev };
        delete actualizado[id];
        return actualizado;
      });

    } catch (error) {
      console.error("Error al eliminar el evento:", error);
      throw error;
    }
  };


  return (
    <EventContext.Provider value={{
      eventos,
      groups,
      setGroups,
      setEventos,
      agregarEvento,
      editarEvento,
      deleteEvento,
      participantesPorEvento,
      agregarParticipante,
      surveyMap,
      agregarEncuesta,
      refreshEventos
    }}>
      {children}
    </EventContext.Provider>
  );
};