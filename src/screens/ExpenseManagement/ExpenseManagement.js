// src/screens/ExpenseManagement/ExpenseManagementScreen.js

import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ExpenseManagementScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('NewExpense')}>
          <MaterialIcons name="add-box" size={28} color="#d46bcf" />
        </TouchableOpacity>
      ),
      title: 'Cumple Martí', // Puedes hacer esto dinámico con props si quieres
    });
  }, [navigation]);

  const gastosPorFecha = [
    {
      title: '16 may 2025',
      data: [
        { title: 'Bebida', amount: 21.80, payer: 'Roger' },
        { title: 'Patatas Jamón', amount: 3.05, payer: 'Ana' },
      ],
    },
    {
      title: '15 may 2025',
      data: [
        { title: 'Pastel', amount: 53.65, payer: 'Martí' },
      ],
    },
    {
      title: '13 may 2025',
      data: [
        { title: 'McDonald’s', amount: 39.74, payer: 'Roger' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Cabecera con resumen */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Mis Gastos</Text>
          <Text style={styles.summaryValue}>61,54€</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Gastos Totales</Text>
          <Text style={styles.summaryValue}>118,24€</Text>
        </View>
      </View>

      {/* Lista de gastos por fecha */}
      <SectionList
        sections={gastosPorFecha}
        keyExtractor={(item, index) => item.title + index}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.expenseCard}>
            <Text style={styles.expenseTitle}>{item.title}</Text>
            <Text style={styles.expensePayer}>Pagado por {item.payer}</Text>
            <Text style={styles.expenseAmount}>{item.amount.toFixed(2)}€</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 15, paddingTop: 10 },

  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  summaryBox: { alignItems: 'center', flex: 1 },
  summaryTitle: { fontSize: 14, color: '#666' },
  summaryValue: { fontSize: 20, fontWeight: 'bold', color: '#000' },

  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 6,
    color: '#444',
  },

  expenseCard: {
    backgroundColor: '#f8e7f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    position: 'relative',
  },
  expenseTitle: { fontSize: 16, fontWeight: '600' },
  expensePayer: { fontSize: 12, color: '#666', marginTop: 2 },
  expenseAmount: {
    position: 'absolute',
    right: 12,
    top: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
});
