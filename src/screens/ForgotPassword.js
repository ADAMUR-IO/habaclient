import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import { backendUrl } from "../../config/config";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const handleSendRecoveryEmail = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/users/forgot-password`,
        { email }
      );

      console.log(response);

      if (response.status === 200) {
        navigation.navigate("ForgotPasswordReset", { email });
      } else {
        console.error("Failed to send recovery email");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.description}>
        Please enter your email address to receive a recovery email.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity
        style={styles.sendButton}
        onPress={handleSendRecoveryEmail}
        disabled={!email} 
      >
        <Text style={styles.sendButtonText}>Send Recovery Email</Text>
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
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  sendButton: {
    backgroundColor: "#12D18E",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForgotPassword;
