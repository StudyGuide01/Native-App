import { Text, View } from "react-native";

const ProfileScreen = () => {
 
  return (
    <View>
      <Text>Profile Screen</Text>
      
    </View>
  );
};

export default ProfileScreen;
























// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Text, View } from "react-native";

// const ProfileScreen = () => {
//   const [userData, setUserData] = useState(null);

//   const getUser = async () => {
//     const token = await AsyncStorage.getItem("token");
//     if (!token) {
//       console.error("No token found");
//       return;
//     }

//     try {
//       const response = await axios.get("http://localhost:5001/user/fetchUser", {
//         headers: {
//           Authorization: `Bearer ${token}`, // Send token in Authorization header
//         },
//       });
//       console.log("Profile Screen Data:", response.data);
//       setUserData(response.data.data); // Store user data in state
//     } catch (error) {
//       console.error("Error fetching user data:", error.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     getUser(); // Fetch user data on component mount
//   }, []);

//   return (
//     <View>
//       <Text>Profile Screen</Text>
//       {userData ? (
//         <>
//           <Text>User Name: {userData.name}</Text>
//           <Text>User Email: {userData.email}</Text>
//         </>
//       ) : (
//         <Text>Loading user data...</Text>
//       )}
//     </View>
//   );
// };

// export default ProfileScreen;
