import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons';

const Reelscall = () => {
  return (
    <View>
    
    <View style={styles.b1}>
     <Text style={styles.text}>Reels</Text>
     <Entypo name="camera" size={30} color="white" />
     </View>
     <View style={styles.b2}>
     <TouchableOpacity>
     <AntDesign name="heart" size={40} color="white" style={styles.icon} />
     </TouchableOpacity>
     <TouchableOpacity>
     <FontAwesome5 name="comment-dots" size={40} color="white" style={styles.icon}/>
     </TouchableOpacity>
     <TouchableOpacity>
     <Entypo name="forward" size={40} color="white" style={styles.icon}/>
     </TouchableOpacity>
     <TouchableOpacity>
     <Entypo name="dots-three-vertical" size={40} color="white" style={styles.icon}/>
     </TouchableOpacity>
     </View>
    </View>
  )
}

export default Reelscall

const styles = StyleSheet.create({
    img:{
        height:Dimensions.get("window").height,
        width:Dimensions.get("window").width
    },
    text:{
      fontSize:28,
      fontWeight:"bold",
      color:"white"
    },
    b1:{
      flexDirection:"row",
      justifyContent:"space-between",
      margin:10
    },
    b2:{
      margin:10,
      height:Dimensions.get("window").height*0.7,
      justifyContent:"flex-end",
      alignItems:"flex-end"
      
    },
    icon:{
      marginTop:30
    }
})