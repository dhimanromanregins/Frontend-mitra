import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Callcall from '../Components/Callcall'

const Calls = () => {
  return (
    <ScrollView  style={{backgroundColor:'white'}}>
    
    <StatusBar showHideTransition={true}/>
      <Callcall/>
      <Callcall/>
      <Callcall/>
    </ScrollView>
  )
}

export default Calls

const styles = StyleSheet.create({})