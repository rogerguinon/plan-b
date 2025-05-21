import React, { useState, useEffect } from 'react';

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
          {text:'Fanta', votes: 1, voted : false},
          {text:'Coca Cola', votes: 3, voted : false},
          {text:'Ron Pujol', votes: 7, voted : false},
          {text:'Agua', votes: 1, voted : false},
        ]
      }
    ],
    '2': [
      {
        id: '2',
        question: '¿Qué día os va mejor?',
        options: [
          {text:'20/02/2026', votes: 3, voted : false},
          {text:'21/02/2026', votes: 4, voted : false},
        ]
      }
    ],
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
        console.log('Recibida nueva encuesta:', newSurvey);
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

        const updatedOptions = survey.options.map((opt, idx) => {
          if (idx !== optionIndex) return opt;

          const hasVoted = opt.voted;
          return {
            ...opt,
            votes: hasVoted ? opt.votes - 1 : opt.votes + 1,
            voted: !hasVoted,
          };
        });

        return {
          ...survey,
          options: updatedOptions,
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
              <View style={styles.headerRight}>
                <Text style={styles.totalVotesText}>
                  {survey.options.reduce((sum, o) => sum + o.votes, 0)} votos
                </Text>
                <TouchableOpacity onPress={() => handleEditSurvey(survey)} style={{ marginLeft: 10 }}>
                  <Ionicons name="create-outline" size={20} color="#888" />
                </TouchableOpacity>
              </View>
            </View>

            {survey.description && (
              <Text style={styles.description}>{survey.description}</Text>
            )}

            {survey.options.map((option, idx) => {
              const totalVotes = survey.options.reduce((sum, o) => sum + o.votes, 0);
              const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100): 0;
              
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
                    <Text style={styles.surveyOptionText}>
                      {option.text}
                    </Text>
                    <Text style={styles.voteInfo}>
                      {option.votes} votos ({percentage}%)
                    </Text>
                  </View>
                  <View style={styles.progressWrapper}>
                    <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
                  </View>
                </TouchableOpacity>
              );
            })}
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
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
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
});