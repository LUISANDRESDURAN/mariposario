import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function FilterTabs({ filter, setFilter, user, theme }) {
  return (
    <View style={styles.filterRow}>
      <TouchableOpacity
        style={[styles.filterBtn, filter === 'all' && [styles.filterBtnActive, { backgroundColor: theme?.primary || '#888' }]]}
        onPress={() => setFilter('all')}
      >
        <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>Todas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.filterBtn, filter === 'favorites' && [styles.filterBtnActive, { backgroundColor: theme?.primary || '#888' }]]}
        onPress={() => setFilter('favorites')}
        disabled={!user}
      >
        <Text style={[
          styles.filterText,
          filter === 'favorites' && styles.filterTextActive,
          !user && { opacity: 0.5 }
        ]}>
          Favoritas
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
