import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEventos } from '../../context/EventContext';

const convertirFecha = (fechaTexto) => {
  const fecha = new Date(fechaTexto);
  if (isNaN(fecha.getTime())) return '';

  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');

  return `${anio}-${mes}-${dia}`;
};

const formatearFecha = (fechaTexto) => {
  const fecha = new Date(fechaTexto);
  if (isNaN(fecha.getTime())) return fechaTexto;

  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return `${fecha.getDate()} de ${meses[fecha.getMonth()]}, ${fecha.getFullYear()}`;
};

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthNamesShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ],
  dayNames: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ],
  dayNamesShort: [
    'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'
  ],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

export default function CalendarScreen({ navigation }) {
  const { eventos } = useEventos();

  // Marcar fechas en formato YYYY-MM-DD para el calendario
  const markedDates = {};
  eventos.forEach(ev => {
    const fechaISO = convertirFecha(ev.date);
    if (fechaISO) {
      markedDates[fechaISO] = { marked: true, dotColor: '#d46bcf' };
    }
  });

  // Ordenar eventos por fecha
  const eventosOrdenados = [...eventos].sort(
    (a, b) => new Date(convertirFecha(a.date)) - new Date(convertirFecha(b.date))
  );

  const renderEvent = ({ item }) => (
    <TouchableOpacity
      style={styles.eventRow}
      onPress={() => navigation.navigate('Detalles', { event: item })}
    >
      <AntDesign name="enviromento" size={22} color="#d46bcf" style={{ marginRight: 12 }} />
      <View>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDate}>{formatearFecha(item.date)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>PlanB</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateEvent')}>
          <MaterialIcons name="add-box" size={30} color="#d46bcf" />
        </TouchableOpacity>
      </View>

      {/* Calendario */}
      <View style={styles.container_calendar}>
        <Calendar
          style={{
            width: 350,
            borderRadius: 16,
            backgroundColor: '#fff',
            padding: 10,
            elevation: 1,
          }}
          theme={{
            textSectionTitleColor: '#000000',
            textSectionTitleDisabledColor: '#e0e0e0',
            selectedDayBackgroundColor: '#d46bcf',
            selectedDayTextColor: '#fff',
            todayTextColor: '#fff',
            todayDotColor: '#d46bcf',
            todayBackgroundColor: '#d46bcf',
            dayTextColor: '#22223b',
            textDisabledColor: '#d1d1d1',
            dotColor: '#d46bcf',
            monthTextColor: '#d46bcf',
            indicatorColor: '#d46bcf',
            textDayFontWeight: '400',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '500',
            arrowColor: '#d46bcf',

            'stylesheet.calendar.header': {
              monthText: {
                color: '#d46bcf',
                fontWeight: 'bold',
                fontSize: 20,
              },
            },
          }}
          markedDates={markedDates}
        />
      </View>

      {/* Lista de quedadas */}
      <FlatList
        data={eventosOrdenados}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
        contentContainerStyle={{ paddingBottom: 40, marginTop: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 15, paddingTop: 20 },
  text: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  container_calendar: { justifyContent: 'center', alignItems: 'center' },
  calendar: { width: 350 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold' },
  addButton: { padding: 5 },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f8e7f9',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 14,
    elevation: 2,
    shadowColor: '#d46bcf',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  eventTitle: {
    color: '#d46bcf',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  eventDate: {
    color: '#888',
    fontSize: 13,
  },
});
