import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import * as Contacts from "expo-contacts";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

const StatusScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [contactId, setContactId] = useState([]);
  const [name, setname] = useState([]);
  const [profile, setProfile] = useState([]);
  const [matchingContacts, setMatchingContacts] = useState([]);

  
  const handlePressStatus = () => {
    // Navigate to the detailed view of the selected status
    navigation.navigate("DetailedStatus");
  };

  return (
    <View style={styles.container}>
      {/* Status Updates */}
      <TouchableOpacity
        style={styles.statusContainer}
        onPress={handlePressStatus}
      >
        <Image
          source={require("../../assets/1.png")} // Replace with your image source
          style={styles.statusImage}
        />
        <View style={styles.statusInfo}>
          <Text style={styles.statusUsername}>Your Status</Text>
          <Text style={styles.statusTime}>2 hours ago</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>Recently Updated</Text>
<>
      <ScrollView>
        <View style={styles.container}>
          <ScrollView>
           
              <TouchableOpacity
             
                style={styles.statusContainer}
                onPress={() => navigation.navigate("OthersStatus")}
              >
                <Image
                  source={{
                    uri: "https://via.placeholder.com/150",
                  }}
                  style={styles.statusImage}
                />
                <View style={styles.statusInfo}>
                  <Text style={styles.statusUsername}>name</Text>
                  <Text style={styles.statusTime}>timeAgo</Text>
                </View>
              </TouchableOpacity>
   
          </ScrollView>
        </View>
      </ScrollView>
      </>

      {/* Add Status Button */}
      <View style={styles.plus}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddStatus")}
        >
          <AntDesign name="pluscircle" size={50} color="black" />
        </TouchableOpacity>
      </View>
      {/* <AddStatus/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  statusImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  statusInfo: {
    marginLeft: 15,
  },
  statusUsername: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statusTime: {
    color: "#777",
  },
  addButton: {
    // Add styles for the add button if needed
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    margin: 20,
  },
  plus: {
    zIndex: 10,
    position: "absolute",
    top: Dimensions.get("window").height * 0.7,
    alignSelf: "flex-end",
    padding: 10,
  },
});

export default StatusScreen;
