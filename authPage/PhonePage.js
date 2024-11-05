import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, TextInput } from "react-native";
import Toast from 'react-native-toast-message';

const PhonePage = () => {
  const navigation = useNavigation();
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const sendOTP = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/otp/sendOTP', { phoneNumber });
      setVerifyOTP(true);
      Toast.show({
        type: 'success',
        text1: 'OTP Sent',
        text2: res.data.message,
      });
    } catch (error) {
      setVerifyOTP(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response ? error.response.data.message : "Failed to send OTP",
      });
    }
  };

  const verifyOTPHandler = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/otp/verifyOTP', { phoneNumber, otp });
      if (res.data.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'OTP Verified successfully!',
        });
        navigation.navigate('Login');
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

  return (
    <View style={styles.mainContainer}>
      {verifyOTP ? (
        <>
          <Text style={styles.heading}>Verify Number</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter OTP"
              style={styles.input}
              keyboardType="phone-pad"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={verifyOTPHandler}>
              <Text style={styles.button}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.heading}>Login With Number</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter Number"
              style={styles.input}
              keyboardType="phone-pad"
              maxLength={15}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={sendOTP}>
              <Text style={styles.button}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <Toast />
    </View>
  );
};

export default PhonePage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 10,
  },
  inputContainer: {
    marginTop: 20,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: 'blue',
    color: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 5,
    fontSize: 15,
    fontWeight: '700',
  },
});
