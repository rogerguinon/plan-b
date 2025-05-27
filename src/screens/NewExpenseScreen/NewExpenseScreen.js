// src/screens/ExpenseManagement/NewExpenseScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NewExpenseScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nueva gasto</Text>
      <Text style={styles.subtext}>Aquí podrás crear un nuevo gasto.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtext: { fontSize: 16, textAlign: 'center', color: '#666' },
});
