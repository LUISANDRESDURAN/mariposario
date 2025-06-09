import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Card from './Card';
import { useTheme } from '../screens/theme/ThemeContext';

export default function CardList({ data }) {
  const { theme } = useTheme();
  return (
    <FlatList
      contentContainerStyle={[styles.list, { backgroundColor: theme.background }]}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Card {...item} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
});
