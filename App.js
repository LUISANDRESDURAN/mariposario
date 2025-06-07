// App.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo
const mariposas = [
  {
    id: '1',
    nombre: 'Monarca',
    cientifico: 'Danaus plexippus',
    colores: ['#FFA500', '#000000'],
    descripcion:
      'Famosa por su migración, la mariposa monarca es reconocida por su color naranja intenso.',
    imagen: 'https://via.placeholder.com/60',
  },
  {
    id: '2',
    nombre: 'Zebra Longwing',
    cientifico: 'Heliconius charithonia',
    colores: ['#FFFFFF', '#000000', '#FFD700'],
    descripcion:
      'Mariposa de alas largas con rayas negras y amarillas, muy común en América Central.',
    imagen: 'https://via.placeholder.com/60',
  },
  // …más objetos…
];

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          styles.container,
          Platform.OS === 'android' && { paddingTop: StatusBar.currentHeight },
        ]}
        edges={['top', 'bottom']}
      >
        <Header />
        <SearchBar />
        <CardList data={mariposas} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Mariposas del Mariposario</Text>
    </View>
  );
}

function SearchBar() {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="ios-search" size={20} color="#666" style={{ marginLeft: 12 }} />
      <TextInput
        placeholder="Buscar por"
        placeholderTextColor="#666"
        style={styles.searchInput}
      />
      <View style={styles.filters}>
        <Ionicons name="ellipse-outline" size={20} color="#ccc" style={{ marginHorizontal: 4 }} />
        <Ionicons name="ellipse-outline" size={20} color="#ccc" style={{ marginHorizontal: 4 }} />
        <Ionicons name="ellipse-outline" size={20} color="#ccc" style={{ marginHorizontal: 4 }} />
      </View>
    </View>
  );
}

function CardList({ data }) {
  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Card {...item} />}
    />
  );
}

function Card({ nombre, cientifico, colores, descripcion, imagen }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imagen }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{nombre}</Text>
        <Text style={styles.cardSubtitle}>{cientifico}</Text>
        <View style={styles.colorRow}>
          {colores.map((c, i) => (
            <View key={i} style={[styles.colorDot, { backgroundColor: c }]} />
          ))}
        </View>
        <Text numberOfLines={2} style={styles.cardDescription}>
          {descripcion}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 12,
    borderRadius: 12,
    elevation: 2,
    paddingVertical: 6,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16,
    color: '#333',
  },
  filters: {
    flexDirection: 'row',
    marginRight: 12,
  },

  list: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  cardImage: {
    width: 60,
    height: 60,
    margin: 12,
    borderRadius: 30,
    backgroundColor: '#EEE',
  },
  cardContent: {
    flex: 1,
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  colorRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
});
