import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getEncuestas } from '../../data/encuestasStorage';

export default function ViewSurveysScreen({ route }) {
  const navigation = useNavigation();
  const { id: eventIdParam, eventTitle = 'Título de la quedada' } = route.params || {};
  const eventId = eventIdParam || 'demo';

  const [surveys, setSurveys] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const cargarEncuestas = async () => {
        try {
          const todas = await getEncuestas();
          const filtradas = (todas || []).filter(e => e.eventId === eventId);

          if (route.params?.encuestaEliminada) {
            setSurveys(prev => prev.filter(e => e.id !== route.params.encuestaEliminada));
            navigation.setParams({ encuestaEliminada: undefined });
          }

          const transformadas = filtradas.map(e => ({
            id: e.id,
            question: e.titulo,
            description: e.descripcion,
            options: e.opciones.map((opt, idx) => ({
              text: opt,
              votes: e.votos?.[idx] ?? 0,
              voted: false,
            })),
            userHasVoted: false,
            votersCount: e.votersCount ?? 0,
          }));

          setSurveys(transformadas);
        } catch (err) {
          console.error('Error al cargar encuestas:', err);
        }
      };

      cargarEncuestas();
    }, [eventId, route.params?.encuestaEliminada])
  );

  const handleAddSurvey = () => {
    navigation.navigate('Crear', { eventId });
  };

  const handleEditSurvey = (survey) => {
    navigation.navigate('Editar', { survey, eventId });
  };

  const handleToggleVote = (surveyId, optionIndex) => {
    setSurveys(prevSurveys =>
      prevSurveys.map(survey => {
        if (survey.id !== surveyId) return survey;

        const updatedOptions = survey.options.map((opt, idx) => {
          if (idx !== optionIndex) return opt;

          const hasVoted = opt.voted;
          return {
            ...opt,
            votes: hasVoted ? Math.max(0, opt.votes - 1) : opt.votes + 1,
            voted: !hasVoted,
          };
        });

        const hadVotedBefore = survey.userHasVoted || false;
        const userVotesCount = updatedOptions.filter(o => o.voted).length;
        const userHasVoted = userVotesCount > 0;
        let updatedVotersCount = survey.votersCount || 0;

        if (!hadVotedBefore && userHasVoted) {
          updatedVotersCount += 1;
        } else if (hadVotedBefore && !userHasVoted) {
          updatedVotersCount = Math.max(0, updatedVotersCount - 1);
        }

        return {
          ...survey,
          options: updatedOptions,
          userHasVoted,
          votersCount: updatedVotersCount,
        };
      })
    );
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

            {survey.description ? (
              <Text style={styles.description}>{survey.description}</Text>
            ) : null}

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
                          transform: [{ scale: option.voted ? 1.05 : 1 }],
                        },
                      ]}
                    >
                      {option.text}
                    </Animated.Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {isWinningOption && (
                        <MaterialCommunityIcons
                          name="crown"
                          size={14}
                          color="#DAA520"
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

            <View style={styles.bottomRow}>
              <TouchableOpacity onPress={() => handleEditSurvey(survey)} style={styles.editButton}>
                <Ionicons name="pencil-outline" size={18} color="#555f7a" />
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>

              <Text style={styles.totalVotesText}>
                {survey.options.reduce((sum, o) => sum + o.votes, 0)} votos ({survey.votersCount} votantes)
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