import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  Clipboard,
  ToastAndroid,
} from "react-native";
import { AntDesign, Feather, FontAwesome } from "react-native-vector-icons";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Referals from "../ExtraWallet/Referals";
import { LinearGradient } from "expo-linear-gradient";

const Wallet = ({ navigation }) => {
  const [uid, setUid] = useState("");
  const [totalEarning, setTotalEarning] = useState("");
  const [performanceEarning, setPerformanceEarning] = useState("");
  const [registrationEarning, setRegistrationEarning] = useState("");
  const [level, setLevel] = useState("");
  const [code, setCode] = useState("");
  const [users, setUsers] = useState([]);

  const getUid = async () => {
    try {
      const value = await AsyncStorage.getItem("id");
      if (value !== null) {
        console.log(value);
        setUid(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const earning = async () => {
    try {
      if (uid) {
        const { data } = await axios.get(
          `https://sspmitra.in/api/performance_income/?user_id=${uid}`
        );
        console.log(data);

        setTotalEarning(data.total_amount);
        setPerformanceEarning(data.performance_income);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWallet = async () => {
    try {
      if (uid) {
        const { data } = await axios.get(
          `https://sspmitra.in/wallet?user_id=${uid}`
        );
        console.log(data);

        setCode(data.username_code);
        setLevel(data.level);
        setRegistrationEarning(data.total_income);
        setUsers(data.referred_users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const textToCopy = code;
  const copyToClipboard1 = async (textToCopy) => {
    try {
      await Clipboard.setString(textToCopy);
      // console.log("Text copied to clipboard:", textToCopy);
      ToastAndroid.show("Copied", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error copying text:", error);
    }
  };

  useEffect(() => {
    getUid();
    getWallet();
    earning();
  }, [uid]);

  return (
    <>
      <ScrollView style={{ backgroundColor: "#edebde" }}>
        <View style={{}}>
          <View
            style={{ flexDirection: "row", alignItems: "center", margin: 10 }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <AntDesign name="left" size={23} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 30 }}>
              Wallet
            </Text>
          </View>
          <View>
            <LinearGradient
              colors={["orange", "orange", "yellow"]}
              style={styles.LinearGradient}
            >
              <View style={styles.box2}>
                <Text style={styles.text4}>Level</Text>
                <Text style={styles.text4}>{level}</Text>
              </View>
              <View style={styles.box2}>
                <View style={styles.box3}>
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => copyToClipboard1(textToCopy)}
                  >
                    <Text style={styles.text5}>{code}</Text>
                    <Feather name="copy" size={16} color="blue" />
                  </TouchableOpacity>
                  <Text style={styles.text6}>Referral Code</Text>
                </View>
                <View style={styles.box3}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.text5}>{totalEarning}</Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "500",
                        textAlignVertical: "bottom",
                        marginLeft: 2,
                      }}
                    >
                      SSP Coin
                    </Text>
                  </View>
                  <Text style={styles.text6}>Total Earning</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
          <View style={{flexDirection:"row", alignSelf:"flex-end", marginTop:15, marginRight:10}}>
            <TouchableOpacity style={styles.aw} onPress={()=> navigation.navigate("Add")}>
            <FontAwesome name="plus" size={14} color="black" />
              <Text style={{...styles.text5, marginLeft:5}}>Add Funds</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.aw}>
            <FontAwesome name="minus" size={14} color="black" />
              <Text style={{...styles.text5, marginLeft:5}}>Withdrawal</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inc}>
            <View style={styles.per}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.text5}>{performanceEarning}</Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "500",
                    textAlignVertical: "bottom",
                    marginLeft: 2,
                  }}
                >
                  SSP Coin
                </Text>
              </View>
              <Text style={styles.text5}>Preformance Income</Text>
            </View>
            <View style={styles.per}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.text5}>{registrationEarning}</Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "500",
                    textAlignVertical: "bottom",
                    marginLeft: 2,
                  }}
                >
                  SSP Coin
                </Text>
              </View>
              <Text style={styles.text5}>Registration Income</Text>
            </View>
          </View>
        </View>
        <FlatList
          data={users}
          renderItem={({ item }) => <Referals item={item} />}
          contentContainerStyle={{}}
        />
      </ScrollView>
    </>
  );
};

export default Wallet;
const styles = StyleSheet.create({
  text1: {
    fontSize: 28,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 22,
    fontWeight: "bold",
  },
  text3: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text4: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text5: {
    fontSize: 16,
    fontWeight: "600",
  },
  text6: {
    fontSize: 20,
    fontWeight: "600",
  },

  box: {
    height: Dimensions.get("window").height * 0.085,
    width: Dimensions.get("window").width * 0.16,
    padding: 5,
  },
  box2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  box3: {
    alignItems: "center",
  },
  LinearGradient: {
    paddingVertical: 10,
  },
  inc: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  aw:{
    backgroundColor:"#ffff66",
    marginHorizontal:5,
    padding:10,
    elevation:10,
    flexDirection:"row",
    alignItems:"center"
  },
  per: {
    backgroundColor: "orange",
    borderRadius: 10,
    elevation: 10,
    alignItems: "center",
    height: Dimensions.get("window").height * 0.1,
    width: Dimensions.get("window").width * 0.45,
    justifyContent: "center",
  },
});
