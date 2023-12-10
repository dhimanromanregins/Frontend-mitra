import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


const Chatcall = () => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [mobileNumber, setMobileNumber] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      console.log('Component focused');
      const fetchSavedContacts = async()=>{
        let user_id =  await AsyncStorage.getItem('id');
        let mobileNumber =  await AsyncStorage.getItem('mobileNumber');
        setMobileNumber(mobileNumber);
        try{
          let response = await axios.get(`http://139.84.144.65:8001/contacts/?user_id=${user_id}`);
          let responseData = response.data;
          if (responseData.status){
            setContacts(responseData.contact_data.map(contact => ({
              id: contact.id,
              user: contact.name,
              img: require('../../assets/man.png'),
              text: 'Hey there, this is my test.',
              time:  '4 mins ago',
              mobile_number:  contact.mobile_number,
            })));
          }
        }
        catch(error){
          console.log('Error while fetching contacts -', error);
        }
      }
      fetchSavedContacts();
      return () => {
        console.log('Component unfocused');
      };
    }, [])
  );

  return (
    <>
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ExtraChat', { contactName: item.user, mobile_number: item.mobile_number, mNumber: mobileNumber })}>
            <View style={styles.box}>
              <View style={styles.img}>
                <Image source={item.img} style={styles.imgbox} />
              </View>
              <View style={styles.b1}>
                <View style={styles.b2}>
                  <Text style={styles.t1}>{item.user}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.text}>{item.text}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
    </>
  );
};

export default Chatcall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#ffffff",
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#cccccc", // Corrected the borderColor property
  },
  img: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  imgbox: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  b1: {
    flex: 1, // Use flex to allow text to expand and wrap properly
    marginLeft: 10, // Add some left margin for text
  },
  b2: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  t1: {
    fontSize: 16,
    fontWeight: "bold", // Corrected the property name
  },
  time: {
    fontSize: 14,
    color: "#666",
  },
  text: {
    fontSize: 14,
    color: "#333333",
  },
});
