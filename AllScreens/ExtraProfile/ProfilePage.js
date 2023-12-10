import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Video } from "expo-av";

const ProfilePage = ({route}) => {
  const { user_id } = route.params;

  const navigation = useNavigation();
  const [uid, setUid] = useState("");
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [posts, setPosts] = useState("");

  const handleButtonClick = async () => {
    try {
      const apiBody = {
        target_user_id: uid, // ID of the user to follow/unfollow
        user_id: user_id
        // Include any other necessary parameters for the API request
      };

      // Send a request to follow/unfollow the user
      await axios.post("https://sspmitra.in/follow/send/", apiBody);
      fetchFollowers();
      fetchFollowing();
      // Toggle the follow state locally
      setIsClicked((prevIsClicked) => !prevIsClicked);

      // Store the follow state in AsyncStorage
      await AsyncStorage.setItem('followState', JSON.stringify(!isClicked));
    } catch (error) {
      console.error("Error toggling follow status:", error);
      // Handle errors: Display an error message or handle the error as needed
    }
  };

  useEffect(() => {
    const fetchFollowState = async () => {
      try {
        const followState = await AsyncStorage.getItem('followState');
        if (followState !== null) {
          // Set the follow state from AsyncStorage
          setIsClicked(JSON.parse(followState));
        }
      } catch (error) {
        console.error("Error retrieving follow state:", error);
        // Handle errors if needed
      }
    };

    fetchFollowState();
  }, [uid]);

  useEffect(() => {
  
    fetchFollowers();
    fetchFollowing();
    fetchProfile();
    fetchVideosCount();
    fetchVideos();
  }, [user_id]);

  useEffect(() => {
    getUid();
  }, [uid])
  

  const getUid = async () => {
    try {
      const value = await AsyncStorage.getItem('id');
      if (value !== null) {
        setUid(JSON.parse(value));
      }
    } catch (e) {
      console.error('Error retrieving UID', e);
    }
  };
  

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `https://sspmitra.in/api/videos?user_id=${user_id}`
      );
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos", error);
    }
  };

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setModalVisible(true);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setModalVisible(false);
  };

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.videoContainer}
      onPress={() => openVideoModal(item)}
    >
      {/* <Text style={styles.videoTitle}>{item.title}</Text> */}
      {/* <Text style={styles.videoDescription}>{item.description}</Text> */}
      {item.thumbnail && (
        <Image style={styles.videoThumbnail} source={{ uri: item.thumbnail }} />
      )}
    </TouchableOpacity>
  );

  const fetchFollowers = async () => {
    try {
      const {data} = await axios.get(
        `https://sspmitra.in/followers/count/?user_id=${user_id}`
      );
      setFollowers(data.followers_count);
      console.log(data.followers_count);
    } catch (error) {
      console.error("Error fetching followers", error);
    }
  };
  const fetchFollowing = async () => {
    try {
   
        const response = await axios.get(
          `https://sspmitra.in/following/count/?user_id=${user_id}`
        );
        setFollowing(response.data.following_count);
        console.log("following", response.data.following_count);

    } catch (error) {
      console.error("Error fetching following", error);
    }
  };
  const fetchVideosCount = async () => {
    try {
    
      const response = await axios.get(
        `https://sspmitra.in/video-count-per-user/?user_id=${user_id}`
      );
      setPosts(response.data.post_count);
      console.log("posts", response.data.post_count);

    } catch (error) {
      console.error("Error fetching videos count", error);
    }
  };

  const fetchProfile = async () => {
    try {

        const response = await axios.get(
          `https://sspmitra.in/profile/update/?user_id=${user_id}`
        );
        setBio(response.data.bio);
        setName(response.data.name);
        setPhoto(response.data.profile_photo);
        console.log("bio", response.data.profile_photo);

    } catch (error) {
      console.error("Error fetching videos count", error);
    }
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.avt}>
      {photo ? (
            <Image source={{ uri: photo }} style={styles.image} />
          ) : (
            <Image style={styles.image} source={require("../../assets/man.png")} />
          )}

      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.bio}>{bio}</Text>
      </View>
      <View style={styles.stats}>
        <View style={styles.num}>
          <Text style={styles.statNumber}>{posts}</Text>
          <Text style={styles.stat}>posts</Text>
        </View>
        <View style={styles.num}>
          <Text style={styles.statNumber}>{followers}</Text>
          <Text style={styles.stat}> followers</Text>
        </View>
        <View style={styles.num}>
          <Text style={styles.statNumber}>{following}</Text>
          <Text style={styles.stat}> following</Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleButtonClick}>
        <View
          style={[
            styles.button,
            { backgroundColor: isClicked ? "#ffff99" : "#ffff00" },
          ]}
        >
          <Text>{isClicked ? "Following" : "Follow"}</Text>
        </View>
      </TouchableOpacity>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVideoItem}
        numColumns={3}
        style={{ marginTop: 10 }}
      />

      {/* Video Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeVideoModal}
      >
        <View style={{ flex: 1 }}>
          <Video
            source={{ uri: selectedVideo?.file }}
            style={{ flex: 1 }}
            useNativeControls={false}
            resizeMode="contain"
            shouldPlay={true}
            isLooping
            isMuted={isMuted}
            onTouchStart={() => setIsMuted(!isMuted)}
            onPlaybackStatusUpdate={(status) => {
              if (!status.isPlaying && status.didJustFinish) {
                closeVideoModal();
              }
            }}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeVideoModal}
          >
            <Text style={{ color: "white" }}>Close Video</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.out}>
        <TouchableOpacity onPress={() => navigation.navigate("Bottom")}>
          <AntDesign name="left" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  videoContainer: {
    flex: 1,
    margin: 4,
  },
  videoTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  videoDescription: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  videoThumbnail: {
    width: Dimensions.get("window").width / 3 - 8,
    height: Dimensions.get("window").height * 0.3,
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: "black",
    borderRadius: 5,
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  stat: {
    textAlign: "center",
    fontSize: 12,
  },
  statNumber: {
    fontWeight: "bold",
    fontSize: 16,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 2,
  },
  bio: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  post: {
    width: "33%",
    height: Dimensions.get("window").height * 0.3,
    margin: 2,
    marginVertical: "5",
  },
  button: {
    alignItems: "center",
    padding: 10,
  },
  num: {
    alignItems: "center",
  },
  avt: {
    alignSelf:"center",
     marginTop: 20,
     borderWidth: 2,
     padding: 5,
     width: 120,
     height: 120,
     borderRadius: 100,
     justifyContent: "center",
 },
  info: {
    alignItems: "center",
  },
  out: {
    position: "absolute",
    padding: 15,
  },
  we: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius:100,
  },
});

export default ProfilePage;
