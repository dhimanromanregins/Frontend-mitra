import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, KeyboardAvoidingView } from 'react-native';
import io from 'socket.io-client';

const Sockets = ({route}) => {

  const { room } = route.params;

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const socket = io(`ws://139.84.135.204:8001/ws/`); // Replace with your server address
  // const socket = io(`ws://139.84.135.204:8001/ws/${room}`); // Replace with your server address

  useEffect(() => {
    // Event listener for incoming messages
    socket.on('chat-message', (message) => {
        console.log("Socket connected");
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      socket.emit('chat-message', messageInput);
      console.log("message", messageInput);
      setMessageInput(messageInput);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        {messages.map((msg, index) => (
          <Text key={index}>{messageInput}</Text>
        ))}
      </ScrollView>
      <KeyboardAvoidingView behavior="padding">
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
          <TextInput
            style={{ flex: 1, borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10 }}
            value={messageInput}
            onChangeText={text => setMessageInput(text)}
            placeholder="Type your message"
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Sockets;
