import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { loadMessages, saveMessages } from '../../data/chatStorage';

export default function ChatQuedadaScreen({ route }) {
  const { id } = route.params || {};

  const [allMessages, setAllMessages] = useState([]);
  const [senderColors, setSenderColors] = useState({});
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef();

  const coloresDisponibles = ['#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#e84393'];

  useEffect(() => {
    cargarMensajes();
  }, []);

  const cargarMensajes = async () => {
    const saved = await loadMessages();
    if (saved.length > 0) {
      setAllMessages(saved);
    } else {
      const mensajesIniciales = [
        { idMensaje: '1', text: 'Si alguien aun no sabe si puede venir, que lo diga por aquí.', sender: 'Sergi', time: '11:05', idQuedada: '1' },
        { idMensaje: '2', text: 'Yo no podré ir, tengo que estudiar 😢', sender: 'Carles', time: '11:07', idQuedada: '1' },
        { idMensaje: '3', text: 'Yo tampoco podré ir, tengo que trabajar', sender: 'María', time: '11:09', idQuedada: '1' },
        { idMensaje: '4', text: '¿A qué hora quedamos?', sender: 'Marc', time: '11:05', idQuedada: '2' },
        { idMensaje: '5', text: 'Traed bebida 🍻', sender: 'Joan', time: '11:07', idQuedada: '3' }
      ];
      setAllMessages(mensajesIniciales);
      await saveMessages(mensajesIniciales);
    }
  };

  useEffect(() => {
    const sendersUnicos = [...new Set(allMessages.map(m => m.sender).filter(s => s !== 'me'))];
    const nuevoMapaColores = {};
    sendersUnicos.forEach((sender, idx) => {
      nuevoMapaColores[sender] = coloresDisponibles[idx % coloresDisponibles.length];
    });
    setSenderColors(nuevoMapaColores);
    saveMessages(allMessages);
  }, [allMessages]);

  const mensajesEvento = allMessages.filter(msg => String(msg.idQuedada) === String(id));

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const nuevoMensaje = {
      idMensaje: Date.now().toString(),
      text: inputText,
      sender: 'me',
      time: hora,
      idQuedada: id
    };

    setAllMessages(prev => [...prev, nuevoMensaje]);
    setInputText('');
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [mensajesEvento]);

  const renderItem = ({ item }) => {
    if (item.sender === 'system') {
      return (
        <View style={styles.systemMessageContainer}>
          <Text style={styles.systemMessageText}>{item.text}</Text>
        </View>
      );
    }

    return (
      <View style={[styles.messageContainer, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
        {item.sender !== 'me' && (
          <Text style={[styles.senderName, { color: senderColors[item.sender] || '#000' }]}>
            {item.sender}
          </Text>
        )}
        <View style={styles.messageRow}>
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={50}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Chat de la quedada</Text>
      </View>


      {/*BORRAR ANTES DE LA PRESENTACION*/ }
      <TouchableOpacity
        style={styles.clearButton}
        onPress={async () => {
            const todos = await loadMessages();
            const filtrados = todos.filter(msg =>
            !(msg.sender === 'me' && String(msg.idQuedada) === String(id))
            );
            await saveMessages(filtrados);
            setAllMessages(filtrados);
        }}
        >
        <Text style={styles.clearButtonText}>Borrar mis mensajes</Text>
      </TouchableOpacity>

      <View style={styles.systemMessageContainer}>
        <Text style={styles.systemMessageText}>¡Hola! Bienvenid@ al chat de la quedada.</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={mensajesEvento}
        renderItem={renderItem}
        keyExtractor={item => item.idMensaje}
        contentContainerStyle={styles.chatContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Escribe un mensaje..."
          value={inputText}
          onChangeText={setInputText}
          style={styles.input}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    padding: 16,
    backgroundColor: '#4A90E2',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  chatContainer: {
    padding: 12,
    flexGrow: 1,
    justifyContent: 'flex-end'
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 4,
    padding: 10,
    borderRadius: 10
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end'
  },
  otherMessage: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start'
  },
  messageText: {
    fontSize: 16,
    flexShrink: 1,
    color: '#000',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  senderName: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
    marginBottom: 40,
  },
  input: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 16
  },
  sendBtn: {
    marginLeft: 10,
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20
  },
  sendText: {
    color: 'white',
    fontWeight: 'bold'
  },
  systemMessageContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  systemMessageText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 10,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 8,
    maxWidth: '100%',
    flexWrap: 'wrap',
  },
  clearButton: {
    marginTop: 8,
    backgroundColor: '#e74c3c',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'center'
  },
  clearButtonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});
