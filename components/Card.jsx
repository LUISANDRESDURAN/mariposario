import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useTheme } from '../screens/theme/ThemeContext'

export default function Card ({
  nombre,
  cientifico,
  colores,
  descripcion,
  imagen
}) {
  const { theme } = useTheme()
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.cardBackground, borderColor: theme.border }
      ]}
    >
      <Image source={{ uri: imagen }} style={styles.image} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>{nombre}</Text>
        <Text style={[styles.subtitle, { color: theme.subtext }]}>
          {cientifico}
        </Text>
        <View style={styles.colorRow}>
          {colores.map((c, i) => (
            <View key={i} style={[styles.dot, { backgroundColor: c }]} />
          ))}
        </View>
        <Text numberOfLines={2} style={[styles.desc, { color: theme.text }]}>
          {descripcion}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    marginVertical: 6,
    borderWidth: 1,
    overflow: 'hidden'
  },
  image: {
    width: 60,
    height: 60,
    margin: 12,
    borderRadius: 30,
    backgroundColor: '#EEE'
  },
  content: { flex: 1, padding: 12 },
  title: { fontSize: 16, fontWeight: '600' },
  subtitle: { fontSize: 12, marginBottom: 6 },
  colorRow: { flexDirection: 'row', marginBottom: 6 },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 6 },
  desc: { fontSize: 12 }
})
