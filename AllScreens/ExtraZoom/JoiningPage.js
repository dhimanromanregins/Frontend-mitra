import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import Person from "./Person";
import Buttons from "./Buttons";

const JoiningPage = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "black",
        height: Dimensions.get("window").height,
      }}
    >
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("Total")} >
        <Fontisto name="persons" size={24} color="white" />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="md-volume-high" size={24} color="black" />
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="dots-three-vertical" size={24} color="black" />
        </TouchableOpacity> */}
        
      </View>
     

      <View>
        <Person />
        <Person />
        <Person />
        <Person />
      </View>
      <View style={styles.icon}>
      <Buttons />
      </View>
    </View>
  );
};

export default JoiningPage;

const styles = StyleSheet.create({
  top: {
   
    alignItems: "center",
    padding: 20,
    flexDirection: "row",
    justifyContent:'space-between'
  },

  icon: {
    position: "absolute",
    width:Dimensions.get("window").width,
    height:Dimensions.get("window").height,
    justifyContent:'flex-end',
    paddingBottom:20

  },
});
