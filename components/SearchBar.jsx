import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useTheme } from '../screens/theme/ThemeContext'

export default function SearchBar () {
  const { theme } = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: theme.header }]}>
      <Feather name='search' size={24} color='#666' style={style.iconSearch} />
      <TextInput
        placeholder='Buscar por'
        placeholderTextColor={theme.subtext}
        style={[styles.input, { color: theme.text }]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
   
    elevation: 2,
    margin: 12,
    borderRadius: 12,
    paddingVertical: 6
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16
  }
})

const style = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    margin: 12,
    borderRadius: 12
  },
  iconSearch: {
    marginHorizontal: 8
  },
  inputSearch: {
    fontSize: 16,
    color: '#333'
  }
})
