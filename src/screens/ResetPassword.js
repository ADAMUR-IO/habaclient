import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleResetPassword = () => {
    // Reset password logic goes here
    // You can implement the logic to update the password based on the new password
    // Add your logic to handle password reset
    navigation.navigate("SignIn");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.description}>
        Please enter your new password and confirm password.
      </Text>
      <Text style={styles.label}>New Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          secureTextEntry={!showPassword}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />
        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={toggleShowPassword}
        >
          <Text style={styles.passwordToggleText}>
            {showPassword ? "👁️" : "👁️"}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm new password"
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={toggleShowPassword}
        >
          <Text style={styles.passwordToggleText}>
            {showPassword ? "👁️" : "👁️"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleResetPassword}
        disabled={!newPassword || !confirmPassword}
      >
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    width: "80%", // Adjust the width as needed
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  passwordToggle: {
    padding: 5,
  },
  passwordToggleText: {
    fontSize: 20,
    color: "#12D18E",
    fontWeight: "bold",
  },
  resetButton: {
    backgroundColor: "#12D18E",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ResetPassword;
