import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const ShowTenantScreen = () => {
  const navigation = useNavigation();
  const [tenantData, setTenantData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/user/fetchTanent"
        );
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

  const renderTenantItem = ({ item, index }) => {
    // Set card color based on index (red, yellow, green, repeat)
    const cardColors = ["#98FB98", "#EEE8AA", "#E6E6FA"];
    const cardColor = cardColors[index % 3];

    return (
      <View style={[styles.tenantContainer, { backgroundColor: cardColor }]}>
        <View>
          {/* Displaying base64 image */}
          {item.imageBase64 ? (
            <Image
              source={{ uri: `data:image/jpeg;base64,${item.imageBase64}` }}
              style={styles.image}
            />
          ) : (
            <Text style={{marginTop:33,marginLeft:20}}>CN</Text>
          )}
        </View>

        <View>
          <Text style={styles.tenantName}>{`${item.tenantName}`}</Text>
          <Text>{`Phone Number: ${item.phoneNumber}`}</Text>
          <Text>{`Aadhar Number: ${item.aadharCardNumber}`}</Text>
          <Text>{`Pan Number: ${item.panCardNumber}`}</Text>
        </View>
      </View>
    );
  };

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
    <View style={styles.container}>
      <View style={styles.showTenantHeader}>
        <TouchableOpacity onPress={handleReverse}>
          <AntDesign name="arrowleft" color={"#fff"} size={25} />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Tenant</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
        <FlatList
          data={tenantData} // Displaying the full list of tenants
          renderItem={renderTenantItem} // How to display each tenant
          keyExtractor={(item) =>
            item._id ? item._id.toString() : item.phoneNumber
          } // Fallback to phone number if _id is not available
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  showTenantHeader: {
    backgroundColor: "blue",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: "absolute", // Fixing header at top
    top: 0,
    width: "100%",
    zIndex: 10,
  },
  headerTextContainer: {
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    
  },
  headerText: {
    textAlign: "center",
    color: "#fff",
    alignSelf: "center",
    fontSize:25,
    marginLeft:80
  },
  container: {
    flex: 1,
    paddingTop: 60, // Adjusting for fixed header
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
    width:'90%',
    alignSelf:'center',
    marginTop: 0, // Adjusting to ensure scrollable content starts after the header
  },
  tenantContainer: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50, // Round image if it's a profile picture
  },
  tenantName: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default ShowTenantScreen;
