import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getGastosPorEvento } from '../../data/gastosStorage';
import { Ionicons } from '@expo/vector-icons';

const ExpenseManagement = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const eventId = route?.params?.eventId;

  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    if (!eventId) return;

    const cargarGastos = async () => {
      const data = await getGastosPorEvento(eventId);
      setGastos(data || []);
    };

    cargarGastos();
  }, [eventId]);

  // Configurar el botón "+" en el header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('NewExpense', { eventId })}
          style={{ marginRight: 16 }}
        >
          <Ionicons name="add" size={28} color="#007AFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, eventId]);

  const renderGasto = ({ item }) => (
    <View style={styles.gastoCard}>
      <Text style={styles.descripcion}>{item.descripcion || 'Gasto sin descripción'}</Text>
      <Text style={styles.info}>
        Pagado por: <Text style={styles.bold}>{item.pagadoPor}</Text>
      </Text>
      <Text style={styles.info}>
        Cantidad: <Text style={styles.bold}>{item.cantidad}€</Text>
      </Text>
      <Text style={styles.info}>
        Repartido entre: {item.participantes.join(', ')}
      </Text>
    </View>
  );

  if (!eventId) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No se ha proporcionado un evento para mostrar los gastos.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gastos del evento</Text>

      {gastos.length === 0 ? (
        <Text style={styles.emptyText}>Aún no hay gastos registrados para esta quedada.</Text>
      ) : (
        <FlatList
          data={gastos}
          keyExtractor={(item) => item.id}
          renderItem={renderGasto}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  gastoCard: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  descripcion: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 40,
  },
});

export default ExpenseManagement;
