import { Button, Input } from "react-native-elements";
import { Keyboard, StyleSheet, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import { storeHistoryItem, setupHistoryListener, initHistoryDB} from "../helpers/firebase-fs.js"

const CalcScreen = ({route, navigation}) => {
    return (
      <View>
        <Text>Welcome to the Calculator</Text>
        
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      color: "blue",
    },
});

export default CalcScreen;