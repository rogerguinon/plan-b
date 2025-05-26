import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity, FlatList} from 'react-native';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEventos } from '../../context/EventContext';

const convertirFecha = (fechaStr) => {

  const meses = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
  };
  const [mes, dia, anio] = fechaStr.replace(',', '').split(' ');
  return `${anio}-${meses[mes]}-${dia.padStart(2, '0')}`;
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

export default function CalendarScreen({navigation}) {
  const { eventos } = useEventos();
  //para marcar las fechas
  const markedDates = {};
  eventos.forEach(ev => {
    const fecha = convertirFecha(ev.date);
    markedDates[fecha] = { marked: true, dotColor: '#d46bcf' };
  });
  //eventos ordenados x fecha
  const eventosOrdenados = [...eventos].sort((a, b) => new Date(convertirFecha(a.date)) - new Date(convertirFecha(b.date)));
  const renderEvent = ({ item }) => (
  <TouchableOpacity
    style={styles.eventRow}
    onPress={() => navigation.navigate('Detalles', { event: item })}
  >
    <AntDesign name="enviromento" size={22} color="#d46bcf" style={{ marginRight: 12 }}/>
    <View>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDate}>{item.date}</Text>
    </View>
  </TouchableOpacity>
  );
  // cambiar donde AddParticipants
  //<TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateEventScreen')}>
  // <MaterialIcons name="add-box" size={30} color="#d46bcf" />
  // </TouchableOpacity>

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>PlanB</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddParticipants')}>
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
            textSectionTitleColor: '#000000', // Días de la semana
            textSectionTitleDisabledColor: '#e0e0e0',
            selectedDayBackgroundColor: '#d46bcf', // Día seleccionado
            selectedDayTextColor: '#fff',
            todayTextColor: '#fff',
            todayDotColor: '#d46bcf',
            todayBackgroundColor: '#d46bcf',
            dayTextColor: '#22223b', // Días normales
            textDisabledColor: '#d1d1d1', // Días fuera del mes
            dotColor: '#d46bcf',
            monthTextColor: '#d46bcf', // Mes
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
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 15, paddingTop: 40 },
  text: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  container_calendar: {justifyContent: 'center', alignItems: 'center'},
  calendar: {width:350},
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
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
    // Sombra para Android
    elevation: 2,
    // Sombra para iOS
    shadowColor: '#d46bcf',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6, 
  },
  eventTitle: {
    color: '#d46bcf',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,},
  eventDate: {
    color: '#888',
    fontSize: 13, },
});
