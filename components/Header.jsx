import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../screens/theme/ThemeContext';

export default function Header() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, {  borderBottomColor: theme.border }]}>
      <Text style={[styles.text, { color: theme.text }]}>
        Mariposas del Mariposario
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
