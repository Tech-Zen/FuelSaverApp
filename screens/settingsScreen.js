import { Button, Input } from "react-native-elements";
import { Keyboard, StyleSheet, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from '@expo/vector-icons';
import Padder from "../components/Padder";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import { storeHistoryItem, setupHistoryListener, initHistoryDB} from "../helpers/fb-history.js"
import moment from 'moment';

const settingsScreen = ({route, navigation}) => {
    
<View>Welcome to the Setting Screen</View>
}

const styles = StyleSheet.create({
    container: {
    },
});

export default settingsScreen;