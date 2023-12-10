import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AntDesign, MaterialCommunityIcons, FontAwesome, Entypo } from "@expo/vector-icons";
import User from "./User";

const Videolist = () => {
  const videoSource = require("../../assets/Video/V1.mp4");
  const videoRef = useRef(null);
  const [click1, setClick1] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [currentLoop, setCurrentLoop] = useState(0);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      if (isPlaying && videoRef.current) {
        videoRef.current.playAsync();
      }

      return () => {
        if (videoRef.current) {
          videoRef.current.pauseAsync();
        }
      };
    }, [isPlaying])
  );

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pauseAsync();
      } else {
        videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNextLoop = () => {
    if (currentLoop < 5) {
      videoRef.current.replayAsync();
      setCurrentLoop(currentLoop + 1);
    }
  };

  const toggleLike = () => {
    setClick1(!click1);
    setLikeCount((prevCount) => (click1 ? prevCount - 1 : prevCount + 1));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleVideoPlayback}>
        <Video
          ref={videoRef}
          source={videoSource}
          style={styles.video}
          shouldPlay={true}
          isLooping={true}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              playNextLoop();
            }
          }}
        />
      </TouchableOpacity>

      <View style={styles.topContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.topIcon}
        >
          <FontAwesome name="user" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.text}>Reels</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Record")}>
          <Entypo name="camera" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.like}>
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <TouchableOpacity style={styles.icon} onPress={toggleLike}>
            {click1 ? (
              <AntDesign name="heart" size={30} color="red" />
            ) : (
              <AntDesign name="hearto" size={30} color="white" />
            )}
          </TouchableOpacity>
          <View style={styles.likeCountText}>
            <Text style={styles.text}>{likeCount}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.navigate("Comments")}
        >
          <FontAwesome name="comments-o" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <MaterialCommunityIcons
            name="share-outline"
            size={35}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <User />
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  like: {
    zIndex: 999,
    position: "absolute",
    top: Dimensions.get("window").height * 0.5,
    alignSelf: "flex-end",
    padding: 10,
  },
  icon: {
    marginHorizontal: 10,
    elevation: 10,
    marginTop: 5,
  },
  likeCountText: {
    fontSize: 20,
    color: "white",
  },
  text: {
    color: "white",
  },
  container: {},
  topContainer: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    position: "absolute",
    paddingVertical: 10,
    alignItems: "center",
  },
  topIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
});

export default Videolist;
