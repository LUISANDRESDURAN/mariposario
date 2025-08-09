// Componente GallerySection para mostrar la galería de imágenes
import React from 'react';
import { View, Text, Image } from 'react-native';

export default function GallerySection({ etapas, imagenesObj, theme, styles }) {
  return (
    <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>        
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Galería</Text>
      <View style={styles.galleryRow}>
        {etapas.flatMap(etapa =>
          (imagenesObj[etapa] || []).map((img, idx) => (
            <Image key={etapa + idx} source={{ uri: img }} style={styles.galleryImage} />
          ))
        )}
      </View>
    </View>
  );
}
