import {  Input } from "react-native-elements";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { storeHistoryItem, setupHistoryListener, initHistoryDB } from "../helpers/firebase-fs.js"
import Icon from 'react-native-vector-icons/FontAwesome';

/*
Imperial or Metric Option

Price to fill up a tank of fuel

Estimated Route Fuel Burn
*/

const CalcScreen = ({ route, navigation }) => {
  const [state, setState] = useState({ mpg: '', price: '', size: '', route: '', distance: '', full: '', calcResults: ''});
  const [checked, setChecked] = useState('Imperial');

  const updateStateObject = (vals) => {
    setState({
      ...state,
      ...vals,
    });
  };
  const data = [
    { label: 'Imperial' },
    { label: 'Metric' }
  ];


  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }

  function computeFuelConsumption(mpg, route, label) {
    var ans = route / mpg
    if (label === 'Imperial') {
      return `${round(ans, 2)} Gallons`;
    } else {
      return `${round(ans, 2)} Liters`;
    }
  }

  function computeCostToFill(price, size) {
    var tank = price * size
    return `${round(tank, 2)}`;
  }

  function handleError(val, box) {
    var changes = {}
    if (isNaN(val)) {
      changes[box + 'error'] = 'Must be a number'
    } else if (val == '') {
      changes[box + 'error'] = "can't be empty"
    } else {
      changes[box + 'error'] = ''
    }
    changes[box] = val
    updateStateObject(changes)
  }

  return (
    <View>
      <Input
        placeholder='Enter Vehicles Combined MPG or KM/L'
        keyboardType='numeric'
        value={state.mpg}
        onChangeText={(value) => {
          handleError(value, 'mpg')
        }}
      />
      <Input
        placeholder='Enter Fuel Price'
        keyboardType='numeric'
        value={state.price}
        onChangeText={(value) => {
          handleError(value, 'price')
        }}
      />
      <Input
        placeholder='Enter Fuel Tank Size'
        keyboardType='numeric'
        value={state.size}
        onChangeText={(value) => {
          handleError(value, 'size')
        }}
      />
      <Input
        placeholder='Enter Route Distance'
        keyboardType='numeric'
        value={state.route}
        onChangeText={(value) => {
          handleError(value, 'route')
        }}
      />
      
        <TouchableOpacity 
          style={styles.buttons}
          onPress={() => {
            var dist = computeFuelConsumption(state.mpg, state.route, data.label)
            var fill = computeCostToFill(state.price, state.size, data.label)
            updateStateObject({
              distance: dist, full: fill,
            })
            updateStateObject({calcResults: `Estimated Route Fuel Burn: ${dist}\nPrice to fill up a tank of fuel: ${fill}`});
            Keyboard.dismiss()
          }}
          >
          <Text style={styles.btnText}>Calculate</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buttons}
          onPress={() => {
          Keyboard.dismiss()
          updateStateObject({mpg: '', price: '', size: '', route: '', distance: '', full: '', calcResults: ''})}}
          >
          <Text style={styles.btnText}>Clear</Text>
        </TouchableOpacity>

      <View style={styles.CalcResults}>
        <Text style={styles.resultsText}>{state.calcResults}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  buttons: {
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
  btnText: {
    color:'#fff',
    fontSize: 20,
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10,
  }, 
  CalcResults: {
    margin: 20,
    alignItems: 'center',
  }, 
  resultsText: {
    padding: 10,
    fontSize: 20,

  }
});

export default CalcScreen;