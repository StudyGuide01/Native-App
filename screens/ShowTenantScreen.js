import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FlatList, Image, Text, View, StyleSheet, ActivityIndicator,ScrollView } from 'react-native';

const ShowTenantScreen = () => {
  const [tenantData, setTenantData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/user/fetchTanent');
        console.log(response.data.data); // Logs the full array of tenant data
        setTenantData(response.data.data); // Set the entire array as state
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTenantData();
  }, []);

  const renderTenantItem = ({ item }) => (
    <View style={styles.tenantContainer}>

      <View>
      {/* Displaying base64 image */}
      {item.imageBase64 ? (
        <Image
          source={{ uri: `data:image/jpeg;base64,${item.imageBase64}` }}
          style={styles.image}
        />
      ) : (
        <Text>No image available</Text>
      )}
</View>

<View>
      <Text style={styles.tenantName}>{`${item.tenantName}`}</Text>
      <Text>{`Phone Number : ${item.phoneNumber}`}</Text>
      <Text>{`Aadhar Number : ${item.aadharCardNumber}`}</Text>
      <Text>{`Pan Number : ${item.panCardNumber}`}</Text>
      </View>
      {/* Optionally display the file path if needed */}
      {/* {item.filePath && <Text>{`File Path: ${item.filePath}`}</Text>} */}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
    <View>
      <Text style={styles.title}>Show Tenant</Text>
      <FlatList
        data={tenantData} // Displaying the full list of tenants
        renderItem={renderTenantItem} // How to display each tenant
        keyExtractor={(item) => item._id ? item._id.toString() : item.phoneNumber} // Fallback to phone number if _id is not available
      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  tenantContainer: {
    marginBottom: 15,
flexDirection:'row',
justifyContent:'space-between',
gap:10,
    paddingHorizontal:15,
    paddingVertical:10,
    backgroundColor: '#C2FFC7',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2, // For Android shadow
    borderRadius:12
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50, // Round image if it's a profile picture
    // alignSelf: 'center', // Center the image horizontally
  },
  tenantName:{
fontSize:25,
color:'black',
fontWeight:'bold'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default ShowTenantScreen;
