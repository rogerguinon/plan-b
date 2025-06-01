import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GroupDetailScreen = ({ route, navigation }) => {
  const { grupo } = route.params;

  const quedadasActuales = grupo.quedadasActuales || [];
  const quedadasPasadas = grupo.quedadasPasadas || [];
  const miembros = grupo.miembros || [];

  const usuario = { id: 'm99', nombre: 'Tú', foto: 'https://randomuser.me/portraits/men/36.jpg'};
  const miembrosTodos = [
    usuario,
    ...miembros
  ]


  return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
        <Image source={{ uri: grupo.imagen }} style={styles.groupImage} />
        <Text style={styles.groupName}>{grupo.nombre}</Text>
        </View>

        <Text style={styles.sectionTitle}>Quedadas actuales</Text>
        {quedadasActuales.length > 0 ? (
        quedadasActuales.map((item) => (
            <View key={item.id} style={styles.card}>
            <View style={styles.card}>
                <View style={{ flex: 1 }}>
                    {/* Aquí va todo el contenido de texto (título, lugar, fecha) */}
                    <Text style={styles.cardTitle}>{item.titulo}</Text>
                    <View style={styles.iconRow}>
                    <Ionicons name="location-outline" size={20} color="#666" />
                    <Text style={styles.cardText}>{item.lugar}</Text>
                    </View>
                    <View style={styles.iconRow}>
                    <Ionicons name="calendar-outline" size={20} color="#666" />
                    <Text style={styles.cardText}>{item.fecha}</Text>
                    </View>
                </View>
                <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="#999"
                    style={{ alignSelf: 'center', marginLeft: 5 }}
                />
            </View>
            </View>
        ))
        ) : (
        <Text style={styles.emptyText}>No hay quedadas actuales</Text>
        )}

        <Text style={styles.sectionTitle}>Quedadas pasadas</Text>
        {quedadasPasadas.length > 0 ? (
        quedadasPasadas.map((item) => (
            <View key={item.id} style={styles.card}>
            <View style={styles.card}>
                <View style={{ flex: 1 }}>
                    {/* Aquí va todo el contenido de texto (título, lugar, fecha) */}
                    <Text style={styles.cardTitle}>{item.titulo}</Text>
                    <View style={styles.iconRow}>
                    <Ionicons name="location-outline" size={20} color="#666" />
                    <Text style={styles.cardText}>{item.lugar}</Text>
                    </View>
                    <View style={styles.iconRow}>
                    <Ionicons name="calendar-outline" size={20} color="#666" />
                    <Text style={styles.cardText}>{item.fecha}</Text>
                    </View>
                </View>
                <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="#999"
                    style={{ alignSelf: 'center', marginLeft: 10 }}
                />
            </View>
            </View>
        ))
        ) : (
        <Text style={styles.emptyText}>No hay quedadas pasadas</Text>
        )}

        <Text style={styles.sectionTitle}>Miembros</Text>
        <View
            style={{
            height: 1,
            backgroundColor: '#ccc',
            marginBottom: 6,
            opacity: 0.4,
            }}
        />
        {miembrosTodos.length > 0 ? (
        miembrosTodos.map((item) => (
            <View key={item.id} style={styles.memberItem}>
            {item.foto ? (
                <Image source={{ uri: item.foto }} style={styles.avatar} />
            ) : (
                <Ionicons name="person-circle-outline" size={40} color="#555" />
            )}
            <Text style={styles.cardText}>{item.nombre}</Text>
            </View>
        ))
        ) : (
            <Text style={styles.emptyText}>No hay miembros</Text>
        )}

        <View
            style={{
            height: 1,
            backgroundColor: '#ccc',
            marginTop: 6,
            opacity: 0.4,
            }}
        />

        <View style={{ height: 20 }} />
        <View style={{ alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity
                style={{
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: 'rgba(255,0,0,1)',
                }}
                activeOpacity={0.7}
            >
                <Text style={{ color: 'red', fontSize: 14 }}>Abandonar grupo</Text>
            </TouchableOpacity>
            </View>
        <View style={{ height: 40 }} />
    </ScrollView>
    
    );
};

export default GroupDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { alignItems: 'center', marginBottom: 20 },
  groupImage: { width: 80, height: 80, borderRadius: 40 },
  groupName: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 6 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8e7f9',
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
  },

  cardTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  cardText: { color: '#444', fontSize: 14 },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 2,
  },

  emptyText: { color: '#999', fontStyle: 'italic', marginBottom: 10 },

  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
});

