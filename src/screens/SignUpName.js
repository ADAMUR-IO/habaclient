import React, { useState, useRef } from "react";
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

const SignUpName = () => {
  const navigation = useNavigation();  
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [activePage, setActivePage] = useState(1);

  const phoneNumberInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const handleContinue = () => {
    if (!fullName || !phoneNumber || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    navigation.navigate("SignUpGender", {
      fullName,
      phoneNumber,
      email,
      password,
    });
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpOTP")}>
          <ChevronLeftIcon size={30} color="#A9A9A9" />
        </TouchableOpacity>

        <View style={styles.slider}>
          <View style={[styles.sliderItem, activePage === 1 && styles.activeSliderItem]} />
          <View style={[styles.sliderItem, activePage === 2 && styles.activeSliderItem]} />
          <View style={[styles.sliderItem, activePage === 3 && styles.activeSliderItem]} />
          <View style={[styles.sliderItem, activePage === 4 && styles.activeSliderItem]} />
          <View style={[styles.sliderItem, activePage === 5 && styles.activeSliderItem]} />
          <View style={[styles.sliderItem, activePage === 6 && styles.activeSliderItem]} />
          <View style={[styles.sliderItem, activePage === 7 && styles.activeSliderItem]} />
        </View>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>What is your name?</Text>
          <Text style={styles.emoji}>👩🏽‍💼👨🏽‍💼</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Phone number</Text>
          <TextInput
            ref={phoneNumberInputRef}
            style={styles.input}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            ref={emailInputRef}
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            ref={passwordInputRef}
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            ref={confirmPasswordInputRef}
            style={styles.input}
            placeholder="Confirm your password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      <View style={styles.bottomContainer}>
      <TouchableOpacity style={styles.btn} onPress={handleContinue}>
          <Text style={styles.text}>Continue</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    width: "100%",
  },
  slider: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    marginLeft: -200,
    paddingHorizontal: 10,
  },
  sliderItem: {
    width: 25,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#FFF7EB",
    marginHorizontal: 5,
  },
  activeSliderItem: {
    backgroundColor: "#FF7500",
  },
  formContainer: {
    width: "80%",
    marginTop: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    marginRight: 10,
  },
  emoji: {
    fontSize: 20,
    marginBottom: 10,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
    color: "#12D18E",
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#12D18E",
    fontWeight: "bold",
    fontSize: 15,
    paddingVertical: 5,
  },
  error: {
    color: "red",
    fontSize: 13,
    marginTop: 5,
  },
  bottomContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 70,
  },
  btn: {
    width: 254,
    height: 45,
    backgroundColor: "#12D18E",
    marginVertical: 20,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SignUpName;
