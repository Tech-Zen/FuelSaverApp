import { StatusBar } from 'expo-status-bar';

import {
  View,
  Text,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

//Added dependenices for react navigation
import { NavigationContainer, NavigationRouteContext, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//importing other screens.js files
import CalcScreen from './screens/CalcScreen';
import SettingsScreen from './screens/SettingsScreen';
import HomeScreen from './screens/HomeScreen';

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen 
                name="Fuel Saver" 
                options={{
                  title: 'Fuel Saver',
                  headerTitleAlign: 'center',
                  headerTintColor: 'white',
                  headerStyle: {
                    backgroundColor: '#0f88bd',
                  },
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
                component={HomeScreen}
                />
                <Stack.Screen 
                name="Settings" 
                options={{
                  title: 'Settings',
                  headerTitleAlign: 'center',
                  headerTintColor: 'white',
                  headerStyle: {
                    backgroundColor: '#0f88bd',
                  },
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
                component={SettingsScreen} 
                />
              </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
        </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});