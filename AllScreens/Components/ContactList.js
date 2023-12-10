import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import * as Contacts from "expo-contacts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ContactScreen() {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [id, setId] = useState();
  const [nameRoom, setNameRoom] = useState();
  const [matchingContacts, setMatchingContacts] = useState([]);
  const [roomNameCache, setRoomNameCache] = useState(new Map());
  const [searchText, setSearchText] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [RoomId, setRoomId] = useState();



  useEffect(() => {
    getContacts();
    getId();
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      getMatchingContacts();
    }
  }, [contacts, searchText]);

  const getContacts = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.Name,
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.Image,
          ],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      } else {
        console.log("Permission to access contacts denied");
        // Handle permission denied
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      // Handle error or display error message
    }
  };

  const getMatchingContacts = () => {
    try {
      const fetchAPI = async () => {
        const apiResponse = await axios.get(
          "https://sspmitra.in/get-customusers/"
        );
        const apiPhoneNumbers = apiResponse.data.map(
          (item) => item.phone_number
        );

        const contactsMatchingAPI = contacts.filter((contact) => {
          if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
            const phoneNumber = contact.phoneNumbers[0].number
              .replace(/ /g, "")
              .replace("+91", "");
            return apiPhoneNumbers.includes(phoneNumber);
          }
          return false;
        });

        setMatchingContacts(contactsMatchingAPI);
      };

      fetchAPI();
    } catch (error) {
      console.error("Error fetching API data:", error);
      // Handle error or display error message
    }
  };

  const getId = async () => {
    try {
      const response = await axios.get(`http://139.84.144.65:8001/rooms/`);
      if (response.data && response.data.length > 0) {
        for (let i = 0; i < response.data.length; i++) {
          const room = response.data[i];
          if(room.name == RoomId)
          setId(room.id);
          console.log(`id ${room.id}`);
          // You can perform operations or store data for each room here
        }
      } else {
        console.log("Id not found.");
      }
      
    } catch (error) {
      console.error("Error fetching id bro", error);
    }
  };

  const handleChatPress = async (contact) => {
    let mobileNumber = await AsyncStorage.getItem('mobileNumber');
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      const phoneNumber = contact.phoneNumbers[0].number;
      const formattedPhoneNumber = phoneNumber
        .replace(/ /g, "")
        .replace("+91", "");

        setRoomId(formattedPhoneNumber);
        setNameRoom(RoomId);
      // console.log("dwd",RoomId);
       

      let roomName;
      if (roomNameCache.has(formattedPhoneNumber)) {
        roomName = roomNameCache.get(formattedPhoneNumber);
      } else {
        // roomName = `Room_${formattedPhoneNumber}`;
        roomName = `${formattedPhoneNumber}_chat_${mobileNumber}`;
        const updatedRoomCache = new Map(roomNameCache);
        updatedRoomCache.set(formattedPhoneNumber, roomName);
        setRoomNameCache(updatedRoomCache);
      }

      try {
        if (roomName.includes('null')){
          return;
        }
        const response = await axios.post("http://139.84.144.65:8001/rooms/", {
          name: roomName,
          slug: formattedPhoneNumber,
        });
console.log("ajsygduy", roomName);
        if (response.status === 201) {
          // console.log("[RES]", response);
          navigation.navigate("ExtraChat", {
            roomName: roomName,
            mobile_number: formattedPhoneNumber,
            id: contact.id,
            contactName: contact.name,
            profilePic: contact.imageAvailable
              ? contact.image.uri
              : "https://via.placeholder.com/150",
          });
        } else {
          console.error("Failed to create chat room. Response:", response);
        }
      } catch (error) {
        console.error("Error creating chat room:", JSON.stringify(error));
      }
    } else {
      console.log("No phone number available for this contact");
    }
    getId(id)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>Mitra Contacts</Text>
          <TouchableOpacity
            onPress={() => setIsSearchVisible(!isSearchVisible)}
          >
            <AntDesign
              name="search1"
              size={24}
              color="black"
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
        {isSearchVisible && (
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or number"
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
        )}
      </View>
      <View style={styles.contactList}>
        <FlatList
          data={matchingContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleChatPress(item)}
              style={styles.contactItem}
            >
              <Image
                source={{
                  uri: item.imageAvailable
                    ? item.image.uri
                    : "https://via.placeholder.com/150",
                }}
                style={styles.profileImage}
              />
              <View style={styles.contactDetails}>
                <Text style={styles.contactName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    backgroundColor: "#ffff99",
    padding: 15,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  searchIcon: {
    width: 25,
    height: 25,
    color: "#000",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "white",
  },
  contactList: {
    flex: 1,
    padding: 5,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 15,
  },
  contactDetails: {
    flex: 1,
    justifyContent: "center",
  },
  contactName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius:100,
  },
});
