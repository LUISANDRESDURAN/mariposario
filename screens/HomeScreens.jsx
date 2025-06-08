// screens/HomeScreen.js
import React from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../components/Header';
import SearchBars from '../components/SearchBar';
import CardList from '../components/CardList';
import { mariposas } from '../data/mariposas';

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={[
        styles.container,
        Platform.OS === 'android' && { paddingTop: StatusBar.currentHeight },
      ]}
      edges={['top', 'bottom']}
    >
      <Header />
      <SearchBars />
      <CardList data={mariposas} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
});