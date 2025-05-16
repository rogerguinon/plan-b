import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const handleLogin = () => {
    navigation.replace('Main'); // Ir directamente a las pestañas
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plan B</Text>
      <Button title="Iniciar sesión con Google" onPress={handleLogin} />
      <View style={{ marginTop: 10 }} />
      <Button title="Iniciar sesión con cuenta" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 32, marginBottom: 40, fontWeight: 'bold' }
});
