// src/screens/ExpenseManagement/ExpenseManagementScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExpenseManagementScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gestión de gastos</Text>
      <Text style={styles.subtext}>Aquí podrás ver y dividir los gastos de tus quedadas.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  text: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtext: { fontSize: 16, textAlign: 'center', color: '#666' },
});
