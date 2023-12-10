import { Dimensions, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const Join = ({navigation}) => {
  return (
    <View style={{ backgroundColor: "#fff2e6", height:"100%" }}>
   <View
        style={styles.top}
      >
<TouchableOpacity onPress={()=> navigation.goBack()}>
<AntDesign name="left" size={24} color="black" />
</TouchableOpacity>        
<Text style={{ fontSize: 25, fontWeight: "bold",marginLeft:20 }}>Join</Text>
      </View>

     <View style={styles.b1}>
     <Text>Enter the code provided by the meeting organiser</Text>
     <View style={styles.in}>
     <TextInput
        placeholder='Enter joining code'
        style={styles.input}
     />
     </View>
     <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate("JoiningPage")}>
        <Text style={styles.text}>Join Meeting</Text>
     </TouchableOpacity>
     </View>
    </View>
  )
}

export default Join

const styles = StyleSheet.create({
    top:{
        backgroundColor: "#ffff99",
        height: Dimensions.get("screen").height * 0.07,
        alignItems:"center",
        padding: 10,
        flexDirection:'row'
    },
    b1:{
       height:Dimensions.get("window").height*0.25,
        alignItems:"center",
        justifyContent:"flex-end"
    },
    input:{
        padding:10,
    },
    in:{
        backgroundColor:"white",
        width:Dimensions.get("window").width*0.7,
        height:45,
        alignItems:'center',
        justifyContent:"center",
        marginVertical:20,
        borderRadius:30
    },
    text: {
        fontSize: 18,
        fontWeight: "500",
        color: "white",
      },
      btn:{

            backgroundColor: "#ff8c1a",
            borderRadius: 50,
            paddingHorizontal: 50,
            paddingVertical: 8,
      }
})
