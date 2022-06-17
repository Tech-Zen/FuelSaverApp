import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainContainer from './helpers/MainContainer';

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    //<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <MainContainer/>
      </SafeAreaView>
    //</TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1B4332',
    flex: 1,
  },
});