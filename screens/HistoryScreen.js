import { Button, Input } from "react-native-elements";
import { FlatList, Keyboard, StyleSheet, Text } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import { storeHistoryItem, setupHistoryListener, initHistoryDB } from "../helpers/firebase-fs.js"
import {
    initFuelSaverDB,
    initFuelSaverAnalytics,
    storeFuelAppItem,
    setupFuelAppListener,
    updateHistory,
    deleteHistory
} from "../helpers/firebase-fs";


const HistoryScreen = ({ route, navigation }) => {
    const [state, setState] = useState([]);

    useEffect(() => {
        setupFuelAppListener((item) => {
            console.log(item)
            setState(item)
        });
    }, []);

    const renderReminder = ({ index, item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("Fuel Calculator", { item })}>
                <Text style={styles.cordinates}> {`Route Title: ${item.routeTitle}`}</Text>
                <Text style={styles.cordinates}> {`Vehicles Combined MPG: ${item.mpg}`}</Text>
                <Text style={styles.cordinates}> {`Fuel Price: ${item.price}`}</Text>
                <Text style={styles.cordinates}> {`Fuel Tank Size: ${item.size}`}</Text>
                <Text style={styles.cordinates}> {`Route Distance: ${item.route}`}</Text>
                <Text style={styles.timestamp}> {`${item.DT}`}</Text>
            </TouchableOpacity >
        );
    }
    const line = () => {
        return (
            <View style={styles.line} />
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={state}
                renderItem={renderReminder}
                ItemSeparatorComponent={line}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6',
    },
    cordinates: {
        color: "black",
        fontSize: 20
    },
    line: {
        height: 1,
        width: "100%",
        backgroundColor: "black"
    },
    timestamp: {
        fontSize: 11,
        fontStyle: "italic",
        textAlign: "right",
        paddingRight: 5

    }
});

export default HistoryScreen;