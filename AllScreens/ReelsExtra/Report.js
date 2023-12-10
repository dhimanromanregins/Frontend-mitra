import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Report = ({ navigation, route }) => {
  const { key, video_id } = route.params;
  const [reason, setReason] = useState("");
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(false);

  const getUid = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      if (value !== null) {
        setUid(JSON.parse(value));
        // console.log("id", uid);
      }
    } catch (e) {
      console.error("Error retrieving UID", e);
    }
  };

  useEffect(() => {
    getUid();
  }, [uid]);

  const reportVideo = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`https://sspmitra.in/api/report/`, {
        reason: reason,
        user: uid,
        video: video_id,
      });
      console.log("Repord Submitted:", response.data);
      navigation.navigate("Bottom");
      ToastAndroid.show("Repord Submitted:", ToastAndroid.SHORT);

      // Handle success or navigate to the next step
    } catch (error) {
      // console.error("Error Sending Response:", error);
      ToastAndroid.show("Report doesnot submitted", ToastAndroid.SHORT);

      // Handle error, show an error message, etc.
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
    <View style={styles.out}>
        <TouchableOpacity onPress={() => navigation.navigate("Bottom")}>
          <AntDesign name="left" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Submit Report</Text>
        </View>
        <FontAwesome name="exclamation-triangle" size={50} color="black" style={{alignSelf:"center", opacity:0.5}}/>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={4}
            placeholder="Write Your Report"
            placeholderTextColor="gray"
            value={reason}
            onChangeText={(text) => setReason(text)}
          />
        </View>
        <View style={styles.container2}>
          <LinearGradient colors={["#FF9966", "#FF3300"]} style={styles.in}>
            <TouchableOpacity style={styles.up1} onPress={reportVideo}>
              <Text style={styles.t2}>Report</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

      {/* Loader */}
      {loading && (
        <ActivityIndicator style={styles.loader} size="large" color="#FFFFFF" />
      )}
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  backgroundImage: {
    height: Dimensions.get("window").height,
  },
  container: {
    // width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").height * 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  inputContainer: {
    height: Dimensions.get("window").height * 0.2,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  input: {
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").height * 0.15,
    backgroundColor: "white",
    elevation: 10,
    textAlignVertical:"top"
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",
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

  loader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  out: {
    position: "absolute",
    padding: 15,
  },
});
