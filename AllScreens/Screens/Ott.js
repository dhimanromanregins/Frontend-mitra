import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import JustAddedMovies from "../ExtraOtt/JustAddedMovies";
import { useNavigation } from "@react-navigation/native";

const Ott = () => {

  const navigation = useNavigation();

  const imagesWithText1 = [
    { image: require("../../assets/C1.png"), text: "Image 1 Slider 1" },
    { image: require("../../assets/C2.png"), text: "Image 2 Slider 2" },
    { image: require("../../assets/C3.png"), text: "Image 3 Slider 3" },
  ];

  const ImageSlider = ({ data, onPressImage }) => {
    const flatListRef = useRef(null);
    const imageIndexRef = useRef(0);

    useEffect(() => {
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
      }, 10000); // Change the interval as needed (3000ms = 3 seconds)

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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPressImage(item)}>
              <ImageBackground
                source={item.image}
                style={styles.image}
                resizeMode="cover"
              >
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{item.text}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#737373",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 5,
                        alignSelf: "center",
                        borderRadius: 8,
                        elevation: 10,
                        marginTop: 10,
                      }}
                    >
                      <Ionicons name="ios-play" size={24} color="white" />
                      <Text style={{ fontSize: 22, color: "white" }}>
                        Watch Now
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#737373",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 5,
                        paddingHorizontal: 12,
                        alignSelf: "center",
                        borderRadius: 8,
                        elevation: 10,
                        marginTop: 10,
                        marginLeft: 20,
                      }}
                    >
                      <Text style={{ fontSize: 23, color: "white" }}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
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
    // Navigate to a detailed view or perform any other action
    navigation.navigate("Streaming")
    console.log("Image Pressed:", imageData.text);
    // navigation.navigate("VideoPlayer")
  };
  return (
    <ScrollView
      style={{ backgroundColor: "#1a1a1a", paddingBottom:50 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <ImageSlider data={imagesWithText1} onPressImage={handleImagePress} />
      </View>

      <View style={{ marginTop: 20, marginLeft: 10, }}>
          <Text style={styles.head }>Just Added</Text>
          <ScrollView
            horizontal
            style={styles.swipe }
            showsHorizontalScrollIndicator={false}
          >

          <JustAddedMovies/>
          
          </ScrollView>
        </View>
      <View style={{ marginTop: 20, marginLeft: 10, paddingBottom:100 }}>
          <Text style={styles.head }>Trending</Text>
          <ScrollView
            horizontal
            style={styles.swipe }
            showsHorizontalScrollIndicator={false}
          >

          <JustAddedMovies/>

          </ScrollView>
        </View>
      
    </ScrollView>
  );
};

export default Ott;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // marginTop: 40,
  },
  sliderContainer: {
    height: Dimensions.get("window").height / 1.5,
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
