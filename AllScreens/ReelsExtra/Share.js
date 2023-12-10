import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Share, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const VideoShareButton = ({ video_id, initialShare }) => {
  const [shareCount, setShareCount] = useState(initialShare);
  const [videoLink, setVideoLink] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const linkResponse = await axios.get(`https://sspmitra.in/api/get_video_link?id=${video_id}`);
        setVideoLink(linkResponse.data.video_link);
      } catch (error) {
        console.error('Error fetching Share data:', error);
      }
    };

    fetchData();
  }, [video_id]);

  const storeShareCount = async (shareCount) => {
    try {
      await AsyncStorage.setItem(`shareCount_${video_id}`, shareCount.toString());
    } catch (error) {
      console.error('Error storing share count:', error);
    }
  };

  const getShareCount = async () => {
    try {
      const storedShareCount = await AsyncStorage.getItem(`shareCount_${video_id}`);
      if (storedShareCount !== null) {
        setShareCount(parseInt(storedShareCount, 10));
      }
    } catch (error) {
      console.error('Error getting share count:', error);
    }
  };

  useEffect(() => {
    getShareCount(); // Get the stored share count on component mount
  }, []);

  const onSharePress = async () => {
    try {
      const result = await Share.share({
        message: videoLink,
      });

      if (result.action === Share.sharedAction) {
        const userId = await AsyncStorage.getItem('user_id');
        await axios.put('https://sspmitra.in/videos/share/', {
          video_id: video_id,
          user_id: userId,
        });
        // Increment share count by 1
        const updatedShareCount = shareCount + 1;
        setShareCount(updatedShareCount);
        storeShareCount(updatedShareCount); // Store the updated share count
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={styles.icon}>
      <TouchableOpacity onPress={onSharePress}>
        <MaterialCommunityIcons name="share-outline" size={24} color="white" />
      </TouchableOpacity>
      <View>
        <Text style={styles.text}>{shareCount}</Text>
      </View>
    </View>
  );
};

export default VideoShareButton;

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 16,
  },
  icon: {
    marginHorizontal: 10,
    elevation: 10,
    marginTop: 5,
    alignItems: "center"
  },
});
