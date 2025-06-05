import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const balances = [
  { name: 'Ana', balance: -19.97 },
  { name: 'Arnau', balance: -13.08 },
  { name: 'Estela', balance: -13.08 },
  { name: 'Martí', balance: 30.63 },
  { name: 'Omar', balance: -23.02 },
];

const BalancesScreen = () => {
  const youAreOwed = 38.52;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Te deben {youAreOwed.toFixed(2)}€</Text>
      <FlatList
        data={balances}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>
            <Text style={styles.name}>{item.name}</Text>
            <Text
              style={[
                styles.balance,
                item.balance < 0 ? styles.negative : styles.positive,
              ]}
            >
              {item.balance.toFixed(2)}€
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 20 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  avatar: {
    backgroundColor: '#eee',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontWeight: 'bold' },
  name: { flex: 1, fontSize: 16 },
  balance: { fontSize: 16, fontWeight: 'bold' },
  positive: { color: '#2e7d32' },
  negative: { color: '#d32f2f' },
});

export default BalancesScreen;