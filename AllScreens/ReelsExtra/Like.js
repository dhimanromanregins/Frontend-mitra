import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Like = ({ video_id }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [click1, setClick1] = useState(false);
  const [uid, setUid] = useState("");

  useEffect(() => {
    getUid();
    fetchLikeCount(video_id);
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

  const fetchLikeCount = async () => {
    try {
      const response = await axios.get(
        `https://sspmitra.in/likes/like_count?video_id=${video_id}`
      );
      setLikeCount(response.data.like_count);

      // Check if the current user has previously liked the video
      const likedVideos = await AsyncStorage.getItem("likedVideos");
      if (likedVideos) {
        const parsedLikedVideos = JSON.parse(likedVideos);
        setClick1(parsedLikedVideos.includes(video_id));
      }
    } catch (error) {
      console.error("Error fetching like count", error);
    }
  };

  const toggleLike = async () => {
    try {
      const response = await axios.post(
        "https://sspmitra.in/videos/toggle_like/",
        {
          user_id: uid,
          video_id: video_id,
        }
      );

      
          setClick1(!click1);

          let likedVideos = await AsyncStorage.getItem("likedVideos");
          if (!likedVideos) {
            likedVideos = JSON.stringify([video_id]);
          } else {
            likedVideos = JSON.parse(likedVideos);
            if (click1) {
              likedVideos = likedVideos.filter((id) => id !== video_id);
            } else {
              likedVideos.push(video_id);
            }
            likedVideos = JSON.stringify(likedVideos);
          }

          await AsyncStorage.setItem("likedVideos", likedVideos);

          setLikeCount((prevCount) => (click1 ? prevCount - 1 : prevCount + 1));
       
      
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <View style={{ alignItems: "center", marginVertical: 10 }}>
      <TouchableOpacity style={styles.icon} onPress={toggleLike}>
        {click1 ? (
          <AntDesign name="heart" size={24} color="red" />
        ) : (
          <AntDesign name="hearto" size={24} color="white" />
        )}
      </TouchableOpacity>
      <View>
        <Text style={styles.text}>{likeCount}</Text>
      </View>
    </View>
  );
};

export default Like;

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
    elevation: 10,
    marginTop: 5,
  },
  text: {
    fontSize: 16,
    color: "white",
  },
});
