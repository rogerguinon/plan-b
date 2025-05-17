import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function VotingInQuedada({ idQuedada }) {
  // Estado simulado de votación única en la quedada
  const [votacion, setVotacion] = useState(null);

  // Simulamos cargar la votación (deberías sustituir por llamada API real)
  useEffect(() => {
    // Ejemplo: buscar votación asociada a idQuedada
    // Si no hay, votacion será null
    const votacionExistente = null; // Aquí tu lógica real
    setVotacion(votacionExistente);
  }, [idQuedada]);

  const manejarCrearOModificar = () => {
    // Aquí abrirías modal o navegación para crear o editar votación
    Alert.alert(
      votacion ? 'Modificar votación' : 'Crear votación',
      `Función para ${votacion ? 'modificar' : 'crear'} la votación de la quedada ${idQuedada}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votaciones</Text>

      {votacion ? (
        <View style={styles.votacionContainer}>
          <Text style={styles.votacionTitulo}>{votacion.titulo || 'Título no disponible'}</Text>
          {/* Aquí más detalles de la votación */}
        </View>
      ) : (
        <Text style={styles.noVotacionText}>No hay ninguna votación creada para esta quedada.</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={manejarCrearOModificar}>
        <Text style={styles.buttonText}>
          {votacion ? 'Modificar votación' : 'Crear nueva votación'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffdfc',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    // Si lo usas dentro de otra pantalla no hace falta full screen
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d63384',
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 50,
  },
  votacionContainer: {
    backgroundColor: '#ffd6e7',
    padding: 15,
    borderRadius: 12,
  },
  votacionTitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#a12362',
  },
  noVotacionText: {
    fontSize: 16,
    color: '#6c757d',
    fontStyle: 'italic',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffd6e7',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  buttonText: {
    color: '#d63384',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
