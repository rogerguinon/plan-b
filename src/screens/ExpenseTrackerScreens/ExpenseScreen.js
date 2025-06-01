import { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useExpenses } from '../../context/ExpenseContext'; // Adjust the import path as needed

const ExpensesScreen = ({ event }) => {
  const navigation = useNavigation();

  const { getExpensesForEvent } = useExpenses();
  const expenses = event ? getExpensesForEvent(event.id) : [];

  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  // Set the header title to the event name
  navigation.setOptions({ title: 'Gastos' });

  const totalAmount = safeExpenses.reduce((sum, e) => sum + e.amount, 0);
  const currentUserId = 'me'; // Replace with actual user ID
  const myAmount = safeExpenses.reduce((sum, e) => (e.payer === currentUserId ? sum + e.amount : sum), 0);

  const renderExpenseItem = ({ item }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseTitle}>{item.title}</Text>
      <Text style={styles.expenseAmount}>{item.amount.toFixed(2)}€</Text>
      <Text style={styles.payerText}>Pagado por {item.payer}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.amountBox}>
          <Text style={styles.label}>Mis Gastos</Text>
          <Text style={styles.amount}>{myAmount.toFixed(2)}€</Text>
        </View>
        <View style={styles.amountBox}>
          <Text style={styles.label}>Gastos Totales</Text>
          <Text style={styles.amount}>{totalAmount.toFixed(2)}€</Text>
        </View>
      </View>

      <FlatList
        data={safeExpenses}
        renderItem={renderExpenseItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: 'gray' }}>
            No hay gastos para este evento.
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateExpense', { eventId: event.id })}
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