import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useEventos } from '../../context/EventContext';
import { useNavigation } from '@react-navigation/native';

const tabs = ['Quedadas actuales', 'Grupos'];

export default function MainMenuScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Quedadas actuales');
  const [refreshKey, setRefreshKey] = useState(0);
  const { eventos, groups } = useEventos();

  const defaultProfile = 'https://static.vecteezy.com/system/resources/previews/026/622/156/non_2x/crowd-people-silhouette-icon-illustration-social-icon-flat-style-design-user-group-network-enterprise-team-group-community-member-icon-business-team-work-activity-user-icon-free-vector.jpg';

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefreshKey(prev => prev + 1);
    });

    return unsubscribe;
  }, [navigation]);

  console.log('Even itemos:', eventos);

  const renderEvent = ({ item }) => (
    <View style={[styles.card, { paddingVertical: 25 }]}>
      <TouchableOpacity
        style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
        onPress={() => navigation.navigate('Detalles', { event: item })}
      >
        <Image source={{ uri: item.image || defaultProfile }} style={styles.eventImage} />
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
        <Ionicons name="chevron-forward" size={20} color="#666" style={{ marginLeft: 6 }} />
      </TouchableOpacity>
    </View>
  );

  const renderGroup = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetallesGrupo', { grupo: item })}
      style={[styles.cardGroup, { paddingVertical: 20 }]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: item.imagen || defaultProfile }} style={styles.eventImage} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.eventTitle}>{item.nombre}</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>
            {item.participantes} participantes • {item.quedadas} quedadas
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666" style={{ marginLeft: 6 }} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PlanB</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateEvent')}>
          <MaterialIcons name="add-box" size={30} color="#d46bcf" />
        </TouchableOpacity>
      </View>

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

      {activeTab === 'Quedadas actuales' ? (
        <FlatList
          data={eventos}
          keyExtractor={(item) => item.id}
          renderItem={renderEvent}
          extraData={refreshKey}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={renderGroup}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No perteneces a ningún grupo</Text>}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 15, paddingTop: 20 },
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
  cardGroup: {
    flexDirection: 'row',
    backgroundColor: '#e7f0fa',
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