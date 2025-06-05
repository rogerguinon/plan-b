// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error guardando datos:", e);
  }
};

export const getData = async (key) => {
  try {
    const json = await AsyncStorage.getItem(key);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error("Error leyendo datos:", e);
    return [];
  }
};