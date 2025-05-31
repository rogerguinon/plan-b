import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEventos } from '../../context/EventContext';

export default function CreateEventScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(''); // Nuevo estado para el link de imagen

  const { agregarEvento } = useEventos();

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'El título es obligatorio.');
      return;
    }

    const nuevoEvento = {
      id: Date.now().toString(), // o usa uuid si prefieres
      title,
      description,
      date,
      time,
      location,
      participants: [],
    };

    if (image.trim()) {
      nuevoEvento.image = image.trim();
    }

    try {
      await agregarEvento(nuevoEvento);
      navigation.navigate('Main');
    } catch (error) {
      console.error('Error al guardar el evento:', error);
      Alert.alert('Error', 'No se pudo guardar el evento.');
    }
  };

  return (
    
    <View style={styles.container}>

      <Text style={styles.title}>Nueva quedada</Text>

      <View style={styles.iconSection}>
        <Ionicons name="people-outline" size={50} color="#d46bcf" />
        <Text style={styles.iconText}>Añadir participantes</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Título de la quedada"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Descripción (opcional)"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha (ej: 2025-05-24)"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Hora (ej: 19:30)"
          value={time}
          onChangeText={setTime}
        />
        <TextInput
          style={styles.input}
          placeholder="Lugar"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="URL de imagen (opcional)"
          value={image}
          onChangeText={setImage}
        />

        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Text style={styles.createText}>Crear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  backButton: { marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  iconSection: { alignItems: 'center', marginVertical: 20, marginTop: 30 },
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