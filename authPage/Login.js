import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions, View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Phone from 'react-native-vector-icons/AntDesign';

const { width: screenWidth } = Dimensions.get('window');
// U27EXBWE43DDT16C2ECPTMB6

// U27EXBWE43DDT16C2ECPTMB6
export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmail = (emailText) => {
    setEmail(emailText);
    setEmailVerify(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailText));
  };

  const handlePassword = (passwordText) => {
    setPassword(passwordText);
    setPasswordVerify(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(passwordText));
  };

  const handleSubmit = async () => {
    if (emailVerify && passwordVerify) {
      const userData = { email, password };
      try {
        const res = await axios.post('http://localhost:5001/user/login', userData, {  // Replace with your local IP
          headers: { 'Content-Type': 'application/json' },
        });
        Alert.alert("Login Successful", res.data.message);
        navigation.navigate('Register');
      } catch (error) {
        console.error("Login Error:", error.toJSON());
        Alert.alert("Login Error", error.response?.data?.message || "Unable to login. Please try again.");
      }
    } else {
      Alert.alert("Invalid Input", "Please enter a valid email and password.");
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
      <View>
        <Image source={require('../assets/LoginPage.png')} style={styles.image} />
        <View style={styles.loginHeading}>
          <Text style={styles.loginText}>Login</Text>
        </View>
        <View>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter your email"
              style={styles.input}
              value={email}
              onChangeText={handleEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {email.length > 0 && (
              <Feather
                name={emailVerify ? "check-circle" : "x-circle"}
                color={emailVerify ? "green" : "red"}
                size={20}
                style={styles.icon}
              />
            )}
          </View>
          {!emailVerify && email.length > 0 && (
            <Text style={styles.errorText}>Enter a valid email address.</Text>
          )}

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter your password"
              style={styles.input}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={handlePassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {password.length > 0 && (
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  color={passwordVerify ? "green" : "red"}
                  size={20}
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>
          </View>
          {!passwordVerify && password.length > 0 && (
            <Text style={styles.errorText}>
              Password must be 8-20 characters, with uppercase, lowercase, number, and special character.
            </Text>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.phone}>
            <TouchableOpacity style={styles.phoneButton} onPress={() => navigation.navigate('Phone')}>
              <Phone
                name="phone"
                size={24}
                style={styles.phoneIcon}
              />
              <Text style={styles.phoneText}>Phone</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Don't have an account?{' '}
              <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
                Register
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: screenWidth,
    height: screenWidth,
    resizeMode: 'contain',
  },
  loginHeading: {
    alignSelf: 'center',
    marginVertical: 15,
  },
  loginText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    width: '90%',
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    height: 45,
    width: '100%',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  icon: {
    position: 'absolute',
    right: 10,
    marginTop: -15,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    color: '#333',
  },
  registerLink: {
    fontWeight: 'bold',
    color: 'blue',
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginBottom: 5,
  },
  phone: {
    marginTop: 15,
    // alignItems: 'center',
    width:'90%',
    alignSelf:'center'
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
  },
  phoneIcon: {
    color: 'white',
    marginRight: 8,
  },
  phoneText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
