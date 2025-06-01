import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { addEncuesta } from '../../data/encuestasStorage';

export default function CreateSurveyScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (text, index) => {
    const newOptions = [...options];
    newOptions[index] = text;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const route = useRoute();
  const onAddSurvey = route.params?.onAddSurvey;
  const eventId = route.params?.eventId || 'demo';

  const trimmedTitle = title.trim();
  const validOptions = options.map(o => o.trim()).filter(o => o !== '');
  const isFormValid = trimmedTitle.length > 0 && validOptions.length >= 2;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    if (!trimmedTitle) {
      Alert.alert('Error', 'Por favor, añade un título para la encuesta.');
      return;
    }

    if (validOptions.length < 2) {
      Alert.alert('Error', 'Debes añadir al menos dos opciones válidas.');
      return;
    }

    try {
      await addEncuesta({
        titulo: trimmedTitle,
        descripcion: comment.trim(),
        opciones: validOptions,
        eventId,
      });

      if (onAddSurvey){
        onAddSurvey({
          id: Date.now().toString(),
          question: trimmedTitle,
          description: comment.trim(),
          options: validOptions.map(opt => ({ text: opt, votes: 0, voted: false})),
        });
      }

      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar la encuesta.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Nueva encuesta</Text>

          <TextInput
            style={styles.input}
            placeholder="Título de la encuesta"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#999"
          />

          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Comentarios (opcional)"
            value={comment}
            onChangeText={setComment}
            multiline
            placeholderTextColor="#999"
          />

          <View style={styles.optionBox}>
            <Text style={styles.optionTitle}>Opciones</Text>
            {options.map((option, index) => (
              <View key={index} style={styles.optionRow}>
                <TextInput
                  style={styles.optionInput}
                  placeholder={`Opción ${index + 1}`}
                  value={option}
                  onChangeText={(text) => handleOptionChange(text, index)}
                  placeholderTextColor="#999"
                />
                {options.length > 2 && (
                  <TouchableOpacity onPress={() => handleRemoveOption(index)}>
                    <Text style={{ color: 'red', marginLeft: 10 }}>Eliminar</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <TouchableOpacity onPress={handleAddOption}>
              <Text style={styles.addOption}>+ Añadir opción</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.acceptButton,
                { backgroundColor: title.trim() && options.filter(o => o.trim() !== '').length >= 2 ? '#D48ABD' : '#E1AEDD' }
              ]}
              onPress={handleSubmit}
              disabled={!(title.trim() && options.filter(o => o.trim() !== '').length >= 2)}
            >
              <Text style={styles.acceptText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E5E5E5',
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#D9D9D9',
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  optionBox: {
    backgroundColor: '#D9D9D9',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  optionTitle: {
    fontWeight: '600',
    marginBottom: 10,
  },
  optionRow: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  addOption: {
    color: '#D48ABD',
    fontWeight: '600',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  cancelButton: {
    backgroundColor: '#B3B3B3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelText: {
    color: 'black',
    fontWeight: '600',
  },
  acceptButton: {
    backgroundColor: '#D48ABD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  acceptText: {
    color: 'white',
    fontWeight: '600',
  },
});