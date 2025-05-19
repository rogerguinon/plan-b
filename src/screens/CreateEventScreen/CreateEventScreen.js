import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function CreateEventScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

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

        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconBox}>
            <MaterialIcons name="date-range" size={24} color="#d46bcf" />
            <Text style={styles.iconLabel}>Fecha</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox}>
            <Ionicons name="time-outline" size={24} color="#d46bcf" />
            <Text style={styles.iconLabel}>Hora</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox}>
            <FontAwesome name="map-marker" size={24} color="#d46bcf" />
            <Text style={styles.iconLabel}>Lugar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.createButton}>
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
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  iconBox: { alignItems: 'center' },
  iconLabel: { fontSize: 12, marginTop: 4, color: '#333' },
  createButton: {
    backgroundColor: '#d46bcf',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  createText: { color: '#fff', fontWeight: 'bold' },
});
