import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Header () {
  return (
    <View style={styles.HeaderContainer}>
      <Text style={styles.headerText}>Mariposas del Mariposario</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  HeaderContainer: {
    alignItems: 'center',
    borderBottomColor: '#EEE'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  }
})
