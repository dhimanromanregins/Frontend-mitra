// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const EditProfileScreen = ({navigation}) => {
//   const [image, setImage] = useState(null);
//   const [name, setName] = useState("");
//   const [bio, setBio] = useState("");
//   const [uid, setUid] = useState('');

//   useEffect(() => {
//     getUid();
//   }, [uid]);

//   const getUid = async () => {
//     try {
//       const value = await AsyncStorage.getItem('id');
//       if (value !== null) {
//         setUid(JSON.parse(value));
//         console.log("id", uid);
//       }
//     } catch (e) {
//       console.error('Error retrieving UID', e);
//     }
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 4],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.uri);
//     }
//   };

//   const updateProfile = async () => {
//     let formData = new FormData();
//     formData.append("profile_photo", {
//       uri: image,
//       name: "profile_photo.jpg",
//       type: "image/jpg",
//     });
//     formData.append("name", name);
//     formData.append("bio", bio);
//     formData.append("id", uid);

//     try {
//       const response = await axios.put(
//         `https://sspmitra.in/profile/update/`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(response.data);
//       navigation.navigate("Profile")
//     } catch (error) {
//       console.error("Error updating", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Change Profile Picture</Text>
//       <View style={styles.box1}>
//         <View style={styles.box}>
//           {image ? (
//             <Image source={{ uri: image }} style={styles.image} />
//           ) : (
//             <Image
//               source={require("../../assets/man.png")}
//               style={styles.image}
//             />
//           )}
//         </View>

//         <TouchableOpacity style={styles.pen} onPress={pickImage}>
//           <MaterialCommunityIcons
//             name="circle-edit-outline"
//             size={30}
//             color="black"
//           />
//         </TouchableOpacity>
//       </View>
//       {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
//       <Text style={styles.label}>Name</Text>
//       <TextInput style={styles.input} onChangeText={setName} value={name} />
//       <Text style={styles.label}>Bio</Text>
//       <TextInput style={styles.input} onChangeText={setBio} value={bio} />

//       <TouchableOpacity style={styles.button} onPress={updateProfile} >
//       <Text style={styles.label}>Save</Text>
//       </TouchableOpacity>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 4,
//     padding: 10,
//     fontSize: 16,
//     marginTop: 5,
//   },
//   box: {
//     alignItems: "center",
//     marginTop: 20,
//     borderWidth: 2,
//     padding: 5,
//     width: 120,
//     height: 120,
//     borderRadius: 100,
//     justifyContent: "center",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     borderRadius:100,
//   },
//   box1:{
//     alignItems:"center"
//   },
//   pen:{
//     bottom:30,
//     left:30,
//     backgroundColor:"white",
//     borderRadius:100
//   },
//   button:{
//     marginTop:20,
//     backgroundColor:"#ffff99",
//     padding:10,
//     alignItems:"center",
//     borderRadius:10,

//   }
// });

// export default EditProfileScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraRollPermission, setCameraRollPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const getUid = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      if (value !== null) {
        setUid(JSON.parse(value));
        // console.log("id", uid);
      }
    } catch (e) {
      console.error("Error retrieving UID", e);
    }
  };

  useEffect(() => {
    getUid();
  }, [uid]);

  const checkPermissions = async () => {
    const cameraPermissionResult = await Camera.requestCameraPermissionsAsync();
    const cameraRollPermissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    setCameraPermission(cameraPermissionResult.status);
    setCameraRollPermission(cameraRollPermissionResult.status);
  };

  // Select an image from the camera roll
  const selectImageFromCameraRoll = async () => {
    if (cameraRollPermission !== "granted") {
      alert("Camera roll permission is required to select images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setSelectedImage(result.uri);
      postImage(result.uri);
    }
  };

  // Upload the selected image to the server
  const postImage = async (imageUri) => {
    try {
      const uniqueFileName = `photoRitesh_${Date.now()}.png`;

      const formData = new FormData();
      formData.append("profile_photo", {
        uri: imageUri,
        name: uniqueFileName,
        type: "image/jpg",
      });
      formData.append("name", name);
      formData.append("bio", bio);
      formData.append("id", uid);
      const response = await axios.post(
        `https://sspmitra.in/profile/update/`,
        formData
      );

      console.log("POST Response:", response.data);

      // After successfully posting the image, fetch it from the server
      fetchImageFromApi();
    } catch (error) {
      console.error("POST Error:", error);
    }
  };

  // Fetch the user's profile image from the server
  const fetchImageFromApi = async () => {
    try {
      const response = await axios.get(
        `https://sspmitra.in/profile/update/?user_id=${uid}`
      );

      console.log("yyyy", response.data.profile_pic);
      setImage(response.data.profile_photo);
      setBio(response.data.bio);
      setName(response.data.name);
    } catch (error) {
      console.error("GET  Error:", error);
    }
  };

  const updateProfile = async () => {
    const uniqueFileName = `photoRitesh_${Date.now()}.png`;

    let formData = new FormData();
    formData.append("profile_photo", {
      uri: image,
      name: uniqueFileName,
      type: "image/jpg",
    });
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("id", uid);

    try {
      const response = await axios.post(
        `https://sspmitra.in/profile/update/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Error updating", error);
    }
  };

  const getImageFromApi = async () => {
    try {
      const response = await axios.get(
        `https://sspmitra.in/profile/update/?user_id=${uid}`
      );
      console.log("Get Response", response);
      setImage(response.data.profile_photo);
      setBio(response.data.bio);
      setName(response.data.name);
    } catch (error) {
      // Log the entire error object for debugging
      console.error("GET Image Error:", error);
    }
  };
  useEffect(() => {
    getUid();
    checkPermissions();
  }, []);

  useEffect(() => {
    getUid();
    getImageFromApi();
  }, [uid]);

  useEffect(() => {
    getImageFromApi();
  }, [image]);
  return (
    <View style={styles.container}>
     <View style={{flexDirection:"row", alignItems:"center"}}>
     <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={24} color="red" />
      </TouchableOpacity>
      <Text style={styles.label1}>Change Profile Picture</Text>
     </View>
      <View style={styles.box1}>
        <View style={styles.box}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Image source={{ uri: image }} style={styles.image} />
          )}
        </View>

        <TouchableOpacity
          style={styles.pen}
          onPress={selectImageFromCameraRoll}
        >
          <MaterialCommunityIcons
            name="circle-edit-outline"
            size={30}
            color="black"
          />
        </TouchableOpacity>
      </View>
      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} onChangeText={setName} value={name} />
      <Text style={styles.label}>Bio</Text>
      <TextInput style={styles.input} onChangeText={setBio} value={bio} />

      <TouchableOpacity style={styles.button} onPress={updateProfile}>
        <Text style={styles.label}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label1: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft:50,
    color:"red"

  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
marginTop:10
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    marginTop: 5,
  },
  box: {
    alignItems: "center",
    marginTop: 20,
    borderWidth: 2,
    padding: 5,
    width: 120,
    height: 120,
    borderRadius: 100,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  box1: {
    alignItems: "center",
  },
  pen: {
    bottom: 30,
    left: 30,
    backgroundColor: "white",
    borderRadius: 100,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#ffff99",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
});

export default EditProfileScreen;
