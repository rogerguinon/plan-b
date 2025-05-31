import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../../firebase/firebaseConfig';
import {
  doc, setDoc, getDoc, collection, query, where, onSnapshot
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function UserInfoScreen({ navigation }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    console.log('📢 authStateChanged:', user);
    if (user) {
      setUid(user.uid);
      setEmail(user.email);
      await loadUserData(user.uid);
      loadUserHistory(user.uid);
    } else {
      // ✅ en web esto puede ser null si no está logueado aún
      console.warn('⚠️ Usuario no autenticado');
    }
    setLoading(false);
  });

  return unsubscribe;
}, []);


  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name || '');
        setSurname(data.surname || '');
        setPhoto(data.photo || null);
      }
    } catch (error) {
      console.log('❌ Error al cargar datos:', error);
    }
  };

  const loadUserHistory = (uid) => {
    const q = query(
      collection(db, 'users', uid, 'meetings'),
      where('status', '==', 'finalizada')
    );

    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHistory(data);
    });
  };

  const pickImage = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setPhoto(uri);
    }
  } catch (error) {
    console.error('❌ Error al seleccionar imagen:', error);
    Alert.alert('Error', 'No se pudo seleccionar la imagen.');
  }
};


  const handleSave = async () => {
    if (!uid) {
      Alert.alert('Error', 'No se pudo guardar porque no hay usuario autenticado.');
      return;
    }

    try {
      await setDoc(doc(db, 'users', uid), {
        name,
        surname,
        photo,
        email,
      });
      Alert.alert('✅ Datos guardados correctamente');
      navigation.replace('Main');
    } catch (error) {
      console.error('❌ Error al guardar:', error);
      Alert.alert('Error', 'No se pudo guardar la información.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 16, color: '#aaa' }}>Cargando usuario...</Text>
      </View>
    );
  }
  if (!uid) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, color: 'red', textAlign: 'center' }}>
        ⚠️ No hay usuario autenticado. Inicia sesión.
      </Text>
    </View>
  );
}

  return (
  <ScrollView contentContainerStyle={styles.container}>
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

    {/* HISTORIAL DE QUEDADAS */}
    <View style={styles.historyContainer}>
      <View style={styles.historyHeaderContainer}>
        <Ionicons name="archive-outline" size={20} color="#444" style={styles.historyIcon} />
        <Text style={styles.historyHeader}>Historial de quedadas</Text>
      </View>
      {history.length === 0 ? (
        <Text style={styles.noMeetings}>No hay quedadas finalizadas aún.</Text>
      ) : (
        history.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title || 'Quedada sin título'}</Text>
            <Text style={styles.cardDate}>
              {item.date
                ? new Date(item.date).toLocaleDateString()
                : 'Fecha no disponible'}
            </Text>
          </View>
        ))
      )}
    </View>
    
  </ScrollView>
);

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    color: '#d46bcf',
    marginVertical: 10,
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 15,
    color: '#d46bcf',
    fontWeight: '600',
  },
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // 🎨 HISTORIAL
  historyContainer: {
    marginTop: 30,
    width: '100%',
    backgroundColor: '#fce9fb',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
  },
  historyHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#8e3d8e',
    textAlign: 'center',
  },
  noMeetings: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#d46bcf',
    fontSize: 16,
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: '#555',
  },
  historyHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  historyIcon: {
    marginRight: 8,
  },

  historyHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

});
