import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const PARTICIPANTS = [
  { id: '1', name: 'Martí Lapeña' },
  { id: '2', name: 'Ana Enrech' },
  { id: '3', name: 'Omar Abdeliah' },
  { id: '4', name: 'Roger Guiñón' },
  { id: '5', name: 'Estela Callejón' },
  { id: '6', name: 'Arnau Sala' },
  { id: '7', name: 'Lucía Fernández' },
  { id: '8', name: 'David Romero' },
  { id: '9', name: 'Sofía Navarro' },
  { id: '10', name: 'Carlos Méndez' },
  { id: '11', name: 'Paula Torres' },
  { id: '12', name: 'Javier Ortega' },
];

export default function AddParticipants({ navigation }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]); // IDs seleccionados por defecto

  // Filtra por búsqueda
  const filtered = PARTICIPANTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((sid) => sid !== id)
        : [...prev, id]
    );
  };

  const renderItem = ({ item }) => {
    const isChecked = selected.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.row, isChecked && styles.rowSelected]}
        onPress={() => toggleSelect(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.iconCircle}>
          <AntDesign name="user" size={22} color="#888" />
        </View>
        <Text style={styles.name}>{item.name}</Text>
        <View style={{ flex: 1 }} />
        <View style={styles.checkbox}>
          {isChecked ? (
            <MaterialIcons name="check-box" size={22} color="#d46bcf" />
          ) : (
            <MaterialIcons name="check-box-outline-blank" size={22} color="#888" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.bg}>
    
      <View style={styles.container}>
        <Text style={styles.title}>Añadir participantes</Text>

        {/* Barra de búsqueda */}
        <View style={styles.searchBox}>
          <AntDesign name="search1" size={18} color="#888" style={{ marginLeft: 8 }} />
          <TextInput
            style={styles.input}
            placeholder="Buscar contactos..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Lista scrollable */}
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          style={{ marginVertical: 10 }}
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Botones abajo */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancel} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accept} onPress={() => navigation.goBack()}>
            <Text style={styles.acceptText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  container: {
    marginTop: 50,
    marginBottom: 30,
    marginHorizontal: 12,
    backgroundColor: '#f7eaf6',
    borderRadius: 30,
    padding: 22,
    flex: 1,
    elevation: 2,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 16,
    color: '#222',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 8,
    marginBottom: 6,
    height: 50,
    borderWidth: 1,
    borderColor: '#eee',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    elevation: 1,
  },
  rowSelected: {
    backgroundColor: '#eed3eb',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  name: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  checkbox: {
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 0,
    paddingHorizontal: 18,
  },
  cancel: {
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 36,
  },
  accept: {
    backgroundColor: '#d46bcf',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 36,
  },
  cancelText: {
    color: '#444',
    fontWeight: 'bold',
    fontSize: 15,
  },
  acceptText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
