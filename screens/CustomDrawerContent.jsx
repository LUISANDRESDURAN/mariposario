

import {
  StyleSheet,
  View,
  Text,
  Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';

export default function CustomDrawerContent({
  navigation,
  isDark,
  setIsDark
}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.drawerHeader}>
        <View style={styles.avatar} />
        <Text style={styles.userName}>Usuario Demo</Text>
        <Text style={styles.userEmail}>usuario@ejemplo.com</Text>
      </View>
      <DrawerContentScrollView>
        <DrawerItem
          label="Mariposas"
          onPress={() => navigation.navigate('Mariposas')}
        />
        <DrawerItem
          label="Configuracion"
          onPress={() => navigation.navigate('Configuracion')}
        />
        
        <View style={styles.divider} />
        <DrawerItem
          label="Cerrar sesión"
          labelStyle={{ color: '#d00' }}
          onPress={() => console.log('Cerrar sesión')}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#e2e6ea',
    paddingVertical: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  toggleLabel: { fontSize: 16 },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
});