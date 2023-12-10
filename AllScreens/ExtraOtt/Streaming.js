import { Dimensions, StyleSheet, Text, View, Button, ScrollView, StatusBar } from 'react-native'
import * as React from 'react';
import { Video, ResizeMode } from 'expo-av';
import JustAddedMovies from './JustAddedMovies';

const Streaming = () => {
    const video = React.useRef(null);

  return (
    <View style={{backgroundColor:"black", flex:1}}>
    <StatusBar  barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>

      <View style={styles.box1}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
      </View>
      <View style={{marginLeft:10}}>
      <Text style={styles.t1}>Movie Name</Text>
      <Text style={styles.t2}> Release Year | Genres | Language</Text>
      
      <Text style={styles.t3}>Watch More Movies</Text>
</View>
<>
      <ScrollView showsHorizontalScrollIndicator={false}>
      <ScrollView
            horizontal
            style={styles.swipe }
            showsHorizontalScrollIndicator={false}
          >

          <JustAddedMovies/>

          </ScrollView>
      </ScrollView>
      </>
      
    </View>
  )
}

export default Streaming

const styles = StyleSheet.create({
    t1:{
        color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    },
    t2:{
        color: 'white',
    },
    t3:{
        color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:30
    },
    box1:{
        marginTop:20,
        backgroundColor:"black",
        height:Dimensions.get("window").height*0.3
    },
    video:{
        height:"100%",
        width:"100%"
    }
})