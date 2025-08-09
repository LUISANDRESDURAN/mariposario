// screens/HomeScreen.js
import { useContext, useEffect, useState } from 'react'
import { StyleSheet, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Header from '../components/Header'
import SearchBars from '../components/SearchBar'
import CardList from '../components/CardList'
import { db } from '../config/firebaseConfig';
import { AuthContext } from './theme/ThemeContext';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useTheme } from './theme/ThemeContext'

export default function HomeScreen () {
  const { theme } = useTheme();
  const { user } = useContext(AuthContext);
  const [mariposas, setMariposas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' o 'favorites'
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user && filter === 'favorites') {
      // Escuchar favoritos del usuario
      const favRef = collection(db, 'users', user.uid, 'favorites');
      const unsubscribeFav = onSnapshot(favRef, (snapshot) => {
        setFavorites(snapshot.docs.map(doc => doc.id));
      });
      return unsubscribeFav;
    }
  }, [user, filter]);

  useEffect(() => {
    const q = query(collection(db, 'mariposas'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMariposas(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const filteredMariposas = filter === 'favorites'
    ? mariposas.filter(m => favorites.includes(m.id))
    : mariposas;

  return (
    <SafeAreaView
      style={[
        { backgroundColor: theme.background },
        Platform.OS === 'android' && { paddingTop: StatusBar.currentHeight }
      ]}
      edges={['top', 'bottom']}
    >
      <Header />
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterBtn, filter === 'all' && [styles.filterBtnActive, {  }]]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn, filter === 'favorites' && [styles.filterBtnActive, { }]]}
          onPress={() => setFilter('favorites')}
          disabled={!user}
        >
          <Text style={[styles.filterText, filter === 'favorites' && styles.filterTextActive, !user && { opacity: 0.5 }]}>Favoritas</Text>
        </TouchableOpacity>
      </View>
      <SearchBars />
      {loading ? null : <CardList data={filteredMariposas} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 12,
    gap: 12
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginHorizontal: 4
  },
  filterBtnActive: {
    backgroundColor: '#888',
  },
  filterText: {
    fontSize: 16,
    color: '#888',
    fontWeight: 'bold',
  },
  filterTextActive: {
    color: '#fff',
  },
})
