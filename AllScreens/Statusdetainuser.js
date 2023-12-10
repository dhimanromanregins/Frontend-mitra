// DynamicStatus.js
import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailedStatus = () => {
  const [userStatuses, setUserStatuses] = useState([]);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [uid, setUid] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const getUid = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      if (value !== null) {
        setUid(JSON.parse(value));
      }
    } catch (e) {
      console.error("Error retrieving UID", e);
    }
  };

  useEffect(() => {
    getUid();
  }, []);

  const timerDuration = 5000;

  useEffect(() => {
    const fetchUserStatuses = async () => {
      try {
        const response = await axios.get(`https://sspmitra.in/status/list/?user_id=${uid}`);
        const data = response.data;
        setUserStatuses(data.user_statuses);
      } catch (error) {
        console.error('Error fetching user statuses:', error);
      }
    };

    fetchUserStatuses();
  }, [uid]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStatusIndex < userStatuses.length - 1) {
        setCurrentStatusIndex((prevIndex) => prevIndex + 1);
      } else {
        setCurrentStatusIndex(0);
      }
    }, timerDuration);

    return () => clearTimeout(timer);
  }, [currentStatusIndex, userStatuses]);

  const handleCardPress = () => {
    if (isExpanded) {
      if (currentStatusIndex < userStatuses.length - 1) {
        setCurrentStatusIndex((prevIndex) => prevIndex + 1);
      } else {
        setCurrentStatusIndex(0);
      }
    } else {
      setIsExpanded(true);
    }
  };

  const handleBackButtonPress = () => {
    setIsExpanded(false);
  };

  return (
    <View style={styles.container}>
      {isExpanded ? (
        <View style={styles.expandedContainer}>
          <TouchableOpacity onPress={handleCardPress}>
            <Image
              source={{ uri: userStatuses[currentStatusIndex].file }}
              style={styles.expandedImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <Text style={styles.caption}>{userStatuses[currentStatusIndex].caption}</Text>
          <TouchableOpacity style={styles.backButton} onPress={handleBackButtonPress}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.cardContainer} onPress={handleCardPress}>
          <Card containerStyle={styles.card}>
            <Image
              source={{ uri: userStatuses[currentStatusIndex].file }}
              style={styles.cardImage}
            />
            <Text style={styles.cardCaption}>{userStatuses[currentStatusIndex].caption}</Text>
          </Card>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  cardContainer: {
    flex: 1,
  },
  expandedContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  expandedImage: {
    flex: 1,
    width: '100%',
  },
  caption: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: 'white',
    fontSize: 18,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  card: {
    borderRadius: 10,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardCaption: {
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
});

export default DetailedStatus;