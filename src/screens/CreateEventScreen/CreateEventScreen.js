import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, Platform, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEventos } from '../../context/EventContext';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateEventScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');

  // Fecha
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  // Hora
  const [time, setTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempTime, setTempTime] = useState(new Date());

  const { agregarEvento } = useEventos();

  const formatFechaEspañol = (dateObj) => {
    const dia = String(dateObj.getDate()).padStart(2, '0');
    const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
    const año = dateObj.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  const abrirPickerFecha = () => {
    setTempDate(date || new Date());
    setShowDatePicker(true);
  };

  const confirmarFecha = () => {
    setDate(tempDate);
    setShowDatePicker(false);
  };

  const cancelarFecha = () => {
    setShowDatePicker(false);
  };

  // Abrir picker hora
  const abrirPickerHora = () => {
    setTempTime(time || new Date());
    setShowTimePicker(true);
  };

  // Confirmar hora
  const confirmarHora = () => {
    setTime(tempTime);
    setShowTimePicker(false);
  };

  // Cancelar hora
  const cancelarHora = () => {
    setShowTimePicker(false);
  };

  const handleCreate = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'El título es obligatorio.');
      return;
    }

    const fechaFormateada = date ? date.toISOString().split('T')[0] : null;
    const horaFormateada = time ? time.toTimeString().split(':').slice(0, 2).join(':') : null;

    const nuevoEvento = {
      id: Date.now().toString(),
      title,
      description,
      location,
      participants: [],
    };

    if (fechaFormateada) nuevoEvento.date = fechaFormateada;
    if (horaFormateada) nuevoEvento.time = horaFormateada;
    if (image.trim()) nuevoEvento.image = image.trim();

    try {
      await agregarEvento(nuevoEvento);
      navigation.navigate('Main');
    } catch (error) {
      console.error('Error al guardar el evento:', error);
      Alert.alert('Error', 'No se pudo guardar el evento.');
    }
  };

  const fechaFormateada = date ? formatFechaEspañol(date) : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
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
          style={styles.input}
          placeholder="Descripción (opcional)"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* FECHA */}
        <View style={styles.row}>
          <TouchableOpacity style={[styles.input, { flex: 1 }]} onPress={abrirPickerFecha}>
            <Text style={{ color: date ? '#000' : '#999', fontSize: 14 }}>
              {date ? `Fecha: ${fechaFormateada}` : 'Seleccionar fecha'}
            </Text>
          </TouchableOpacity>
          {date && (
            <TouchableOpacity onPress={() => setDate(null)} style={styles.trashIcon}>
              <Ionicons name="trash-outline" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {showDatePicker && (
          <View>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                if (selectedDate) setTempDate(selectedDate);
              }}
            />
            <View style={styles.pickerButtons}>
              <TouchableOpacity onPress={cancelarFecha}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmarFecha}>
                <Text style={styles.acceptText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* HORA */}
        <View style={styles.row}>
          <TouchableOpacity style={[styles.input, { flex: 1 }]} onPress={abrirPickerHora}>
            <Text style={{ color: time ? '#000' : '#999', fontSize: 14 }}>
              {time ? `Hora: ${time.toTimeString().split(':').slice(0, 2).join(':')}` : 'Seleccionar hora'}
            </Text>
          </TouchableOpacity>
          {time && (
            <TouchableOpacity onPress={() => setTime(null)} style={styles.trashIcon}>
              <Ionicons name="trash-outline" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {showTimePicker && (
          <View>
            <DateTimePicker
              value={tempTime}
              mode="time"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedTime) => {
                if (selectedTime) setTempTime(selectedTime);
              }}
            />
            <View style={styles.pickerButtons}>
              <TouchableOpacity onPress={cancelarHora}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmarHora}>
                <Text style={styles.acceptText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  iconSection: { alignItems: 'center', marginVertical: 20, marginTop: 30 },
  iconText: { marginTop: 8, color: '#555', fontSize: 14 },
  form: { marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    marginVertical: 8, // <- Añadido para separación consistente
    fontSize: 14,
  },
  createButton: {
    backgroundColor: '#d46bcf',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8, // <- Añadido también aquí
  },
  createText: { color: '#fff', fontWeight: 'bold' },
  pickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  cancelText: {
    color: '#888',
    fontSize: 16,
  },
  acceptText: {
    color: '#d46bcf',
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trashIcon: {
    marginLeft: 10,
    padding: 10,
  },
});
