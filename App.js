
import 'react-native-gesture-handler';
import {  Dimensions } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreens from './screens/HomeScreens';
import SettingsScreen from './screens/settingsScreen';
import CustomDrawerContent from './screens/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function App() {
  

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Mariposas"
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              width: Dimensions.get('window').width * 0.8,
            },
          }}
          drawerContent={(props) => (
            <CustomDrawerContent
              {...props}
              
              
            />
          )}
        >
          <Drawer.Screen name="Mariposas" component={HomeScreens} />
          <Drawer.Screen name= "Configuracion" component={SettingsScreen}/>
         
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

