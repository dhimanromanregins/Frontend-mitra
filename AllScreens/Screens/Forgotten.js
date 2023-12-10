import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";

const Forgotten = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://sspmitra.in/request-password-reset/`,
        { email: email + "" }
      );
      console.log("Send OTP Response:", response.data);
      if (response.status === '404 Not Found') {
        alert(response.data.message);
      } else {
        ToastAndroid.show("OTP Sent Successfully", ToastAndroid.SHORT);
      }

      // Handle success or navigate to the next step
    } catch (error) {
      // console.error("Error sending OTP:", error);
      ToastAndroid.show("Email doesnot exist", ToastAndroid.SHORT);

      // Handle error, show an error message, etc.
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    console.log(otp);
    setLoading(true);
    try {
      // Show loading state if needed
      const response = await axios.post("https://sspmitra.in/verify-otp/", {
        otp: otp + "",
      });
      console.log("Verify OTP Response:", response.data);

      // Check if the request was successful based on your API response structure
      if (response.data) {
        // console.log("OTP verification successful!");
        ToastAndroid.show("OTP Verified Successfully", ToastAndroid.SHORT);
        navigation.navigate("Reset", { otp });
      } else {
        // console.log("OTP verification unsuccessful:", response.message);
      ToastAndroid.show("Connection Timeout", ToastAndroid.SHORT);

        // Handle unsuccessful verification, show an error message, etc.
      }
    } catch (error) {
      // console.error("Error verifying OTP:", error.response);
      ToastAndroid.show("Invalid Otp", ToastAndroid.SHORT);

      // Handle error, show an error message, etc.
    } finally {
      // Hide loading state if needed
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <StatusBar />
      <ImageBackground
        source={require("../../assets/3.png")}
        style={styles.backgroundImage}
      >
        <TouchableOpacity
          style={{ alignItems: "flex-end", top: 50, marginRight: 20 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Entypo name="cross" size={40} color="white" />
        </TouchableOpacity>

        <View style={{ marginHorizontal: 20 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Forgotten</Text>
            <Text style={styles.title}>Password!</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter Your Email"
              style={styles.input}
              value={email}
              placeholderTextColor={"gray"}
              onChangeText={setEmail}
            />

            <TouchableOpacity onPress={handleSendOTP}>
              <LinearGradient
                colors={["#FF9966", "#FF3300"]}
                style={styles.button}
              >
                <Text>Send OTP</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholderTextColor="gray"
              value={otp}
              onChangeText={setOtp}
              placeholder="OTP"
              keyboardType="number-pad"
            />

            <TouchableOpacity onPress={handleVerifyOTP}>
              <LinearGradient
                colors={["#FF9966", "#FF3300"]}
                style={styles.button}
              >
                <Text>Verify OTP</Text>
              </LinearGradient>
            </TouchableOpacity>
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

export default Forgotten;

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
  inputContainer: {
    height: Dimensions.get("window").height * 0.3,
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
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
});
