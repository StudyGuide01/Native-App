// screens/AddTenantScreen.js
import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Image, ScrollView, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';  // Fixed import
import axios from 'axios';  // Ensure axios is imported

const AddTenantScreen = () => {
    const [tenantName, setTenantName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [aadharCardNumber, setAadharCardNumber] = useState('');
    const [panCardNumber, setPanCardNumber] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state for saving data and image
    const [filePath, setFilePath] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFilePath(file);
        }
    };

    // Handle image selection
    const selectImage = async () => {
        const result = await launchImageLibrary({ mediaType: "photo" });
        if (!result.didCancel && result.assets) {
            const { uri } = result.assets[0];
            const base64 = await uriToBase64(uri);
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

    const handleSave = async () => {
        const tenantData = {
            tenantName,  // Fixed typo here
            phoneNumber,
            aadharCardNumber,
            panCardNumber,
            imageBase64: image,
        };
    
        const formData = new FormData();
        formData.append('pdf', filePath);  // Appending the PDF file to the form data
    
        // Append tenant data to the FormData
        for (const [key, value] of Object.entries(tenantData)) {
            formData.append(key, value);
        }
    
        setLoading(true); // Start loading
    
        try {
            const response = await axios.post('http://localhost:5001/user/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // Ensuring correct Content-Type for multipart
                },
            });
    
            alert('Tenant saved successfully!');
            console.log(response.data);
            // Reset form after successful submission
            setTenantName('');
            setPhoneNumber('');
            setAadharCardNumber('');
            setPanCardNumber('');
            setImage(null);
            setIsChecked(false);  // Reset checkbox
        } catch (error) {
            console.error('Error while saving tenant:', error);
            alert('Error occurred while saving the tenant');
        } finally {
            setLoading(false); // Stop loading
        }
    };
    
    return (
        <ScrollView style={{ backgroundColor: 'white' }} showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Tenant Name"
                    value={tenantName}
                    onChangeText={setTenantName}
                />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />

                <Text style={styles.label}>Aadhar Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Aadhar Number"
                    value={aadharCardNumber}
                    onChangeText={setAadharCardNumber}
                />

                <Text style={styles.label}>Pan Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter PAN Number"
                    value={panCardNumber}
                    onChangeText={setPanCardNumber}
                />

                {image && (
                    <Image
                        source={{ uri: `data:image/png;base64,${image}` }}
                        style={styles.image}
                    />
                )}

                <View style={{ marginTop: 10, alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={selectImage}>
                        <Text style={styles.imageSelectButton}>Select Image</Text>
                    </TouchableOpacity>
                </View>

                {/* File input for web */}
                <input type="file" accept="application/pdf" onChange={handleFileChange} />

                {/* Radio Button */}
                <View style={styles.radioContainer}>
                    <TouchableWithoutFeedback onPress={() => setIsChecked(!isChecked)}>
                        <View style={[styles.radioCircle, isChecked && styles.checked]}>
                            {isChecked && <View style={styles.innerCircle} />}
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.radioText}>I agree to the terms</Text>
                </View>

                {/* Show Save button only if radio is checked */}
                {isChecked && !loading && (
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                )}

                {/* Show loading spinner while saving */}
                {loading && (
                    <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 5,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    radioContainer: {
        marginBottom: 20,
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#4CAF50',
        marginRight: 10,
    },
    innerCircle: {
        width: 12,
        height: 12,
        borderRadius: 10,
        backgroundColor: '#4CAF50',
    },
    checked: {
        backgroundColor: '#4CAF50',
    },
    radioText: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    label: {
        fontSize: 18,
        fontWeight: '400',
        marginBottom: 8,
    },
    image: {
        width: '98%',
        height: 300,
        borderRadius: 8,
        alignSelf: 'center',
    },
    imageSelectButton: {
        backgroundColor: 'blue',
        padding: 10,
        color: '#fff',
        fontSize: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    loader: {
        marginTop: 20,
    },
});

export default AddTenantScreen;
