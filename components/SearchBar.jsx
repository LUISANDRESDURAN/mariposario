import React from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'
import { View, TextInput, StyleSheet, Text } from 'react-native'

export default function SearchBar () {
  return (
    <View style={style.searchContainer}>
      <Feather name='search' size={24} color='#666' style={style.iconSearch} />
      <TextInput
        placeholder='Buscar por: '
        placeholderTextColor='#666'
        style={style.inputSearch}
      ></TextInput>
    </View>
  )
}

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
    marginHorizontal: 8,
  },
  inputSearch: {
    fontSize: 16,
    color: '#333'
  }
})
