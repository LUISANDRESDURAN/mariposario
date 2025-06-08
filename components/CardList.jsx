import { FlatList, StyleSheet, Text } from 'react-native'
import Card from './Card'
const mariposas = [
  {
    id: '1',
    nombre: 'Monarca',
    cientifico: 'Danaus plexippus',
    colores: ['#FFA500', '#000000'],
    descripcion:
      'Famosa por su migración, la mariposa monarca es reconocida por su color naranja intenso.',
    imagen: 'https://via.placeholder.com/60'
  },
  {
    id: '2',
    nombre: 'Zebra Longwing',
    cientifico: 'Heliconius charithonia',
    colores: ['#FFFFFF', '#000000', '#FFD700'],
    descripcion:
      'Mariposa de alas largas con rayas negras y amarillas, muy común en América Central.',
    imagen: 'https://via.placeholder.com/60'
  }

]

export default function CardList ({ data }) {
  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Card {...item} />}
    ></FlatList>
  )
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 12,
    paddingBottom: 20
  }
})
