import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, Platform, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEventos } from '../../context/EventContext';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditEventScreen({ route, navigation }) {
  const { event } = route.params;
  const { editarEvento, deleteEvento, refreshEventos } = useEventos();

  const initialDate = event.date ? new Date(`${event.date}T${event.time || '12:00'}`) : new Date();

  const [editedEvent, setEditedEvent] = useState({ ...event, date: initialDate });
  const [tempDate, setTempDate] = useState(initialDate);
  const [tempTime, setTempTime] = useState(initialDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [date, setDate] = useState(editedEvent.date ? new Date(editedEvent.date) : null);
  const [time, setTime] = useState(editedEvent.time ? new Date(`1970-01-01T${editedEvent.time}`) : null);


  const formatFechaEspañol = (dateObj) => {
    const dia = String(dateObj.getDate()).padStart(2, '0');
    const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
    const año = dateObj.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  const confirmarFecha = () => {
    const nuevaFecha = new Date(
      tempDate.getFullYear(),
      tempDate.getMonth(),
      tempDate.getDate(),
      editedEvent.date.getHours(),
      editedEvent.date.getMinutes()
    );
    setEditedEvent(prev => ({ ...prev, date: nuevaFecha }));
    setDate(nuevaFecha); // <-- importante
    setShowDatePicker(false);
  };

  const cancelarFecha = () => setShowDatePicker(false);

  const confirmarHora = () => {
    const nuevaFecha = new Date(
      editedEvent.date.getFullYear(),
      editedEvent.date.getMonth(),
      editedEvent.date.getDate(),
      tempTime.getHours(),
      tempTime.getMinutes()
    );
    setEditedEvent(prev => ({ ...prev, date: nuevaFecha }));
    setTime(nuevaFecha); // <-- importante
    setShowTimePicker(false);
  };

  const cancelarHora = () => setShowTimePicker(false);

  const handleSave = async () => {
    if (!editedEvent.title.trim()) {
      Alert.alert('Error', 'El título es obligatorio.');
      return;
    }

    // Formatear fecha y hora solo si existen
    const fechaFormateada = date ? date.toISOString().split('T')[0] : null;
    const horaFormateada = time ? time.toTimeString().split(':').slice(0, 2).join(':') : null;

    // Construir objeto actualizado
    const eventoActualizado = {
      ...editedEvent,
      title: editedEvent.title.trim(),
      description: editedEvent.description?.trim() || '',
      location: editedEvent.location.trim(),
      image: editedEvent.image?.trim() || '',
    };

    if (fechaFormateada) eventoActualizado.date = fechaFormateada;
    else delete eventoActualizado.date;

    if (horaFormateada) eventoActualizado.time = horaFormateada;
    else delete eventoActualizado.time;

    try {
      await editarEvento(eventoActualizado);
      navigation.reset({
        index: 1,
        routes: [
          { name: 'Main' },
          { name: 'Detalles', params: { event: eventoActualizado } },
        ],
      });
    } catch (error) {
      console.error('Error al editar evento:', error);
      Alert.alert('Error', 'No se pudo guardar el evento.');
    }
  };


  const handleEliminarEvento = async () => {
    Alert.alert(
      '¿Eliminar quedada?',
      'Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEvento(event.id);
              await refreshEventos();
              navigation.popToTop();
            } catch (error) {
              console.error('Error al eliminar evento:', error);
              Alert.alert('Error', 'No se pudo eliminar el evento.');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>{editedEvent.title}</Text>

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
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Descripción (opcional)"
          value={editedEvent.description || ''}
          onChangeText={(text) => setEditedEvent(prev => ({ ...prev, description: text }))}
          multiline
          placeholderTextColor="#999"
        />

        {/* FECHA */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.input, { flex: 1 }]}
            onPress={() => {
              setTempDate(date || new Date());
              setShowDatePicker(true);
            }}
          >
            <Text style={{ color: date ? '#000' : '#999' }}>
              {date ? `Fecha: ${formatFechaEspañol(date)}` : 'Seleccionar fecha'}
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
          <TouchableOpacity
            style={[styles.input, { flex: 1 }]}
            onPress={() => {
              setTempTime(time || new Date());
              setShowTimePicker(true);
            }}
          >
            <Text style={{ color: time ? '#000' : '#999' }}>
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
          value={editedEvent.location}
          onChangeText={(text) => setEditedEvent(prev => ({ ...prev, location: text }))}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="URL de imagen (opcional)"
          value={editedEvent.image || ''}
          onChangeText={(text) => setEditedEvent(prev => ({ ...prev, image: text }))}
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.createButton} onPress={handleSave}>
          <Text style={styles.createText}>Guardar cambios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleEliminarEvento}
          style={styles.deleteButton}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Eliminar quedada</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );


}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backButton: { marginTop: 20, marginLeft: 20 },
  title: { fontSize: 24, fontWeight: 'bold', margin: 20 },
  iconSection: { alignItems: 'center', marginVertical: 20 },
  iconText: { marginTop: 8, color: '#555', fontSize: 14 },
  form: { paddingHorizontal: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    marginVertical: 8,
    fontSize: 14,
  },
  createButton: {
    backgroundColor: '#d46bcf',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
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
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  trashIcon: {
    marginLeft: 8,
    padding: 10,
  },
});
