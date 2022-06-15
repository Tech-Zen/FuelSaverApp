import { Button, Input, Image, ListItem } from "react-native-elements";
import { Keyboard, StyleSheet, Text, ActivityIndicator, ScrollView, StatusBar, Modal, Pressable, View, Alert} from "react-native";
import React, { useState, useEffect, Component } from "react";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import Unorderedlist from 'react-native-unordered-list';


import { storeHistoryItem, setupHistoryListener, initHistoryDB } from "../helpers/firebase-fs.js"
import { getNews } from "../helpers/news.js";

const HomeScreen = ({ route, navigation }) => {

//Use States for Modal Buttons
const [modalTipsVisible, setTipsModalVisible] = useState(false);
const [modalTrendsVisible, setTrendsModalVisible] = useState(false);
const [modalGuideVisible, setGuideModalVisible] = useState(false);

//Use States for News API
const [newsData, setNewsData] = useState([]);

//UseEffect to Load in News API Data // Curently doesn't console log data
useEffect(() => {
  console.log('Inside Use Effect');
  getNews((data) => {
    console.log("received: ", data);
    setNewsData(data.articles);
  });
}, []);


//Must fix
const renderNews = ( { index, data}) => {
  return (
    <TouchableOpacity>
      <ListItem key={index}>
        <Image 
          source={{ uri: data.articles.urlToImage }}
          style={{ width: 100, height: 55 }}
        />
        <ListItem.Content>
          <ListItem.Title> {data.articles.title} </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );
}

  return (
    <View>
      <View style={styles.topContainer}>
          <TouchableOpacity 
            style={styles.box}
            onPress={() => {setTipsModalVisible(true)}}
            >
            <Text style={styles.boxText}>  Fuel Tips  </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.box}
            onPress={() => {setTrendsModalVisible(true)}}
            >
            <Text style={styles.boxText}>Fuel Facts</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.box}
            onPress={() => {setGuideModalVisible(true)}}
            >
            <Text style={styles.boxText}>Fuel Nearby</Text>
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
              <Text style={styles.modalTextTitle}>Fuel Tips</Text>
              <Text style={{fontSize: 10, color: 'gray', textAlign: 'center'}}>Source: gasbuddy.com/data/tips</Text>
                <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 5}}><Text>Avoid High Speeds</Text></Unorderedlist>
                <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 5}}><Text>Do Not Accelerate or Brake Hard</Text></Unorderedlist>
                <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 5}}><Text>Keep Tires Properly Inflated</Text></Unorderedlist>
                <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 5}}><Text>Use A/C Sparingly</Text></Unorderedlist>
                <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 5}}><Text>Keep Windows Closed</Text></Unorderedlist>
                <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 5}}><Text>Service Vehicle Regularly</Text></Unorderedlist>
                <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 5}}><Text>Use Cruise Control</Text></Unorderedlist>
                <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 5}}><Text>Avoid Heavy Loads</Text></Unorderedlist>
                <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 5}}><Text>Avoid Long Idles</Text></Unorderedlist>
                <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 5}}><Text>Purchase a Fuel Efficient Vehicle</Text></Unorderedlist>
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
              <Text style={styles.modalTextTitle}>Fuel Fun Facts</Text>
                <View style={styles.modalContentBox}>
                <Text style={{fontSize: 10, color: 'gray', textAlign: 'center'}}>Source: fuelexpress.net/blog/general-information/15-fun-facts-gasoline/</Text>
                  <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 30}}><Text>Outside of North America, gasoline is commonly referred to as “petrol.”</Text></Unorderedlist>
                  <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 30}}><Text>When it was first introduced, Ford’s Model T car got a gas mileage of around 25 miles per gallon</Text></Unorderedlist>
                  <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 30}}><Text>Roughly 19 gallons of gasoline can be refined from a barrel of oil (which contains around 42 gallons of crude oil).</Text></Unorderedlist>
                  <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 30}}><Text>Drivers in the United States account for around 44% of the world’s gasoline consumption.</Text></Unorderedlist>
                  <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 30}}><Text>Without added ethanol, a gallon of gasoline produces 19.64 pounds of carbon dioxide when burned. Diesel, on the other hand, produces 22.38 pounds.</Text></Unorderedlist>
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
              <Text style={styles.modalTextTitle}>Fuel Nearby</Text>
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
          <FlatList 
            data={newsData}
            keyExtractor={(articles) => articles.source.id}
            extraData={newsData}
            //renderItem={renderNews} 
          />
      </View>

    </View>
  )

}

//Style Sheet for Page
const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  box: { 
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor:'#52B788',
    borderColor: '#fff'
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  //Modal Views for Fuel Tips, Trends, etc
  centeredView: {
    marginTop: "50%",
    marginBottom: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 15,
    // alignItems: "center",
    // justifyContent: 'center',
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
    marginTop: 15,
    backgroundColor: "#52B788",
    padding: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalTextTitle: {
    color: '#1B4332',
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContentBox: {
  }
});

export default HomeScreen;