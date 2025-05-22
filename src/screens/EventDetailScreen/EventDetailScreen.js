import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useEventos } from '../../context/EventContext';


export default function EventDetailScreen({ route, navigation }) {
  const { event, encuestas = [] } = route.params;
  const { participantesPorEvento } = useEventos();
  const toggleParticipants = () => {setShowParticipants(!showParticipants);};
  
  const participantes = participantesPorEvento[event.id] || event.participants || [];
  console.log('Participantes:', participantes);
  
  const [showParticipants, setShowParticipants] = useState(false);

  const renderParticipant = ({ item }) => (
    <View style={styles.participantRow}>
      <Image source={{ uri: item.image }} style={styles.participantImage} />
      <Text style={styles.participantName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.subtitle}>{event.description}</Text>
      </View>

      <View style={styles.detailsRow}>
        <Ionicons name="calendar-outline" size={20} color="#d46bcf" />
        <Text style={styles.detailText}>{event.date}</Text>
        <Ionicons name="time-outline" size={20} color="#d46bcf" style={{ marginLeft: 10 }} />
        <Text style={styles.detailText}>18:00</Text>
      </View>

      {/* Participantes desplegable */}
      <TouchableOpacity onPress={toggleParticipants}>
        <View style={[styles.section, { backgroundColor: '#cce5ff' }]}>
          <Text style={styles.sectionTitle}>
            Participantes ({participantes.length})
          </Text>
          {showParticipants && (
            <FlatList
              data={participantes}
              keyExtractor={(item, index) => item.name + index}
              renderItem={renderParticipant}
              style={{ marginTop: 10, maxHeight: 200 }}
              ListEmptyComponent={<Text>No hay participantes</Text>}
              nestedScrollEnabled={true}  // Añade esto si usas ScrollView padre
            />
          )}
          <MaterialCommunityIcons
            name={showParticipants ? 'chevron-up' : 'chevron-down'}
            size={30}
            color="white"
            style={styles.iconOverlay}
          />
        </View>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigation.navigate('Encuestas', { id: event.id, eventTitle: event.title })}>
        <View style={[styles.section, { backgroundColor: '#fad1f6' }]}>
          <Text style={styles.sectionTitle}>Votaciones</Text>
          {encuestas.length > 0 ? (
            encuestas.map((encuesta) => (
              <Text key={encuesta.id}>{encuesta.question}</Text>
            ))
          ) : (
            <Text>No hay encuestas para esta quedada.</Text>
          )}
          <MaterialCommunityIcons name="poll" size={30} color="white" style={styles.iconOverlay} />
        </View>
      </TouchableOpacity>

      

      <TouchableOpacity onPress={() => navigation.navigate({/* PANTALLA DE GASTOS*/})}>
        <View style={[styles.section, { backgroundColor: '#b4f8c8' }]}>
          <Text style={styles.sectionTitle}>Gastos conjuntos</Text>
          <Text>Ejemplo 1</Text>
          <Text>Ejemplo 2</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 50 },
  backButton: { position: 'absolute', top: 50, left: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  infoBox: { backgroundColor: '#f0f4ff', padding: 12, borderRadius: 10, marginBottom: 20 },
  subtitle: { fontSize: 16 },
  detailsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  detailText: { marginLeft: 5, fontSize: 14 },
  section: {
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    position: 'relative',
  },
  sectionTitle: { fontWeight: 'bold', marginBottom: 5, color: 'black' },
  iconOverlay: { position: 'absolute', right: 10, top: 10 },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
  },
  participantImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  participantName: {
    fontSize: 14,
    color: '#333',
  },
});