import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PropertyScreen = (props) => {
  const navigation = useNavigation();
  const [propertyData, setPropertyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const response = await axios.get("http://localhost:5001/property/images");
        setPropertyData(response.data.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllImages();
  }, []);

  const renderPropertyItem = ({ item }) => (
    <View style={styles.propertyItemContainer}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${item.imageBase64}` }}
        style={styles.propertyImage}
      />
      <View style={styles.propertyInfoContainer}>
        <Text style={styles.propertyName}>{item.propertyName}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.propertyText}>Rent: ${item.rent}</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Text style={styles.propertyText}>
              <FontAwesome name="bed" size={12} /> {item.bedRoom}
            </Text>
            <Text style={styles.propertyText}>
              <MaterialIcons name="airline-seat-legroom-reduced" size={12} />
              {item.washRoom}
            </Text>
          </View>
        </View>
      </View>
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
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddProperty")}
        style={styles.addPropertyButton}
      >
        <Text style={styles.addPropertyText}>Add Property</Text>
      </TouchableOpacity>

      <Text style={styles.headerText}>Uploaded Images and Data:</Text>

      <FlatList
        data={propertyData}
        renderItem={renderPropertyItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.imageList}
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
      />
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  addPropertyButton: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    marginVertical: 10,
  },
  addPropertyText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  imageList: {
    paddingBottom: 20,
  },
  propertyItemContainer: {
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  propertyImage: {
    width: width - 20, // Full width minus padding
    height: 200,
    resizeMode: "cover",
  },
  propertyInfoContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },
  propertyText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  propertyName: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PropertyScreen;
