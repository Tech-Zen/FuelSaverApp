import {  Input } from "react-native-elements";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { storeHistoryItem, setupHistoryListener, initHistoryDB } from "../helpers/firebase-fs.js"

const CalcScreen = ({ route, navigation }) => {
  //Size = TankSize
  const [state, setState] = useState({ mpg: '', price: '', size: '', route: '', calcResults: '', routeTitle: ''});
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
    
    if (!values.routeTitle) {
      errors.routeTitle = "Route Title is Required!";
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

  function calcTankCost(tank, price) { 
    const tankCost = tank * price;
    return `$${round(tankCost, 2)}`
  }

  function calcTripCost(tank, route, mpg, price) {
    const maxDist = tank * mpg;
    const fuelBurned = route / maxDist;
    const cost = fuelBurned * price;
    console.log(`maxDist: ${maxDist}`)
    console.log(`fuelBurned: ${fuelBurned}`)
    console.log(`cost: ${cost}`)
    return `$${cost}`
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
    var tripCost = calcTripCost(state.size, state.route, state.mpg, state.price)

    //check if no errors / if so calculate and display results
    if (numOfErrors === 0) {
    updateStateObject({calcResults: 
    `
    Price to fill tank: ${costToFill}\n
    Estimated Fuel Burn: ${fuelBurn}\n
    Trip Cost: ${tripCost}
    `
    });
    }
    Keyboard.dismiss()
  }

  return (
    <View>
      <Text style={{fontSize: 10, color: 'gray', paddingLeft: 10, paddingTop: 20,}}>Route Title</Text>
       <Input
        placeholder='Enter Your Route Title'
        //keyboardType=
        value={state.routeTitle}
        onChangeText={(val) => updateStateObject({routeTitle: val})}
        errorMessage = {stateErrors.routeTitle}
        errorStyle={{ color: 'red' }}
      />
      <Text style={{fontSize: 10, color: 'gray', paddingLeft: 10, paddingTop: 5,}}>Vehicles Combined MPG</Text>
      <Input
        placeholder='Enter Vehicles Combined MPG'
        keyboardType='numeric'
        value={state.mpg}
        onChangeText={(val) => updateStateObject({mpg: val})}
        errorMessage = {stateErrors.mpg}
        errorStyle={{ color: 'red' }}
      />
      <Text style={{fontSize: 10, color: 'gray', paddingLeft: 10, paddingTop: 5,}}>Fuel Price</Text>
      <Input
        placeholder='Enter Fuel Price'
        keyboardType='numeric'
        value={state.price}
        onChangeText={(val) => updateStateObject({price: val})}
        errorMessage = {stateErrors.price}
        errorStyle={{ color: 'red' }}
      />
      <Text style={{fontSize: 10, color: 'gray', paddingLeft: 10, paddingTop: 5,}}>Fuel Tank Size</Text>
      <Input
        placeholder='Enter Fuel Tank Size'
        keyboardType='numeric'
        value={state.size}
        onChangeText={(val) => updateStateObject({size: val})}
        errorMessage = {stateErrors.size}
        errorStyle={{ color: 'red' }}
      />
      <Text style={{fontSize: 10, color: 'gray', paddingLeft: 10, paddingTop: 5,}}>Route Distance</Text>
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
          updateStateObject({mpg: '', price: '', size: '', route: '', distance: '', full: '', calcResults: '', routeTitle: ''})
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
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default CalcScreen;