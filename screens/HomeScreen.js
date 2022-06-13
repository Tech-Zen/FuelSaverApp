import { Button, Input } from "react-native-elements";
import { Keyboard, StyleSheet, Text, ActivityIndicator, ScrollView, StatusBar, Modal, Pressable} from "react-native";
import React, { useState, useEffect, Component } from "react";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Alert } from "react-native";
import { Container, Content, List } from 'native-base';
import { storeHistoryItem, setupHistoryListener, initHistoryDB } from "../helpers/firebase-fs.js"


const HomeScreen = ({ route, navigation }) => {

const [modalTipsVisible, setTipsModalVisible] = useState(false);
const [modalTrendsVisible, setTrendsModalVisible] = useState(false);
const [modalGuideVisible, setGuideModalVisible] = useState(false);

  return (
    <View>
      <View style={styles.topContainer}>
          <TouchableOpacity 
            style={styles.box}
            onPress={() => {setTipsModalVisible(true)}}
            >
            <Text style={styles.boxText}>Fuel Tips</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.box}
            onPress={() => {setTrendsModalVisible(true)}}
            >
            <Text style={styles.boxText}>Fuel Trends</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.box}
            onPress={() => {setGuideModalVisible(true)}}
            >
            <Text style={styles.boxText}>App Guide</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalTipsVisible}
          onRequestClose={() => {
            setTipsModalVisible(!modalTipsVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTextTitle}>Fuel Tips:</Text>
                <Text>These are fuel tips!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setTipsModalVisible(!modalTipsVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalTrendsVisible}
          onRequestClose={() => {
            setTrendsModalVisible(!modalTrendsVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTextTitle}>Fuel Trends:</Text>
                <View style={styles.modalContentBox}>
                  <Text> Lorem Ipsum</Text>
                </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setTrendsModalVisible(!modalTrendsVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalGuideVisible}
          onRequestClose={() => {
            setGuideModalVisible(!modalGuideVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTextTitle}>App Guide:</Text>
              <View style={styles.modalContentBox}>
                  <Text> Lorem Ipsum</Text>
                </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setGuideModalVisible(!modalGuideVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    
      <View style={styles.newsContainer}>
        <Text>Fuel News</Text>

      </View>

    </View>
  )

}

const styles = StyleSheet.create({
  topContainer: {
    height: 250,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItemes: 'center',
  },
  box: { 
    flex: .33,
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor:'#52B788',
    borderColor: '#fff'
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    paddingTop: 25,
  },
  newsContainer: {

  },
  //Modal Views for Fuel Tips, Trends, etc
  centeredView: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    marginTop: 30
  },
  modalView: {
    flex: 1,
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#52B788",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalTextTitle: {
    textAlign: "center",
    fontSize: 20,
  },
  modalContentBox: {
  }
});

export default HomeScreen;