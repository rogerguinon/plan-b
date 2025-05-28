import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import * as AuthSession from 'expo-auth-session';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Sesión iniciada:", userCredential.user);
      navigation.replace('Main');
    } catch (error) {
      console.error("❌ Error al iniciar sesión:", error);
      Alert.alert('Error al iniciar sesión', error.message || 'Error desconocido');
    }
  };

  const handleGoogleLogin = async () => {
    const clientId = "794332066987-np3r15t5vrogdrq54ne9g5687cc70kh1.apps.googleusercontent.com"; 

    const result = await AuthSession.startAsync({
      authUrl: `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=profile%20email`,
    });

    if (result.type === 'success') {
      navigation.replace('Main');
    } else {
      Alert.alert('Error', 'No se pudo iniciar sesión con Google.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plan B</Text>

      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleEmailLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>

      <View style={styles.separator}>
        <Text style={styles.orText}>o</Text>
      </View>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión con Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#d46bcf', textAlign: 'center', marginBottom: 30 },
  input: {
    backgroundColor: '#f8e7f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#d46bcf',
  },
  button: {
    backgroundColor: '#d46bcf',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  registerLink: { marginTop: 15, alignItems: 'center' },
  registerText: { color: '#8e3d8e' },
  separator: { marginVertical: 20, alignItems: 'center' },
  orText: { color: '#aaa' },
});
