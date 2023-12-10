import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Modal, Animated, Dimensions, ToastAndroid } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const StatusUpload = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [uid, setUid] = useState('');
  const [capturedMedia, setCapturedMedia] = useState(null);
  const [caption, setCaption] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const cameraRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);


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
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCapture = async () => {
    const photo = await cameraRef.current.takePictureAsync();
    const asset = await MediaLibrary.createAssetAsync(photo.uri);
    setCapturedMedia(asset);
    setShowPreview(true);
  };

  const handleSend = async () => {
  
      const uniqueFileName = `photoRitesh_${Date.now()}.png`;
      const formData = new FormData();
      formData.append('user_id', uid); // Replace '123' with the actual user ID
      formData.append('file', {
        uri: capturedMedia.uri,
        type: 'image/jpg',
        name: uniqueFileName,
      });
      formData.append('caption', caption);

      try {
        const response = await axios.post('https://sspmitra.in/status/upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        ToastAndroid.show("Image uploaded successfully!", ToastAndroid.SHORT);

          console.log('upload' , response);
          setCapturedMedia(null);
          setCaption('');
          setShowPreview(false);
          // Additional actions after successful upload
       navigation.goBack();
      } catch (error) {
        console.error('Error:', error);
        // Handle Axios error
      }
  };

  const handleDiscard = () => {
    setCapturedMedia(null);
    setCaption('');
    setShowPreview(false);
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
  
      if (!result.canceled) {
        // Check if 'assets' property is available, otherwise fallback to 'uri'
        const selectedAsset = result.assets ? result.assets[0] : { uri: result.uri };
  
        setCapturedMedia(selectedAsset);
        setShowPreview(true);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
  

  const flipCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} type={cameraType}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={flipCamera} style={styles.flipButton}>
            <MaterialIcons name="flip-camera-ios" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCapture} style={styles.outerButton}>
            <Animated.View style={[styles.innerButton, { transform: [{ scale: scaleAnim }] }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
            <MaterialIcons name="file-upload" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>

      <Modal animationType="slide" transparent={false} visible={showPreview}>
        <TouchableOpacity onPress={handleDiscard} style={styles.previewButton}>
          <Text style={styles.previewButtonText}>x</Text>
        </TouchableOpacity>
        <View style={styles.previewContainer}>
          {capturedMedia && capturedMedia.uri ? (
            <Image source={{ uri: capturedMedia.uri }} style={styles.previewImage} />
          ) : null}

          <View style={styles.previewButtonContainer}>
            <TextInput
              style={styles.captionInput}
              onChangeText={setCaption}
              value={caption}
              placeholder="Add a caption..."
            />
            <TouchableOpacity onPress={handleSend} style={styles.previewButton2}>
              <Text style={styles.previewButtonText2}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 30,
  },
  camera: {
    height: Dimensions.get('window').height * 0.8,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  outerButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#128C7E',
    borderRadius: 50,
    width: 70,
    height: 70,
    marginBottom: 20,
  },
  innerButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  flipButton: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  uploadButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 0,
  },
  previewImage: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
  },
  captionInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.7,
  },
  previewButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  previewButton: {
    padding: 10,
  },
  previewButton2: {
    backgroundColor: '#128C7E',
    padding: 10,
    borderRadius: 5,
  },
  previewButtonText: {
    color: 'black',
    fontSize: 40,
  },
  previewButtonText2: {
    color: 'white',
  },
});

export default StatusUpload;
