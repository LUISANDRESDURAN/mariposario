// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { Dimensions } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from './screens/theme/ThemeContext';
import { useTheme } from './screens/theme/ThemeContext';
import HomeScreen from './screens/HomeScreens';
import SettingsScreen from './screens/settingsScreen'
import CustomDrawerContent from './screens/CustomDrawerContent';

const Drawer = createDrawerNavigator();

function AppNavigator() {
  const { isDark } = useTheme();
  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        initialRouteName="Mariposas"
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: Dimensions.get('window').width * 0.8,
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Mariposas" component={HomeScreen} />
        <Drawer.Screen name="Configuración" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
