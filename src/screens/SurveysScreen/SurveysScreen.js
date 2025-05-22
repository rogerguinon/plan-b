import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ViewSurveysScreen({ route }) {
  const navigation = useNavigation();
  
  

  // Encuestas dummy de ejemplo
  const {id:eventId, eventTitle = 'Título de la quedada' } = route.params || {};

  const [surveyMap, setSurveyMap] = useState({
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
        ],
        votersCount: 7,
        userHasVoted: false,
      },
      {
        id: '4',
        question: '¿A qué hora quedamos para ir al partido?',
        options: [
          { text: '17:00', votes: 2, voted: false },
          { text: '17:30', votes: 4, voted: false },
          { text: '18:00', votes: 1, voted: false },
        ],
        votersCount: 4,
        userHasVoted: false,
      },
      {
        id: '5',
        question: '¿Dónde nos encontramos antes del partido?',
        options: [
          { text: 'Puerta principal', votes: 3, voted: false },
          { text: 'Metro Collblanc', votes: 3, voted: false },
          { text: 'Bar de la esquina', votes: 2, voted: false },
        ],
        votersCount: 7,
        userHasVoted: false,
      }
    ],
    '2': [
      {
        id: '2',
        question: '¿Qué día os va mejor?',
        options: [
          { text: '20/02/2026', votes: 3, voted: false },
          { text: '21/02/2026', votes: 4, voted: false },
        ],
        votersCount: 5,
        userHasVoted: false,
      },
      {
        id: '6',
        question: '¿Queréis que llevemos pancarta?',
        description: 'Para hacer más ruido en el concierto 😎',
        options: [
          { text: 'Sí, con luces LED', votes: 2, voted: false },
          { text: 'Sí, pero algo sencillo', votes: 3, voted: false },
          { text: 'No hace falta', votes: 4, voted: false },
        ],
        votersCount: 4,
        userHasVoted: false,
      },
      {
        id: '7',
        question: '¿Dónde quedamos antes del concierto?',
        options: [
          { text: 'Plaça Espanya', votes: 3, voted: false },
          { text: 'En la cola directamente', votes: 5, voted: false },
          { text: 'Parc de Montjuïc', votes: 2, voted: false },
        ],
        votersCount: 7,
        userHasVoted: false,
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
        ],
        votersCount: 6,
        userHasVoted: false,
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
        ],
        votersCount: 10,
        userHasVoted: false,
      }
    ]
  });


  

  useEffect(() => {
    if (route.params?.nuevaEncuesta) {
      const nuevas = [...surveys, route.params.nuevaEncuesta];
      setSurveyMap((prev) => ({
        ...prev,
        [eventId]: nuevas,
      }));
    }
  }, [route.params?.nuevaEncuesta]);

  const surveys = surveyMap[eventId] || [];

  const handleAddSurvey = () => {
    navigation.navigate('Crear', {
      eventId,
      onAddSurvey: (newSurvey) => {
        setSurveyMap((prevMap) => {
          const updatedSurveys = [...(prevMap[eventId] || []), newSurvey];
          return { ...prevMap, [eventId]: updatedSurveys };
        });
      },
    }); 
  };

  const handleEditSurvey = (survey) => {
    navigation.navigate('Editar', { survey, eventId });
  };


  const [userVotes, setUserVotes] = useState({});

  const handleToggleVote = (surveyId, optionIndex) => {
    setSurveyMap(prevMap => {
      const updatedSurveys = prevMap[eventId].map(survey => {
        if (survey.id !== surveyId) return survey;

        // Opciones actualizadas
        const updatedOptions = survey.options.map((opt, idx) => {
          if (idx !== optionIndex) return opt;

          const hasVoted = opt.voted;
          return {
            ...opt,
            votes: hasVoted ? Math.max(0, opt.votes - 1) : opt.votes + 1,
            voted: !hasVoted,
          };
        });

        // Comprobar si el usuario tenía votos previos (antes de la actualización)
        const hadVotedBefore = survey.userHasVoted || false;

        // Contar cuántas opciones están votadas ahora
        const userVotesCount = updatedOptions.filter(o => o.voted).length;

        // Usuario vota ahora si hay al menos una opción marcada
        const userHasVoted = userVotesCount > 0;

        // Actualizar votantes únicos según reglas
        let updatedVotersCount = survey.votersCount || 0;

        if (!hadVotedBefore && userHasVoted) {
          // Voto por primera vez
          updatedVotersCount += 1;
        } else if (hadVotedBefore && !userHasVoted) {
          // Quitó todos sus votos
          updatedVotersCount = Math.max(0, updatedVotersCount - 1);
        }

        return {
          ...survey,
          options: updatedOptions,
          userHasVoted: userHasVoted,
          votersCount: updatedVotersCount,
        };
      });

      return {
        ...prevMap,
        [eventId]: updatedSurveys,
      };
    });
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>{eventTitle}</Text>

      <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingRight: 10 }]}>
        {surveys.map((survey) => (
          <View key={survey.id} style={styles.surveyCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.question}>{survey.question}</Text>
            </View>


            {survey.description && (
              <Text style={styles.description}>{survey.description}</Text>
            )}

            {survey.options.map((option, idx) => {
              const totalVotes = survey.options.reduce((sum, o) => sum + o.votes, 0);
              const maxVotes = Math.max(...survey.options.map(o => o.votes));
              const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;

              const isWinningOption = option.votes === maxVotes && maxVotes > 0;

              return (
                <TouchableOpacity
                  key={idx}
                  style={styles.surveyOptionBox}
                  onPress={() => handleToggleVote(survey.id, idx)}
                >
                  <View style={styles.optionRow}>
                    {option.voted && (
                      <Ionicons name="checkmark-circle" size={18} color="green" style={{ marginRight: 6 }} />
                    )}

                    <Animated.Text
                      style={[
                        styles.surveyOptionText,
                        {
                          color: option.voted ? '#008000' : '#333',
                          opacity: option.voted ? 1 : 0.7,
                          transform: [
                            {
                              scale: option.voted ? 1.05 : 1,
                            },
                          ],
                        },
                      ]}
                    >
                      {option.text}
                    </Animated.Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {isWinningOption && (
                        <MaterialCommunityIcons
                          name="crown"
                          size={14}  // Tamaño pequeño similar al texto
                          color="#DAA520" // Color dorado típico de la corona
                          style={{ marginRight: 4 }}
                        />
                      )}
                      <Text style={styles.voteInfo}>
                        {option.votes} votos ({percentage}%)
                      </Text>
                    </View>
                  </View>
                  <View style={styles.progressWrapper}>
                    <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
                  </View>
                </TouchableOpacity>
              );
            })}

            {/* Aquí la fila con botón Editar a la izquierda y total votos a la derecha */}
            <View style={styles.bottomRow}>
              <TouchableOpacity onPress={() => handleEditSurvey(survey)} style={styles.editButton}>
                <Ionicons name="pencil-outline" size={18} color="#555f7a" />
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>

              <Text style={styles.totalVotesText}>
                {survey.options.reduce((sum, o) => sum + o.votes, 0)} votos ({survey.participants?.length ?? survey.votersCount} votantes)
              </Text>
            </View>


          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={handleAddSurvey}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 16,
    alignSelf: 'center',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  surveyCard: {
    backgroundColor: '#e5eaff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#ccc',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  question: {
    fontWeight: '600',
    fontSize: 16,
  },
  description: {
    fontWeight: '300',
    fontSize: 16,
    marginBottom: 12,
  },
  surveyOptionBox: {
    backgroundColor: '#fce7f3',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  surveyOptionText: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
  },
  voteInfo: {
    fontSize: 12,
    color: '#555',
    textAlign: 'right',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressWrapper: {
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#c154c1',
    overflow: 'hidden',
  },
  progressBarBackground: {
    flex: 1,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  progressBarFill: {
    backgroundColor: '#c154c1',
    height: '100%',
    borderRadius: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#c154c1',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalVotesText: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
    marginRight: 4,
  },
  votedOptionBox: {
    backgroundColor: '#c154c1', // fondo más fuerte para opción votada
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  surveyOptionBox: {
    backgroundColor: '#fce7f3', // fondo normal
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 0,
    marginLeft: 4,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },

  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // blanco semi-transparente para discreción
    borderRadius: 6,
    // sombra muy suave para mantener la profundidad sin destacar mucho
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
  },

  editText: {
    fontSize: 14,
    color: '#555f7a',  // gris azulado suave
    fontWeight: '600',
    marginLeft: 4,
  },




});