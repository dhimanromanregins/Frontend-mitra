import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";


const Person = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent:'space-around'
        }}
      >
        <TouchableOpacity style={styles.box}>
        <View style={{flexDirection:"row", alignItems:'center', justifyContent:"space-between"}}>
          <Text style={styles.text}>Person</Text>
      <FontAwesome name={"microphone-slash"} size={15} color="black" />
</View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
        <View style={{flexDirection:"row", alignItems:'center', justifyContent:"space-between"}}>
          <Text style={styles.text}>Person</Text>
      <FontAwesome name={"microphone-slash"} size={15} color="black" />
</View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
        <View style={{flexDirection:"row", alignItems:'center', justifyContent:"space-between"}}>
          <Text style={styles.text}>Person</Text>
      <FontAwesome name={"microphone-slash"} size={15} color="black" />
</View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Person;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "white",
    height: Dimensions.get("window").height * 0.18,
    width: Dimensions.get("window").width * 0.3,
    borderRadius: 10,
    justifyContent:'flex-end',
    alignItems:"center",
  },
  text: {
    padding: 10,
  },
});
