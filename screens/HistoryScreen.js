import { Button, Input } from "react-native-elements";
import { FlatList, Keyboard, StyleSheet, Text, ScrollView } from "react-native";
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
import { ToastContainer } from "react-native-root-toast";


const HistoryScreen = ({ route, navigation }) => {
    const [state, setState] = useState([]);

    useEffect(() => {
        setupFuelAppListener((item) => {
            console.log(item)
            setState(item)
        });
    }, []);

    const renderReminder = ({ item }) => {
        return (
            <TouchableOpacity styles={{borderRadius: 10,}} onLongPress={() => navigation.navigate("Fuel Calculator", { item })}>
                <View style = {styles.HistoryBox}>
                    <Text style={styles.cordinates}> {`Route Title: ${item.routeTitle}`}</Text>
                    <Text style={styles.cordinates}> {`Vehicles Combined MPG: ${item.mpg}`}</Text>
                    <Text style={styles.cordinates}> {`Fuel Price: ${item.price}`}</Text>
                    <Text style={styles.cordinates}> {`Fuel Tank Size: ${item.size}`}</Text>
                    <Text style={styles.cordinates}> {`Route Distance: ${item.route}`}</Text>
                    <Text style={styles.timestamp}> {`${item.DT}`}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList 
                data={state}
                renderItem={renderReminder}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
       width: '90%',
       alignSelf: 'center'
    },
    cordinates: {
        color: "#081C15",
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 10,
    },
    HistoryBox: {
        backgroundColor: '#B7E4C7',
        borderRadius: 20,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    timestamp: {
        fontSize: 11,
        fontStyle: "italic",
        textAlign: "right",
        color: 'gray',
        paddingRight: 15,
        paddingBottom: 5,
    },

});

export default HistoryScreen;