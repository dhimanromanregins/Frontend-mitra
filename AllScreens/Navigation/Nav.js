import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, MaterialIcons, Entypo, Fontisto, AntDesign } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Reel from '../Screens/Reel';
import Whatsapp from '../Screens/Whatsapp';
import Zoom from '../Screens/Zoom';
import { Dimensions, Image } from 'react-native';
import Chat from '../TopTab/Chat';
import Status from '../TopTab/Status';
import Calls from '../TopTab/Calls';
import ChatScreen from '../Components/ChatScreen';
import Chatcall from '../Components/Chatcall';
import Profile from '../Screens/Profile';
import Referral from '../Extra/Referral';
import SignUp from '../Screens/SignUp';
import Login from '../Screens/Login';
import CommentScreen from '../ReelsExtra/Comments';
import Record from '../ReelsExtra/Record';
import AddStatus from '../StatusExtra/AddStatus';
import ViewStatus from '../StatusExtra/ViewStatus';
import DetailedStatus from '../StatusExtra/DetailedStatus';
import UploadedVideoScreen from '../ReelsExtra/UploadedVideoScreen';
import EditProfileScreen from '../ExtraProfile/EditProfileScreen';
import Forgotten from '../Screens/Forgotten';
import Reset from '../Screens/Reset';
import ContactList from '../Components/ContactList';
import Chatwala from '../Components/Chatwala';
import VideoShareButton from '../ReelsExtra/Share';
import Wallet from '../ExtraProfile/Wallet';
import ProfilePage from '../ExtraProfile/ProfilePage';
import Join from '../ExtraZoom/Join';
import JoiningPage from '../ExtraZoom/JoiningPage';
import Total from '../ExtraZoom/Total';
import ExtraChat from '../ExtraChat';
import Sockets from '../Socket';
import Ott from '../Screens/Ott';
import JustAddedMovies from '../ExtraOtt/JustAddedMovies';
import Report from '../ReelsExtra/Report';
import OthersStatus from '../StatusExtra/OthersStatus';
import Streaming from '../ExtraOtt/Streaming';
import Add from '../ExtraWallet/Add';


const TopTab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <TopTab.Navigator tabBar={() => null}>
    
      <Tab.Screen name="Reel" component={Reel}  options={{  }}  />
      <Tab.Screen name="Ott" component={Ott}  options={{  }}  />
    </TopTab.Navigator>
  );
}

function Top() {
  return (
    <TopTab.Navigator
     initialRouteName="Chat"
          
          screenOptions={{
            tabBarLabelStyle: { fontSize: 15, marginBottom: 5, fontWeight:"bold", paddingTop:10, },
            // tabBarInactiveTintColor: "#cccccc",
            // tabBarActiveTintColor: "#ff0055",
            tabBarStyle: {
              backgroundColor:"#ffff99",
            },
            headerShown: false,
          }}>
      <Tab.Screen name="Chat"  
       options={{
              tabBarLabel: "Chat",
             
            }} component={Chat} />
      <Tab.Screen name="Status" component={Status} />
      <Tab.Screen name="Calls" component={Calls} />
    </TopTab.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function Bottom() {
    return (
        <Tab.Navigator
          initialRouteName="MyTab"
          
          screenOptions={{
            tabBarShowLabel: false,
            tabBarLabelStyle: { fontSize: 10, marginBottom: 5 },
            tabBarInactiveTintColor: "#cccccc",
            tabBarActiveTintColor: "#ff0055",
            tabBarStyle: {
              height: Dimensions.get("window").height*0.07,
              position: "absolute",
              backgroundColor:"white",
              flex:1
            },
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Wahtsapp"
            component={Top}
            options={{
              tabBarLabel: "Whatsapp",
              tabBarIcon: ({ color }) => (
                <Fontisto name="hipchat" size={24} color={color} />
              ),
            }}
          />
        <Tab.Screen
            name="MyTab"
            component={MyTabs}
            options={{
              tabBarLabel: "MyTab",
              tabBarIcon: ({ color }) => (
                <Image source={require('../../assets/M.png')} style={{ width: 40, height: 40, tintColor: {color}, backgroundColor:"#d9d9d9", borderRadius:100, padding:25 }} />
              ),
            }}
          />
          <Tab.Screen
            name="Zoom"
            component={Zoom}
            options={{
              tabBarLabel: "Zoom",
              tabBarIcon: ({ color }) => (
                <AntDesign name="team" size={24} color={color}/>
                 ),
            }}
          />
         
          
        </Tab.Navigator>
      );
}
const Stack = createNativeStackNavigator();


function Nav (props){
    return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
       
        headerTintColor: 'yellow',
        headerTitleAlign: 'center',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25
        }
    }}
    >

   
   
    <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }}/>
    <Stack.Screen name="Bottom" component={Bottom}  options={{ headerShown: false }}/>
    <Stack.Screen name="Top" component={Top}  options={{ headerShown: false }}/>
    <Stack.Screen name="MyTabs" component={MyTabs}  options={{ headerShown: false }}/>
    <Stack.Screen name="Reel" component={Reel}  options={{ headerShown: false }}/>
    <Stack.Screen name="Ott" component={Ott}  options={{ headerShown: false }}/>
    <Stack.Screen name="SignUp" component={SignUp}  options={{ headerShown: false }}/>
    <Stack.Screen name="Reset" component={Reset}  options={{ headerShown: false }}/>
    <Stack.Screen name="Forgotten" component={Forgotten}  options={{ headerShown: false }}/>
    <Stack.Screen name="Whatsapp" component={Whatsapp}  options={{ headerShown: false }}/>
    <Stack.Screen name="Zoom" component={Zoom}  options={{ headerShown: false }}/>
    <Stack.Screen name="ChatCall" component={Chatcall}  options={{ headerShown: false }}/>
    <Stack.Screen name="Chats" component={ChatScreen}  options={{ headerShown: false }}/>
    <Stack.Screen name="Profile" component={Profile}  options={{ headerShown: false }}/>
    <Stack.Screen name="Referral" component={Referral}  options={{ headerShown: false }}/>
    <Stack.Screen name="Comments" component={CommentScreen}  options={{ headerShown: false }}/>
    <Stack.Screen name="Record" component={Record}  options={{ headerShown: false }}/>
    <Stack.Screen name="AddStatus" component={AddStatus}  options={{ headerShown: false }}/>
    <Stack.Screen name="ViewStatus" component={ViewStatus}  options={{ headerShown: false }}/>
    <Stack.Screen name="DetailedStatus" component={DetailedStatus}  options={{ headerShown: false }}/>
    <Stack.Screen name="UploadedVideoScreen" component={UploadedVideoScreen}  options={{ headerShown: false }}/>
    <Stack.Screen name="EditProfileScreen" component={EditProfileScreen}  options={{ headerShown: false }}/>
    <Stack.Screen name="ContactList" component={ContactList}  options={{ headerShown: false }}/>
    <Stack.Screen name="Chatwala" component={Chatwala}  options={{ headerShown: false }}/>
    <Stack.Screen name="Share" component={VideoShareButton}  options={{ headerShown: false }}/>
    <Stack.Screen name="Wallet" component={Wallet}  options={{ headerShown: false }}/>
    <Stack.Screen name="ProfilePage" component={ProfilePage}  options={{ headerShown: false }}/>
    <Stack.Screen name="Join" component={Join}  options={{ headerShown: false }}/>
    <Stack.Screen name="JoiningPage" component={JoiningPage}  options={{ headerShown: false }}/>
    <Stack.Screen name="Total" component={Total}  options={{ headerShown: false }}/>
    <Stack.Screen name="ExtraChat" component={ExtraChat}  options={{ headerShown: false }}/>
    <Stack.Screen name="Sockets" component={Sockets}  options={{ headerShown: false }}/>
    <Stack.Screen name="JustAddedMovies" component={JustAddedMovies}  options={{ headerShown: false }}/>
    <Stack.Screen name="Report" component={Report}  options={{ headerShown: false }}/>
    <Stack.Screen name="OthersStatus" component={OthersStatus}  options={{ headerShown: false }}/>
    <Stack.Screen name="Streaming" component={Streaming}  options={{ headerShown: false }}/>
    <Stack.Screen name="Add" component={Add}  options={{ headerShown: false }}/>
    
    
   


    </Stack.Navigator>
        </NavigationContainer>
    )

}
export default Nav