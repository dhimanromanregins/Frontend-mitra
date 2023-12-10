// WebChat.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, KeyboardAvoidingView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import io from 'socket.io-client';

const WebChat = () => {
  const route = useRoute();
  const [socket, setSocket] = useState(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const roomName = route?.params?.roomName;

    if (roomName) {
      const newSocket = io(`https://wechatpp.azurewebsites.net/ws/${roomName}`);

      newSocket.on('connect', () => {
        console.log('Socket connected');
        setIsSocketConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
        setIsSocketConnected(false);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [route?.params?.roomName]);

  useEffect(() => {
    if (socket) {
      socket.on('message', (newMessage) => {
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off('message');
      };
    }
  }, [socket]);

  const sendMessage = () => {
    if (!isSocketConnected) {
      console.warn('Socket not connected. Message not sent.');
      return;
    }

    if (message.trim() === '') {
      console.warn('Empty message. Not sent.');
      return;
    }

    socket.emit('message', { text: message, roomName: route.params.roomName });

    setMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: 'space-between' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        data={chatMessages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.text}</Text>}
        style={{ flex: 1, marginBottom: 10 }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Type your message..."
          style={{ flex: 1, marginRight: 10, borderWidth: 1, padding: 8 }}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default WebChat;
