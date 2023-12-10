import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Chatcall from '../Components/Chatcall'

const Chat = ({navigation}) => {
  return (
   <>

  
  <ScrollView >
   <Chatcall/>
 
   <Text style={{marginBottom:100, fontSize:20, fontWeight:"bold", color:"gray", marginTop:20, alignSelf:"center"}}>Copyrighted by SSP Mitra</Text>


  </ScrollView>

  <TouchableOpacity style={styles.new} onPress={()=> navigation.navigate("ContactList")}>
<MaterialCommunityIcons name="message-plus-outline" size={24} color="black" />
</TouchableOpacity>


   </>
  )
}

export default Chat

const styles = StyleSheet.create({
  new:{
    zIndex:10,
    position:"absolute",
    backgroundColor:"#ffff99",
    padding:20,
    borderRadius:100,
    top:Dimensions.get("window").height*0.7,
    right:20,
    alignSelf:"flex-end",
  }
})