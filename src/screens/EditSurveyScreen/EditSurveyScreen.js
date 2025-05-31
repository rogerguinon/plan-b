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
import { updateEncuesta, deleteEncuesta } from '../../data/encuestasStorage';

export default function EditSurveyScreen({ route, navigation }) {
  const { survey, onGoBack, onGoDelete } = route.params; // Recibe encuesta desde navegación

  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setTitle(survey.question || '');
    setComment(survey.description || '');
    setOptions(survey.options.map(opt => opt.text));
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

  const handleSubmit = async () => {
    const trimmedTitle = title.trim();
    const validOptions = options.map(o => o.trim()).filter(o => o !== '');

    if (!trimmedTitle) {
      Alert.alert('Error', 'Añade un título válido');
      return;
    }

    if (validOptions.length < 2) {
      Alert.alert('Error', 'Añade al menos dos opciones válidas');
      return;
    }

    try {

      const oldOptions = survey.options;

      const updatedOptions = validOptions.map((text) => {
        const existing = oldOptions.find((opt) => opt.text === text);
        return {
          text,
          votes: existing ? existing.votes : 0,
          voted: existing?.voted || false, // puedes ajustar esto si quieres conservar también si ya votó
        };
      });

      await updateEncuesta(survey.id, {
        titulo: trimmedTitle,
        descripcion: comment.trim(),
        opciones: validOptions,
        votos: updatedOptions.map(opt => opt.votes),
        votersCount: survey.votersCount,
        hasVoted: survey.hasVoted,
      });

      if (onGoBack) {
        onGoBack({
          id: survey.id,
          question: trimmedTitle,
          description: comment.trim(),
          options: updatedOptions,
        });
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'No se han podido guardar los cambios.');
    }
  };

  const handleDelete = () => {
  if (Platform.OS === 'web') {
    const confirmado = window.confirm('¿Estás seguro de que quieres eliminar esta encuesta?');
    if (confirmado) {
      eliminarEncuesta();
    }
  } else {
    Alert.alert(
      'Eliminar encuesta',
      '¿Estás seguro de que quieres eliminar esta encuesta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: eliminarEncuesta,
        },
      ]
    );
  }
};
 

  const eliminarEncuesta = async () => {
  try {
    await deleteEncuesta(survey.id);

    // Llamar al callback que se pasó desde ViewSurveysScreen
    if (route.params?.onGoDelete) {
      route.params.onGoDelete(survey.id);
    }

    navigation.goBack(); // vuelve atrás con la lista ya actualizada
  } catch (e) {
    Alert.alert("Error", "No se pudo eliminar la encuesta.");
  }
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
                {options.length > 2 && (
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
              <Text style={styles.acceptText}>Guardar</Text>
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
