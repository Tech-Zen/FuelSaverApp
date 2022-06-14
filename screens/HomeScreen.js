import { Button, Input, Image, ListItem } from "react-native-elements";
import { Keyboard, StyleSheet, Text, ActivityIndicator, ScrollView, StatusBar, Modal, Pressable, View, Alert} from "react-native";
import React, { useState, useEffect, Component } from "react";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";


import { storeHistoryItem, setupHistoryListener, initHistoryDB } from "../helpers/firebase-fs.js"
import getNews from "../helpers/news.js";

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
            <Text style={styles.boxText}>Fuel Trends</Text>
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
  newsContainer: {

  },
  //Modal Views for Fuel Tips, Trends, etc
  centeredView: {
    marginTop: 20,
    marginBottom: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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