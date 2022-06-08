import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import {
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
import calcScreen from './screens/calcScreen';
import settingsScreen from './screens/settingsScreen';
import homeScreen from './screens/homeScreen';

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
                component={homeScreen}
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
                component={settingsScreen} 
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