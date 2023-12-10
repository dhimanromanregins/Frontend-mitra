import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const ViewStatus = () => {
  // Sample data for status updates (replace with your own data)
  const statusUpdates = [
    {
      id: '1',
      username: 'John Doe',
      timeAgo: '2 hours ago',
      imageUrl: require('../../assets/1.png'),
    },
    {
      id: '2',
      username: 'Jane Smith',
      timeAgo: '4 hours ago',
      imageUrl: require('../../assets/1.png'),
    },
    {
      id: '3',
      username: 'Jane Smith',
      timeAgo: '4 hours ago',
      imageUrl: require('../../assets/1.png'),
    },
    {
      id: '4',
      username: 'John Doe',
      timeAgo: '2 hours ago',
      imageUrl: require('../../assets/1.png'),
    },
    {
      id: '5',
      username: 'Jane Smith',
      timeAgo: '4 hours ago',
      imageUrl: require('../../assets/1.png'),
    },
    {
      id: '6',
      username: 'Jane Smith',
      timeAgo: '4 hours ago',
      imageUrl: require('../../assets/1.png'),
    },
    {
      id: '7',
      username: 'John Doe',
      timeAgo: '2 hours ago',
      imageUrl: require('../../assets/1.png'),
    },
    {
      id: '8',
      username: 'Jane Smith',
      timeAgo: '4 hours ago',
      imageUrl: require('../../assets/1.png'),
    },
    {
      id: '9',
      username: 'Jane Smith',
      timeAgo: '4 hours ago',
      imageUrl: require('../../assets/1.png'),
    },
    {
      id: '10',
      username: 'John Doe',
      timeAgo: '2 hours ago',
      imageUrl: require('../../assets/1.png'),
    },
    {
      id: '11',
      username: 'Jane Smith',
      timeAgo: '4 hours ago',
      imageUrl: require('../../assets/1.png'),
    },
    {
      id: '12',
      username: 'Jane Smith',
      timeAgo: '4 hours ago',
      imageUrl: require('../../assets/1.png'),
    },
    // Add more status updates as needed
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {statusUpdates.map((status) => (
          <View key={status.id} style={styles.statusContainer}>
            <Image
              source={status.imageUrl}
              style={styles.statusImage}
            />
            <View style={styles.statusInfo}>
              <Text style={styles.statusUsername}>{status.username}</Text>
              <Text style={styles.statusTime}>{status.timeAgo}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  statusImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  statusInfo: {
    marginLeft: 15,
  },
  statusUsername: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusTime: {
    color: '#777',
  },
});

export default ViewStatus;
