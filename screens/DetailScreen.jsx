// screens/DetailScreenCustom.jsx
import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  View as RNView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from './theme/ThemeContext'
import ImageViewing from 'react-native-image-viewing';

const SCREEN_WIDTH = Dimensions.get('window').width;

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
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqCTwwD7g6CeLp6lT7JZoTvK9knRbRVAnKlw&s'
    ],
    huevo: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqCTwwD7g6CeLp6lT7JZoTvK9knRbRVAnKlw&s'
    ]
  }
};



export default function DetailScreen() {
  const { theme } = useTheme();
  const [favorite, setFavorite] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const stageCarouselRef = useRef(null);
  const data = mockData;

  // Etapas disponibles
  const etapas = Object.keys(data.imagenes);

  // Cambia etapa desde tab
  const handleTabPress = idx => {
    setStageIndex(idx);
    if (stageCarouselRef.current) {
      stageCarouselRef.current.scrollToIndex({ index: idx, animated: true });
    }
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>      
      <ScrollView contentContainerStyle={styles.container}>
        {/* Imagen destacada */}
        <View style={styles.topImageContainer}>
          <Image source={{ uri: data.imagenes.adulto[0] }} style={styles.topImage} />
          {/* Tarjeta flotante mejorada */}
          <View style={[styles.floatingCard, { backgroundColor: theme.cardBackground + 'CC', shadowColor: theme.text }]}> 
            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: theme.text, textAlign: 'left', fontSize: 26, fontWeight: 'bold', marginBottom: 2 }]} numberOfLines={1}>{data.nombre}</Text>
              <Text style={[styles.scientifico, { color: theme.subtext, fontStyle: 'italic', fontSize: 15 }]} numberOfLines={1}>{data.cientifico}</Text>
            </View>
            <TouchableOpacity onPress={() => setFavorite(f => !f)} style={styles.favoriteCircle}>
              <Icon
                name={favorite ? 'star' : 'star-outline'}
                size={26}
                color={favorite ? '#FFD700' : theme.subtext}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Resumen con íconos */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>        
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Descripción</Text>
          <View style={styles.infoRow}>
            <Icon name="information-circle-outline" size={20} color={theme.subtext} style={{ marginRight: 8 }} />
            <Text style={[styles.descriptionText, { color: theme.text }]}>{data.descripcion}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="earth-outline" size={20} color={theme.subtext} style={{ marginRight: 8 }} />
            <Text style={[styles.descriptionText, { color: theme.text }]}>{data.distribucion}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="leaf-outline" size={20} color={theme.subtext} style={{ marginRight: 8 }} />
            <Text style={[styles.descriptionText, { color: theme.text }]}>{data.dieta}</Text>
          </View>
        </View>

        {/* Etapas de vida (Carrusel de etapas) */}
        <View style={[styles.stageCard, { backgroundColor: theme.cardBackground }]}>        
          <Text style={[styles.stageTitle, { color: theme.text }]}>Etapas de vida</Text>
          <View style={styles.stagesTabRow}>
            {etapas.map((etapa, idx) => (
              <TouchableOpacity
                key={etapa}
                style={[
                  styles.stageTab,
                  stageIndex === idx && styles.stageTabActive,
                  { backgroundColor: stageIndex === idx ? '#f7c873' : theme.header, borderColor: stageIndex === idx ? '#f7c873' : theme.border }
                ]}
                onPress={() => handleTabPress(idx)}
                activeOpacity={0.8}
              >
                <Icon name={
                  etapa === 'adulto' ? 'bug-outline' :
                  etapa === 'larva' ? 'leaf-outline' :
                  etapa === 'crisalida' ? 'egg-outline' :
                  'ellipse-outline'
                } size={20} color={stageIndex === idx ? '#fff' : theme.text} style={{ marginBottom: 2 }} />
                <Text style={{ color: stageIndex === idx ? '#fff' : theme.text, fontWeight: 'bold', fontSize: 14 }}>{etapa.charAt(0).toUpperCase() + etapa.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <RNView style={styles.stageCarouselArea}>
            <FlatList
              ref={stageCarouselRef}
              data={etapas}
              keyExtractor={etapa => etapa}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={e => {
                const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
                setStageIndex(idx);
              }}
              renderItem={({ item: etapa }) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setModalVisible(true)}
                  style={[
                  styles.stageImageWrapper,
                  { backgroundColor: theme.cardBackground }
                  ]}
                >
                  <Image source={{ uri: data.imagenes[etapa][0] }} style={styles.stageImageLarge} />
                  <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16, color: theme.text }}>{etapa.charAt(0).toUpperCase() + etapa.slice(1)}</Text>
                </TouchableOpacity>
              )}
              style={{ flexGrow: 0 }}
              snapToInterval={SCREEN_WIDTH}
              decelerationRate={0.95}
              contentContainerStyle={{ paddingHorizontal: 0 }}
              initialScrollIndex={stageIndex}
              getItemLayout={(_, index) => ({ length: SCREEN_WIDTH, offset: SCREEN_WIDTH * index, index })}
              extraData={stageIndex}
            />
            {/* Dots */}
            <View style={styles.dotsRow}>
              {etapas.map((_, idx) => (
                <View key={idx} style={[styles.dot, stageIndex === idx && styles.dotActive]} />
              ))}
            </View>
            {/* Modal de imagen con zoom */}
            <ImageViewing
              images={[{ uri: data.imagenes[etapas[stageIndex]][0] }]
              }
              imageIndex={0}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
              backgroundColor="#000"
            />
          </RNView>
        </View>

        {/* Galería de imágenes */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>        
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Galería</Text>
          <View style={styles.galleryRow}>
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
  container: { paddingBottom: 32 },

  topImageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    position: 'relative',
  },
  topImage: {
    width: '100%',
    height: 260,
    resizeMode: 'cover',
  },
  floatingCard: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: -24, // antes -36, ahora sobresale menos
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 40, // menos padding vertical
    paddingHorizontal: 18,
    borderRadius: 18,
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    zIndex: 10,
    backgroundColor: '#fff',
    gap: 12,
  },
  favoriteCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 2,
    marginLeft: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 56,
    minHeight: 0,
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  headerText: { flex: 1 },
  name: { fontSize: 28, fontWeight: '700' },
  scientific: { fontSize: 16, marginTop: 4 },
  star: { marginHorizontal: 8 },
  image: { width: 60, height: 60, borderRadius: 30 },
  imageLarge: { width: 100, height: 100, borderRadius: 50, marginRight: 16, backgroundColor: '#EEE' },
  stageImage: { width: 120, height: 90, borderRadius: 12, marginRight: 12, marginBottom: 8, backgroundColor: '#EEE', borderWidth: 1, borderColor: '#eee' },
  galleryImage: { width: 80, height: 60, borderRadius: 10, margin: 4, backgroundColor: '#EEE', borderWidth: 1, borderColor: '#eee' },

  section: {
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: 18,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  stageTitle: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  descriptionText: { fontSize: 15, lineHeight: 22 },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },

  stagesTabRow: { flexDirection: 'row', marginBottom: 8, justifyContent: 'center', gap: 8 },
  stageTab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 16,
    marginHorizontal: 2,
    borderWidth: 1.5,
    flexDirection: 'column',
    minWidth: 70,
    minHeight: 54,
    elevation: 1,
  },
  stageTabActive: {
    backgroundColor: '#f7c873',
    borderColor: '#f7c873',
    elevation: 2,
    shadowColor: '#f7c873',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  stageCard: {
    marginHorizontal: 0,
    marginTop: 32,
    borderRadius: 22,
    paddingVertical: 24,
    paddingHorizontal: 0,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  stageCarouselArea: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 0,
    minHeight: 160,
  },
  stageImageWrapper: {
    width: SCREEN_WIDTH,
    height: 220, // altura mayor para mejor visualización
    borderRadius: 0,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  stageImageLarge: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // mostrar imagen completa sin recortar
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 2,
  },
  dotActive: {
    backgroundColor: '#f7c873',
    width: 16,
  },
})

