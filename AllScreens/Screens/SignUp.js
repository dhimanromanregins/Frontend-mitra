import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({ navigation }) => {
  const [phone_number, setPhonenumber] = useState("");
  const [referral_code, setReferal] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const [isNameValid, setisNameValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  // Regular expressions for validation
  // const usernameRegex = /^[a-zA-Z0-9_]{5,}$/; // At least 5 characters, only alphanumeric and underscore allowed
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; // At least 8 characters, one lowercase, one uppercase, and one number
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format validation
  const phoneNumberRegex = /^[0-9]{10,}$/; // Phone number should contain at least 10 digits

  const handleSubmit = async () => {
    const isNameValid = name.trim() !== "";
    const isPhoneNumberValid = phoneNumberRegex.test(phone_number);
    const isPasswordValid = passwordRegex.test(password);
    const isConfirmPasswordValid = password === confirm_password;
    const isEmailValid = emailRegex.test(email);

    setisNameValid(isNameValid);
    setIsPhoneNumberValid(isPhoneNumberValid);
    setIsPasswordValid(isPasswordValid);
    setIsConfirmPasswordValid(isConfirmPasswordValid);
    setIsEmailValid(isEmailValid);

    try {
      const userData = {
        phone_number: phone_number,
        name: name,
        password: password,
        email: email,
        referral_code: referral_code,
      };
      if (
        isNameValid &&
        isPhoneNumberValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isEmailValid
      ) {
        const data = await axios.post(
          `https://sspmitra.in/register/`,
          userData
          // { headers: { "x-api-key": "8558ad45c15abe834c38b3e028b1b62a" } }
        );
        // Handle response or navigation
        console.log(data.status);
        if (data.status == 201) {
          ToastAndroid.show("Register Succesful", ToastAndroid.SHORT);

          navigation.navigate("Login");
        } else {
          navigation.navigate("SignUp");
        }
      } else {
        ToastAndroid.show("Enter Complete Details", ToastAndroid.SHORT);
      }
    } catch (error) {
      // console.error(error);
      Alert.alert("Error", "Registration failed. Please try again.");
    }
  };

  return (
    <View style={{ backgroundColor: "black" }}>
      <ImageBackground
        source={require("../../assets/2.png")}
        style={{ height: Dimensions.get("screen").height }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Entypo
              name="cross"
              size={40}
              color="white"
              style={{ alignSelf: "flex-end",  }}
            />
          </TouchableOpacity>
          <View style={{alignItems:"flex-end",height:Dimensions.get("window").height*0.2, justifyContent:"flex-end"}}>
            <Text style={styles.text}>Create New</Text>
            <Text style={styles.text}>Account</Text>
          </View>
       
            <View
              style={{
                padding: 20,
                alignItems: "center",
                borderRadius: 15,
                marginTop:50
              }}
            >
              <TextInput
                placeholder="Enter Name"
                style={styles.ip2}
                placeholderTextColor="gray"
                value={name}
                onChangeText={(text) => setName(text)}
              />
              {!isNameValid && (
                <Text style={{ color: "white", marginLeft: 10 }}>Required</Text>
              )}

              <TextInput
                placeholder="Enter Your Phone Number"
                style={{
                  ...styles.ip2,
                }}
                placeholderTextColor="gray"
                value={phone_number}
                onChangeText={(text) => setPhonenumber(text)}
              />
              {!isPhoneNumberValid && (
                <Text style={{ color: "white", marginLeft: 10 }}>
                  Invalid phone number
                </Text>
              )}

              <TextInput
                placeholder="Enter Your Email"
                style={styles.ip2}
                value={email}
                placeholderTextColor={"gray"}
                onChangeText={(text) => setEmail(text)}
              />
              {!isEmailValid && (
                <Text style={{ color: "white", marginLeft: 10 }}>
                  Invalid email
                </Text>
              )}

              <TextInput
                placeholder="Password"
                style={{
                  ...styles.ip2,
                }}
                secureTextEntry={true}
                value={password}
                placeholderTextColor="gray"
                onChangeText={(text) => setPassword(text)}
              />
              {!isPasswordValid && (
                <Text style={{ color: "white", marginHorizontal: 20 }}>
                  Password must have 8 elements with contain a Upper case(A-Z),
                  a lower case (a-z), a number, and a special character
                </Text>
              )}
              <TextInput
                placeholder="Confirm Password"
                style={{
                  ...styles.ip2,
                }}
                placeholderTextColor="gray"
                secureTextEntry={true}
                value={confirm_password}
                onChangeText={(text) => setConfirmPassword(text)}
              />
              {!isConfirmPasswordValid && (
                <Text style={{ color: "white", marginLeft: 10 }}>
                  Passwords do not match
                </Text>
              )}

              <TextInput
                style={styles.ip2}
                placeholder="Referral Code (Optional)"
                placeholderTextColor="gray"
                value={referral_code}
                onChangeText={(text) => setReferal(text)}
              />

              <View style={styles.container2}>
                <LinearGradient
                  colors={["#FF9966", "#FF3300"]}
                  style={styles.in}
                >
                  <TouchableOpacity style={styles.up1} onPress={handleSubmit}>
                    <Text style={styles.t2}>Sign Up</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
              <View style={{...styles.container2, marginBottom:100}}>
                <Text style={styles.t1}>Don't have an account?</Text>
                <LinearGradient
                  colors={["#ff6600", "#ff6600"]}
                  style={{ borderRadius: 10, marginLeft: 20 }}
                >
                  <TouchableOpacity
                    style={styles.up}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.t1}>Sign In</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
         </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 20,
    marginBottom:20
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    
  },
  text: {
    fontSize: 32,
    color: "white",

    fontWeight: "bold",
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    width: Dimensions.get("window").width * 0.8,
    borderColor: "#ccc",
    backgroundColor: "white",
  },
  ip1: {
    marginTop: 15,
    padding: 6,
    borderRadius: 30,
    width: Dimensions.get("window").width * 0.35,
    fontSize: 17,
  },
  ip2: {
    marginTop: 15,
    padding: 6,
    width: Dimensions.get("window").width * 0.8,
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: "white",
    color: "white",
  },
  t2: {
    color: "white",
    fontWeight: "800",
    fontSize: 16,
  },
  up1: {
    padding: 15,
  },
  in: {
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.5,
    alignItems: "center",
    marginTop: 20,
  },
  up: {
    padding: 5,
  },
  t1: {
    color: "white",
    fontWeight: "700",
  },
});

export default Signup;
