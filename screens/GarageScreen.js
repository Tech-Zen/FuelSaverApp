import { Button, Input } from "react-native-elements";
import { Keyboard, StyleSheet, Text, Modal, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import { storeHistoryItem, setupHistoryListener, initHistoryDB} from "../helpers/firebase-fs.js"
//import DropDownPicker from 'react-native-dropdown-picker';


const GarageScreen = (route) => {
    const [vehicle, setVehicle] = useState([]);

    return (
       <View>
        <TouchableOpacity 
            style={styles.Button}
            onPress={() => {setVehicle()}}
            >
            <Text style={styles.buttonText}>Add Vehicle</Text>
          </TouchableOpacity>
        
      </View>

      
);
}

const styles = StyleSheet.create({
    container: {
    },
    Button: { 
        marginRight: 50,
        marginLeft: 50,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor:'#52B788',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff'
      },
      buttonText: {
        color:'#fff',
        fontSize: 20,
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
      },
    
});

export default GarageScreen;