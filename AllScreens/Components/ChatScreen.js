import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import EmojiSelector from 'react-native-emoji-selector'; // Import the EmojiSelector library
import WebChat from './WebChat';

const ChatScreen = ({ route, navigation }) => {
  const { contact } = route.params;
  const [message, setMessage] = useState(''); // State to store the user's message
  const [messages, setMessages] = useState([]); // State to store chat messages
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to control emoji picker visibility

  // Function to send a message
  const sendMessage = () => {
    if (message.trim() !== '') {
      // Add the user's message to the list of messages
      setMessages([...messages, { text: message, sender: 'user' }]);
      // Clear the message input
      setMessage('');
    }
  };

  // Function to add an emoji to the message input
  const addEmoji = (emoji) => {
    setMessage(message + emoji);
  };

  // Determine whether to show the voice recording button or send button
  const showSendButton = message.trim() !== '';

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Top section */}
      <View style={styles.top}>
        {/* Back button and user info */}
        <TouchableOpacity
          style={{ margin: 10, flexDirection: 'row', alignItems: 'center', elevation: 10 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
          <Image source={require('../../assets/C.png')} style={styles.img} />
        </TouchableOpacity>
        <View>
          <Text style={styles.t1}>{contact.name}</Text>
          <Text>last seen 11:15AM</Text>
        </View>
        {/* Video call, voice call, and more options */}
          <TouchableOpacity>
            <Ionicons name="md-videocam" size={26} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={24} color="black" />
          </TouchableOpacity>
      </View>

      {/* Chat messages go here */}
      {/* <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={msg.sender === 'user' ? styles.userMessage : styles.otherMessage}>
            <Text style={styles.t2}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView> */}

      {/* Emoji selector */}
      {/* {showEmojiPicker && (
        <EmojiSelector
          showSearchBar={false}
          columns={7}
          onEmojiSelected={addEmoji}
          showTabs={false}
          showHistory={false}
          showSectionTitles={false}
        />
      )} */}

      {/* Bottom input section */}
      {/* <View style={styles.bottom}> */}
        {/* Media selection button */}
        {/* <TouchableOpacity style={styles.mediaButton}>
          <Ionicons name="ios-add-circle-outline" size={32} color="blue" />
        </TouchableOpacity> */}
        {/* Emoji picker button */}
        {/* <TouchableOpacity onPress={() => setShowEmojiPicker(!showEmojiPicker)}>
          <Ionicons name="ios-happy" size={32} color="black" />
        </TouchableOpacity> */}
        {/* Text input */}
        {/* <TextInput
          style={styles.input}
          placeholder="Type your message..."
          multiline={true}
          numberOfLines={4}
          value={message}
          onChangeText={(text) => setMessage(text)}
        /> */}
        {/* Voice recording button or Send button */}
        {/* {showSendButton ? (
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.voiceButton}>
            <Ionicons name="ios-mic" size={32} color="black" />
          </TouchableOpacity>
        )} */}
      {/* </View> */}
<WebChat/>
      </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffff99',
    paddingHorizontal: 10,
    elevation: 10,
    justifyContent: 'space-between',
  },
  img: {
    height: 40,
    width: 40,
    marginLeft: 5,
  },
  t1: {
    fontWeight: '500',
    fontSize: 20,
  },
  t2: {
    color:"white",
    fontSize: 16,
  },
  chatContainer: {
    flexGrow: 1,
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginTop:10
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '70%',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '70%',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'white',
  },
  mediaButton: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    marginLeft:10,
    maxHeight: 50,
  },
  voiceButton: {
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
