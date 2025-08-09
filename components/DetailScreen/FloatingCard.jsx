// Componente FloatingCard para el nombre, científico y favorito
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FloatingCard({ nombre, cientifico, favorite, onToggleFavorite, theme, styles }) {
  return (
    <View style={[styles.floatingCard, { backgroundColor: theme.cardBackground + 'CC', shadowColor: theme.text }]}> 
      <View style={{ flex: 1 }}>
        <Text style={[styles.name, { color: theme.text, textAlign: 'left', fontSize: 26, fontWeight: 'bold', marginBottom: 2 }]} numberOfLines={1}>{nombre}</Text>
        <Text style={[styles.scientifico, { color: theme.subtext, fontStyle: 'italic', fontSize: 15 }]} numberOfLines={1}>{cientifico}</Text>
      </View>
      <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteCircle}>
        <Icon
          name={favorite ? 'star' : 'star-outline'}
          size={26}
          color={favorite ? '#FFD700' : theme.subtext}
        />
      </TouchableOpacity>
    </View>
  );
}
