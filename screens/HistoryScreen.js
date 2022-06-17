import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { FlatList, ScrollView } from 'react-native-gesture-handler'
//import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import {
    initFuelSaverDB,
    storeFuelAppItem,
    setupFuelAppListener,
    updateHistory,
    deleteHistory
} from "../helpers/firebase-fs";

const HistoryScreen = ({ route, navigation }) => {
    const [state, setState] = useState([]);

    useEffect(() => {
        setupFuelAppListener((item) => {
            setState(item)
        });
    }, []);

    const renderHistory = ({ item }) => {
        return (
            <TouchableOpacity styles={{ borderRadius: 10, }} onLongPress={() => navigation.navigate("Fuel Calculator", { item })}>
                <View style={styles.HistoryBox}>
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
            {/* <TouchableOpacity
             onLongPress={() => {
                console.log(state);
                deleteHistory(state.key);
                setState([]);
             }}>
                <View style={styles.buttons}>
                    <Text 
                    style={styles.btnText}
                    >Clear History</Text>
                </View>
            </TouchableOpacity> */}
            <FlatList
                data={state}
                renderItem={renderHistory}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        flex: 1,
    },
    cordinates: {
        color: "#081C15",
        fontSize: 12,
        paddingLeft: 10,
        paddingTop: 5,
    },
    HistoryBox: {
        backgroundColor: '#FFF',
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
    buttons: {
        marginRight: 50,
        marginLeft: 50,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#52B788',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff'
    },
    btnText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },

});

export default HistoryScreen;