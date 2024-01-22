import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

import { backendUrl } from '../../config/config';

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/users/generate-otp`,
        {
          email: email,
        }
      );

      navigation.navigate("SignUpOTP", { email: email });
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error occurred during API call:", error.response.data);
      } else {
        console.error("Error occurred during API call:", error);
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={{ marginTop: 6, paddingLeft: 2 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Onboarding")}>
          <ChevronLeftIcon size={30} color="#A9A9A9" />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 6, marginTop: 10 }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#333333",
            marginBottom: 8,
            marginRight: 8,
          }}
        >
          Hello there{" "}
          <Text role="img" aria-label="wave">
            👋
          </Text>
        </Text>
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 14,
            fontWeight: "500",
            lineHeight: 18,
            textAlign: "left",
            color: "#999999",
            marginBottom: 4,
          }}
        >
          Please enter your Email. We will send you an OTP for verification in
          the next step
        </Text>

        <Text style={{ fontWeight: "bold", marginTop: 4, marginBottom: 5 }}>
          Email or phone number
        </Text>

        <TextInput
          value={email}
          style={{
            borderBottomWidth: 2,
            borderBottomColor: "#12D18E",
            fontWeight: "bold",
          }}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          onBlur={handleSignUp}
          maxLength={100}
          minLength={1}
          placeholder="user@haba.com"
        />

        {error && <Text style={{ color: "red", marginTop: 4 }}>{error}</Text>}
      </View>

      <View style={styles.container}>
        <TouchableOpacity disabled={!email} onPress={handleSignUp}>
          <View style={styles.btn}>
            <Text style={styles.text}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
  },
  btn: {
    width: 254,
    height: 45,
    backgroundColor: "#12D18E",
    margin: 10,
    borderRadius: 40,
    alignItems: "center",
    fontSize: 30,
  },
  text: {
    color: "white",
    padding: 8,
    fontSize: 20,
    fontWeight: "bold",
  },
});
