import { View, Text, Switch, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { useTheme } from './theme/ThemeContext'
import { useContext } from 'react';
import { AuthContext } from './theme/ThemeContext';
import { getAuth, signOut } from 'firebase/auth';

export default function CustomDrawerContent ({ navigation }) {
  const { theme, isDark, setIsDark } = useTheme();
  const { user } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View
        style={[
          styles.header,
          { backgroundColor: theme.header, borderBottomColor: theme.border }
        ]}
      >
        <View style={styles.avatar} />
        <Text style={[styles.name, { color: theme.text }]}>
          {user ? user.displayName || user.email : 'Usuario Demo'}
        </Text>
        <Text style={[styles.email, { color: theme.subtext }]}>
          {user ? user.email : 'usuario@ejemplo.com'}
        </Text>
      </View>
      <DrawerContentScrollView>
        <DrawerItem
          label='Mariposas'
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Mariposas' }],
            });
          }}
          labelStyle={{ color: theme.text }}
        />
        <DrawerItem
          label='Agregar Mariposa'
          onPress={() => navigation.navigate('AddMariposaScreen')}
          labelStyle={{ color: theme.text }}
        />
        <DrawerItem
          label='Configuración'
          onPress={() => navigation.navigate('Configuración')}
          labelStyle={{ color: theme.text }}
        />
        <View style={styles.toggleRow}>
          <Text style={[styles.toggleLabel, { color: theme.text }]}>
            Modo Oscuro
          </Text>
          <Switch value={isDark} onValueChange={setIsDark} />
        </View>
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        {user && (
          <DrawerItem
            label='Cerrar sesión'
            onPress={async () => {
              const auth = getAuth();
              await signOut(auth);
            }}
            labelStyle={{ color: '#d00' }}
          />
        )}
        {!user && (
          <DrawerItem
            label='Iniciar sesion'
            onPress={() => navigation.navigate('LoginScreen')}
            labelStyle={{ color: '#d00' }}
          />
        )}
      </DrawerContentScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 24,
    alignItems: 'center',
    borderBottomWidth: 1
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    marginBottom: 12
  },
  name: { fontSize: 18, fontWeight: '600' },
  email: { fontSize: 14 },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  toggleLabel: { fontSize: 16 },
  divider: { height: 1, marginVertical: 8 }
})
