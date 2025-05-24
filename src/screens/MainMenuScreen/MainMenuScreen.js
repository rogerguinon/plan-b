import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useEventos } from '../../context/EventContext';

const tabs = ['Quedadas actuales', 'Grupos'];




export default function MainMenuScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Quedadas actuales');
  const { eventos, surveyMap} = useEventos(); 
  const defaulProfile = 'https://static.vecteezy.com/system/resources/previews/026/622/156/non_2x/crowd-people-silhouette-icon-illustration-social-icon-flat-style-design-user-group-network-enterprise-team-group-community-member-icon-business-team-work-activity-user-icon-free-vector.jpg';


  const renderEvent = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        const encuestas = surveyMap[item.id] || [];
        navigation.navigate('Detalles', { event: item, encuestas });
      }}
    >
      <View style={[styles.card, { paddingVertical: 25 }]}> {/* Más alto con padding vertical */}
        <Image source={{ uri: item.image || defaulProfile}} style={styles.eventImage} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <View style={styles.metaInfo}>
            {item.location && (
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={16} color="#666" style={styles.icon} />
                <Text style={styles.infoText}>{item.location}</Text>
              </View>
            )}
            {item.date && (
              <View style={styles.infoRow}>
                <Ionicons name="calendar-outline" size={16} color="#666" style={styles.icon} />
                <Text style={styles.infoText}>{item.date}</Text>
              </View>
            )}
          </View>
        </View>
        <Ionicons name="chevron-forward" size={14} color="#666" style={styles.arrowIcon} />
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
          data={eventos}
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
  eventImage: { width: 50, height: 50, borderRadius: 5, marginRight: 8 },
  eventTitle: { fontWeight: 'bold', fontSize: 16 },
  eventDesc: { color: '#555', marginBottom: 6, fontSize: 14},
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationText: { marginLeft: 4, color: '#666', fontSize: 12 },

  dateBox: {
    backgroundColor: '#f2c7f2',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 10,

  },
  dateText: { fontSize: 11, color: '#8e3d8e' },

  emptyGroups: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  metaInfo: {
    marginTop: 4,
    gap: 4, // para separar verticalmente ubicación y fecha
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    marginRight: 6,
  },

  infoText: {
    fontSize: 12,
    color: '#666',
  },
  arrowIcon: {
    marginLeft: 10,
    marginRight: 2,
  },

});