// ChatScreen.js
import React from 'react';
import { View, Text } from 'react-native';

export default function Chatwala({ route }) {
  const { contact } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Chat with {contact.name}</Text>
      {contact.emails && contact.emails.length > 0 && (
        <Text style={{ fontSize: 16, color: '#555' }}>Email: {contact.emails[0].email}</Text>
      )}
    </View>
  );
}
