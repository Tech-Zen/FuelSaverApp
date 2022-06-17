import { Input } from "react-native-elements";
import { Keyboard, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
//firebase imports
import {
  storeFuelAppItem,
} from "../helpers/firebase-fs";
import moment from 'moment';

//Import Analytics
import * as Analytics from 'expo-firebase-analytics';
import { currentUserID } from "../private/genUUID.js";

const CalcScreen = ({ route }) => {
  //Size = TankSize
  const [state, setState] = useState({ mpg: '', price: '', size: '', route: '', calcResults: '', routeTitle: '', routeDets: '' });
  const [stateErrors, setStateErrors] = useState({});

  const updateStateObject = (vals) => {
    setState({
      ...state,
      ...vals,
    });
  };

  //HistoryScreen useEffects and routing
  useEffect(() => {
    //console.log('inside second use effect')
    //console.log(JSON.stringify(route.params.item));
    if (route.params?.item) {
      //console.log('we are here as well');
      //console.log(JSON.stringify(route.params.item));
      setState(route.params.item);
    }
  }, [route.params?.item]);

  //CurrentDate for the History Screen
  var currentDate = moment().format('LLLL');


  //Validation Input Handling
  const numOfErrors = 0;

  const validate = (values) => {
    const errors = {};
    if (isNaN(values.mpg)) {
      errors.mpg = "Must be a number!"
      numOfErrors++;
    }

    if (isNaN(values.price)) {
      errors.price = "Must be a number!"
      numOfErrors++;
    }

    if (isNaN(values.size)) {
      errors.size = "Must be a number!"
      numOfErrors++;
    }

    if (isNaN(values.route)) {
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
    const total = fuelBurned * tank;
    const cost = total * price;
    return `$${round(cost, 2)}`
  }

  function calcRange(tank, mpg) {
    const maxRange = tank * mpg;
    return `${round(maxRange, 0)} miles`
  }

  function calcFuelBurn(tank, route, mpg) {
    const maxDist = tank * mpg;
    const fuelBurned = route / maxDist;
    const total = fuelBurned * tank;
    if (total >= tank) {
      return `${round(total, 2)} gal, need more gas!`
    }
    return `${round(total, 2)} gals`
  }

  const handleSubmit = () => {
    //validate state of inputs
    setStateErrors(validate(state));
    Analytics.logEvent('Calculated Fuel', {
      user: currentUserID,
      screen: 'Calc Screen',
      purpose: 'User calculated their route',
  })
    var fuelBurn = calcFuelBurn(state.size, state.route, state.mpg)
    var costToFill = calcTankCost(state.size, state.price)
    var tripCost = calcTripCost(state.size, state.route, state.mpg, state.price)
    var tripRange = calcRange(state.size, state.mpg)
    //check if no errors / if so calculate and display results
    if (numOfErrors === 0) {
      updateStateObject({
        calcResults:
          `
    Price to fill tank: ${costToFill}\n
    Estimated Fuel Burn: ${fuelBurn}\n
    Trip Cost: ${tripCost}\n
    Estimated Range: ${tripRange}
    `,
        routeDets: `${state.routeTitle} Route Details:`
      });
    }
    Keyboard.dismiss()
  }

  return (
    <View>
      <View style={{}}>
      <Text style={{ fontSize: 10, color: '#081C15', paddingLeft: 10, paddingTop: 5, }}>Route Title</Text>
      <Input
        placeholder='Enter Your Route Title'
        value={state.routeTitle}
        onChangeText={(val) => updateStateObject({ routeTitle: val })}
        errorMessage={stateErrors.routeTitle}
        errorStyle={{ color: 'red' }}
      />
      <Text style={{ fontSize: 10, color: '#081C15', paddingLeft: 10, }}>Vehicles Combined MPG</Text>
      <Input
        placeholder='Enter Vehicles Combined MPG'
        keyboardType='numeric'
        value={state.mpg}
        onChangeText={(val) => updateStateObject({ mpg: val })}
        errorMessage={stateErrors.mpg}
        errorStyle={{ color: 'red' }}
      />
      <Text style={{ fontSize: 10, color: '#081C15', paddingLeft: 10, }}>Fuel Price</Text>
      <Input
        placeholder='Enter Fuel Price (USD)'
        keyboardType='numeric'
        value={state.price}
        onChangeText={(val) => updateStateObject({ price: val })}
        errorMessage={stateErrors.price}
        errorStyle={{ color: 'red' }}
      />
      <Text style={{ fontSize: 10, color: '#081C15', paddingLeft: 10, }}>Fuel Tank Size</Text>
      <Input
        placeholder='Enter Fuel Tank Size (gals)'
        keyboardType='numeric'
        value={state.size}
        onChangeText={(val) => updateStateObject({ size: val })}
        errorMessage={stateErrors.size}
        errorStyle={{ color: 'red' }}
      />
      <Text style={{ fontSize: 10, color: '#081C15', paddingLeft: 10, }}>Route Distance</Text>
      <Input
        placeholder='Enter Route Distance (miles)'
        keyboardType='numeric'
        value={state.route}
        onChangeText={(val) => updateStateObject({ route: val })}
        errorMessage={stateErrors.route}
        errorStyle={{ color: 'red' }}
      />
      </View>

      <TouchableOpacity
        style={styles.buttons}
        onPress={() => {
          handleSubmit()
          storeFuelAppItem({ routeTitle: state.routeTitle, mpg: state.mpg, price: state.price, size: state.size, route: state.route, DT: currentDate })
          Keyboard.dismiss()
        }}
      >
        <Text style={styles.btnText}>Calculate</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttons}
        onPress={() => {
          Keyboard.dismiss()
          //Reset and clear input fields, calculated results, and errors
          updateStateObject({ mpg: '', price: '', size: '', route: '', distance: '', full: '', calcResults: '', routeTitle: '', routeDets: '' })
          setStateErrors('');
          Analytics.logEvent('Cleared Calculator Screen', {
            user: currentUserID,
            screen: 'Calc Screen',
            purpose: 'User cleared their route calculation',
        })
        }}
      >
        <Text style={styles.btnText}>Clear</Text>
      </TouchableOpacity>

      <View style={styles.CalcResultsBox}>
        <Text style={styles.resultsTitle}>{state.routeDets}</Text>
        <Text style={styles.resultsText}>{state.calcResults}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  buttons: {
    marginRight: 50,
    marginLeft: 50,
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#52B788',
    borderRadius: 20,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  CalcResultsBox: {
    margin: 5,
  },
  resultsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D6A4F'
  },
  resultsTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D6A4F',
    alignSelf: 'center',
  }

});

export default CalcScreen;