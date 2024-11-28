import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Title } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; 
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; 
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DrawerList = [
  { icon: "home-outline", label: "Home", navigateTo: "Home" },
  { icon: "account-multiple", label: "Profile", navigateTo: "Profile" },
  // { icon: "greenhouse", label: "Property", navigateTo: "Property" },
  { icon: "settings", label: "Setting", navigateTo: "Setting" },
  { icon: "hoop-house", label: "AddProperty", navigateTo: "AddProperty" }

];

const DrawerLayout = ({ icon, label, navigateTo }) => {
  const navigation = useNavigation();
  return (
    <DrawerItem
      icon={({ color: iconColor, size }) => {
        if (icon === "settings") {
          return <MaterialIcons name={icon} color={iconColor} size={size} />;
        }
        return <Icon name={icon} color={iconColor} size={size} />;
      }}
      label={label}
      onPress={() => {
        // console.log(navigation);
        // console.log(navigateTo);
        //  navigation.navigate('Profile');
        navigation.navigate(navigateTo);
      }}
    />
  );
};

const DrawerItems = () => {
  return DrawerList.map((el, i) => (
    <DrawerLayout
      key={i}
      icon={el.icon}
      label={el.label}
      navigateTo={el.navigateTo}
    />
  ));
};

const DrawerContent = ({ setIsLogedIn, ...props }) => {
  const navigation = useNavigation();

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("isLogedIn");
      setIsLogedIn(false);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error during sign out", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Avatar.Image
                  source={{
                    uri: "https://example.com/avatar.jpg",
                  }}
                  size={50}
                />
                <View style={{ marginLeft: 10 }}>
                  <Title style={styles.title}>User</Title>
                  <Text style={styles.caption}>user@example.com</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.drawerSection}>
            <DrawerItems />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.signOutContainer}>
        <DrawerItem
          onPress={signOut}
          icon={({ color, size }) => <Icon name="exit-to-app" color={color} size={size} />}
          label="Sign Out"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: "gray",
  },
  drawerSection: {
    marginTop: 15,
  },
  signOutContainer: {
    marginBottom: 15,
  },
});

export default DrawerContent;
