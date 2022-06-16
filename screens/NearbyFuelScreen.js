import { Button, Input } from "react-native-elements";
import { Keyboard, StyleSheet, Text, Modal, Pressable, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";

import { getGasStations } from "../helpers/placesAPI.js";
import Device from 'expo-device';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { places_api_key } from "../private/placesAPIKey.js";

const NearbyFuel = (route) => {

  //Use State for Gas Stations using Google Places API
  const [gasStationData, setGasStationData] = useState([]);

  //states for location 
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  //states for coordinates
  const [currentLat, setCurrentLat] = useState({lat: ''});
  const [currentLon, setCurrentLon] = useState({lon: ''});

    //Fetch API Data from Places
    var axios = require('axios');

    var config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLat},${currentLon}&radius=5000&type=gas_station&key=${places_api_key}`,
      headers: { }
    };

    axios(config)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
      setGasStationData(response.results);
    })
    .catch(function (error) {
      console.log(error);
    });

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

       const renderNearbyGas = ({item, index}) => {
        console.log(item);
        return (
          <TouchableOpacity
          onLongPress={ async () => {
            const url = item.url;
            await Linking.canOpenURL(url)
            Linking.openURL(url);
          }}>
            <ListItem key={index}>
              <Image 
                source={{ uri: item.icon }}
                style={{ width: 100, height: 55, borderRadius: 5}}
              />
              <ListItem.Content>
                <ListItem.Title style={{fontWeight: 'bold', fontSize: 14}} > {item.name} </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        );
      };

    return (
       <View style={styles.container}>
          <View>
            <FlatList 
              data={gasStationData}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={renderNearbyGas}
              extraData={gasStationData}
              />
          </View>
      </View>
);
}

const styles = StyleSheet.create({
    container: {
    },    
});

export default NearbyFuel;