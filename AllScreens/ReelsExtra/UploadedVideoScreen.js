import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Video } from "expo-av";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const UploadedVideoScreen = ({ videoUri, onClose }) => {
  const [message, setMessage] = useState("");
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigation = useNavigation();


  useEffect(() => {
    getUid();
  }, []);

  const getUid = async () => {
    try {
      
      const value = await AsyncStorage.getItem("id");
      if (value !== null) {
        setUid(JSON.parse(value));
      }
    } catch (e) {
      console.error("Error retrieving UID", e);
    }
  };

  const handleSend = async () => {
    try {

      if (buttonDisabled) {
        return; // If the button is already disabled, do nothing
      }

      setButtonDisabled(true);
      setLoading(true);
      const uniqueFileName = `video_${Date.now()}.mp4`; 
      const formData = new FormData();
      formData.append("file", {
        uri: videoUri,
        type: "video/mp4",
        name: uniqueFileName, 
      });
      formData.append("title", "Your Video Title");
      formData.append("description", message);
      formData.append("user_id", uid.toString()); 
      const response = await axios.post(
        "https://sspmitra.in/api/videos/",
        formData,
        {headers: { "Content-Type": "multipart/form-data",},}
      );
      console.log("Upload successful", response.data);
      ToastAndroid.show('Upload successful', ToastAndroid.SHORT);

      navigation.navigate("Bottom"); 
    } catch (error) {
      console.error("Error uploading video", error.response || error);
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUri }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={true}
        isLooping={true}
        style={styles.videoPlayer}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialIcons name="close" size={30} color="white" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          multiline={true}
          numberOfLines={4}
          value={message}
          onChangeText={(text) => setMessage(text)}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={buttonDisabled}>
          <MaterialIcons name="send" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  videoPlayer: { position: "absolute", width: "100%", height: "100%" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 20,
    width: Dimensions.get("window").width,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  sendButton: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    borderBottomWidth: 2,
    height: Dimensions.get("window").height * 0.07,
    width: Dimensions.get("window").width * 0.7,
    borderRadius: 10,
    padding: 5,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default UploadedVideoScreen;
