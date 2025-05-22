import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../../firebase/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function UserInfoScreen({ navigation }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      setEmail(user.email);
      await loadUserData(user.uid);
    } else {
      Alert.alert('Error', 'No hay usuario autenticado');
    }
  });

  return unsubscribe;
}, []);

  const loadUserData = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setName(data.name || '');
      setSurname(data.surname || '');
      setPhoto(data.photo || null);
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted === false) {
      Alert.alert('Permiso denegado', 'Necesitas permitir el acceso a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhoto(uri);
    }
  };

  const handleSave = async () => {
    try {
      const uid = auth.currentUser.uid;
      await setDoc(doc(db, 'users', uid), {
        name,
        surname,
        photo,
        email,
      });
      Alert.alert('✅ Datos guardados');
      navigation.replace('Main');
    } catch (error) {
      console.error(error);
      Alert.alert('❌ Error al guardar');
    }
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <Image source={{ uri: photo }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={{ color: '#ccc' }}>Sin imagen</Text>
        </View>
      )}
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.edit}>Editar imagen</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput style={styles.input} value={email} editable={false} />

      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Apellido</Text>
      <TextInput style={styles.input} value={surname} onChangeText={setSurname} />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar información</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', alignItems: 'center' },
  image: { width: 100, height: 100, borderRadius: 50 },
  imagePlaceholder: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center'
  },
  edit: { color: '#d46bcf', marginVertical: 10 },
  label: { alignSelf: 'flex-start', marginTop: 15, color: '#d46bcf' },
  input: {
    backgroundColor: '#f8e7f9',
    width: '100%',
    padding: 12,
    borderRadius: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#d46bcf',
  },
  button: {
    backgroundColor: '#d46bcf',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
