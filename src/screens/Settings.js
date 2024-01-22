import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftOnRectangleIcon,
} from "react-native-heroicons/outline";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import avatar from "../../assets/images/avatar.png";

import { backendUrl } from '../../config/config';
import { AuthContext } from "../components/AuthContext";

const Settings = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const [profileImage, setProfileImage] = useState(null);
  const [imageKey, setImageKey] = useState(0);
  const [profileName, setProfileName] = useState("Tekla");
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await useFonts({
        Rubik: require("../../assets/fonts/static-Rubik/Rubik-Regular.ttf"),
        Inter: require("../../assets/fonts/static/Inter-Regular.ttf"),
      });
      setIsFontsLoaded(true);
    };

    loadFonts();
  }, []);

  const settings = [
    { id: 1, content: "Account Settings", route: "AccountSettings" },
    { id: 2, content: "Login Setting", route: "LoginSettings" },
    { id: 3, content: "Transactions", route: "Transactions" },
    { id: 4, content: "Contact Us", route: "ServiceCenter" },
    { id: 5, content: "Privacy and Security", route: "PrivacyAndSecurity" },
  ];

  const handleChangeProfileImage = async () => {
    const userToken = user.token;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      setProfileImage(selectedAsset.uri);

      try {
        const formData = new FormData();
        formData.append("profileImage", {
          uri: selectedAsset.uri,
          name: "profile.jpg",
          type: "image/jpeg",
        });

        const response = await axios.post(
          `${backendUrl}/api/uploads`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.status === 200) {
          const imageURL = `${backendUrl}/${response.data.filePath}`;

          // Replace backslashes with forward slashes in the image URL
          const cleanedImageURL = imageURL.replace(/\\/g, "/");

          setProfileImage(cleanedImageURL);
          console.log(cleanedImageURL);

          // Store the profile image URL in AsyncStorage using the user's unique identifier (user.id).
          try {
            await AsyncStorage.setItem(
              `profileImage_${user.id}`,
              cleanedImageURL
            );
          } catch (error) {
            console.log(
              "Error storing profile image URL in AsyncStorage:",
              error
            );
          }
        } else {
          console.log("Failed to update profile picture");
        }
      } catch (error) {
        console.log("Network error occurred");
      }
    }
  };

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        if (user && user.token) {
          // Fetch the user-specific profile image URL from AsyncStorage using the user ID.
          const imageURL = await AsyncStorage.getItem(
            `profileImage_${user.id}`
          );
          if (imageURL) {
            setProfileImage(imageURL);
          }
        }
      } catch (error) {
        console.log("Error loading profile image from AsyncStorage:", error);
      }
    };

    loadProfileImage();
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Wallet")}
      >
        <ChevronLeftIcon size={30} color="#12D18E" />
      </TouchableOpacity>

      <View style={styles.profile}>
        <TouchableOpacity onPress={handleChangeProfileImage}>
          <View style={styles.profileImageContainer}>
            <Image
              key={imageKey}
              source={profileImage ? { uri: profileImage } : avatar}
              style={styles.profileImage}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.profileNameContainer}>
          <Text style={styles.profileName}>{user.fullName}</Text>
        </View>
      </View>

      {settings.map((setting) => (
        <TouchableOpacity
          key={setting.id}
          onPress={() => navigation.navigate(setting.route)}
          style={styles.settingItem}
        >
          <Text style={styles.settingItemText}>{setting.content}</Text>
          <ChevronRightIcon size={20} color="#363853" />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={() => navigation.navigate("SignIn")}
        style={styles.logOutButton}
      >
        <ArrowLeftOnRectangleIcon size={30} color="#FF3333" />
        <Text style={styles.logOutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5F9",
    marginLeft: 30,
    marginRight: 20,
  },
  backButton: {
    marginLeft: 10,
    marginTop: 20,
  },
  profile: {
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  profileImageContainer: {
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 48,
  },
  profileNameContainer: {
    marginTop: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "500",
    fontFamily: "Rubik",
    textAlign: "center",
    color: "#1C2541",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  settingItemText: {
    fontFamily: "Inter",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
    color: "#1C2541",
    letterSpacing: 0.5,
  },
  logOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
  logOutText: {
    fontFamily: "Rubik",
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: "#FE212E",
    paddingTop: 10,
  },
});

export default Settings;
