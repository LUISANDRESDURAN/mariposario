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
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, AuthProvider } from './screens/theme/ThemeContext';
import { useTheme } from './screens/theme/ThemeContext';
import HomeScreen from './screens/HomeScreens';
import SettingsScreen from './screens/settingsScreen';
import CustomDrawerContent from './screens/CustomDrawerContent';
import DetailScreen from './screens/DetailScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack que engloba Home + Detail, usando "Home" como initialRouteName
function MainStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"           // ← Coincide con el name del primer Stack.Screen
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Home"                     // ← Nombre único dentro del Stack
        component={HomeScreen}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ route }) => ({ title: route.params.nombre })}
      />
    </Stack.Navigator>
  );
}

import AddMariposaScreen from './screens/AddMariposaScreen';
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
        <Drawer.Screen
          name="Mariposas"
          component={MainStackNavigator}
        />
        <Drawer.Screen
          name="AddMariposaScreen"
          component={AddMariposaScreen}
          options={{ drawerLabel: 'Agregar Mariposa' }}
        />
        <Drawer.Screen
          name="Configuración"
          component={SettingsScreen}
        />
        <Drawer.Screen
          name="LoginScreen"
          component={require('./screens/LoginScreen').default}
          options={{ drawerLabel: () => null, title: null, drawerItemStyle: { height: 0 } }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
