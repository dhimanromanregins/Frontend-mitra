// import React, { useRef, useState, useEffect } from "react";
// import {
//   Dimensions,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   RefreshControl,
//   Modal,
//   Linking,
// } from "react-native";
// import { Video, ResizeMode } from "expo-av";
// import {
//   useIsFocused,
//   useFocusEffect,
//   useNavigation,
// } from "@react-navigation/native";
// import {
//   AntDesign,
//   Entypo,
//   MaterialCommunityIcons,
//   FontAwesome,
// } from "@expo/vector-icons";
// import axios from "axios";

// const Reel = () => {
//   const videoRef = useRef([]);
//   const [playingIndex, setPlayingIndex] = useState(-1);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(true);
//   const [videoSources, setVideoSources] = useState([]);
//   const [likeCount, setLikeCount] = useState(0);
//   const [click1, setClick1] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [isShareModalVisible, setShareModalVisible] = useState(false);
//   const [videoLink, setVideoLink] = useState("");
//   const navigation = useNavigation();
//   const loggedInUserId = "4"; // Replace with actual user ID

//   useEffect(() => {
//     const fetchVideoSources = async () => {
//       try {
//         const response = await axios.get("https://demomitra.azurewebsites.net/api/videos");
//         console.log("API Response:", response.data);

//         if (response.data && Array.isArray(response.data)) {
//           setVideoSources(response.data);
//         } else {
//           console.error("Invalid API response format:", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching video sources:", error);
//       }
//     };

//     fetchVideoSources();
//   }, [refreshing]);

//   useEffect(() => {
//     return () => {
//       if (playingIndex !== -1 && videoRef.current[playingIndex]) {
//         videoRef.current[playingIndex].pauseAsync();
//       }
//     };
//   }, []);

//   useFocusEffect(
//     React.useCallback(() => {
//       if (playingIndex !== -1 && videoRef.current[playingIndex]) {
//         if (isVideoPlaying) {
//           videoRef.current[playingIndex].playAsync();
//         }
//       }
//       return () => {
//         if (playingIndex !== -1 && videoRef.current[playingIndex]) {
//           videoRef.current[playingIndex].pauseAsync();
//         }
//       };
//     }, [playingIndex, isVideoPlaying])
//   );

//   const handleScroll = (event) => {
//     const contentOffsetY = event.nativeEvent.contentOffset.y;
//     const videoHeight = Dimensions.get("window").height;
//     const indexInView = Math.floor(contentOffsetY / videoHeight);

//     setPlayingIndex(indexInView);
//   };

//   const toggleVideoPlayback = (index) => {
//     if (!Array.isArray(videoRef.current)) {
//       videoRef.current = [];
//     }

//     if (index !== playingIndex) {
//       if (playingIndex !== -1 && videoRef.current[playingIndex]) {
//         videoRef.current[playingIndex].pauseAsync();
//       }

//       if (videoRef.current[index]) {
//         videoRef.current[index].playAsync();
//         setPlayingIndex(index);
//         setIsVideoPlaying(true);
//       }
//     } else {
//       if (videoRef.current[index]) {
//         if (isVideoPlaying) {
//           videoRef.current[index].pauseAsync();
//         } else {
//           videoRef.current[index].playAsync();
//         }
//         setIsVideoPlaying(!isVideoPlaying);
//       }
//     }
//   };

//   const handleVideoPress = (index) => {
//     if (playingIndex !== -1 && videoRef.current[playingIndex]) {
//       videoRef.current[playingIndex].pauseAsync();
//     }

//     toggleVideoPlayback(index);
//   };

//   const toggleLike = () => {
//     setClick1(!click1);
//     setLikeCount((prevCount) => (click1 ? prevCount - 1 : prevCount + 1));
//   };

//   const toggleShareModal = () => {
//     setShareModalVisible(!isShareModalVisible);
//   };

//   const handleShare = async (videoId) => {
//     try {
//       // Replace the following URL with your actual share API
//       const shareApi = `https://demomitra.azurewebsites.net/videos/${videoId}/share/`;
//       const response = await axios.post(shareApi);
//       console.log("Share button pressed. New share count:", response.data.share_count);
//     } catch (error) {
//       console.error("Error while increasing share count:", error);
//     }
//   };

//   const getVideoLink = async (videoId) => {
//     try {
//       const response = await axios.get(`https://demomitra.azurewebsites.net/api/get_video_link?id=${videoId}`);
//       setVideoLink(response.data.video_link);
//     } catch (error) {
//       console.error("Error fetching video link:", error);
//     }
//   };

//   const openVideoLink = () => {
//     if (videoLink) {
//       Linking.openURL(videoLink);
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     try {
//       const response = await axios.get("https://demomitra.azurewebsites.net/api/videos");
//       console.log("API Response:", response.data);

//       if (response.data && Array.isArray(response.data)) {
//         setVideoSources(response.data);
//       } else {
//         console.error("Invalid API response format:", response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching video sources:", error);
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   return (
//     <ScrollView
//       pagingEnabled={true}
//       style={{ flex: 1, backgroundColor: "black" }}
//       onScroll={handleScroll}
//       scrollEventThrottle={200}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }
//     >
//       <StatusBar hidden={true} />
//       <View style={styles.container}>
//         {videoSources.map((video, index) => (
//           <View key={index}>
//             <TouchableOpacity onPress={() => handleVideoPress(index)}>
//               <Video
//                 ref={(ref) => (videoRef.current[index] = ref)}
//                 source={{ uri: video.file }}
//                 style={styles.video}
//                 shouldPlay={isVideoPlaying && index === playingIndex}
//                 isLooping={true}
//                 resizeMode={ResizeMode.CONTAIN}
//               />
//             </TouchableOpacity>

//             <View style={styles.topContainer}>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate("Profile")}
//                 style={styles.topIcon}
//               >
//                 <FontAwesome name="user" size={30} color="white" />
//               </TouchableOpacity>
//               <Text style={styles.text}>Reels</Text>
//               <TouchableOpacity onPress={() => navigation.navigate("Record")}>
//                 <Entypo name="camera" size={30} color="white" />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.like}>
//               <View style={{ alignItems: "center", marginVertical: 10 }}>
//                 <TouchableOpacity style={styles.icon} onPress={toggleLike}>
//                   {click1 ? (
//                     <AntDesign name="heart" size={30} color="red" />
//                   ) : (
//                     <AntDesign name="hearto" size={30} color="white" />
//                   )}
//                 </TouchableOpacity>
//                 <View style={styles.likeCountText}>
//                   <Text style={styles.text}>{likeCount}</Text>
//                 </View>
//               </View>
//               <TouchableOpacity
//                 style={styles.icon}
//                 onPress={() => navigation.navigate("Comments")}
//               >
//                 <FontAwesome name="comments-o" size={30} color="white" />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.icon}
//                 onPress={() => {
//                   getVideoLink(video.id);
//                   toggleShareModal();
//                 }}
//               >
//                 <MaterialCommunityIcons name="share-outline" size={35} color="white" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}
//       </View>

//       {/* Share Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={isShareModalVisible}
//         onRequestClose={toggleShareModal}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <TouchableOpacity onPress={openVideoLink}>
//               <Text style={styles.modalOption}>Share to Different Platforms</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={toggleShareModal}>
//               <Text style={styles.modalCancel}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   video: {
//     height: Dimensions.get("window").height,
//     width: Dimensions.get("window").width,
//   },
//   like: {
//     zIndex: 999,
//     position: "absolute",
//     top: Dimensions.get("window").height * 0.5,
//     alignSelf: "flex-end",
//     padding: 10,
//   },
//   icon: {
//     marginHorizontal: 10,
//     elevation: 10,
//     marginTop: 5,
//   },
//   likeCountText: {
//     fontSize: 20,
//     color: "white",
//   },
//   text: {
//     color: "white",
//   },
//   container: {
//     // Add styling for the container if needed
//   },
//   topContainer: {
//     flexDirection: "row",
//     width: Dimensions.get("window").width,
//     paddingHorizontal: 20,
//     justifyContent: "space-between",
//     position: "absolute",
//     paddingVertical: 10,
//     alignItems: "center",
//   },
//   topIcon: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     color: "white",
//     fontSize: 20,
//     fontWeight: "500",
//   },
//   // Share Modal styles
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     backgroundColor: "white",
//     width: "100%",
//     padding: 20,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   modalOption: {
//     fontSize: 18,
//     paddingVertical: 15,
//   },
//   modalCancel: {
//     fontSize: 18,
//     paddingVertical: 15,
//     color: "red",
//     textAlign: "center",
//   },
// });

// export default Reel;


import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Dimensions, ToastAndroid, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const Login = ({ navigation }) => {
  const [phone_number, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    const userId = await AsyncStorage.getItem("id");

    if (userId) {
      navigation.navigate("Bottom"); // Redirect to the home screen or any other screen
    }
  };

  const handleLogin = async () => {
    if (!phone_number.trim() || !password.trim()) {
      ToastAndroid.show('Please enter phone number and password', ToastAndroid.SHORT);
      return;
    }

    // Set loading to true when starting the sign-in process
    setLoading(true);
    try {
      const response = await axios.post('https://sspmitra.in/login/', {
        phone_number: phone_number,
        password: password
      });

      if (response.data.status === "success") {
        await AsyncStorage.setItem('id', response.data.User.id);
        await AsyncStorage.setItem('userName', response.data.User.username_code);
        await AsyncStorage.setItem('mobileNumber', response.data.User.phone_number);
        ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
        navigation.navigate("Bottom"); // Redirect to the home screen or any other screen
      } else{
        ToastAndroid.show('Invalid phone number or password', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show('Invalid phone number or password.', ToastAndroid.SHORT);
    } finally {
      // Set loading to false regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require("../../assets/3.png")}
        style={styles.backgroundImage}
      >
    <ScrollView>

        <View style={{ marginHorizontal: 20 }}>
        {/* <TouchableOpacity onPress={()=> navigation.navigate("Bottom")}>
          <Text style={{fontSize:50}}>x</Text>
        </TouchableOpacity> */}
          <View style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            {/* <Text style={styles.title}>Back!</Text> */}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              placeholderTextColor="gray"
              value={phone_number}
              onChangeText={(text) => setPhonenumber(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="gray"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={styles.container3}>
            <TouchableOpacity style={styles.forgot} onPress={()=> navigation.navigate("Forgotten")}>
              <Text style={styles.t1}>Forgotten Password ?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container2}>
            <LinearGradient colors={["#FF9966", "#FF3300"]} style={styles.in}>
              <TouchableOpacity style={styles.up1} onPress={handleLogin}>
                <Text style={styles.t2}>Sign In</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={{...styles.container2, marginBottom:50 }}>
            <Text style={styles.t1}>Don't have an account?</Text>
            <LinearGradient colors={["#ff6600", "#ff6600"]} style={{ borderRadius: 10, marginLeft: 20 }}>
              <TouchableOpacity style={styles.up} onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.t1}>Sign Up</Text>
              </TouchableOpacity>
            </LinearGradient>
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
    </ScrollView>
        
      </ImageBackground>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  backgroundImage: {
    height: Dimensions.get("window").height,
  },
  container: {
    // width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").height * 0.35,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container2:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    marginTop:20
  },
  container3:{
    marginVertical:10,
    alignItems:"flex-end",
    width: Dimensions.get("window").width * 0.8,
  },
  inputContainer: {
    height: Dimensions.get("window").height * 0.2,
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
  t1:{
    color:"white",
    fontWeight:"700"
  },
  up:{
    padding:5,
  },
  t2:{
    color:"white",
    fontWeight:"800",
    fontSize:16
  },
  up1:{
    padding:15,
  },
  in:{
    borderRadius:10, 
    width: Dimensions.get("window").width * 0.5,
    alignItems:"center",
    marginTop:20
  },
  forgot:{
    borderBottomWidth:2,
    borderColor:"white",
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
});
