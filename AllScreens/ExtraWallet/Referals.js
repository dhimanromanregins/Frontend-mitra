import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
// import { useNavigation } from '@react-navigation/native';

const Referals = ({ item }) => {
  // const navigation = useNavigation();

  // const state = item.status
  // let message = ' ';
  //     if(state==0){
  //       message=<Text style={{color:'red'}}>Cancelled</Text>;

  //     } else if(state==2){
  //       message=<Text style={{color:'green'}}>Confirmed</Text>;
  //     } else{
  //       message=<Text style={{color:'#ffcc00'}}>Pending</Text>
  //     }

  return (
    <View>
      <TouchableOpacity
        style={{
          margin: 10,
          elevation: 10,
          backgroundColor: "white",
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
        // onPress={()=> navigation.navigate("OrderDetail", {order_id:item.order_id})}
      >
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text3}>
          {item?.income}
        </Text>

        <Text style={styles.text3}>Level {item.level}</Text>

        <View style={{ alignItems: "center" }}>
          <Text style={{...styles.text3, width: Dimensions.get("window").width * 0.4,textAlign:'center' }}>{item.username}</Text>
          <Text style={styles.text3}>{item.date}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Referals;

const styles = StyleSheet.create({
  text1: {
    fontSize: 28,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 22,
    fontWeight: "bold",
  },
  text3: {
    fontSize: 18,
    fontWeight: "bold",
  },

  food: {
    backgroundColor: "#ff80a8",
    borderRadius: 10,
    elevation: 10,
    marginLeft: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#ff0055",
  },
  cat2: {},
  img1: {
    height: 60,
    width: 60,
  },

  cat: {
    backgroundColor: "#ff3374",
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    // flexDirection:"row",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.2,
    width: Dimensions.get("window").width * 0.4,
    justifyContent: "center",
  },
  img2: {
    height: "100%",
    width: "100%",
    borderRadius: 100,
    padding: 5,
  },
  box: {
    height: Dimensions.get("window").height * 0.084,
    width: Dimensions.get("window").width * 0.164,
    padding: 5,
  },
});
