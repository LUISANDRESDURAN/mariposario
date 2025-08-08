
// screens/DetailScreenCustom.jsx
import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from './theme/ThemeContext'

const mockData = {
  nombre: 'Mariposa Monarca',
  cientifico: 'Danaus plexippus',
  descripcion: 'La mariposa monarca es famosa por su migración masiva desde Norteamérica hasta México.',
  distribucion: 'América del Norte, Centroamérica',
  dieta: 'Néctar de flores (adulto), hojas de asclepia (larva)',
  colores: ['#FFA500', '#000000'],
  imagenes: {
    adulto: [
      'https://firebasestorage.googleapis.com/v0/b/mariposario-app.firebasestorage.app/o/mariposas%2F1754612439533_Fhg.jpg?alt=media&token=1fe7be75-eeb5-42ae-b68d-e519d69c5587'
    ],
    larva: [
      'https://firebasestorage.googleapis.com/v0/b/mariposario-app.firebasestorage.app/o/mariposas%2F1754612439533_Fhg.jpg?alt=media&token=1fe7be75-eeb5-42ae-b68d-e519d69c5587'
    ],
    crisalida: [
      'https://firebasestorage.googleapis.com/v0/b/mariposario-app.firebasestorage.app/o/mariposas%2F1754612439533_Fhg.jpg?alt=media&token=1fe7be75-eeb5-42ae-b68d-e519d69c5587'
    ],
    huevo: [
      'https://firebasestorage.googleapis.com/v0/b/mariposario-app.firebasestorage.app/o/mariposas%2F1754612439533_Fhg.jpg?alt=media&token=1fe7be75-eeb5-42ae-b68d-e519d69c5587'
    ]
  }
};



export default function DetailScreen() {
  const { theme } = useTheme();
  const [favorite, setFavorite] = useState(false);
  const [selectedStage, setSelectedStage] = useState('adulto');
  const data = mockData;

  // Etapas disponibles
  const etapas = Object.keys(data.imagenes);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>      
      <ScrollView contentContainerStyle={styles.container}>
        {/* Encabezado */}
        <View style={[styles.header, { backgroundColor: theme.cardBackground }]}>        
          <Image source={{ uri: data.imagenes.adulto[0] }} style={styles.imageLarge} />
          <View style={styles.headerText}>
            <Text style={[styles.name, { color: theme.text }]}>{data.nombre}</Text>
            <Text style={[styles.scientific, { color: theme.subtext }]}>{data.cientifico}</Text>
          </View>
          <TouchableOpacity onPress={() => setFavorite(f => !f)} style={styles.star}>
            <Icon
              name={favorite ? 'star' : 'star-outline'}
              size={28}
              color={favorite ? '#FFD700' : theme.subtext}
            />
          </TouchableOpacity>
        </View>

        {/* Resumen */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>        
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>Descripción</Text>
          <Text style={[styles.descriptionText, { color: theme.text }]}>{data.descripcion}</Text>
          <Text style={[styles.sectionTitle, { color: theme.primary, marginTop: 12 }]}>Distribución</Text>
          <Text style={[styles.descriptionText, { color: theme.text }]}>{data.distribucion}</Text>
          <Text style={[styles.sectionTitle, { color: theme.primary, marginTop: 12 }]}>Dieta</Text>
          <Text style={[styles.descriptionText, { color: theme.text }]}>{data.dieta}</Text>
        </View>

        {/* Etapas de vida (Tabs) */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>        
          <Text style={[styles.stageTitle, { color: theme.primary }]}>Etapas de vida</Text>
          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            {etapas.map(etapa => (
              <TouchableOpacity
                key={etapa}
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 16,
                  borderRadius: 16,
                  backgroundColor: selectedStage === etapa ? theme.primary : theme.header,
                  marginRight: 8
                }}
                onPress={() => setSelectedStage(etapa)}
              >
                <Text style={{ color: selectedStage === etapa ? '#fff' : theme.text, fontWeight: 'bold' }}>{etapa.charAt(0).toUpperCase() + etapa.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
            {data.imagenes[selectedStage].map((img, idx) => (
              <Image key={idx} source={{ uri: img }} style={styles.stageImage} />
            ))}
          </ScrollView>
        </View>

        {/* Galería de imágenes */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>        
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>Galería</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {etapas.flatMap(etapa =>
              data.imagenes[etapa].map((img, idx) => (
                <Image key={etapa + idx} source={{ uri: img }} style={styles.galleryImage} />
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { paddingBottom: 16 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16
  },
  headerText: { flex: 1 },
  name: { fontSize: 28, fontWeight: '700' },
  scientific: { fontSize: 16, marginTop: 4 },
  star: { marginHorizontal: 8 },
  image: { width: 60, height: 60, borderRadius: 30 },
  imageLarge: { width: 100, height: 100, borderRadius: 50, marginRight: 16, backgroundColor: '#EEE' },
  stageImage: { width: 120, height: 90, borderRadius: 8, marginRight: 12, marginBottom: 8, backgroundColor: '#EEE' },
  galleryImage: { width: 80, height: 60, borderRadius: 8, margin: 4, backgroundColor: '#EEE' },

  section: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    padding: 16
  },
  sectionTitle: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
  stageTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  descriptionText: { fontSize: 14, lineHeight: 20 },

  stageButton: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 8
  },
  stageText: { fontSize: 16, fontWeight: '500' },

  progressBarBackground: {
    height: 8,
    width: '100%',
    backgroundColor: '#EEE',
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressBarFill: { height: 8 },
  progressLabel: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right'
  }
})

