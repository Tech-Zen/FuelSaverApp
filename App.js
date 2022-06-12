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
import { createStackNavigator } from "@react-navigation/stack";
import CalcScreen from './screens/CalcScreen';

//Added dependenices for react navigation
import { NavigationContainer, NavigationRouteContext, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainContainer from './helpers/MainContainer';

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator >
            <Stack.Screen
              name="Fuel Savor"
              component={CalcScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#264391',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  color: "#FFFFFF"
                },
              }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#081C15',
    flex: 1,
  },
});