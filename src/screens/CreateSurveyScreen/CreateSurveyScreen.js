import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';

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

  const handleSubmit = () => {
    // Aquí puedes enviar los datos a tu backend, contexto global, etc.
    console.log({
      title,
      comment,
      options: options.filter((o) => o.trim() !== ''),
    });
    navigation.goBack(); // Vuelve a la pantalla anterior por ahora
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
          />

          <Text style={styles.sectionTitle}>Opciones</Text>

          {options.map((option, index) => (
            <View key={index} style={styles.optionRow}>
              <TextInput
                style={styles.optionInput}
                placeholder={`Opción ${index + 1}`}
                value={option}
                onChangeText={(text) => handleOptionChange(text, index)}
              />
              {index >= 2 && (
                <TouchableOpacity onPress={() => handleRemoveOption(index)}>
                  <Text style={styles.removeButton}>–</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          <TouchableOpacity onPress={handleAddOption}>
            <Text style={styles.addOption}>+ Añadir opción</Text>
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.acceptButton} onPress={handleSubmit}>
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
    backgroundColor: '#e5e5e5',
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#d3cfd3',
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
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  removeButton: {
    color: '#d33',
    fontSize: 24,
    marginLeft: 10,
  },
  addOption: {
    color: '#c154c1',
    marginTop: 10,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  acceptButton: {
    backgroundColor: '#908de3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelText: {
    color: '#333',
    fontWeight: '600',
  },
  acceptText: {
    color: 'white',
    fontWeight: '600',
  },
});
