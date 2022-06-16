//Inspired by: https://github.com/federicocotogno

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CalcScreen from '../screens/CalcScreen';
import HistoryScreen from '../screens/HistoryScreen';
import NearbyFuelScreen from '../screens/NearbyFuelScreen';

//Screen names
const homeName = "Home";
const calcName = "Fuel Calculator";
const historyName = "History";
const nearbyFuelName = "Nearby Fuel";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        
        screenOptions={({route}) => ({
          "tabBarActiveTintColor": "#2D6A4F",
          "tabBarInactiveTintColor": "grey",
          "tabBarLabelStyle": {
            "paddingBottom": 10,
            "fontSize": 10
          },
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ],
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let routeName = route.name;

            if (routeName === homeName) {
              iconName = focused ? 'home' : 'home';

            } else if (routeName === calcName) {
              iconName = focused ? 'calculator' : 'calculator';

            } else if (routeName === nearbyFuelName) {
              iconName = focused ? 'speedometer-outline' : 'speedometer-outline';
            }
              else if (routeName === historyName) {
              iconName = focused ? 'archive-outline' : 'archive-outline';
            } 
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        >
        
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={calcName} component={CalcScreen} />
        <Tab.Screen name={nearbyFuelName} component={NearbyFuelScreen} />
        <Tab.Screen name={historyName} component={HistoryScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;