import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function EventDetailScreen({ route, navigation }) {
  const { event } = route.params;

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
      {event.location && (
        <View style={styles.detailsRow}>
          <Ionicons name="location-outline" size={20} color="#d46bcf" />
          <Text style={styles.detailText}>{event.location}</Text>
        </View>
      )}
      <View style={[styles.section, { backgroundColor: '#fad1f6' }]}>
        <Text style={styles.sectionTitle}>Votaciones</Text>
        <Text>Que bebida preferís</Text>
        <Text>Qué día os va mejor?</Text>
        <MaterialCommunityIcons name="poll" size={30} color="white" style={styles.iconOverlay} />
      </View>
      <View style={[styles.section, { backgroundColor: '#b4f8c8' }]}>
        <Text style={styles.sectionTitle}>Gastos conjuntos</Text>
        <Text>Ejemplo 1</Text>
        <Text>Ejemplo 2</Text>
      </View>
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
  sectionTitle: { fontWeight: 'bold', marginBottom: 5 },
  iconOverlay: { position: 'absolute', right: 10, top: 10 },
});