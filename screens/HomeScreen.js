import { Button, Input } from "react-native-elements";
import { Keyboard, StyleSheet, Text, ActivityIndicator, ScrollView, StatusBar } from "react-native";
import React, { useState, useEffect, Component } from "react";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Alert } from "react-native";
import { Container, Content, List } from 'native-base';
import { storeHistoryItem, setupHistoryListener, initHistoryDB } from "../helpers/firebase-fs.js"


const HomeScreen = ({ route, navigation }) => {

  return (

    
    <View style={styles.container}>

        <TouchableOpacity 
          style={styles.box}
          onPress={() => {}}
          >
          <Text style={styles.boxText}>Fuel Tips</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.box}
          onPress={() => {}}
          >
          <Text style={styles.boxText}>Fuel Trends</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.box}
          onPress={() => {}}
          >
          <Text style={styles.boxText}>App Guide</Text>
        </TouchableOpacity>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: .15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItemes: 'center',
  },
  box: { 
    flex: 1,
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor:'#B7E4C7',
    borderColor: '#fff'
  },
  boxText: {
    color: '#081C15',
    fontWeight: 'bold',
    paddingTop: 25,
    }
});

export default HomeScreen;