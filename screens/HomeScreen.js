import { Button, Input, Image, ListItem } from "react-native-elements";
import { Keyboard, StyleSheet, Text, FlatList, ScrollView, Linking , Modal, Pressable, View, ImageBackground, TouchableOpacity} from "react-native";
import React, { useState, useEffect, useContext, useId } from "react";
//import { TouchableOpacity } from "react-native-gesture-handler";
import Unorderedlist from 'react-native-unordered-list';
import { getNews } from "../helpers/news.js";

//Import Analytics
import * as Analytics from 'expo-firebase-analytics';
import { currentUserID } from "../private/genUUID.js";
 
const HomeScreen = ({ navigation }) => {
//Use States for Modal Buttons
const [modalTipsVisible, setTipsModalVisible] = useState(false);
const [modalTrendsVisible, setTrendsModalVisible] = useState(false);
const [modalGuideVisible, setGuideModalVisible] = useState(false);

//Use States for News API
const [newsData, setNewsData] = useState([]);

//Load in News API Data - works needs to be rendered into list view
useEffect(() => {
  getNews((data) => {
    //console.log("received News API Data: ", data);
    setNewsData(data.articles);
  });
}, []);

const renderNews = ({item, index}) => {
  return (
    <TouchableOpacity
    onLongPress={ async () => {
      const url = item.url;
      await Linking.canOpenURL(url)
      Linking.openURL(url);
      Analytics.logEvent('View News Article', {
          user: currentUserID,
          screen: 'home',
          purpose: 'Viewing News Article',
          visitedURL: url,
      })
    }}>
      <ListItem key={index}>
        <Image 
          source={{ uri: item.urlToImage }}
          style={{ width: 100, height: 55, borderRadius: 5}}
        />
        <ListItem.Content>
          <ListItem.Title style={{fontWeight: 'bold', fontSize: 14}} > {item.title} </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron/>
      </ListItem>
      </TouchableOpacity>
  );
};

  return (
    <View>
      <ImageBackground
      source={require('../assets/gasPumpBackground.png')}
      style={{}}>

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
            onPress={() => {
              setGuideModalVisible(true)}}
            >
            <Text style={styles.boxText}>Fuel Myths</Text>
          </TouchableOpacity>
      </View>
      </ImageBackground>
          
      <View style={{width: "100%", alignSelf: 'center', backgroundColor: 'white'}}>
        <Text style={{fontWeight:'bold', fontSize: 18, color: '#2D6A4F', alignSelf: 'center', padding: 15}}>Fuel News</Text>
      </View>

      {/*Flatlist of News*/}
      <View style={{}}>
        <FlatList 
              data={newsData}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={renderNews}
              nestedScrollEnabled={true} 
          />
      </View>

      {/*Modals Fuel Tips, Fuel Facts, and Fuel Myths*/}
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
              <Text style={styles.modalTextTitle}>Fuel Myths</Text>
              <View style={styles.modalContentBox}>
              <Text style={{fontSize: 10, color: 'gray', textAlign: 'center'}}>Source: moneyminiblog.com/save-money/fuel-saving-tips-and-myths/</Text>
              
                <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 5}}><Text>Idling does not waste gas</Text>
                    <Unorderedlist bulletUnicode={0x2023} color='#40916C'><Text style={{color: 'gray', fontSize: 12}}>Idling consumes about 1/7 gallon of fuel for an hour. If you are going to wait at the parking lot or traffic light for more than 5 minutes, it is better to turn off your engine.</Text></Unorderedlist>
                </Unorderedlist>

                <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 5}}><Text>Smaller cars save more on gas</Text>
                    <Unorderedlist bulletUnicode={0x2023} color='#40916C'><Text style={{color: 'gray', fontSize: 12}}>Newer models have more advanced technologies that are more efficient on fuel. Diesel engines, hybrid drivetrains, direct fuel injection, turbocharging, advanced transmissions, low rolling resistance tires, and aerodynamic designs are very fuel efficient.</Text></Unorderedlist>
                </Unorderedlist>

                <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 5}}><Text>Manual transmissions are more economical on fuel</Text>
                   <Unorderedlist bulletUnicode={0x2023} color='#40916C'><Text style={{color: 'gray', fontSize: 12}}>Automatic transmissions have the cruise control feature which allows your car to adjust depending on your speed. Notice that you don’t have to step on the gas pedal, but the car does not decelerate.</Text></Unorderedlist>
                </Unorderedlist>

                <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 5}}><Text>Using neutral saves on gas</Text>
                    <Unorderedlist bulletUnicode={0x2023} color='#40916C'><Text style={{color: 'gray', fontSize: 12}}>According to an automobile expert, shifting to neutral when approaching a stop will cancel fuel cutoff. It is better to leave the car in gear and let the engine airflow normalize so that fuel cutoff will be enabled.</Text></Unorderedlist>
                </Unorderedlist>

                <Unorderedlist bulletUnicode={0x2023} color='#40916C' style={{ fontSize: 16, marginBottom: 5}}><Text>Fuel additives make your fuel cost efficient</Text>
                    <Unorderedlist bulletUnicode={0x2023} color='#40916C'><Text style={{color: 'gray', fontSize: 12}}>Idling consumes about 1/7 gallon of fuel for an hour. If you are going to wait at the parking lot or traffic light for more than 5 minutes, it is better to turn off your engine.</Text></Unorderedlist>
                </Unorderedlist>
                </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setGuideModalVisible(!modalGuideVisible)}}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 300,
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
  }, 
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;