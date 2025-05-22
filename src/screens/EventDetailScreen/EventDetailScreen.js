import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal, TextInput, Button } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect} from 'react';
import { useEventos } from '../../context/EventContext';


export default function EventDetailScreen({ route, navigation }) {
  const { event, encuestas = [] } = route.params;
  const { participantesPorEvento } = useEventos();
  const toggleParticipants = () => {setShowParticipants(!showParticipants);};
  
  const participantes = participantesPorEvento[event.id] || event.participants || [];

  const participantesAsistencia = React.useMemo(() => {
    const prioridad = { 'si': 0, 'no': 1, '-': 2 };
    return participantes.slice().sort((a, b) => {
      return (prioridad[a.asistencia] ?? 3) - (prioridad[b.asistencia] ?? 3);
    });
  }, [participantes]);


  // MODIFICAR CUANDO ESTE HECHO EL USUARIO
  const usuario = { name: 'Arnau', image: 'https://randomuser.me/portraits/men/36.jpg' };
  //const { usuario } = useAuth();


  const participantesOrdenados = [usuario, ...participantes.filter(p => p.name !== usuario.name)];
  
  const [showParticipants, setShowParticipants] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // BUSCADOR
  const [searchText, setSearchText] = useState('');
  const [participantesFiltrados, setFilteredParticipants] = useState(participantesOrdenados);
  const alturaParticipante = 65;
  const separacion = 1;
  const maxHeight = 550;
  const numParticipantes = participantes.length;
  const alturaTotal = numParticipantes * (alturaParticipante + separacion);
  const alturaContenedor = Math.min(alturaTotal, maxHeight);


  React.useEffect(() => {
    const resultadosFiltrados = participantesAsistencia.filter((p) =>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredParticipants(resultadosFiltrados);
  }, [searchText, participantesAsistencia]);
  


  const renderParticipantTarjeta = ({ item }) => (
    <View style={styles.participantRow}>
      <Image source={{ uri: item.image }} style={styles.participantImage} />
      <Text style={styles.participantName}>{item.name}</Text>
    </View>
  );
  

  // Para la lista completa (modal) con estilos más grandes y separadores
  const renderParticipantCompleto = ({ item }) => {
    let iconName = '';
    let iconColor = '';

    switch (item.asistencia) {
      case 'si':
        iconName = 'check';
        iconColor = 'green';
        break;
      case 'no':
        iconName = 'close';
        iconColor = 'red';
        break;
      default:
        iconName = 'minus';
        iconColor = 'gray';
        break;
    }

    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        justifyContent: 'space-between'
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 40, height: 40, borderRadius: 25, marginRight: 15 }}
          />
          <Text style={{ fontSize: 16, color: '#333'}}>{item.name}</Text>
        </View>

        <MaterialCommunityIcons
          name={iconName}
          size={18}
          color={iconColor}
          style={{ marginRight: 5 }}
        />
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.subtitle}>{event.description}</Text>
      </View>

      <View style={styles.detailsRow}>
        <Ionicons name="calendar-outline" size={20} color="#d46bcf" />
        <Text style={styles.detailText}>{event.date}</Text>
        <Ionicons name="time-outline" size={20} color="#d46bcf" style={{ marginLeft: 10 }} />
        <Text style={styles.detailText}>18:00</Text>
      </View>

      {/* Participantes desplegable */}
      <TouchableOpacity onPress={toggleParticipants}>
        <View style={[styles.section, { backgroundColor: '#cce5ff'}]}>
          <Text style={styles.sectionTitle}>
            {participantesOrdenados.length} Participantes
          </Text>

          {showParticipants && (
            <>
              <View style={{ maxHeight: 168, marginVertical: 10 }}>
                <FlatList
                  data={ participantesOrdenados.slice(0,  4)}
                  keyExtractor={(item, index) => item.name + index}
                  renderItem={renderParticipantTarjeta}
                  numColumns={2}
                  columnWrapperStyle={{
                    justifyContent: 'space-between',
                    marginBottom: 5,
                  }}
                  ListEmptyComponent={<Text>No hay participantes</Text>}
                />
              </View>

              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.showAllButton}>
                <Text style={styles.showAllButtonText}>Mostrar todos</Text>
                <Text style={styles.arrowIcon}>{'>'}</Text>
              </TouchableOpacity>
            </>
          )}

          <MaterialCommunityIcons
            name={showParticipants ? 'chevron-up' : 'chevron-down'}
            size={30}
            color="white"
            style={styles.iconOverlay}
          />

        </View>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
          {/* Título */}
          <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: 60,
            textAlign: 'center',
            color: '#333',
            marginBottom: 20,
          }}>
            Todos los participantes
          </Text>

          {/* Buscador */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            backgroundColor: '#f9f9f9',
            marginBottom: 20,
            height: 40,
          }}>
            <TextInput
              style={{ flex: 1, height: '100%' }}
              placeholder="Buscar participante"
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#999"
            />
            <Ionicons name="search" size={20} color="#999" />
          </View>

          {/* Recinto del listado con borde rosa y fondo transparente, altura adaptativa hasta max 400 */}
          <View style={{
            height: alturaContenedor,
            borderWidth: 2,
            borderColor: '#d46bcf',
            borderRadius: 12,
            backgroundColor: 'rgba(212, 107, 207, 0.1)',
            padding: 10,
          }}>
            <FlatList
              data={participantesFiltrados}
              keyExtractor={(item, index) => item.name + index}
              renderItem={renderParticipantCompleto}
              ItemSeparatorComponent={() => (
                <View style={{ height: separacion, backgroundColor: '#ddd' }} />
              )}
              ListEmptyComponent={<Text>No se encontraron participantes</Text>}
              contentContainerStyle={{ paddingBottom: 10 }}
              scrollEnabled={alturaTotal > maxHeight} // solo scroll si alturaTotal > maxHeight
            />
          </View>

          {/* Botón cerrar debajo del recuadro con separación fija */}
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              marginTop: 20,
              alignSelf: 'center',
              backgroundColor: '#e0e0e0',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: '#333' }}>Cerrar</Text>
          </TouchableOpacity>
          
        </View>
      </Modal>


      <TouchableOpacity onPress={() => navigation.navigate('Encuestas', { id: event.id, eventTitle: event.title })}>
        <View style={[styles.section, { backgroundColor: '#fad1f6' }]}>
          <Text style={styles.sectionTitle}>Votaciones</Text>
          {encuestas.length > 0 ? (
            encuestas.map((encuesta) => (
              <Text key={encuesta.id}>{encuesta.question}</Text>
            ))
          ) : (
            <Text>Todavía no hay encuestas para esta quedada.</Text>
          )}
          <MaterialCommunityIcons name="poll" size={30} color="white" style={styles.iconOverlay} />
        </View>
      </TouchableOpacity>

      

      <TouchableOpacity onPress={() => navigation.navigate({/* PANTALLA DE GASTOS*/})}>
        <View style={[styles.section, { backgroundColor: '#b4f8c8' }]}>
          <Text style={styles.sectionTitle}>Gastos conjuntos</Text>
          <Text>Ejemplo 1</Text>
          <Text>Ejemplo 2</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 20 },
  backButton: { position: 'absolute', top: 50, left: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  infoBox: { backgroundColor: '#f0f4ff', padding: 12, borderRadius: 10, marginBottom: 20 },
  subtitle: { fontSize: 16 },
  detailsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  detailText: { marginLeft: 5, fontSize: 14 },

  section: {
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    position: 'relative',
  },

  sectionTitle: { fontWeight: 'bold', marginBottom: 5, color: 'black' },
  iconOverlay: { position: 'absolute', right: 10, top: 10 },

  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    width: '48%',  
    marginBottom: 6,
    height: 40,       
  },

  participantImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  participantName: {
    fontSize: 14,
    color: '#333',
  },

  showAllButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // separa texto e icono
    alignItems: 'center',
    borderColor: '#7abaff',
    borderWidth: 1.2,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '100%', // o un ancho fijo si prefieres
  },

  showAllButtonText: {
    color: '#7abaff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  arrowIcon: {
    color: '#7abaff',
    fontSize: 16,
    fontWeight: 'bold',
  },


});