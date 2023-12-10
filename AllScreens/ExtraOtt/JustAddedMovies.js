import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

const JustAddedMovies = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.out}>
      <TouchableOpacity style={{marginTop:20}} onPress={() => navigation.navigate("Streaming")}>
        <View style={styles.box}>
          <Image source={require("../../assets/P1.jpg")} style={styles.img} />
        </View>
      <Text style={styles.name}>movie name</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box2} onPress={() => navigation.navigate("Streaming")}>
        <View style={styles.box}>
          <Image source={require("../../assets/P1.jpg")} style={styles.img} />
        </View>
      <Text style={styles.name}>movie name</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box2} onPress={() => navigation.navigate("Streaming")}>
        <View style={styles.box}>
          <Image source={require("../../assets/P1.jpg")} style={styles.img} />
        </View>
      <Text style={styles.name}>movie name</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box2} onPress={() => navigation.navigate("Streaming")}>
        <View style={styles.box}>
          <Image source={require("../../assets/P1.jpg")} style={styles.img} />
        </View>
      <Text style={styles.name}>movie name</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box2} onPress={() => navigation.navigate("Streaming")}>
        <View style={styles.box}>
          <Image source={require("../../assets/P1.jpg")} style={styles.img} />
        </View>
      <Text style={styles.name}>movie name</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box2} onPress={() => navigation.navigate("Streaming")}>
        <View style={styles.box}>
          <Image source={require("../../assets/P1.jpg")} style={styles.img} />
        </View>
      <Text style={styles.name}>movie name</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  out: {
    marginLeft: 10,
    flexDirection:"row"
  },
  box2:{
    marginTop:20,
    marginLeft:10

  },
  img: {
    // width:Dimensions.get("screen").width*0.24,
    // height:Dimensions.get("screen").height*0.17,
    borderRadius: 8,
    width: "100%",
    height: "100%",
  },
  box: {
    width: Dimensions.get("screen").width * 0.35,
    height: Dimensions.get("screen").height * 0.3,
  },
  name: {
    color: "white",
    fontSize: 13,
    marginLeft: 5,
  },
});

export default JustAddedMovies;
