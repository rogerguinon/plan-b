import { useEventos } from '../../context/EventContext';

export default function ExpenseManagementScreen({ route }) {
  const { id: eventId, eventTitle } = route.params;
  const { participantesPorEvento } = useEventos();

  const currentUser = { name: 'Arnau' }; // o lo que uses para el usuario actual
  const allParticipants = participantesPorEvento[eventId] || [];

  const others = allParticipants.filter(p => p.name !== currentUser.name);

  ...
}

  const renderItem = ({ item }) => {
    const image = item.image || 'https://avatars.githubusercontent.com/u/2263278?v=4';
    return (
      <View style={styles.card}>
        <Image source={{ uri: image }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.debt}>Tú le debes: 0€</Text>
          <Text style={styles.debt}>Te debe: 0€</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gastos de la quedada</Text>

      <FlatList
        data={others}
        keyExtractor={(item, index) => item.name + index}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Botón flotante "+" para añadir gastos */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          // más adelante puedes navegar a AñadirGastoScreen
          // navigation.navigate('AñadirGasto', { event });
        }}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  debt: { fontSize: 14, color: '#555' },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#c154c1',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
