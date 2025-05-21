import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const tabs = ['Quedadas actuales', 'Grupos'];

const mockEvents = [
  {
    id: '1',
    title: 'Partido Barça vs Espanyol',
    date: 'May 16, 2025',
    description: 'Arnau, Martí y Omar',
    participants: ['A', 'J'],
    location: 'Nou Camp Nou'
  },
  {
    id: '2',
    title: 'Concierto Bad Bunny',
    date: 'May 23, 2026',
    description: 'Llevad cena y bebida para la cola',
    location: 'Estadi Olímpic Lluís Companys',
    participants: ['A', 'J', 'R'],
  },
  {
    id: '3',
    title: 'Cumple Martí',
    date: 'Feb 20, 2026',
    description: 'Estais invitados a mi fiesta de cumpleaños.',
    location: 'C/ de Vilamarí, 90, Barcelona',
    participants: ['A', 'M', 'E'],
    image: 'https://randomuser.me/api/portraits/men/32.jpg', // ejemplo imagen
  },
];





// EN PRINCIPIO ESTO NO VA AQUÍ, ES PARA PROBAR QUE FUCNIONE
const surveyMap = {
  '1': [
    {
      id: '1',
      question: '¿Qué bebida preferís?',
      description: 'Compraremos las que tengan más de 3 votos',
      options: [
        { text: 'Fanta', votes: 1, voted: false },
        { text: 'Coca Cola', votes: 3, voted: false },
        { text: 'Ron Pujol', votes: 7, voted: false },
        { text: 'Agua', votes: 1, voted: false },
      ]
    }, 
    {
      id: '2',
      question: 'on voleu quedar?',
      description: 'Compraremos las que tengan más de 3 votos',
      options: [
        { text: 'Fanta', votes: 1, voted: false },
        { text: 'Coca Cola', votes: 3, voted: false },
        { text: 'Ron Pujol', votes: 7, voted: false },
        { text: 'Agua', votes: 1, voted: false },
      ]
    }
  ],
  '2': [
    {
      id: '2',
      question: '¿Qué día os va mejor?',
      options: [
        { text: '20/02/2026', votes: 3, voted: false },
        { text: '21/02/2026', votes: 4, voted: false },
      ]
    }
  ],
};






export default function MainMenuScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Quedadas actuales');

  const renderEvent = ({ item }) => (
    <TouchableOpacity onPress={() => {const encuestas = surveyMap[item.id] || [];navigation.navigate('Detalles', { event: item, encuestas });}}>
      <View style={styles.card}>
        {item.image && <Image source={{ uri: item.image }} style={styles.eventImage} />}
        <View style={{ flex: 1 }}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventDesc}>{item.description}</Text>
          {item.location && (
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          )}
        </View>
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
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

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {activeTab === 'Quedadas actuales' ? (
        <FlatList
          data={mockEvents}
          keyExtractor={(item) => item.id}
          renderItem={renderEvent}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      ) : (
        <View style={styles.emptyGroups}>
          <Text style={{ color: '#999' }}>Aquí irían los grupos...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 15, paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold' },
  addButton: { padding: 5 },

  tabsContainer: { flexDirection: 'row', backgroundColor: '#eee', borderRadius: 30, marginBottom: 15 },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 30,
    alignItems: 'center',
  },
  activeTab: { backgroundColor: '#d46bcf' },
  tabText: { fontSize: 14, color: '#555', fontWeight: '600' },
  activeTabText: { color: 'white' },

  card: {
    flexDirection: 'row',
    backgroundColor: '#f8e7f9',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  eventImage: { width: 50, height: 50, borderRadius: 8, marginRight: 12 },
  eventTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  eventDesc: { color: '#555', marginBottom: 6 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationText: { marginLeft: 4, color: '#666', fontSize: 12 },

  dateBox: {
    backgroundColor: '#f2c7f2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginLeft: 12,
  },
  dateText: { fontSize: 11, color: '#8e3d8e' },

  emptyGroups: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});