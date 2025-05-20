import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

export default function EditSurveyScreen({ route, navigation }) {
  const { survey } = route.params; // Recibe encuesta desde la navegación

  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (survey) {
      setTitle(survey.title);
      setComment(survey.comment);
      setOptions(survey.options);
    }
  }, [survey]);

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
    // Aquí se actualizaría la encuesta en el backend o en el estado global
    console.log('Encuesta actualizada:', {
      title,
      comment,
      options: options.filter((o) => o.trim() !== ''),
    });
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar encuesta',
      '¿Estás seguro de que quieres eliminar esta encuesta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            console.log('Encuesta eliminada:', survey.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Editar encuesta</Text>

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
          </View>

          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.deleteText}>Eliminar encuesta</Text>
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
  },
  removeButton: {
    color: '#C54A4A',
    fontSize: 22,
    marginLeft: 10,
  },
  addOption: {
    color: '#D48ABD',
    fontWeight: '600',
    marginTop: 10,
  },
  deleteText: {
    color: '#D00000',
    alignSelf: 'center',
    marginTop: 25,
    fontWeight: '600',
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