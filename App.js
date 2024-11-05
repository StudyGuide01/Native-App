// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import Login from "./authPage/Login";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Register from "./authPage/Register";
// import PhonePage from "./authPage/PhonePage";
// const Stack = createNativeStackNavigator();
// // U27EXBWE43DDT16C2ECPTMB6

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
      
//       screenOptions={{
//         headerShown:false
//       }}
//       >
//         <Stack.Screen name="Login" component={Login}/>
//         <Stack.Screen name="Register" component={Register}/>
//         <Stack.Screen name="Phone" component={PhonePage}/>
//       </Stack.Navigator>
      
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });


import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Login from "./authPage/Login";
import Register from "./authPage/Register";
import PhonePage from "./authPage/PhonePage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Phone" component={PhonePage} />
      </Stack.Navigator>

      {/* Adding Toast here to make it accessible in the entire app */}
      <Toast />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
