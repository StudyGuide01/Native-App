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
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from "react-native-vector-icons/AntDesign";

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
        <View style={styles.propertyDetails}>
          <View>
            <Text style={styles.propertyText}>Rent: ${item.rent}</Text>
          </View>
          <View style={styles.propertyIcons}>
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

  const handleReverse = () => {
    navigation.navigate("Home");
  };

  return (
    <>
      <View style={styles.header}>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={handleReverse} style={styles.backButton}>
          <AntDesign name="arrowleft" color={"#fff"} size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Property</Text>
        </View>

        <View>
          <TouchableOpacity onPress={()=>navigation.navigate('AddProperty')}>
            <Text style={{color:'white'}}>Add Property</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <FlatList
            data={propertyData}
            renderItem={renderPropertyItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.imageList}
            showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
          />
        </ScrollView>
      </View>
    </>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  header: {
    backgroundColor: 'blue',
    color: '#fff',
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
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
    marginTop: 10,
    elevation: 5,
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
  propertyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  propertyIcons: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PropertyScreen;
