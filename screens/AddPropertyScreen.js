import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import { Picker } from "@react-native-picker/picker"; // Import Picker for dropdown

const FormComponent = () => {
  const [propertyName, setPropertyName] = useState("");
  const [rent, setRent] = useState("");
  const [washRoom, setWashRoom] = useState("");
  const [bedRoom, setBedRoom] = useState("");
  const [selectedItems, setSelectedItems] = useState([]); // Array for selected items
  const [image, setImage] = useState(null);

  // Handle image selection
  const selectImage = async () => {
    const result = await launchImageLibrary({ mediaType: "photo" });
    if (!result.didCancel) {
      const { uri } = result.assets[0];
      const base64 = await uriToBase64(uri); // Convert image to base64
      setImage(base64);
    }
  };

  // Convert image URI to base64 string
  const uriToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle form submit
  const submitForm = async () => {
    const formData = {
      propertyName,
      rent,
      washRoom,
      bedRoom,
      selectedItems, // Pass selectedItems as an array
      imageBase64: image,
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/property/upload",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert(response.data.message);
      setPropertyName('');
      setRent('');
      setWashRoom('');
      setBedRoom('');
      setSelectedItems([]);
      setImage(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  // Handle item selection
  const handleItemSelect = (item) => {
    if (selectedItems.includes(item)) {
      // Unselect item by removing it from the array
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      // Add item to the selected items array
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#fff" }}
      showsHorizontalScrollIndicator={false}
    >

      <View style={{alignSelf:'center',marginTop:10,width:'97%'}}>
        <Text style={styles.heading}>Add Your Property</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Property Name</Text>
        <TextInput
          placeholder="Enter property name.."
          style={styles.input}
          value={propertyName}
          onChangeText={setPropertyName}
        />

        <Text style={styles.label}>Rent</Text>
        <TextInput
          placeholder="Enter property rent.."
          style={styles.input}
          value={rent}
          onChangeText={setRent}
        />

        <Text style={styles.label}>Wash-Room</Text>
        <TextInput
          placeholder="Enter wash-room quantity.."
          style={styles.input}
          value={washRoom}
          onChangeText={setWashRoom}
        />

        <Text style={styles.label}>Bed-Room</Text>
        <TextInput
          placeholder="Enter bed-room quantity.."
          style={styles.input}
          value={bedRoom}
          onChangeText={setBedRoom}
        />

        <Text style={styles.label}>Selected Items:</Text>
        <TextInput
          placeholder="Selected items will appear here.."
          style={styles.input}
          value={selectedItems.join(", ")} // Display selected items
          editable={false}
        />
        {/* <Text style={styles.label}>Select Available Items</Text> */}
        <View style={styles.dropdownContainer}>
          {/* Render available options in a dropdown */}
          {["wifi", "borewell", "meter"].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedItems.includes(item) && styles.selectedButton,
              ]}
              onPress={() => handleItemSelect(item)}
            >
              <Text style={styles.optionText}>
                {selectedItems.includes(item) ? `✓ ${item}` : item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {image && (
          <Image
            source={{ uri: `data:image/png;base64,${image}` }}
            style={styles.image}
          />
        )}

        <View style={{marginTop:10,alignItems:'flex-end'}}>
          <TouchableOpacity onPress={selectImage}>
            <Text style={styles.imageSelectButton} >Select Image</Text>
          </TouchableOpacity>
        </View>

        {/* <Button title="Select Image" onPress={selectImage} style={{ marginBottom: 15 }} /> */}

        <View style={{marginTop:10,width:'95%',alignSelf:'center'}}>
          <TouchableOpacity onPress={submitForm}>
            <Text style={styles.submitButton}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* <Button title="Submit" onPress={submitForm} style={{ marginTop: 15 }} /> */}
      </View>
    </ScrollView>
  );
};

export default FormComponent;

const styles = StyleSheet.create({
  form: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    marginBottom:20
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 9,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 7,
    marginBottom: 10,
  },
  dropdownContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
  },
  selectedButton: {
    backgroundColor: "#6c757d",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  image:{
    width:'98%',
    height:300,
    borderRadius:8,
    alignSelf:'center'
  },
  imageSelectButton:{
    backgroundColor:'blue',
    padding:10,
    color:'#fff',
    fontSize:15,
    borderRadius:8
  },
  submitButton:{
    backgroundColor:'blue',
    color:'#fff',
    fontSize:18,
    textAlign:'center',
    paddingTop:10,
    paddingBottom:10,
    borderRadius:10
  },
  heading:{

    backgroundColor:'blue',
    color:'#fff',
    fontSize:23,
    borderBottomWidth:1,
    borderBottomColor:'gray,',
    paddingHorizontal:10,
    paddingVertical:20,
    borderRadius:10,
    textAlign:'center',
    borderWidth:0,
  }
});
