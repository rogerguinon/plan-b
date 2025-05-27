import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'chat_messages';

export const saveMessages = async (messages) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (e) {
    console.error('Error saving messages:', e);
  }
};

export const loadMessages = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Error loading messages:', e);
    return [];
  }
};

