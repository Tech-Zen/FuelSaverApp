//Inspired by: https://github.com/federicocotogno

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CalcScreen from '../screens/CalcScreen';
import SettingsScreen from '../screens/SettingsScreen';
import GarageScreen from '../screens/GarageScreen';

//Screen names
const homeName = "Home";
const calcName = "Fuel Calculator";
const settingsName = "Settings";
const garageName = "My Garage";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let routeName = route.name;

            if (routeName === homeName) {
              iconName = focused ? 'home' : 'home';

            } else if (routeName === calcName) {
              iconName = focused ? 'calculator' : 'calculator';

            } else if (routeName === garageName) {
              iconName = focused ? 'car-sport-outline' : 'car-sport-outline';
            }
              else if (routeName === settingsName) {
              iconName = focused ? 'settings' : 'settings';
            } 

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        
        //Deprecated should be replaced with ScreenOptions
        tabBarOptions={{
          activeTintColor: '#2D6A4F',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 20, height: 70}
        }}>
        
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={calcName} component={CalcScreen} />
        <Tab.Screen name={garageName} component={GarageScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;