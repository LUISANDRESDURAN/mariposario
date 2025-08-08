// screens/HomeScreen.js
import { useEffect, useState } from 'react'
import { StyleSheet, Platform, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Header from '../components/Header'
import SearchBars from '../components/SearchBar'
import CardList from '../components/CardList'
import { db } from '../config/firebaseConfig';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useTheme } from './theme/ThemeContext'

export default function HomeScreen () {
  const { theme } = useTheme();
  const [mariposas, setMariposas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'mariposas'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMariposas(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.background },
        Platform.OS === 'android' && { paddingTop: StatusBar.currentHeight }
      ]}
      edges={['top', 'bottom']}
    >
      <Header />
      <SearchBars />
      {loading ? null : <CardList data={mariposas} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' }
})
