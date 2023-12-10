import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import { AntDesign } from "@expo/vector-icons";
  
  const Referral = ({navigation}) => {
    return (
      <ScrollView
        style={{
            backgroundColor: "#ffff99",
          height: Dimensions.get("screen").height,
        }}
      >
        <View
          style={{
            
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
              margin: 20,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={25} color="black" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                marginLeft: 30,
              }}
            >
              Referral Income
            </Text>
          </View>
          <View>
            <View style={styles.box1}>
              <Text style={styles.text1}>Direct Referral</Text>
              <Text style={styles.text1}>:</Text>
              <Text style={styles.text1}>0.40 SSP Coin</Text>
            </View>
            <View style={styles.box1}>
              <Text style={styles.text1}>2nd Level</Text>
              <Text style={styles.text1}>:</Text>
              <Text style={styles.text1}>0.15 SSP Coin</Text>
            </View>
            <View style={styles.box1}>
              <Text style={styles.text1}>3rd Level</Text>
              <Text style={styles.text1}>:</Text>
              <Text style={styles.text1}>0.10 SSP Coin</Text>
            </View>
            <View style={styles.box1}>
              <Text style={styles.text1}>4th Level</Text>
              <Text style={styles.text1}>:</Text>
              <Text style={styles.text1}>0.10 SSP Coin</Text>
            </View>
            <View style={styles.box1}>
              <Text style={styles.text1}>5th Level</Text>
              <Text style={styles.text1}>:</Text>
              <Text style={styles.text1}>0.10 SSP Coin</Text>
            </View>
            <View style={styles.box1}>
              <Text style={styles.text1}>6th Level</Text>
              <Text style={styles.text1}>:</Text>
              <Text style={styles.text1}>0.10SSP Coin</Text>
            </View>
            <View style={styles.box1}>
              <Text style={styles.text1}>7th Level</Text>
              <Text style={styles.text1}>:</Text>
              <Text style={styles.text1}>0.05 SSP Coin</Text>
            </View>
            <View style={styles.box1}>
              <Text style={styles.text1}>8th Level</Text>
              <Text style={styles.text1}>:</Text>
              <Text style={styles.text1}>0.05 SSP Coin</Text>
            </View>
            <View style={styles.box1}>
              <Text style={styles.text1}>9th Level</Text>
              <Text style={styles.text1}>:</Text>
              <Text style={styles.text1}>0.05 SSP Coin</Text>
            </View>
            <View style={styles.box1}>
              <Text style={styles.text1}>10th Level</Text>
              <Text style={styles.text1}>:</Text>
              <Text style={styles.text1}>0.05 SSP Coin</Text>
            </View>
            <View style={styles.box1}>
              <Text style={styles.text1}>11th Level</Text>
              <Text style={styles.text1}>:</Text>
              <Text style={styles.text1}>0.03 SSP Coin</Text>
            </View>
            <View style={styles.box1}>
              <Text style={styles.text1}>12th Level</Text>
              <Text style={styles.text1}>:</Text>
              <Text style={styles.text1}>0.03 SSP Coin</Text>
            </View>
            <View style={styles.box1}>
              <Text style={styles.text1}>13th Level</Text>
              <Text style={styles.text1}>:</Text>
              <Text style={styles.text1}>0.03 SSP Coin</Text>
            </View>
            <View style={styles.box1}>
              <Text style={styles.text1}>14th Level</Text>
              <Text style={styles.text1}>:</Text>
              <Text style={styles.text1}>0.02 SSP Coin</Text>
            </View>
            <View style={styles.box1}>
              <Text style={styles.text1}>15th Level</Text>
              <Text style={styles.text1}>:</Text>
              <Text style={styles.text1}>0.02 SSP Coin</Text>
            </View>
            <View style={{...styles.box1, backgroundColor:"gray"}}>
              <Text style={{...styles.text1, color:"#ffff66", fontWeight:"600"}}>Total Income</Text>
              <Text style={{...styles.text1, color:"#ffff66", fontWeight:"600"}}>1.28 SSP Coin</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };
  
  export default Referral;
  
  const styles = StyleSheet.create({
    text1: {
      color: "black",
      fontSize: 20,
    },
    box1: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#ffff00",
      padding: 15,
      marginTop:10
    },
  });
  