
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
import { mariposas } from '../data/mariposas'

const { width } = Dimensions.get('window')

export default function DetailScreen({ route }) {
  const { theme } = useTheme()
  const { id } = route.params || {}
  const item = mariposas.find(m => m.id === id)
  if (!item) return null

  const {
    nombre,
    cientifico,
    imagen,
    descripcion,
    stages = [],
    lifespan,
    hatchDate
  } = item

  const [favorite, setFavorite] = useState(false)
  const toggleFavorite = () => setFavorite(!favorite)

  let daysRemaining = lifespan
  if (hatchDate) {
    const hatch = new Date(hatchDate)
    const diffMs = Date.now() - hatch.getTime()
    const daysPassed = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    daysRemaining = Math.max(lifespan - daysPassed, 0)
  }

  const lifeProgress = (daysRemaining / lifespan) * 100

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>      
      <ScrollView contentContainerStyle={styles.container}>

        {/* Header Section */}
        <View style={[styles.header, { backgroundColor: theme.cardBackground }]}>        
          <View style={styles.headerText}>
            <Text style={[styles.name, { color: theme.text }]}>{nombre}</Text>
            <Text style={[styles.scientific, { color: theme.subtext }]}>{cientifico}</Text>
          </View>
          <TouchableOpacity onPress={toggleFavorite} style={styles.star}>
            <Icon
              name={favorite ? 'star' : 'star-outline'}
              size={28}
              color={favorite ? '#FFD700' : theme.subtext}
            />
          </TouchableOpacity>
          <Image source={{ uri: imagen }} style={styles.image} />
        </View>

        {/* Description Section */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>        
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>Especie</Text>
          <Text style={[styles.descriptionText, { color: theme.text }]}>{descripcion}</Text>
        </View>

        {/* Stages Buttons Section */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>        
          <Text style={[styles.stageTitle, { color: theme.primary }]}>Etapas</Text>
          {stages.map((stage, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.stageButton, { borderColor: theme.primary }]}
            >               
              <Text style={[styles.stageText, { color: theme.primary }]}>{stage.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lifespan Progress Bar Section */}
        <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>        
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>Vida (días)</Text>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${lifeProgress}%`, backgroundColor: theme.primary }
              ]}
            />
          </View>
          <Text style={[styles.progressLabel, { color: theme.text }]}>          
            {daysRemaining} / {lifespan} días        
          </Text>
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

