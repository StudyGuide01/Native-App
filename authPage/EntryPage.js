import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';

const EntryPage = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('../assets/home.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Title Text */}
        <View style={styles.title}>
          <Text style={styles.titleText}>The best</Text>
          <Text style={styles.titleText}>app for</Text>
          <Text style={styles.titleText}>your property</Text>
        </View>

        {/* Overlay for Sign-In Button and Account Creation */}
        <View style={styles.overlay}>
          {/* Sign-in Button */}
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Login')}>
            <View style={styles.buttonBackground} /> 
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Create an Account Text */}
          <View>
            <Text style={styles.createAccountText}>Create an account</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black', // Default background if the image fails to load
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker overlay for better text contrast
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    marginBottom: 50, // Space between title and button
    marginLeft:-100
  },
  titleText: {
    fontSize: 30,
    color: '#fff',
    marginVertical: 5,
    letterSpacing: 3,
    textShadowColor: '#000', // Shadow for embossed effect
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  button: {
    width: '90%',
    height: 50,
    borderRadius: 30,
    elevation: 5, // Adds a subtle shadow to the button for elevation
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  buttonBackground: {
    position: 'absolute',
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
    backgroundColor: '#DFF2EB', // Light greenish background color for the button
    opacity: 0.8,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', 
    zIndex: 1, // Ensure text stays on top of the background
    textShadowColor: '#000', // Adds text shadow for the embossed effect
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  createAccountText: {
    fontSize: 25,
    color: '#fff',
    marginTop: 15,
    textShadowColor: '#000', // Adds shadow to text for embossed effect
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default EntryPage;
