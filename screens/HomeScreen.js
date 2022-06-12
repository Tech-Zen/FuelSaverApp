import { Button, Input } from "react-native-elements";
import { Keyboard, StyleSheet, Text, ActivityIndicator } from "react-native";
import React, { useState, useEffect, Component } from "react";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Alert } from "react-native";
import { Container, Content, List } from 'native-base';
import { storeHistoryItem, setupHistoryListener, initHistoryDB } from "../helpers/firebase-fs.js"


const HomeScreen = ({ route, navigation }) => {

  return (
    <View>
      <NewsFeed />
      <Text>Hello World</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
  },
});

export default HomeScreen;