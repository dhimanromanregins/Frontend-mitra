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
  Button,
  Share,
  TouchableOpacityBase,
  ToastAndroid,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  SimpleLineIcons,
  AntDesign,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Video } from "expo-av";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [uid, setUid] = useState("");
  const [videos, setVideos] = useState([]);
  const [posts, setPosts] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getUid();
    fetchFollowers();
    fetchFollowing();
    fetchVideosCount();
    fetchProfile();
  }, [uid]);

  // useEffect(() => {
  //   fetchVideosCount()
  // }, [])

  const getUid = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      if (value !== null) {
        setUid(JSON.parse(value));
        // Fetch videos based on user_id
        fetchVideos(JSON.parse(value));
      }
    } catch (e) {
      console.error("Error retrieving UID", e);
    }
  };

  const fetchVideos = async (userId) => {
    try {
      const response = await axios.get(
        `https://sspmitra.in/api/videolist?user_id=${userId}`
      );
      setVideos(response.data);
      // console.log("video_id",response.data);
  
    } catch (error) {
      console.error("Error fetching videos", error);
    }
  };



  const fetchVideosCount = async () => {
    try {
      const response = await axios.get(
        `https://sspmitra.in/video-count-per-user/?user_id=${uid}`
      );
      setPosts(response.data.post_count);
    } catch (error) {
      console.error("Error fetching videos count", error);
    }
  };
  const deleteVideo = async (videoId) => {
    try {
      const response = await axios.delete(
        `https://sspmitra.in/api/video-delete/?video_id=${videoId}`
      );

      fetchVideosCount(),
      fetchProfile(),
      fetchVideos(uid); // Refresh the video list after deletion
      console.log("Video deleted successfully", response);
    } catch (error) {
      setModalVisible(false);
      
      fetchVideosCount(),
      fetchProfile(),
      fetchVideos(uid); // Refresh the video list after deletion

      ToastAndroid.show("Video Deleted Successfully", ToastAndroid.SHORT);

      // console.error("Error deleting the video", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("id");
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
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
      {/* <Text style={styles.videoTitle}>{item.title}</Text>
      <Text style={styles.videoDescription}>{item.description}</Text> */}
      {item.thumbnail && (
        <Image style={styles.videoThumbnail} source={{ uri: item.thumbnail }} />
      )}
    </TouchableOpacity>
  );

  const fetchFollowers = async () => {
    try {
      const response = await axios.get(
        `https://sspmitra.in/followers/count/?user_id=${uid}`
      );
      setFollowers(response.data.followers_count);
      // console.log(response.data.followers_count);
    } catch (error) {
      console.error("Error fetching followers", error);
    }
  };
  const fetchFollowing = async () => {
    try {
      const response = await axios.get(
        `https://sspmitra.in/following/count/?user_id=${uid}`
      );
      setFollowing(response.data.following_count);
      // console.log("sss", response.data.following_count);
    } catch (error) {
      console.error("Error fetching following", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `https://sspmitra.in/profile/update/?user_id=${uid}`
      );
      setBio(response.data.bio);
      setName(response.data.name);
      setPhoto(response.data.profile_photo);
      // console.log("bio", response.data.bio);
    } catch (error) {
      console.error("Error fetching videos count", error);
    }
  };
  const shareLink = async () => {
    try {
      await Share.share({
        message:
          "Check out this app on Google Play Store: https://play.google.com/store/apps/details?id=com.siancesoftware.Mitra",
      });
    } catch (error) {
      console.log("Error sharing:", error.message);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);

    Promise.all([
      fetchVideos(uid),
      fetchFollowers(),
      fetchFollowing(),
      fetchVideosCount(),
      fetchProfile()
    ]).then(() => {
      setRefreshing(false);
    });
  };

  return (

    <ScrollView showsVerticalScrollIndicator= {false} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

    
      <View style={{margin:10}}>
      <View style={styles.avt}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.image} />
        ) : (
          <Image
            style={styles.image}
            source={require("../../assets/man.png")}
          />
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.bio}>{bio}</Text>
      </View>

      <TouchableOpacity style={styles.share} onPress={shareLink}>
        <Text style={styles.name}>Share</Text>
      </TouchableOpacity>

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

      <View style={styles.we}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfileScreen")}
          style={styles.button}
        >
          <Text style={styles.text}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Wallet")}
          style={styles.button}
        >
          <Text style={styles.text}>Wallet</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ paddingVertical: 20, fontSize: 18, fontWeight: "bold" }}>
        Your Posted Videos
      </Text>
      </View>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVideoItem}
        numColumns={3}
        style={{ margin: 5 }}
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
            onPress={() => deleteVideo(selectedVideo.id)}
            style={styles.deleteButton}
          >
            <Ionicons name="md-trash-bin" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeVideoModal}
          >
            <Entypo name="cross" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.out}>
        <TouchableOpacity onPress={() => navigation.navigate("Bottom")}>
          <AntDesign name="left" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.out, alignSelf: "flex-end" }}>
        <TouchableOpacity onPress={handleLogout}>
          <SimpleLineIcons name="logout" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
 
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
    borderRadius: 5,
  },
  deleteButton: {
    position: "absolute",
    top: 20,
    marginLeft: 20,
    padding: 10,

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
    backgroundColor: "#ffff99",
    alignItems: "center",
    padding: 10,
    width: Dimensions.get("window").width * 0.45,
  },
  num: {
    alignItems: "center",
  },
  avt: {
    alignSelf: "center",
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
    borderRadius: 100,
  },
  share: {
    alignItems: "center",
    backgroundColor: "#fff333",
    height: 30,
    width: 100,
    justifyContent: "center",
    alignSelf: "center",
    elevation: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileScreen;
