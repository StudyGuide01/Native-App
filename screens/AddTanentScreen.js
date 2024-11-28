// screens/AddTenantScreen.js
import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Image, ScrollView, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddTenantScreen = () => {
    const navigation = useNavigation();
    const [tenantName, setTenantName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [aadharCardNumber, setAadharCardNumber] = useState('');
    const [panCardNumber, setPanCardNumber] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filePath, setFilePath] = useState(null);
    const [message, setMessage] = useState('');
    const [nameMessage, setNameMessage] = useState('');
    const [phoneMessage, setPhoneMessage] = useState('');
    const [aadharMessage, setAadharMessage] = useState('');
    const [panMessage, setPanMessage] = useState('');

    const selectImage = async () => {
        const result = await launchImageLibrary({ mediaType: "photo" });
        if (!result.didCancel && result.assets) {
            const { uri } = result.assets[0];
            const base64 = await uriToBase64(uri);
            setImage(base64);
        }
    };

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

    const validateInputs = () => {
        let isValid = true;

        setNameMessage('');
        setPhoneMessage('');
        setAadharMessage('');
        setPanMessage('');

        if (tenantName === '') {
            setNameMessage('Name is required.');
            isValid = false;
        }

        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setPhoneMessage('Phone number must include country code and be valid.');
            isValid = false;
        }

        const aadharRegex = /^[0-9]{12}$/;
        if (!aadharRegex.test(aadharCardNumber)) {
            setAadharMessage('Aadhar number must be 12 digits.');
            isValid = false;
        }

        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!panRegex.test(panCardNumber)) {
            setPanMessage('PAN number is invalid.');
            isValid = false;
        }

        return isValid;
    };

    const handleSave = async () => {
        if (!validateInputs()) {
            return;
        }

        const tenantData = {
            tenantName,
            phoneNumber,
            aadharCardNumber,
            panCardNumber,
            imageBase64: image,
        };

        const formData = new FormData();
        formData.append('pdf', filePath);

        for (const [key, value] of Object.entries(tenantData)) {
            formData.append(key, value);
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5001/user/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Tenant saved successfully!');
            resetForm();
        } catch (error) {
            setMessage('Some error occurred while submitting the form');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setTenantName('');
        setPhoneNumber('');
        setAadharCardNumber('');
        setPanCardNumber('');
        setImage(null);
        setIsChecked(false);
        setFilePath(null);
    };

    const handleInputChange = (field, value) => {
        switch (field) {
            case 'tenantName':
                setTenantName(value);
                if (value !== '') setNameMessage('');
                break;
            case 'phoneNumber':
                setPhoneNumber(value);
                if (/^\+?[1-9]\d{1,14}$/.test(value)) setPhoneMessage('');
                break;
            case 'aadharCardNumber':
                setAadharCardNumber(value);
                if (/^[0-9]{12}$/.test(value)) setAadharMessage('');
                break;
            case 'panCardNumber':
                setPanCardNumber(value);
                if (/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) setPanMessage('');
                break;
            default:
                break;
        }
    };

    return (
        <ScrollView style={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.backArrow}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Add New Tenant</Text>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Tenant Name"
                        value={tenantName}
                        onChangeText={(text) => handleInputChange('tenantName', text)}
                    />
                    {nameMessage && <Text style={styles.errorMessage}>{nameMessage}</Text>}
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Phone Number"
                        value={phoneNumber}
                        onChangeText={(text) => handleInputChange('phoneNumber', text)}
                        keyboardType="numeric"
                    />
                    {phoneMessage && <Text style={styles.errorMessage}>{phoneMessage}</Text>}
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Aadhar Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Aadhar Number"
                        value={aadharCardNumber}
                        onChangeText={(text) => handleInputChange('aadharCardNumber', text)}
                        keyboardType="numeric"
                    />
                    {aadharMessage && <Text style={styles.errorMessage}>{aadharMessage}</Text>}
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>PAN Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter PAN Number"
                        value={panCardNumber}
                        onChangeText={(text) => handleInputChange('panCardNumber', text)}
                    />
                    {panMessage && <Text style={styles.errorMessage}>{panMessage}</Text>}
                </View>

                {image && <Image source={{ uri: `data:image/png;base64,${image}` }} style={styles.image} />}

                <TouchableOpacity style={styles.imageSelectButton} onPress={selectImage}>
                    <Text style={styles.buttonText}>Select Image</Text>
                </TouchableOpacity>

                <View style={styles.radioContainer}>
                    <TouchableWithoutFeedback onPress={() => setIsChecked(!isChecked)}>
                        <View style={[styles.radioCircle, isChecked && styles.checked]}>
                            {isChecked && <View style={styles.innerCircle} />}
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.radioText}>Upload PDF</Text>
                </View>

                {isChecked && !loading && (
                    <input type="file" accept="application/pdf" onChange={(e) => setFilePath(e.target.files[0])} style={{marginBottom:10}}/>
                )}

                {message && <Text style={styles.errorMessage}>{message}</Text>}

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

                {loading && <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: '#f9f9f9',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        width: '90%',
        alignSelf: 'center',
        marginTop: 25,
    },
    backArrow: {
        flexDirection: 'row',
        backgroundColor:'blue',
        paddingVertical:10,
        paddingHorizontal:10,
        alignItems: 'center',
        textAlign:'center',
        marginBottom: 20,
        borderRadius:8
    },
    headerText: {
        fontSize: 22,
        textAlign:'center',
        fontWeight: 'bold',
        marginLeft: 20,
        color: '#fff',
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 15,
    },
    imageSelectButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
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
        color: '#333',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    loader: {
        marginTop: 20,
    },
});

export default AddTenantScreen;
