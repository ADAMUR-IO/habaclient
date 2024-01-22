import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useFonts } from "expo-font";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

import { backendUrl } from '../../config/config';
import { AuthContext } from "../components/AuthContext";


const SignIn = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIconTimer, setEyeIconTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [success, setSuccess] = useState(false);
 

  const [loaded] = useFonts({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
    Rubik: require("../../assets/fonts/static-Rubik/Rubik-Regular.ttf"),
    Inter: require("../../assets/fonts/static/Inter-Regular.ttf"),
    QuickSand: require("../../assets/fonts/static-quicksand/Quicksand-Regular.ttf"),
  });

  const handleSubmit = async (navigation) => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${backendUrl}/api/users/login`,

        {
          email,
          password,
        }
      );

      setLoading(false);
      
      const userInfo = response.data;

      setSuccess(true);
      login(userInfo);
      setPassword("");
      navigation.navigate("Wallet");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setLoginError("Failed to log in. Please try again.");
    }
  };

  const toggleShowPassword = () => {
    if (eyeIconTimer) {
      clearTimeout(eyeIconTimer);
      setEyeIconTimer(null);
      setShowPassword(!showPassword);
    } else {
      const timer = setTimeout(() => {
        setEyeIconTimer(null);
        setShowPassword(false);
      }, 500);
      setEyeIconTimer(timer);
      setShowPassword(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Onboarding")}>
          <ChevronLeftIcon size={30} color="#12D18E" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          Welcome Back
          <Text role="img" aria-label="wave">
            👋
          </Text>
        </Text>

        <Text style={styles.description}>
          Please enter your registered email and password.
        </Text>

        <Text style={styles.label}>Email</Text>

        <TextInput
          style={styles.input}
          placeholder="example@example.com"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.label}>Password</Text>

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Enter your password"
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
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
        <View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {loginError ? <Text style={styles.error}>{loginError}</Text> : null}
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => handleSubmit(navigation)}
        >
          <Text style={styles.continueButtonText}>
            {loading ? "Loading..." : "Continue"}
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomLinksContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
          <Text style={styles.separator}>/</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },
  header: {
    marginTop: 30,
    paddingLeft: 2,
  },
  content: {
    padding: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: "#666666",
  },
  label: {
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#12D18E",
    fontWeight: "bold",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0,
    borderBottomColor: "#12D18E",
    fontWeight: "bold",
  },
  passwordInput: {
    flex: 1,
  },
  passwordToggle: {
    padding: 5,
  },
  passwordToggleText: {
    fontSize: 20,
    color: "#12D18E",
    fontWeight: "bold",
  },
  bottomLinksContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  linkText: {
    color: "#4285F4",
    fontWeight: "bold",
  },
  separator: {
    color: "#333333",
    marginHorizontal: 5,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  bottomContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 70,
    marginTop: 80,
  },
  continueButton: {
    width: 254,
    height: 45,
    backgroundColor: "#12D18E",
    marginVertical: 20,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SignIn;
