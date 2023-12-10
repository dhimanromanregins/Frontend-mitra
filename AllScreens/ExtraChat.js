import React, { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList  } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExtraChat = ({ navigation, route }) => {
  let { roomName, id, contactName, profilePic, mobile_number, mNumber } = route.params;
  if (!roomName){
    roomName = `${mobile_number}_chat_${mNumber}`;
  }
  const [socket, setSocket] = useState(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [allRoomMessages, setAllRoomMessages] = useState([]); // To store all room messages
  const [user, setUser] = useState(); // To store all room messages
  const [content, setContent] = useState(); // To store all room messages
  const [time, setTime] = useState(); // To store all room messages
  const [filterTime, setFilterTime] = useState(new Date());
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);
  const [lastSeen, setLastSeen] = useState('Offline');

  const otherUser = {
    _id: id,
    name: contactName,
    avatar: require("../assets/man.png"),
  };

  useEffect(() => {
    let newSocket;
    const handleSocket = async()=>{
      let user_name =  await AsyncStorage.getItem('userName');
      let user_id =  await AsyncStorage.getItem('id');
      if (user_name && user_id){
        setUserID(user_id);
        setUserName(user_name);
      }
      else{
        console.log('User details not found!');
        return;
      }
      newSocket = new WebSocket(`ws://192.168.1.3:8008/ws/${roomName}/`);
      newSocket.onopen = () => {
        console.log("WebSocket open");
        setIsSocketConnected(true);
        setSocket(newSocket);
      };
  
      newSocket.onerror = (error) => {
        console.log("WebSocket error:", error);
      };
  
      newSocket.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        if (receivedMessage?.status){
          if (receivedMessage.online_members > 1){
            setLastSeen(receivedMessage.status);
          }
          else{
            setLastSeen('Offline');
          }
        }
        else if(receivedMessage?.message){
          const isCurrentUser = receivedMessage.user_id === user_id;
          if (!isCurrentUser){
            const newMessage = {
              _id: receivedMessage._id || new Date().getTime(),
              text: receivedMessage.message || "No message text",
              createdAt: new Date(receivedMessage.createdAt || new Date()),
              user: {
                _id: receivedMessage.user_id || "user_id",
                isCurrentUser: isCurrentUser,
              },
            };
            setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessage));
          }
        }
        else if(receivedMessage?.typing_status){
          if (user_id !== receivedMessage.user_id && receivedMessage.typing_status === 'on'){
            setLastSeen('typing...');
          }
          else{
            setLastSeen('Online');
          }
        }
      };
  
      try{
        let response = await axios.get(`http://192.168.1.3:8008/rooms/?room_name=${roomName}`);
        let responseData = response.data;
        if (responseData.status){
          const updatedMessages = responseData.message_data.map((message) => {
            const isCurrentUser = message.user_id === user_id;
            return {
              _id: message.id,
              text: message.content,
              createdAt: new Date(message.created_on),
              user: {
                _id: message.user_id || 'user_id',
                isCurrentUser: isCurrentUser,
              },
            };
          });
          setMessages(updatedMessages);
        }
      }
      catch(error){
        console.log('Error while fetching messages -', error);
      }
    }
    handleSocket();
    return ()=>{
      if (newSocket) {
        newSocket.close();
        console.log("WebSocket closed!");
      }
    }
  }, []);

  const onSend = useCallback(async(newMessages = []) => {
    let userMessage = {sender: userName, message: newMessages[0].text, room_name: roomName, user_id: userID, mobile_number: mobile_number, contact_name: contactName};
    if (!isSocketConnected || !socket) {
      console.log("Socket not connected. Message not sent.");
      return;
    }

    await socket.send(JSON.stringify(userMessage));

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }, [isSocketConnected, socket]);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#ff9933"
          />
        </View>
      </Send>
    );
  };

  const onInputTextChanged = ((text) => {
    setTimeout(async()=>{
      if (!isSocketConnected || !socket) {
        console.log("Socket not connected. Message not sent.");
        return;
      }
      await socket.send(JSON.stringify({typing_status: text.length > 0 ? 'on' : 'off', user_id: userID}));
    }, 1000);
  });

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#ffff99",
          },
          right: {
            backgroundColor: "#ff9933",
          },
        }}
        textStyle={{
          left: {
            color: "#000",
            paddingVertical: 5,
          },
          right: {
            color: "#fff",
            paddingVertical: 5,
          },
        }}
      />
    );
  };
  const filteredMessages = messages.filter(message => {
    return message.created_on <= filterTime;
  });

  const renderMessageItem = ({ item }) => (
    <View style={{ marginBottom: 10 }}>
      <Text>{item.user}</Text>
      <Text>{item.content}</Text>
      <Text>{item.created_on.toString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.box}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="left" size={24} color="black" />
            <Image source={otherUser.avatar} style={styles.profileImage} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.profileName}>{otherUser.name}</Text>
            <Text style={styles.lastSeen}>{lastSeen}</Text>
          </View>
        </View>
        <View style={styles.box}>{/* Add video and call icons */}</View>
      </View>
    <View>
      <FlatList
        data={filteredMessages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessageItem}
      />
    </View>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        user={{
          _id: userID
        }}
        onInputTextChanged={onInputTextChanged}
      />
    </View>
  );
};

export default ExtraChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffff99",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    marginLeft: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  box: {
    flexDirection: "row",
  },
  lastSeen: {
    fontSize: 14,
  },
  back: {
    flexDirection: "row",
    alignItems: "center",
  },
});


