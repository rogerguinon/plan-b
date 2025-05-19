import React from 'react';
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
  const { eventTitle = 'Título de la quedada' } = route.params || {};
  const surveys = [
    {
      id: '1',
      question: '¿Qué bebida preferís?',
      options: ['Fanta', 'Coca Cola', 'Ron Pujol', 'Agua'],
    },
    {
      id: '2',
      question: '¿Qué día os va mejor?',
      options: ['20/02/2026', '21/02/2026'],
    },
    // Puedes añadir más encuestas para probar el scroll
  ];

  const handleAddSurvey = () => {
    navigation.navigate('CreateSurveyScreen');
  };

  const handleEditSurvey = (survey) => {
    navigation.navigate('EditSurveyScreen', { survey });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{eventTitle}</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {surveys.map((survey) => (
          <View key={survey.id} style={styles.surveyCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.question}>{survey.question}</Text>
              <TouchableOpacity onPress={() => handleEditSurvey(survey)}>
                <Ionicons name="create-outline" size={20} color="#888" />
              </TouchableOpacity>
            </View>
            {survey.options.map((option, idx) => (
              <View key={idx} style={styles.optionBox}>
                <Text style={styles.optionText}>{option}</Text>
              </View>
            ))}
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
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
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
  optionBox: {
    backgroundColor: '#fce7f3',
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
  },
  optionText: {
    fontSize: 14,
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
});
