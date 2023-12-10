import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

const Zoom = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={{ backgroundColor: '#fff2e6' }}>
      <View
        style={{
          backgroundColor: '#ffff99',
          height: Dimensions.get('screen').height * 0.07,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          flexDirection: 'row',
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Mitra Team Meeting</Text>
      </View>

      <View style={styles.box}>
        <TouchableOpacity
          style={styles.b1}
          onPress={() => navigation.navigate('Join')}
        >
          <Text style={styles.text}> Join</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.b1}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.text}> Host</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="pop"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.x}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Entypo name="cross" size={24} color="black" />
              </TouchableOpacity>
              <View style={styles.link}>
                <Text style={{ fontSize: 16, marginRight: 20, padding: 5 }}>
                  www.mitra.con/gsedvbfygsba
                </Text>
                <Pressable>
                  <MaterialIcons name="file-copy" size={20} color="black" />
                </Pressable>
              </View>
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => navigation.navigate('JoiningPage')}
              >
                <Text style={styles.textStyle}>Enter Meeting</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.box2}>
        <View style={styles.imgBox}>
          <Image
            source={require('../../assets/bg2.png')}
            style={styles.img}
          />
        </View>
        <Text style={styles.text2}>Make Your Meeting Safe</Text>
        <Text style={styles.text3}>
          no one join without your invitation
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  b1: {
    backgroundColor: '#ff8c1a',
    borderRadius: 50,
    paddingHorizontal: 50,
    paddingVertical: 8,
  },
  box: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
  },
  box2: {
    alignItems: 'center',
    marginTop: 140,
  },
  imgBox: {
    width: 200,
    height: 200,
    borderRadius: 1000,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  text2: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text3: {
    fontSize: 16,
    fontWeight: '300',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 22,
    height: Dimensions.get('window').height * 0.4,
    width: Dimensions.get('window').width * 0.8,
  },
  modalView: {
    backgroundColor: '#ffff99',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#ff8c1a',
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  x: {
    alignSelf: 'flex-end',
  },
  link: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    margin: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Zoom;
