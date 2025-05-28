import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const mockExpenses = [
  { id: '1', date: '16 may 2025', title: 'Bebida', amount: 21.80, payer: 'Roger' },
  { id: '2', date: '16 may 2025', title: 'Patatas Jamón', amount: 3.05, payer: 'Ana' },
  { id: '3', date: '15 may 2025', title: 'Pastel', amount: 53.65, payer: 'Martí' },
  { id: '4', date: '13 may 2025', title: 'McDonald\'s', amount: 39.74, payer: 'Roger' },
];

const ExpensesScreen = () => {
  const navigation = useNavigation();

  const renderExpenseItem = ({ item }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseTitle}>{item.title}</Text>
      <Text style={styles.expenseAmount}>{item.amount.toFixed(2)}€</Text>
      <Text style={styles.payerText}>Pagado por {item.payer}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Info */}
      <View style={styles.header}>
        <View style={styles.amountBox}>
          <Text style={styles.label}>Mis Gastos</Text>
          <Text style={styles.amount}>61,54€</Text>
        </View>
        <View style={styles.amountBox}>
          <Text style={styles.label}>Gastos Totales</Text>
          <Text style={styles.amount}>118,24€</Text>
        </View>
      </View>

      {/* Expenses list */}
      <FlatList
        data={mockExpenses}
        renderItem={renderExpenseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateExpense')}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  amountBox: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: 'gray',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 80,
  },
  expenseItem: {
    backgroundColor: '#fce6f7',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  expenseTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  expenseAmount: {
    fontSize: 16,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
  payerText: {
    color: 'gray',
    fontSize: 12,
    marginTop: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#d46bcf',
    borderRadius: 30,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});