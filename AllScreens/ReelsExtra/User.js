import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const User = ({ video_id }) => {
  const navigation = useNavigation();
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [user_id, setUserId] = useState("");

  const userDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://sspmitra.in/api/get-video-info/?video_id=${video_id}`
      );
      console.log(data);
      setName(data.user_name);
      console.log(data.user_name, ">>>>>>>>>>>>>>>>>>>>")
      setDescription(data.description);
      setUserId(data.user_id);
      setPhoto(data.user_profile_photo)
      // console.log("ads",data.user_id)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userDetails();
  }, []);

  useEffect(() => {
    getUid();
  }, [uid]);

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
console.log(name, '.............')
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <TouchableOpacity style={styles.box1}
          onPress={() => {
            if (user_id === uid) {
              // Navigate to a different screen if user_id matches uid
              navigation.navigate("Profile");
            } else {
              navigation.navigate("ProfilePage", { user_id });
            }
          }}
        >
          <View style={styles.avt}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.avatar} />
          ) : (
            <Image style={styles.avatar} source={require("../../assets/man.png")} />
          )}
          </View>
          <Text style={styles.t1}>{name}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box2}>
        <Text style={styles.t2}>{description}</Text>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 40,
    marginRight: 10,
  },
  container: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.8,
  },
  box1: {
    flexDirection: "row",
    alignItems: "center",
  },
  box2: {
    marginTop: 10,
  },
  t1: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  t2: {
    color: "white",
    fontSize: 15,
  },
  follow: {
    marginLeft: 20,
    backgroundColor: "white",
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
});
