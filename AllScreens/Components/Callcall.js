import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const Callcall = () => {
  return (
    <View >
    <TouchableOpacity style={styles.full}>
    <View style={styles.box}>
        <TouchableOpacity style={{marginRight:15}}>
          <Image
            source={require("../../assets/man.png")}
            style={styles.img}
          />
        </TouchableOpacity>
        <View>
          <Text style={{ fontWeight: "500", fontSize: 20 }}>Manish</Text>
          <View style={{flexDirection:"row"}}>
          <MaterialCommunityIcons name="arrow-top-right" size={18} color="#00cc00" />
          <Text>3:40 PM</Text>
          </View>
        </View>
        </View>
<TouchableOpacity>
<FontAwesome name="phone" size={24} color="#00cc00" />
</TouchableOpacity>      
    </TouchableOpacity>
  </View>
  )
}

export default Callcall

const styles = StyleSheet.create({
    box: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
      },
      img: {
        height: 50,
        width: 50,
      },
      in: {
        flexDirection: "row",
        alignItems: "center",
      },
     full:{
        flexDirection:"row",
        justifyContent:"space-between", alignItems:"center",marginHorizontal:20
     }
})