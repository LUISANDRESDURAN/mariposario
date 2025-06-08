// screens/SettingsScreen.js
import React from 'react';
import { StyleSheet, Text, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  return (
    <SafeAreaView
      style={[
        styles.container,
        Platform.OS === 'android' && { paddingTop: StatusBar.currentHeight },
      ]}
      edges={['top', 'bottom']}
    >
      <Text style={styles.screenText}>
        Aquí van las opciones de configuración
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  screenText: { padding: 16, fontSize: 18 },
});
