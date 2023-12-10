import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign, Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AllPerson from './AllPerson';


const Total = () => {
  const navigation = useNavigation();

  return (
    
      <View style={{backgroundColor:"black", height: Dimensions.get("window").height,}}>
        
        <View style={styles.top}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.box}>
          <Text style={styles.title}>Total Participants : 30</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <AllPerson/>
          <AllPerson/>
          <AllPerson/>
          <AllPerson/>
          <AllPerson/>
          <AllPerson/>
          <AllPerson/>
          <AllPerson/>
          <AllPerson/>
          <AllPerson/>
          <AllPerson/>
          <AllPerson/>
          <AllPerson/>
          <AllPerson/>
        </View>
        </ScrollView>
      </View>

  )
}

export default Total

const styles = StyleSheet.create({
    top: {
   
        alignItems: "center",
        padding: 20,
        flexDirection: "row",
        justifyContent:'space-between'
      },
      title:{
        fontSize: 18,
        color:"white"
      },
      box:{
        margin:20
      }
})