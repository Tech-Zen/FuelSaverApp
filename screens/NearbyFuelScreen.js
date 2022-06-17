import { ListItem, Image } from "react-native-elements";
import { Keyboard, StyleSheet, Text, Modal, Pressable, FlatList, Linking, ActivityIndicator, TouchableOpacity} from "react-native";
import React, { useState, useEffect } from "react";
//import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
//import { getGasStations } from "../helpers/placesAPI.js";
import Device from 'expo-device';
import * as Location from 'expo-location';
import { places_api_key } from "../private/placesAPIKey.js";
import { Center } from "native-base";

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
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return errorMsg;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setCurrentLat(location.coords.latitude);
        setCurrentLon(location.coords.longitude);
      })();
       }, []);

      useEffect(() => {
        console.log(currentLat, currentLon);
        //Fetch API Data from Places
        var axios = require('axios');
    
        var config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLat},${currentLon}&radius=5000&type=gas_station&key=${places_api_key}`,
            headers: {}
        };
        axios(config)
        .then(function (response) {
          setGasStationData(response.data.results);
        })
        .catch(function (error) {
          console.log(error);
        });
        }, [currentLat, currentLon]);

       const renderNearbyGas = ({item, index}) => {

        return (
          <TouchableOpacity
          onLongPress={ async () => {
            const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
            const latLng = `${item.geometry.location.lat},${item.geometry.location.lng}`;
            const label = `${item.name}`;
            const url = Platform.select({
              ios: `${scheme}${label}@${latLng}`,
              android: `${scheme}${latLng}(${label})`
            });
            await Linking.canOpenURL(url)
            Linking.openURL(url);
          }}>
            <ListItem key={index}>
              <Image 
                source={{ uri: item.icon}}
                style={{ width: 25, height: 25}}
              />
              <ListItem.Content>
                <ListItem.Title style={{fontWeight: 'bold', fontSize: 20, color: '#2D6A4F'}} > {item.name} </ListItem.Title>
                <ListItem.Subtitle style={{fontSize: 12, color: '#52B788', paddingLeft: 5,}}>{item.vicinity}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        );
      };

    return (
       <View style={styles.container}>
        {gasStationData.length > 0 ? <FlatList 
              data={gasStationData}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={renderNearbyGas}
              />
            : <View style={styles.loadingAnimation}><ActivityIndicator size="large" color="#2D6A4F"/></View>}
            
      </View>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },    
    loadingAnimation: {
      alignSelf: 'center',
      marginTop: '70%',
    },
});

export default NearbyFuel;