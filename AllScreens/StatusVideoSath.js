// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Modal, Animated, Dimensions } from 'react-native';
// import { Camera } from 'expo-camera';
// import * as MediaLibrary from 'expo-media-library';
// import * as ImagePicker from 'expo-image-picker';
// import { Video } from 'expo-av';
// import { MaterialIcons } from '@expo/vector-icons';

// const StatusUpload = () => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [capturedMedia, setCapturedMedia] = useState(null);
//   const [caption, setCaption] = useState('');
//   const [showPreview, setShowPreview] = useState(false);
//   const [recordingTime, setRecordingTime] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
//   const cameraRef = useRef(null);
//   const scaleAnim = useRef(new Animated.Value(1)).current;
//   let interval = null;

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleRecord = async () => {
//     if (!isRecording) {
//       setIsRecording(true);
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(scaleAnim, { toValue: 1.2, duration: 500, useNativeDriver: true }),
//           Animated.timing(scaleAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
//         ]),
//       ).start();
//       interval = setInterval(() => setRecordingTime(prevTime => prevTime + 1), 1000);
//       const video = await cameraRef.current.recordAsync({ maxDuration: 30 });
//       const asset = await MediaLibrary.createAssetAsync(video.uri);
//       setCapturedMedia(asset.uri);
//       setShowPreview(true);
//     }
//   };

//   const handleStopRecording = () => {
//     if (isRecording) {
//       setIsRecording(false);
//       Animated.timing(scaleAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
//       clearInterval(interval);
//       cameraRef.current.stopRecording();
//     }
//   };

//   const handleCapture = async () => {
//     if (!isRecording) {
//       const photo = await cameraRef.current.takePictureAsync();
//       const asset = await MediaLibrary.createAssetAsync(photo.uri);
//       setCapturedMedia(asset.uri);
//       setShowPreview(true);
//     }
//   };

//   const handleSend = () => {
//     console.log('Media:', capturedMedia);
//     console.log('Caption:', caption);
//     setCapturedMedia(null);
//     setCaption('');
//     setShowPreview(false);
//   };

//   const handleDiscard = () => {
//     setCapturedMedia(null);
//     setCaption('');
//     setShowPreview(false);
//   };

//   const handlePlayPause = () => setIsPlaying(!isPlaying);

//   const flipCamera = () => setCameraType(type => (type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back));

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All, allowsEditing: true, aspect: [4, 3], quality: 1 });

//     if (!result.canceled) {
//       setCapturedMedia(result.assets[0].uri);
//       setShowPreview(true);
//     }
//   };

//   if (hasPermission === null) return <View />;
//   if (hasPermission === false) return <Text>No access to camera</Text>;

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} ref={cameraRef} type={cameraType}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity onPress={flipCamera} style={styles.flipButton}>
//             <MaterialIcons name="flip-camera-ios" size={24} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleCapture} onLongPress={handleRecord} onPressOut={handleStopRecording} style={styles.outerButton}>
//             <Animated.View style={[styles.innerButton, { transform: [{ scale: scaleAnim }] }]} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
//             <MaterialIcons name="file-upload" size={24} color="white" />
//           </TouchableOpacity>
//         </View>
//       </Camera>

//       <Modal animationType="slide" transparent={false} visible={showPreview}>
//         <TouchableOpacity onPress={handleDiscard} style={styles.previewButton}>
//           <Text style={styles.previewButtonText}>x</Text>
//         </TouchableOpacity>
//         <View style={styles.previewContainer}>
//           {capturedMedia?.endsWith('.mp4') ? (
//             <Video source={{ uri: capturedMedia }} style={styles.previewImage} shouldPlay={isPlaying} isLooping resizeMode="cover" onTouchStart={handlePlayPause} />
//           ) : (
//             <Image source={{ uri: capturedMedia }} style={styles.previewImage} />
//           )}

//           <View style={styles.previewButtonContainer}>
//             <TextInput style={styles.captionInput} onChangeText={setCaption} value={caption} placeholder="Add a caption..." />
//             <TouchableOpacity onPress={handleSend} style={styles.previewButton2}>
//               <Text style={styles.previewButtonText2}>Send</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:"black",
//     paddingTop:30
    
//   },
//   camera: {
//     height:Dimensions.get("window").height*0.8
//   },
//   buttonContainer: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//   },
//   outerButton: {
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#128C7E',
//     borderRadius: 50,
//     width: 70,
//     height: 70,
//     marginBottom: 20,
//   },
//   innerButton: {
//     backgroundColor: 'white',
//     borderRadius: 25,
//     width: 50,
//     height: 50,
//   },
//   flipButton: {
//     position: 'absolute',
//     left: 20,
//     bottom: 20,
//   },
//   uploadButton: {
//     position: 'absolute',
//     right: 20,
//     bottom: 20,
//   },
//   previewContainer: {
//     flex: 1,
//     justifyContent: 'space-between',
//     padding: 10,
//     paddingTop:0
//   },
//   previewImage: {
//     flex: 1,
//     width: '100%',
//     borderRadius: 10,
//   },
//   captionInput: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     width:Dimensions.get("window").width*0.7
//   },
//   previewButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   previewButton: {
//     padding: 10,
   
//   },
//   previewButton2: {
//     backgroundColor: '#128C7E',
//     padding: 10,
//     borderRadius: 5,
//   },
//   previewButtonText: {
//     color:"black",
//     fontSize:40

//   },
//   previewButtonText2: {
//     color: 'white',
//   },
// });

// export default StatusUpload;