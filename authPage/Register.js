import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Error from "react-native-vector-icons/MaterialIcons";

const { width: screenWidth } = Dimensions.get("window"); // Get device screen width

export default function Register() {
  const navigation = useNavigation(); // Uncommented and initialized navigation
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameVerify, setNameVerify] = useState(false);
  const [emailVerify, setEmailVerify] = useState(false);
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    const userData = { name, email, password };

    try {
      const res = await axios.post('http://localhost:5001/user/register', userData);
      if(res.data.success){
        alert('user created successfully');
navigation.navigate('Login')
        setName('');
        setEmail('');
        setPassword('')
      }
      console.log(res.data);
    } catch (error) {
      console.error("Axios error:", error.response ? error.response.data : error.message);
    }
  };

  // Input handlers with validation
  const handleName = (text) => {
    setName(text);
    setNameVerify(text.length > 1);
  };

  const handleEmail = (text) => {
    setEmail(text);
    setEmailVerify(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text)
    );
  };

  const handlePassword = (text) => {
    setPassword(text);
    setPasswordVerify(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        text
      )
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ backgroundColor: "white" }}>
        <Image
          source={require("../assets/LoginPage.png")}
          style={styles.image}
        />
        <View style={styles.loginHeading}>
          <Text style={styles.loginText}>Register</Text>
        </View>

        <View>
          {/* Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              placeholder="Enter your name"
              style={styles.input}
              value={name}
              onChangeText={handleName}
            />
            {name.length === 0 ? null : nameVerify ? (
              <Feather
                name="check-circle"
                color="green"
                size={20}
                style={styles.icon}
              />
            ) : (
              <Error name="error" color="red" size={20} style={styles.icon} />
            )}
          </View>
          {name.length < 1
            ? null
            : !nameVerify && (
                <Text style={{ marginLeft: 20, color: "red" }}>
                  Name should be more than 1 character
                </Text>
              )}

          {/* Email Input */}
          <View style={styles.inputContainer}>
            {/* <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              style={styles.input}
              value={email}
              onChangeText={handleEmail}
            /> */}

            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              style={styles.input}
              value={email}
              onChangeText={handleEmail}
            />
            {email.length === 0 ? null : emailVerify ? (
              <Feather
                name="check-circle"
                color="green"
                size={20}
                style={styles.icon}
              />
            ) : (
              <Error name="error" color="red" size={20} style={styles.icon} />
            )}
          </View>
          {email.length < 1
            ? null
            : !emailVerify && (
                <Text style={{ marginLeft: 20, color: "red" }}>
                  Enter a valid email address.
                </Text>
              )}

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              style={styles.input}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={handlePassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Feather
                name={
                  password.length === 0
                    ? null
                    : showPassword
                    ? "eye"
                    : "eye-off"
                }
                color={passwordVerify ? "green" : "red"}
                size={23}
                style={{marginTop:25,marginRight:25}}
              />
            </TouchableOpacity>
          </View>
          {password.length < 1
            ? null
            : !passwordVerify && (
                <Text style={{ marginLeft: 20, color: "red" }}>
                  Password must contain at least 8 characters, one uppercase
                  letter, one lowercase letter, one number, and one special
                  character.
                </Text>
              )}

          {/* Submit Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Already have an account?{" "}
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: screenWidth,
    height: screenWidth,
    resizeMode: "contain",
  },
  loginHeading: {
    alignSelf: "center",
    marginVertical: 15,
  },
  loginText: {
    fontSize: 30,
    fontWeight: "bold",
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
    position: "relative",
    width: "90%",
    alignSelf: "center",
  },
  input: {
    height: 45,
    width: '90%',
    alignSelf: 'center',
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
    position: "absolute",
    right: 10, // Position the icon to the right inside the input field
    top: 12,
    marginTop: 25, // Center the icon vertically within the input field
    marginRight:25
  },
  eyeIcon: {
    position: "absolute",
    right: 10, // Position the eye icon to the right inside the input field
    top: 12, // Center the eye icon vertically within the input field
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 50, // Makes the button rounded
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  registerText: {
    fontSize: 16,
    color: "#333",
  },
  registerLink: {
    fontWeight: "bold",
    color: "blue",
  },
});
