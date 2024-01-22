import React, { useState, useContext } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "../components/AuthContext";
import { backendUrl } from "../../config/config";

const LoginSettings = () => {
  const navigation = useNavigation();
  const { user, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [eyeIconTimer, setEyeIconTimer] = useState(null);

  const handleSubmit = async () => {
    try {
      const token = user.token;

      const response = await axios.put(
        `${backendUrl}/api/users/change-password`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Reset input fields
      setEmail("");
      setOldPassword("");
      setNewPassword("");

      // Handle success response if needed
      navigation.navigate("Wallet");
    } catch (error) {
      console.error(error);
      // Handle error response if needed
    }
  };

  const toggleShowPassword = (field) => {
    if (field === "oldPassword") {
      if (eyeIconTimer) {
        clearTimeout(eyeIconTimer);
        setEyeIconTimer(null);
        setShowOldPassword(!showOldPassword);
      } else {
        const timer = setTimeout(() => {
          setEyeIconTimer(null);
          setShowOldPassword(false);
        }, 500);
        setEyeIconTimer(timer);
        setShowOldPassword(true);
      }
    } else if (field === "newPassword") {
      if (eyeIconTimer) {
        clearTimeout(eyeIconTimer);
        setEyeIconTimer(null);
        setShowNewPassword(!showNewPassword);
      } else {
        const timer = setTimeout(() => {
          setEyeIconTimer(null);
          setShowNewPassword(false);
        }, 500);
        setEyeIconTimer(timer);
        setShowNewPassword(true);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Settings")}
        >
          <ChevronLeftIcon size={30} color="#12D18E" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            Change Password?
            <Text style={styles.emoji}> 🔐 </Text>
          </Text>
        </View>

        <Text style={styles.title}>Email address</Text>
        <TextInput
          style={styles.input}
          value={user.email}
          onChangeText={(text) => setEmail(text)}
          placeholder={user.email}
          keyboardType="email-address"
        />

        <Text style={styles.title}>Old Password</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            value={oldPassword}
            onChangeText={(text) => setOldPassword(text)}
            placeholder="Old Password"
            secureTextEntry={!showOldPassword}
          />
          <TouchableOpacity
            style={styles.togglePassword}
            onPress={() => toggleShowPassword("oldPassword")}
          >
            <Text style={styles.togglePasswordText}>
              {showOldPassword ? "👁️" : "👁️"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>New Password</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            placeholder="New Password"
            secureTextEntry={!showNewPassword}
          />
          <TouchableOpacity
            style={styles.togglePassword}
            onPress={() => toggleShowPassword("newPassword")}
          >
            <Text style={styles.togglePasswordText}>
              {showNewPassword ? "👁️" : "👁️"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  headerContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  backButton: {
    padding: 4,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headingContainer: {
    padding: 6,
    marginTop: 2,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
  },
  emoji: {
    fontSize: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#12D18E",
    fontSize: 18,
    marginBottom: 16,
    paddingBottom: 8,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#12D18E",
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    marginBottom: 16,
    paddingBottom: 8,
  },
  togglePassword: {
    padding: 4,
  },
  togglePasswordText: {
    fontSize: 14,
    color: "#12D18E",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 70,
  },
  button: {
    width: 254,
    height: 45,
    backgroundColor: "#12D18E",
    marginVertical: 20,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default LoginSettings;
