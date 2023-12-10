import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";

const Buttons = () => {
  const [isMicrophoneActive, setMicrophoneActive] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const navigation = useNavigation();

  const toggleMicrophone = () => {
    setMicrophoneActive(!isMicrophoneActive);
  };
  const toggleVideo = () => {
    setIsVideoActive(!isVideoActive);
  };
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <TouchableOpacity style={styles.icon} onPress={toggleMicrophone}>
        <FontAwesome
          name={isMicrophoneActive ? "microphone-slash" : "microphone"}
          size={30}
          color="black"
          style={styles.icons}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ ...styles.icon, backgroundColor: "red" }}
        onPress={() => navigation.navigate("Bottom", { screen: "Zoom" })}
      >
        <MaterialCommunityIcons
          name="phone-hangup"
          size={30}
          color="white"
          style={styles.icons}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.icon} onPress={toggleVideo}>
        <MaterialIcons
          name={isVideoActive ? "videocam-off" : "videocam"}
          size={30}
          color="black"
          style={styles.icons}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "gray",
    borderRadius: 50,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    padding: 10,
  },
});
