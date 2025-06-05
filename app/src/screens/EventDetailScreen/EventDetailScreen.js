import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEventos } from '../../context/EventContext';


export default function EventDetailScreen({ route, navigation }) {
  const { event, onEliminar } = route.params;
  const { surveyMap, participantesPorEvento } = useEventos();
  const encuestas = surveyMap[event.id] || [];
  
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // CAMBIAR CUANDO EL USUARIO ESTE DEFINIDO
  const usuario = { name: 'Arnau', image: 'https://randomuser.me/portraits/men/36.jpg', asistencia: '-'};

  const participantesRaw = participantesPorEvento[event.id] || event.participants || [];
  const participantes = React.useMemo(() => [
    { ...usuario, name: `Tú` },
    ...participantesRaw.filter(p => p && p.name !== usuario.name),
  ], [participantesRaw, usuario.name]);

  const participantesAsistencia = useMemo(() => {
    const prioridad = { 'si': 0, 'no': 1, '-': 2 };
    return participantes.slice().sort((a, b) =>
      (prioridad[a.asistencia] ?? 3) - (prioridad[b.asistencia] ?? 3)
    );
  }, [participantes]);

  const [participantesFiltrados, setFilteredParticipants] = useState(participantes);

  const formatearFecha = (fechaTexto) => {
    const fecha = new Date(fechaTexto);
    if (isNaN(fecha.getTime())) return fechaTexto;

    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return `${fecha.getDate()} de ${meses[fecha.getMonth()]}, ${fecha.getFullYear()}`;
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('EditEvent', { event })}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20,
            }}
          >
            <Text style={{ color: '#007aff', fontSize: 16 }}>Editar</Text>
          </TouchableOpacity>
      ),
    });
    const filtrados = participantesAsistencia.filter(p =>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredParticipants(filtrados);
  }, [searchText, participantesAsistencia, navigation]);
  
  const [asistencia, setAsistencia] = useState(usuario.asistencia || '-');

  const marcarSi = () => {
    usuario.asistencia = 'si';
    setAsistencia('si');
  };

  const marcarNo = () => {
    usuario.asistencia = 'no';
    setAsistencia('no');
  };

  const editarAsistencia = () => {
    usuario.asistencia = '-';
    setAsistencia('-');
  };


  const secciones = {
    si: 'Confirmados',
    no: 'No asistirán',
    '-': 'Sin respuesta',
  };


  const renderParticipantCompleto = ({ item, index }) => {
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
    const asistenciaActual = item.asistencia;
    const asistenciaSiguiente = participantesFiltrados[index + 1]?.asistencia;
    const showTitle = index === 0 || asistenciaActual !== participantesFiltrados[index - 1]?.asistencia;
    const showSeparator = asistenciaActual === asistenciaSiguiente;
    const sinImagen = 'https://avatars.githubusercontent.com/u/2263278?v=4'
    
    return (
      <View>
        {showTitle && (
          <Text style={styles.sectionHeader}>
            {secciones[asistenciaActual] || 'Otros'}
          </Text>
        )}
        
        <View style={styles.participantRowCompleto}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: (item.image || sinImagen)}}
              style={styles.participantImageCompleto}
            />
            <Text style={styles.participantNameCompleto}>{item.name}</Text>
          </View>
          <MaterialCommunityIcons
            name={iconName}
            size={18}
            color={iconColor}
            style={{ marginRight: 5 }}
          />
        </View>

        {/* Separador solo si no es el último de su grupo */}
        {showSeparator && (
          <View style={{ borderBottomWidth: 1, borderColor: '#ccc', marginVertical: 5 }} />
        )}
      </View>
    );
  };
  
  return (
    <View style={styles.container}>

      <Text style={styles.title}>{event.title}</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.subtitle}>{event.description}</Text>
        </View>

        <View style={styles.detailsColumn}>
          <View style={styles.detailsRow}>
            <Ionicons name="location-outline" size={30} color="#d46bcf" />
            <Text style={styles.detailText}>{event.location}</Text>
          </View>

          <View style={styles.detailsRow}>
            <Ionicons name="calendar-outline" size={30} color="#d46bcf" />
            <Text style={styles.detailText}>{formatearFecha(event.date)}</Text>
          </View>

          <View style={styles.detailsRow}>
            <Ionicons name="time-outline" size={30} color="#d46bcf" />
            <Text style={styles.detailText}>{event.time}</Text>
          </View>
        </View>

        {/* Tarjeta de Participantes */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={[styles.section, styles.participantsSection]}>
            <Text style={styles.sectionTitle}>
              {participantes.length} Participantes
            </Text>
            <MaterialCommunityIcons
              name="account-group"
              size={25}
              color="black"
              style={{ marginLeft: 10 }}
            />
          </View>
        </TouchableOpacity>

        {/* Modal con todos los participantes */}
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Todos los participantes</Text>
            <Text style={styles.modalSubtitle}>{participantes.length} personas</Text>

            {/* Buscador */}
            <View style={styles.searchBox}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar participante"
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor="#999"
              />
              <Ionicons name="search" size={20} color="#999" />
            </View>

            {/* Línea rosa justo antes de la lista */}
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: '#d46bcf',
                  width: '100%',
                }}
              />

            {/* Lista con scroll dinámico */}
            <View style={{ paddingHorizontal: 20, flex: 1, maxHeight: 500}}>
              <ScrollView
                showsVerticalScrollIndicator={true} 
                style={{ flex: 1 }} 
                contentContainerStyle={{ paddingBottom: 20}}
              >
                {participantesFiltrados.map((item, index) => (
                  <View key={item.name + index}>
                    {renderParticipantCompleto({ item, index })}
                  </View>
                ))}
              </ScrollView>
            </View>
              {/* Línea rosa justo después de la lista */}
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: '#d46bcf',
                  width: '100%',
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setSearchText('');   // Aquí limpias el buscador
                }}
                style={[
                  styles.closeButton,
                  {
                    borderWidth: 1,
                    borderColor: '#d46bcf', // contorno rosa
                    backgroundColor: 'transparent', // sin fondo
                  },
                ]}
              >
                <Text style={[styles.closeButtonText, { color: '#d46bcf' }]}>Cerrar</Text>
              </TouchableOpacity>

          </View>
        </Modal>

        {/* Votaciones */}
        <TouchableOpacity onPress={() => navigation.navigate('Encuestas', { id: event.id, eventTitle: event.title })}>
          <View style={[styles.section, styles.votacionesSection, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            
            <View>
              <Text style={styles.sectionTitle}>Votaciones</Text>
              {encuestas.map((encuesta) => (<Text key={encuesta.id}>{encuesta.question}</Text>))}
            </View>

            <MaterialCommunityIcons
              name="poll"
              size={25}
              color="black"
              style={{ marginLeft: 10 }}
            />
            
          </View>
        </TouchableOpacity>

        {/* Gastos */}
        <TouchableOpacity onPress={() => navigation.navigate('GastosEvento', { event })}>
          <View style={[styles.section, styles.gastosSection, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            
            <View>
              <Text style={styles.sectionTitle}>Gastos conjuntos</Text>
            </View>

            <MaterialCommunityIcons
              name="cash-multiple"
              size={25}
              color="black"
              style={{ marginLeft: 10 }}
            />
            
          </View>
        </TouchableOpacity>


        {/*Asistencia*/}
        <View style={[styles.asistenciaContainer, asistencia === 'si' ? styles.si : asistencia === 'no' ? styles.no : null]}>
          {asistencia === '-' ? (
            <>
              <Text style={styles.pregunta}>¿Vas a asistir a la quedada?</Text>
              <View style={styles.row}>
                <TouchableOpacity style={styles.btnSi} onPress={marcarSi}>
                  <Text style={styles.btnTexto}>Sí</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnNo} onPress={marcarNo}>
                  <Text style={styles.btnTexto}>No</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.resultado}>
              <View style={styles.resultadoFila}>
                <Ionicons
                  name={asistencia === 'si' ? 'checkmark-circle' : 'close-circle'}
                  size={20}
                  color={asistencia === 'si' ? '#228B22' : '#cc0000'}
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.resultadoTexto}>
                  {asistencia === 'si' ? 'Asistencia confirmada' : 'Asistencia denegada'}
                </Text>
              </View>
              <TouchableOpacity style={styles.editBtn} onPress={editarAsistencia}>
                <Ionicons name="pencil-outline" size={16} color="#333" style={{ marginRight: 6 }} />
                <Text style={styles.editBtnText}>Editar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Chat */}
        <TouchableOpacity style={styles.chatLink} onPress={() => navigation.navigate('ChatQuedada', { id: event.id })}>
          <Text style={styles.chatLinkText}>Chat</Text>
          <Ionicons name="arrow-down" size={16} color="#007AFF" style={{ marginLeft: 4 }} />
        </TouchableOpacity>

      </ScrollView>


    </View>
  );  
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 20 },
  backButton: { position: 'absolute', top: 50, left: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 25, textAlign: 'center' },
  infoBox: { backgroundColor: '#f0f4ff', padding: 12, borderRadius: 10, marginBottom: 20 },
  subtitle: { fontSize: 16 },
  detailsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  detailText: { marginLeft: 10, fontSize: 15 },
  iconMarginLeft: { marginLeft: 10 },

  section: {
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    height: 65,
  },

  participantsSection: {
    backgroundColor: '#cce5ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: { fontWeight: 'bold', color: 'black', fontSize: 14 },

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
    justifyContent: 'space-between',  
    alignItems: 'center',
    borderColor: '#7abaff',
    borderWidth: 1.2,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '100%',
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

  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 60,
    textAlign: 'center',
    color: '#333',
  },

  modalSubtitle: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
    height: 40,
  },

  searchInput: {
    flex: 1,
    height: '100%',
  },

  listContainer: {
    borderWidth: 2,
    borderColor: '#d46bcf',
    borderRadius: 12,
    backgroundColor: 'rgba(212, 107, 207, 0.1)',
    padding: 10,
  },

  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  closeButtonText: {
    fontSize: 16,
    color: '#333',
  },

  votacionesSection: {
    backgroundColor: '#fad1f6',
  },

  gastosSection: {
    backgroundColor: '#b4f8c8',
  },

  separatorTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#eee',
    color: '#555',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 4,
  },

  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    color: '#d46bcf',
  },

  participantRowCompleto: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },

  participantImageCompleto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },

  participantNameCompleto: {
    fontSize: 16,
    color: '#333',
  },

  asistenciaContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  pregunta: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  btnSi: {
    backgroundColor: '#d1f2d1',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  btnNo: {
    backgroundColor: '#f7caca',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  btnTexto: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  resultado: {
    alignItems: 'center',
  },
  resultadoFila: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  resultadoTexto: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  si: {
    backgroundColor: '#d1f2d1',
  },
  no: {
    backgroundColor: '#f7caca',
  },
  editBtn: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e6e6e6',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  
  chatLink: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 30,
  },

  chatLinkText: {
    color: '#007aff', 
    fontSize: 16,
  },
  detailsColumn: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
  },

});