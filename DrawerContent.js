import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Title } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const DrawerList = [
  { icon: "home-outline", label: "Home", navigateTo: "Home", color: "" },
  { icon: "account-multiple", label: "Profile", navigateTo: "Profile" },
//   { icon: "account-group", label: "User", navigateTo: "User" },
//   { icon: "bookshelf", label: "Library", navigateTo: "Library" },
];

const DrawerLayout = ({ icon, label, navigateTo, color }) => {
  const navigation = useNavigation();
  return (
    //ye jo DraweItem he ye react-nativivagation/native se milta he 
    <DrawerItem
      icon={({ color: iconColor, size }) => (
        <Icon name={icon} color={color || iconColor} size={size} />
      )}
      label={label}
      onPress={() => {
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
      color={el.color} // Pass color to DrawerLayout
    />
  ));
};

function DrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Avatar.Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1729396877734-801af2fa5709?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                  size={50}
                  style={{ marginTop: 5 }}
                />
                <View style={{ marginLeft: 10, flexDirection: "column" }}>
                  <Title style={styles.title}>Javed</Title>
                  <Text style={styles.caption} numberOfLines={1}>
                    javed@gmail.com
                  </Text>
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
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 20,
  },
  userInfoSection: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    color: "gray",
  },
  drawerSection: {
    marginTop: 15,
  },
  signOutContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
  },
});

export default DrawerContent;