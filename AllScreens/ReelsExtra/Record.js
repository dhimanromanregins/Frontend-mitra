import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  Alert,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import UploadedVideoScreen from './UploadedVideoScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Record = () => {
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [uid, setUid] = useState('');

useEffect(() => {
  getUid();
}, [uid]);

const getUid = async () => {
  try {
    const value = await AsyncStorage.getItem('id');
    if (value !== null) {
      setUid(JSON.parse(value));
    }
  } catch (e) {
    console.error('Error retrieving UID', e);
  }
};

  useEffect(() => {
    const getPermissions = async () => {
      if (Platform.OS !== 'web') {
        const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
        if (cameraStatus !== 'granted') {
          Alert.alert('Permission Required', 'Camera permission is required.');
        }
  
        const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();
        if (audioStatus !== 'granted') {
          Alert.alert('Permission Required', 'Microphone permission is required.');
        }
  
        const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (galleryStatus !== 'granted') {
          Alert.alert('Permission Required', 'Gallery permission is required.');
        }
      }
    };

    getPermissions();
  }, []);

  const startRecording = useCallback(async () => {
    try {
      if (!cameraRef.current) {
        throw new Error('Camera reference not found');
      }

      setIsRecording(true);
      const video = await cameraRef.current.recordAsync();
      setRecordedVideo(video.uri);
      console.log('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error.message);
      Alert.alert('Recording Error', 'Failed to start recording.');
    }
  }, []);

  const stopRecording = useCallback(() => {
    try {
      if (!cameraRef.current) {
        throw new Error('Camera reference not found');
      }

      setIsRecording(false);
      cameraRef.current.stopRecording();
      console.log('Recording stopped');
    } catch (error) {
      console.error('Error stopping recording:', error.message);
      Alert.alert('Recording Error', 'Failed to stop recording.');
    }
  }, []);

  const flipCamera = () => {
    setCameraType(
      (prevCameraType) =>
        prevCameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    );
  };

  const onCloseUploadedVideo = () => {
    setRecordedVideo(null);
  };

  const onSendUploadedVideo = async () => {
    try {
      if (!recordedVideo) {
        throw new Error('No recorded video to send');
      }
  
      const apiEndpoint = 'https://sspmitra.in/api/videos/';

      const uniqueFileName = `video_${Date.now()}.mp4`; // Create a unique filename
      const formData = new FormData();
      formData.append('file', {
        uri: recordedVideo,
        type: 'video/mp4',
        name: uniqueFileName,
      });
      formData.append('title', 'YourVideoTitle');
      formData.append('description', 'YourVideoDescription');
      formData.append('user_id', uid);
  
      const response = await axios.post(apiEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        console.log('Video sent successfully:', response.data);
        onCloseUploadedVideo(); // Close the modal after sending
      } else {
        throw new Error('Failed to send the video.');
      }
    } catch (error) {
      console.error('Error sending video:', error);
      Alert.alert('Send Error', 'Failed to send the video.');
    }
  };

  const onDiscardVideo = () => {
    try {
      if (!recordedVideo) {
        throw new Error('No recorded video to discard');
      }

      console.log('Discarding video:', recordedVideo);
      onCloseUploadedVideo(); // Close the modal after discarding
    } catch (error) {
      console.error('Error discarding video:', error.message);
      Alert.alert('Discard Error', 'Failed to discard the video.');
    }
  };

  const pickVideo = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.uri) {
        setRecordedVideo(result.uri);
      }
    } catch (error) {
      console.error('Error picking video:', error.message);
      Alert.alert('Pick Video Error', 'Failed to pick a video.');
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={flipCamera}>
            <MaterialIcons name="flip-camera-android" size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.recordButton}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <View style={isRecording ? styles.recordStop : styles.recordStart} />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickVideo}>
            <Feather name="upload" size={35} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>

      <Modal
        animationType="slide"
        transparent={true}
        visible={!!recordedVideo}
        onRequestClose={onCloseUploadedVideo}
      >
        <View style={styles.modalContainer}>
          {recordedVideo ? (
            <UploadedVideoScreen
              videoUri={recordedVideo}
              onClose={onCloseUploadedVideo}
              onSend={onSendUploadedVideo}
              onDiscard={onDiscardVideo}
            />
          ) : null}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  recordButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordStart: {
    backgroundColor: 'red',
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  recordStop: {
    backgroundColor: 'gray',
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

export default Record;
