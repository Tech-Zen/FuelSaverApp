import { Button, Input, Header } from "react-native-elements";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { storeHistoryItem, setupHistoryListener, initHistoryDB } from "../helpers/firebase-fs.js"
import { Checkbox } from "native-base";
/*
Imperial or Metric Option

Price to fill up a tank of fuel

Estimated Route Fuel Burn
*/

const CalcScreen = ({ route, navigation }) => {
  const [state, setState] = useState({ mpg: '', price: '', size: '', route: '', distance: '', full: '', imperial: false, metric: false });

  const updateStateObject = (vals) => {
    setState({
      ...state,
      ...vals,
    });
  };


  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }

  function computeFuelConsumption(mpg, route) {
    var ans = route / mpg

    return `${round(ans, 2)}`;

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
      <Text>Welcome to the Calculator</Text>
      <Text></Text>
      <Text>Imperial or Metric</Text>
      {/* <Checkbox
        title="Imperial"
        left
        checked={state.imperial}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        onPress={calImp}
      />
      <Checkbox
        title="Metric"
        left
        checked={state.metric}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        onPress={calMet}
      /> */}

      <Input
        placeholder='Enter Vehicles Combined MPG'
        keyboardType='numeric'
        value={state.mpg}
        onChangeText={(value) => {
          handleError(value, 'mpg')
        }}
      />
      <Input
        placeholder='Enter Gas/Diesel Price'
        keyboardType='numeric'
        value={state.price}
        onChangeText={(value) => {
          handleError(value, 'price')
        }}
      />
      <Input
        placeholder='Enter Tank Size'
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
      <Button
        title='Calculate'
        style={styles.buttons}
        onPress={() => {
          var dist = computeFuelConsumption(state.mpg, state.route)
          var fill = computeCostToFill(state.price, state.size)
          updateStateObject({
            distance: dist, full: fill,
          })
          Keyboard.dismiss()
        }}
      />
      <Button
        title='Clear'
        style={styles.buttons}
        onPress={() => {
          Keyboard.dismiss()
          updateStateObject({
            mpg: '', price: '', size: '', route: ''
          })
        }}
      />
      <View>
        <Text>Estimated Route Fuel Burn: {state.distance}</Text>
        <Text>Price to fill up a tank of fuel: ${state.full}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "blue",
  },
});

export default CalcScreen;