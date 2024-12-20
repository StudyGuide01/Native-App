import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Toast from "react-native-toast-message";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { DrawerActions } from "@react-navigation/native"; // for drawer toggle
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Import Screens
import Login from "./authPage/Login";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import DrawerContent from "./DrawerContent"; // Your custom Drawer content
import Register from "./authPage/Register";
import PhonePage from "./authPage/PhonePage";
import { useEffect, useState } from "react";
import SettingScreen from "./screens/SettingScreen";
import PropertyScreen from "./screens/PropertyScreen";
import EntryPage from "./authPage/EntryPage";
import AddPropertyScreen from './screens/AddPropertyScreen';
import AddTenantScreen from "./screens/AddTanentScreen";
import ShowTenantScreen from "./screens/ShowTenantScreen";

// Create Navigation Containers
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigation (to manage deeper screens)
const StackNav = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: "blue",
        headerStyle: {
          backgroundColor: "blue",
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <Ionicons
              name="menu"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              size={24}
              color="white"
              style={{ marginLeft: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Property" component={PropertyScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="AddProperty" component={AddPropertyScreen} />
      <Stack.Screen name='AddTenant' component={AddTenantScreen} />
      <Stack.Screen name='ShowTenant' component={ShowTenantScreen} />
    </Stack.Navigator>
  );
};

// Tab Navigation (for bottom tab navigation)
const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "blue", 
        tabBarInactiveTintColor: "gray", 
        tabBarLabelStyle: {
          marginBottom: 5,
          fontSize: 15, 
        },
        tabBarStyle: { backgroundColor: "#fff", height: 70,paddingTop:5 }, 
      }}
    >
      <Tab.Screen
        name="Home"
        component={StackNav}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={28}
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tenant"
        component={ShowTenantScreen}
        options={{
          tabBarLabel: "Tenant", 
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome
              name={focused ? "user" : "user-o"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Property"
        component={PropertyScreen}
        options={{
          tabBarLabel: "Property", 
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "hoop-house" : "greenhouse"}
              size={28}
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarLabel: "Setting", 
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "settings-outline" : "settings-sharp"}
              size={28}
              color={color} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Drawer Navigation (with TabNav inside)
const DrawerNav = ({ setIsLogedIn }) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContent {...props} setIsLogedIn={setIsLogedIn} />
      )}
      screenOptions={{
        statusBarColor: "orange",
        headerStyle: {
          backgroundColor: "orange",
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerShown: false, 
      }}
    >
      <Drawer.Screen name="Home" component={TabNav} />
    </Drawer.Navigator>
  );
};

// Login Navigation (for login and registration flow)
const LoginNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name='AddTenant' component={AddTenantScreen} /> */}
      {/* <Stack.Screen name="EntryPage" component={EntryPage} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={DrawerNav} />
    </Stack.Navigator>
  );
};

// Main App Component
export default function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);

  const getUserData = async () => {
    const data = await AsyncStorage.getItem("isLogedIn");
    setIsLogedIn(data === "true");
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <NavigationContainer>
      {isLogedIn ? <DrawerNav setIsLogedIn={setIsLogedIn} /> : <LoginNav />}
      {/* Adding Toast here to make it accessible across the entire app */}
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
