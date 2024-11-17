import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, TextInput, View, Text, SafeAreaView, Image, StyleSheet, Modal, TouchableWithoutFeedback, Platform } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';  // Import axios for API calls
import Toast from 'react-native-toast-message';  // Import Toast for notifications
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Cookies from 'js-cookie'; // Use js-cookie for web


const Login = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [userData, setUserData] = useState({});
  console.log(userData.length);

  const getGoogleUser = async () => {
    try {
      const res = await axios.get("http://localhost:5001/login/success", {
        withCredentials: true,
      });
      console.log("Response", res);
      setUserData(res.data.user);
      console.log(res.data.user);

      if (res.data.user) {
        // If user data is available, navigate to Register
        // await AsyncStorage.setItem("token", res.data.user.token);
        // await AsyncStorage.setItem("isLogedIn", JSON.stringify(true));
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log("Error fetching Google user data:", error);
    }
  };

  useEffect(() => {
    getGoogleUser();
  }, []);

  const loginWithGoogle = () => {
    const data = window.open("http://localhost:5001/auth/google", "_self");
    console.log(data);
  };

  const sendOTP = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/otp/sendOTP', { phoneNumber }, {
        withCredentials: true, // Allow cookies to be sent and received
      });
      setModalVisible(true);
      Toast.show({
        type: 'success',
        text1: 'OTP Sent',
        text2: res.data.message,
      });
    } catch (error) {
      setModalVisible(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response ? error.response.data.message : "Failed to send OTP",
      });
    }
  };

  const verifyOTPHandler = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/otp/verifyOTP', { phoneNumber, otp }, {
        withCredentials: true, // Allow cookies to be sent and received
      });

      if (res.data.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'OTP Verified successfully!',
        });

        if (Platform.OS !== 'web') {
          const cookies = await Cookies.getAll();
          console.log('Cookies after OTP verification (Native):', cookies);
          const authToken = cookies['auth_token']; 
          console.log('Auth Token (Native):', authToken);
        } else {
          const authToken = Cookies.get('auth_token'); 
          console.log('Auth Token (Web):', authToken);
        }

        await AsyncStorage.setItem("token", res.data.user.token);
        await AsyncStorage.setItem("isLogedIn", JSON.stringify(true));

        setModalVisible(false);
        navigation.navigate('Home');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'OTP verification failed!',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response ? error.response.data.message : "Failed to verify OTP",
      });
    }
  };

  const handleLoginClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/loginHome.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.loginHeading}>
        <Text style={styles.loginHeadignWel}>Welcome Back</Text>
        <Text style={styles.loginMessage}>Login to your account</Text>
      </View>

      <View style={styles.input}>
        <Feather name="phone" size={20} color={'green'} />
        <TextInput
          style={styles.textInput}
          placeholder="Enter Your Number"
          placeholderTextColor={'green'}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <View style={styles.button}>
        <TouchableOpacity onPress={sendOTP}>
          <View>
            <Text style={styles.buttonText}>Sent OTP</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ textAlign: 'center', alignSelf: 'center', marginVertical: 20 }}>
        <Text style={{ color: 'green', borderBottomWidth: 1, borderBottomColor: 'green' }}>OR SIGN IN WITH</Text>
      </View>


      <View style={{ alignSelf: 'center', flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity  onPress={loginWithGoogle}>

        <Image source={require('../assets/google-logo.png')} style={styles.socialImage} />
        </TouchableOpacity>
      
        <Image source={require('../assets/facebook-logo.png')} style={styles.socialImage} />
      </View>

      {/* Modal Dialog Box */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalBackdrop}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Verify OTP</Text>

                <View style={styles.input}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter Your OTP"
                    placeholderTextColor={'green'}
                    keyboardType="phone-pad"
                    maxLength={6}
                    value={otp}
                    onChangeText={setOtp}
                  />
                </View>

                {otp.length === 6 ? (
                  <TouchableOpacity onPress={verifyOTPHandler} style={styles.modalButton}>
                    <Text style={styles.modalButtonText}>Verify OTP</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  image: {
    width: "100%",
    height: 300,
    borderBottomLeftRadius: "10%",
    borderBottomRightRadius: "50%",
  },
  loginHeading: {
    alignSelf: "center",
    marginTop: 20,
  },
  loginHeadignWel: {
    fontSize: 30,
    color: "green",
  },
  loginMessage: {
    textAlign: 'center',
    color: 'gray',
  },
  input: {
    backgroundColor: 'rgba(169, 169, 169, 0.3)',
    marginTop: 15,
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
  textInput: {
    flex: 1,
    borderWidth: 0,
    outlineWidth: 0,
    color: 'black',
  },
  button: {
    marginTop: 10,
    fontSize: 15,
    alignSelf: 'center',
    backgroundColor: 'rgba(169, 169, 169, 0.3)',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonText: {
    color: 'green',
    fontSize: 20,
  },
  socialImage: {
    width: 25,
    height: 25,
    backgroundColor: '#fff',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    color: 'green',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Login;
