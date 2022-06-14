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
  const [state, setState] = useState({ mpg: '', price: '', size: '', route: '', calcResults: ''});
  const [stateErrors, setStateErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const updateStateObject = (vals) => {
    setState({
      ...state,
      ...vals,
    });
  };

  //Validation Input Handling
  let numOfErrors = 0;

  const validate = (values) => {
    const errors = {};
    if(isNaN(values.mpg)) {
        errors.mpg = "Must be a number!"
        numOfErrors++;
    }

    if(isNaN(values.price)) {
        errors.price = "Must be a number!"
        numOfErrors++;
    }

    if(isNaN(values.size)) {
        errors.size = "Must be a number!"
        numOfErrors++;
    }

    if(isNaN(values.route)) {
        errors.route = "Must be a number!"
        numOfErrors++;
    }

    if (!values.mpg) {
        errors.mpg = "MPG is Required!";
        numOfErrors++;
    }
    if (!values.price) {
        errors.price = "Fuel Price is Required!";
        numOfErrors++;
    }
    if (!values.size) {
        errors.size = "Fuel Tank Size is Required!";
        numOfErrors++;
    }
    if (!values.route) {
        errors.route = "Route Distance is Required!";
        numOfErrors++;
    }
    return errors; 
  }

  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    }


  //function calcFuelConsumption(mpg, route)
  function calcTankCost(tank, price) { 
    const tankCost = tank * price;
    return `$${round(tankCost, 2)}`
  }

  function calcFuelBurn(tank, route, mpg) {
    const maxDist = tank * mpg;
    const fuelBurned = route / maxDist;
    const total = fuelBurned * tank;
    if (total >= tank) {
      return `${round(total, 2)} gals. You'll need to fill up again!`
    }
    return `${round(total, 2)} gals`
  }

  
  const handleSubmit = () => { 
    //validate state of inputs
    setStateErrors(validate(state));

    var fuelBurn = calcFuelBurn(state.size, state.route, state.mpg)
    var costToFill = calcTankCost(state.size, state.price)

    //check if no errors / if so calculate and display results
    if (numOfErrors === 0) {
    updateStateObject({calcResults: `Price to fill up a whole tank of fuel: ${costToFill}\nEstimated Fuel Burn on Route: ${fuelBurn}`});
    }
    Keyboard.dismiss()
  }

  return (
    <View>
      <Input
        placeholder='Enter Vehicles Combined MPG'
        keyboardType='numeric'
        value={state.mpg}
        onChangeText={(val) => updateStateObject({mpg: val})}
        errorMessage = {stateErrors.mpg}
        errorStyle={{ color: 'red' }}
      />
      <Input
        placeholder='Enter Fuel Price'
        keyboardType='numeric'
        value={state.price}
        onChangeText={(val) => updateStateObject({price: val})}
        errorMessage = {stateErrors.price}
        errorStyle={{ color: 'red' }}
      />
      <Input
        placeholder='Enter Fuel Tank Size'
        keyboardType='numeric'
        value={state.size}
        onChangeText={(val) => updateStateObject({size: val})}
        errorMessage = {stateErrors.size}
        errorStyle={{ color: 'red' }}
      />
      <Input
        placeholder='Enter Route Distance'
        keyboardType='numeric'
        value={state.route}
        onChangeText={(val) => updateStateObject({route: val})}
        errorMessage = {stateErrors.route}
        errorStyle={{ color: 'red' }}
      />
      
        <TouchableOpacity 
          style={styles.buttons}
          onPress={() => {
            handleSubmit()
          }}
          >
          <Text style={styles.btnText}>Calculate</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buttons}
          onPress={() => {
          Keyboard.dismiss()
          //Reset and clear input fields, calculated results, and errors
          updateStateObject({mpg: '', price: '', size: '', route: '', distance: '', full: '', calcResults: ''})
          setStateErrors('');
          }}
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