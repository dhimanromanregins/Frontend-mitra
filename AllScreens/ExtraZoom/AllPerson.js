import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const AllPerson = () => {
  return (
    <View style={styles.box}>
      <View style={styles.imgbox}>
        <Image source={require("../../assets/girl.png")} style={styles.img} />
      </View>
      <Text style={styles.text}>userName</Text>
      <FontAwesome name={"microphone-slash"} size={20} color="white" />
    </View>
  );
};

export default AllPerson;

const styles = StyleSheet.create({
  imgbox: {
    height: 50,
    width: 50,
    backgroundColor:"white",
    borderRadius:500
  },
  box:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:"#404040",
    paddingHorizontal:10,
    borderRadius:10,
    paddingVertical:5,
    margin:10, 
    justifyContent:"space-between"
  },
  img: {
    height:"100%",
    width:"100%",
    borderRadius:200
  },
  text: {
    color:"white",
    fontSize:18
  }
});
