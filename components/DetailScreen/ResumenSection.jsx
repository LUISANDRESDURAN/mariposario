// Componente ResumenSection para descripción, distribución y dieta
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ResumenSection({ descripcion, distribucion, dieta, theme, styles }) {
  // Formatea la distribución si es array
  let distribucionText = '';
  if (Array.isArray(distribucion)) {
    distribucionText = distribucion.join(', ');
  } else if (typeof distribucion === 'string') {
    distribucionText = distribucion;
  }
  return (
    <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>        
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Descripción</Text>
      <View style={styles.infoRow}>
        <Icon name="information-circle-outline" size={20} color={theme.subtext} style={{ marginRight: 8 }} />
        <Text style={[styles.descriptionText, { color: theme.text }]}>{descripcion}</Text>
      </View>
      <View style={styles.infoRow}>
        <Icon name="earth-outline" size={20} color={theme.subtext} style={{ marginRight: 8 }} />
        <Text style={[styles.descriptionText, { color: theme.text }]}>{distribucionText}</Text>
      </View>
      <View style={styles.infoRow}>
        <Icon name="leaf-outline" size={20} color={theme.subtext} style={{ marginRight: 8 }} />
        <Text style={[styles.descriptionText, { color: theme.text }]}>{dieta}</Text>
      </View>
    </View>
  );
}
