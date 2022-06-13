import { Button, Input } from "react-native-elements";
import { Keyboard, StyleSheet, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import { storeHistoryItem, setupHistoryListener, initHistoryDB} from "../helpers/firebase-fs.js"
//import DropDownPicker from 'react-native-dropdown-picker';


const SettingsScreen = (route) => {
    const [system, setSystem] = useState([
        {label: 'Imperial', value: 'Imperial'},
        {label: 'Metric', value: 'Metric'},
    ]);

    return (
        <View>
        <Text>Welcome to the Settings</Text>
      </View>
);
}

const styles = StyleSheet.create({
    container: {
    },
});

export default SettingsScreen;