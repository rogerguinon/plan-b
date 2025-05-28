import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Switch, ScrollView } from 'react-native';
import { useExpenses } from '../../context/ExpenseContext';
import { useNavigation } from '@react-navigation/native';

const users = ['Ana', 'Arnau', 'Estela', 'Martí', 'Omar', 'Roger'];

export default function CreateExpenseScreen() {
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState(users[0]);
  const [includedUsers, setIncludedUsers] = useState({});
  const { addExpense } = useExpenses();
  const navigation = useNavigation();

  const toggleUser = (user) => {
    setIncludedUsers((prev) => ({
      ...prev,
      [user]: !prev[user],
    }));
  };

  const handleCreate = () => {
    const included = Object.keys(includedUsers).filter((u) => includedUsers[u]);

    if (!expenseName || !amount || !payer || included.length === 0) return;

    addExpense({
      name: expenseName,
      amount: parseFloat(amount),
      payer,
      included,
      date: new Date().toISOString(),
    });

    navigation.goBack(); // or navigate to Gastos
  };

  return (
    <View style={styles.container}>
        <Text style={styles.label}>Nombre del gasto</Text>
        <TextInput
            style={styles.input}
            placeholder="Ej. Cena, Entradas, etc."
            value={expenseName}
            onChangeText={setExpenseName}
        />

        <Text style={styles.label}>Cantidad (€)</Text>
        <TextInput
            style={styles.input}
            placeholder="Ej. 23.50"
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
        />

        <Text style={styles.label}>Pagado por</Text>
        <FlatList
            horizontal
            data={users}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
            <TouchableOpacity
                style={[styles.payerButton, payer === item && styles.payerSelected]}
                onPress={() => setPayer(item)}
            >
                <Text style={styles.payerText}>{item}</Text>
            </TouchableOpacity>
            )}
        />

        <Text style={styles.label}>Participantes</Text>
        <ScrollView style={{ maxHeight: 300 }}> {/* or use flex: 1 if full screen */}
            {users.map(user => (
                <View key={user} style={styles.switchContainer}>
                <Text>{user}</Text>
                <Switch
                    value={!!includedUsers[user]}
                    onValueChange={() => toggleUser(user)}
                />
                </View>
            ))}
        </ScrollView>


      <TouchableOpacity style={styles.submitButton} onPress={handleCreate}>
        <Text style={styles.submitText}>Crear gasto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  payerButton: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginTop: 10,
  },
  payerSelected: {
    backgroundColor: '#cce5ff',
  },
  payerText: {
    fontSize: 14,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: '#ff80ab',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
});