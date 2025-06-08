import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default function Card ({
  nombre,
  cientifico,
  colores,
  descripcion,
  imagen
}) {
  return (
    <View style={styles.CardContainer}>
      <Image style={styles.image} source={{ uri: imagen }}></Image>
      <View style ={styles.cardContent}>
        <Text style={styles.cardTitle}>{nombre}</Text>
        <Text style={styles.cardSubtitle}>{cientifico}</Text>
        <View style={styles.colorRow}>
          {colores.map((c, i) => (
            <View key={i} style={[styles.color, { backgroundColor: c }]} />
          ))}
        </View>
        <Text numberOfLines={2} style ={styles.cardDescription}>{descripcion}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  CardContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    padding: 12
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222'
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6
  },
  image: {
    width: 60,
    height: 60,
    margin: 12,
    borderRadius: 30,
    backgroundColor: '#EEE'
  },
  colorRow: {
    flexDirection: 'row',
    marginBottom: 6
  },
  color: {
    width: 12,
    height: 12,
    borderRadius: 12,
    marginRight: 6,
    
    border: '1px solid #000'
  },
  cardDescription: {
    paddingRight:18,
    fontSize: 12,
    color: '#444',
  },
})
