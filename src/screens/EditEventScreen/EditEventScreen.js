import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEventos } from '../../context/EventContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditEventScreen({ route, navigation }) {
  const { event } = route.params;
  const { editarEvento } = useEventos();

  const [editedEvent, setEditedEvent] = useState({ ...event });

  const handleSave = async () => {
    if (!editedEvent.title.trim()) {
      Alert.alert('Error', 'El título es obligatorio.');
      return;
    }
    await editarEvento(editedEvent);
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Editar quedada</Text>

      <View style={styles.iconSection}>
        <Ionicons name="create-outline" size={50} color="#d46bcf" />
        <Text style={styles.iconText}>Modifica los datos</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Título de la quedada"
          value={editedEvent.title}
          onChangeText={(text) => setEditedEvent(prev => ({ ...prev, title: text }))}
        />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Descripción (opcional)"
          value={editedEvent.description || ''}
          onChangeText={(text) => setEditedEvent(prev => ({ ...prev, description: text }))}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha (ej: 2025-05-24)"
          value={editedEvent.date}
          onChangeText={(text) => setEditedEvent(prev => ({ ...prev, date: text }))}
        />
        <TextInput
          style={styles.input}
          placeholder="Hora (ej: 19:30)"
          value={editedEvent.time}
          onChangeText={(text) => setEditedEvent(prev => ({ ...prev, time: text }))}
        />
        <TextInput
          style={styles.input}
          placeholder="Lugar"
          value={editedEvent.location}
          onChangeText={(text) => setEditedEvent(prev => ({ ...prev, location: text }))}
        />
        <TextInput
          style={styles.input}
          placeholder="URL de imagen (opcional)"
          value={editedEvent.image || ''}
          onChangeText={(text) => setEditedEvent(prev => ({ ...prev, image: text }))}
        />

        <TouchableOpacity style={styles.createButton} onPress={handleSave}>
          <Text style={styles.createText}>Guardar cambios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  backButton: { marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  iconSection: { alignItems: 'center', marginVertical: 20 },
  iconText: { marginTop: 8, color: '#555', fontSize: 14 },
  form: { marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  createButton: {
    backgroundColor: '#d46bcf',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  createText: { color: '#fff', fontWeight: 'bold' },
});
