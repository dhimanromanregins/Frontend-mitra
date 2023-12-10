import React, { useRef, useState, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  Modal,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import {
  useIsFocused,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  FontAwesome,
   MaterialIcons
} from "@expo/vector-icons";
import axios from "axios";
import VideoShareButton from "../ReelsExtra/Share";
import Like from "../ReelsExtra/Like";
import User from "../ReelsExtra/User";

const Reel = () => {
  const videoRef = useRef([]);
  const [playingIndex, setPlayingIndex] = useState(-1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [videoSources, setVideoSources] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [videoLoaded, setVideoLoaded] = useState(false);

 

  const fetchVideoSources = async () => {
    try {
      const response = await axios.get(
        `https://sspmitra.in/api/videolist/`
      );
      // console.log("API Response:", response?.data);
     
      

      if (response.data && Array.isArray(response.data)) {
        setVideoSources(response.data);
        // setVideoId(response.data)
        // console.log(response.data)
     

      } else {
        console.error("Invalid API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching video sources:", error);
    }
  };

  
  const handleVideoLoad = (index) => {
    if (index === playingIndex) {
      setVideoLoaded(true);
    }
  };

  const handleVideoPlaybackEnd = () => {
    if (playingIndex < videoSources.length - 1) {
      setPlayingIndex(playingIndex + 1);
      setIsVideoPlaying(true);
    }
  };
  useEffect(() => {
    fetchVideoSources();
  }, [refreshing]);

  useEffect(() => {
    return () => {
      if (playingIndex !== -1 && videoRef.current[playingIndex]) {
        videoRef.current[playingIndex].pauseAsync();
      }
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (playingIndex !== -1 && videoRef.current[playingIndex]) {
        if (isVideoPlaying) {
          videoRef.current[playingIndex].playAsync();
        }
      }
      return () => {
        if (playingIndex !== -1 && videoRef.current[playingIndex]) {
          videoRef.current[playingIndex].pauseAsync();
        }
      };
    }, [playingIndex, isVideoPlaying])
  );

  const handleScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const videoHeight = Dimensions.get("window").height;
    const indexInView = Math.floor(contentOffsetY / videoHeight);

    setPlayingIndex(indexInView);
  };

  const toggleVideoPlayback = (index) => {
    if (!Array.isArray(videoRef.current)) {
      videoRef.current = [];
    }

    if (index !== playingIndex) {
      if (playingIndex !== -1 && videoRef.current[playingIndex]) {
        videoRef.current[playingIndex].pauseAsync();
      }

      if (videoRef.current[index]) {
        videoRef.current[index].playAsync();
        setPlayingIndex(index);
        setIsVideoPlaying(true);
      }
    } else {
      if (videoRef.current[index]) {
        if (isVideoPlaying) {
          videoRef.current[index].pauseAsync();
        } else {
          videoRef.current[index].playAsync();
        }
        setIsVideoPlaying(!isVideoPlaying);
      }
    }
  };

  const handleVideoPress = (index) => {
    if (playingIndex !== -1 && videoRef.current[playingIndex]) {
      videoRef.current[playingIndex].pauseAsync();
    }

    toggleVideoPlayback(index);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(
        `https://sspmitra.in/api/videolist/`
      );

      if (response.data && Array.isArray(response.data)) {
        // console.log("API Response:", response.data);

        // setVideoSources(response.data);
      } else {
        console.error("Invalid API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching video sources:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    // <ScrollView
    //   pagingEnabled={true}
    //   style={{ flex: 1, backgroundColor: "black" }}
    //   onScroll={handleScroll}
    //   scrollEventThrottle={200}
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
    // >
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>

      <FlatList
        data={videoSources}
        keyExtractor={(item) => item.id}
        pagingEnabled={true}
        onScroll={handleScroll}
        scrollEventThrottle={3}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item: video, index }) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                handleVideoPress(index);
              }}
            >
              <Video
                ref={(ref) => (videoRef.current[index] = ref)}
                source={{ uri: video.file }}
                style={styles.video}
                shouldPlay={isVideoPlaying && index === playingIndex}
                isLooping={true}
                resizeMode={ResizeMode.CONTAIN}
                onPlaybackStatusUpdate={({ isLoaded, isPlaying }) => {
                  if (isLoaded && isPlaying) {
                    handleVideoLoad(index);
                  }
                }}
                onEnd={handleVideoPlaybackEnd}
              />
              {!videoLoaded && playingIndex === index && (
                <ActivityIndicator size="large" color="white" style={styles.loader} />
              )}
            </TouchableOpacity>

                <View style={styles.topContainer}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Profile")}
                    style={styles.topIcon}
                  >
                    <FontAwesome name="user" size={22} color="white" />
                  </TouchableOpacity>
                  <Text style={styles.text}>Reels</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Record")}
                  >
                    <Entypo name="camera" size={22} color="white" />
                  </TouchableOpacity>
                </View>

                <View style={styles.like}>
                  <Like key={video.id} video_id={video.id} />
                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() => navigation.navigate("Comments", { key: video.id, video_id: video.id })}
                  >
                    <FontAwesome name="comments-o" size={24} color="white" />
                    <Text style={{color:"white", fontSize:16}}>{video.comment_count}</Text>
                  </TouchableOpacity>
                  <View>
                    <VideoShareButton key={video.id} video_id={video.id} initialShare={video?.share_count} />
                  </View>
                  <TouchableOpacity
                    style={{...styles.icon, marginTop:20}}
                    onPress={ () => navigation.navigate("Report", { key: video.id, video_id: video.id })}
                  >
                  <FontAwesome name="exclamation-triangle"  size={22} color="white" />
                  </TouchableOpacity>
                </View>
                <View style={styles.user}>
                  <User key={video.id} video_id={video.id} />
                </View>
              </View>
           
        )}
      />
          </View>

    </>

    // </ScrollView>
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
    alignItems:'center',

  },
  likeCountText: {
    fontSize: 20,
    color: "white",
  },
  text: {
    color: "white",
  },
  container: {
    // Add styling for the container if needed
    backgroundColor:'black',
  },
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
  // Share Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalOption: {
    fontSize: 18,
    paddingVertical: 15,
  },
  modalCancel: {
    fontSize: 18,
    paddingVertical: 15,
    color: "red",
    textAlign: "center",
  },
  user: {
    position: "absolute",
    marginLeft:10
  },
});

export default Reel;
