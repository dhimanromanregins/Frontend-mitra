import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const OthersStatus = () => {

  const navigation = useNavigation();

 
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading

  
  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://sspmitra.in/status/list/?user_id=${10}`
      );
      const userStatuses = response.data.user_statuses;
      setImages(userStatuses);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      // Set loading to false regardless of success or failure
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const ImageSlider = ({ data, onPressImage }) => {
    const flatListRef = useRef(null);
    const imageIndexRef = useRef(0);

    useEffect(() => {
      if (data.length === 0) {
        return; // Do not proceed if there are no images
      }

      const scroll = setInterval(() => {
        if (imageIndexRef.current < data.length - 1) {
          imageIndexRef.current += 1;
        } else {
          imageIndexRef.current = 0;
        }
        flatListRef.current.scrollToIndex({
          animated: true,
          index: imageIndexRef.current,
        });
      }, 100000);

      return () => clearInterval(scroll);
    }, [data]);

    return (
      <View style={styles.sliderContainer}>
        <FlatList
          ref={flatListRef}
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPressImage(item)}>
              <ImageBackground
                source={{ uri: item.file }}
                style={styles.image}
                resizeMode="center"
              />
              <View
                style={{
                  flexDirection: "row",
                  position: "absolute",
                  alignItems: "flex-start",
                  zIndex: 10,
                  margin: 10,
                  marginLeft:20
                }}
              >
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <View>
                  <Text style={styles.statusUsername}>RB</Text>
                  <Text style={styles.statusTime}>02:02PM</Text>
                </View>
              </View>
              <View style={{flex:1, zIndex:10, position:"absolute", alignSelf:"center",top:Dimensions.get("window").height*0.9}}>
                <Text style={{color:"white", fontSize:20}}>{item.caption}</Text>
              </View>
            </TouchableOpacity>
          )}
          onMomentumScrollEnd={(event) => {
            const contentOffset = event.nativeEvent.contentOffset;
            const viewSize = event.nativeEvent.layoutMeasurement;
            const pageNum = Math.floor(contentOffset.x / viewSize.width);
            imageIndexRef.current = pageNum;
          }}
        />
      </View>
    );
  };

  const handleImagePress = (imageData) => {
    console.log("Image Pressed:", imageData.caption);
    // Handle navigation or other actions here
  };

  return (
    <View style={{ backgroundColor: "black" }}>
      <View style={styles.container1}>
        <ImageSlider data={images} onPressImage={handleImagePress} />
      </View>
      <Text>{}</Text>
      {/* Loader */}
      {loading && (
        <ActivityIndicator style={styles.loader} size="large" color="white" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  container1: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 40,
  },
  backButton: {},
  statusImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    
  },
  statusUsername: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color:"white"
  },
  statusTime: {
    color: "#777",
    
  },
  sliderContainer: {
    height: Dimensions.get("window").height * 1,
    width: Dimensions.get("window").width * 1,
  },
  image: {
    width: Dimensions.get("window").width * 1,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textContainer: {
    padding: 8,
  },
  text: {
    color: "#ffffff",
    fontSize: 25,
    // marginRight:100
  },
  head: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  swipe: {
    marginTop: 20,
  },
  out: {},
  box2: {
    width: Dimensions.get("screen").width * 0.5,
    height: Dimensions.get("screen").height * 0.13,
  },
});

export default OthersStatus;
