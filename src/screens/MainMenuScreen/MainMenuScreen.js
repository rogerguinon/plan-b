import React, { useState, useEffect, } from 'react';
import { Alert, Platform} from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useEventos } from '../../context/EventContext';
import { deleteEvento } from '../../data/quedadasStorage'; // ajusta la ruta si es distinta

const tabs = ['Quedadas actuales', 'Grupos'];

export default function MainMenuScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Quedadas actuales');
  const [refreshKey, setRefreshKey] = useState(0);
  const { eventos, surveyMap, refreshEventos } = useEventos();

  const handleEliminarEvento = async (id) => {
    try {
      if (Platform.OS === 'web') {
        const confirmado = window.confirm('¿Estás seguro de que quieres eliminar esta quedada?');
        if (confirmado) {
          await deleteEvento(id);
          await refreshEventos();
        }
      } else {
        Alert.alert(
          'Eliminar quedada',
          '¿Estás seguro de que quieres eliminar esta quedada?',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Eliminar',
              style: 'destructive',
              onPress: async () => {
                await deleteEvento(id);
                await refreshEventos();
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      Alert.alert('Error', 'No se pudo eliminar el evento');
    }
  };



  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefreshKey(prev => prev + 1);
    });

    return unsubscribe; // limpia el listener al desmontar
  }, [navigation]);

  const defaulProfile = 'https://static.vecteezy.com/system/resources/previews/026/622/156/non_2x/crowd-people-silhouette-icon-illustration-social-icon-flat-style-design-user-group-network-enterprise-team-group-community-member-icon-business-team-work-activity-user-icon-free-vector.jpg';

  const renderEvent = ({ item }) => (
    <View style={[styles.card, { paddingVertical: 25 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Zona táctil que abre detalles */}
        <TouchableOpacity
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => {
            navigation.navigate('Detalles', { event: item });
          }}
        >
          <Image source={{ uri: item.image || defaulProfile }} style={styles.eventImage} />
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

        {/* Botón de eliminar, separado del área táctil principal */}
        <TouchableOpacity
          onPress={() => handleEliminarEvento(item.id)}
          style={{ marginLeft: 8 }}
        >
          <Ionicons name="trash-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
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
          extraData={refreshKey} // fuerza re-render al cambiar refreshKey
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