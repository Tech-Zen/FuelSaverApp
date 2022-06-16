import { Button, Input } from "react-native-elements";
import { Keyboard, StyleSheet, Text, Modal, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";

import { getGasStations } from "../helpers/placesAPI.js";
import Device from 'expo-device';
import * as Location from 'expo-location';

const NearbyFuel = (route) => {

  //Use State for Gas Stations using Google Places API
  const [gasStationData, setGasStationData] = useState([]);

  //states for location 
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  //states for coordinates
  const [currentLat, setCurrentLat] = useState({lat: ''});
  const [currentLon, setCurrentLon] = useState({lon: ''});

    //Get Current Device's Location (Lat and Lon)
    useEffect(() => {
      (async () => {
        // if (Platform.OS === 'android' && !Device.isDevice) {
        //   setErrorMsg(
        //     'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        //   );
        //   return;
        // }
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setCurrentLat(location.coords.latitude);
        setCurrentLon(location.coords.longitude);
      })();
       }, []);

    return (
       <View style={styles.container}>
        
      </View>

      
);
}

const styles = StyleSheet.create({
    container: {
    },    
});

export default NearbyFuel;