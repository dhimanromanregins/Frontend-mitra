import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Dimensions, ToastAndroid, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


const Reset = ({ navigation, route }) => {
  const { otp } = route.params;

  const [new_password, setPassword] = useState("");
  const [confirm_new_password, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const handelPassword = async () => {
    setLoading(true);

    if (!passwordRegex.test(new_password)) {
      ToastAndroid.show(
        "Password should contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.",
        ToastAndroid.LONG
      );
      setLoading(false);
      return;
    }
    if (new_password !== confirm_new_password) {
      ToastAndroid.show("Passwords do not match", ToastAndroid.SHORT);
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.post(
        `https://sspmitra.in/update-password/`,
        { otp:otp, new_password:new_password  }
      );
      console.log("Password :", response.data);
      if (response.status === '404 Not Found') {
        alert(response.data.message);
      } else {
        ToastAndroid.show("Password Changed Successfully", ToastAndroid.SHORT);
        navigation.navigate("Login")
      }

    
    } catch (error) {
      console.error("Password api:", error);
      // ToastAndroid.show("Incomplete Password", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require("../../assets/3.png")}
        style={styles.backgroundImage}
      >
        <TouchableOpacity
          style={{ alignItems: "flex-end", top: 50, marginRight: 20 }}
          onPress={() => navigation.navigate("Bottom")}
        >
          <Entypo name="cross" size={40} color="white" />
        </TouchableOpacity>
        <View style={{ marginHorizontal: 20 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Reset</Text>
            <Text style={styles.title}>Password!</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter New Password"
              placeholderTextColor="gray"
              value={new_password}
              onChangeText={(text) => setPassword(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              placeholderTextColor="gray"
              value={confirm_new_password}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>
          
          <View style={styles.container2}>
            <LinearGradient colors={["#FF9966", "#FF3300"]} style={styles.in}>
              <TouchableOpacity style={styles.up1} onPress={handelPassword}>
                <Text style={styles.t2}>Submit</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          
        </View>
          {/* Loader */}
          {loading && (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#FFFFFF"
          />
        )}
      </ImageBackground>
    </ScrollView>
  );
};

export default Reset;

const styles = StyleSheet.create({
  backgroundImage: {
    height: Dimensions.get("window").height,
  },
  container: {
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").height * 0.35,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container2:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    marginTop:20

  },
  container3:{
    marginVertical:10,
    alignItems:"flex-end",
    width: Dimensions.get("window").width * 0.8,


  },
  inputContainer: {
    height: Dimensions.get("window").height * 0.2,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  input: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    width: Dimensions.get("window").width * 0.7,
    borderColor: "white",
    color: "white",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
  t1:{
    color:"white",
    fontWeight:"700"
    
  },
  
  t2:{
    color:"white",
    fontWeight:"800",
    fontSize:16
    
  },
  up1:{
    padding:15,

  },
  in:{
    borderRadius:10, 
    width: Dimensions.get("window").width * 0.5,
    alignItems:"center",
    marginTop:20
  },
  forgot:{
    borderBottomWidth:2,
    borderColor:"white",
  }
});
