import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

import { backendUrl } from '../../config/config';

const SetPin = ({ route }) => {
  const navigation = useNavigation();
  const [activePage, setActivePage] = useState([1, 2, 3, 4, 5]);
  const [pinCode, setPinCode] = useState("");
  const [pinValid, setPinValid] = useState(false);
  const pinInputRef = useRef(null);
  const {
    fullName,
    phoneNumber,
    email,
    password,
    gender,
    dateOfBirth,
    selectedId,
    selfieWithId,
    emergencyContact,
    acceptedTermsAndConditions,
  } = route.params;

  const getSliderItemStyle = (page) => {
    if (activePage.includes(page)) {
      return styles.orangeSliderItem;
    }
    return null;
  };

  const handlePinCodeChange = (value) => {
    if (value.length === 4) {
      setPinValid(true);
    } else {
      setPinValid(false);
    }
    setPinCode(value);
  };

  const handleSubmit = async () => {
    if (!pinValid) {
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/users/register`,
        {
          fullName,
          phoneNumber,
          email,
          password,
          gender,
          dateOfBirth,
          selectedId,
          selfieWithId,
          emergencyContact,
          acceptedTermsAndConditions,
          pinCode,
        }
      );

      if (response.status === 201) {
        console.log("Registration successful");
        console.log("Registered User Data:", {
          fullName,
          phoneNumber,
          email,
          password,
          gender,
          dateOfBirth,
          selectedId,
          selfieWithId,
          emergencyContact,
          acceptedTermsAndConditions,
          pinCode,
        });
        navigation.navigate("SignUpBonus");
      } else {
        console.log("Registration failed");
        // Handle error case
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("SignUpBonus")}
        >
          <ChevronLeftIcon size={30} color="#A9A9A9" />
        </TouchableOpacity>

        <View style={styles.slider}>
          {[1, 2, 3, 4, 5, 6, 7].map((page) => (
            <View
              key={page}
              style={[styles.sliderItem, getSliderItemStyle(page)]}
            />
          ))}
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Set your pin code!
          <Text role="img" aria-label="padlock">
            🔐
          </Text>
        </Text>

        <Text style={styles.subtitle}>
          Please set up a PIN to secure your account. We will require your PIN
          to complete every transaction.
        </Text>

        <TextInput
          style={[
            styles.input,
            pinValid ? styles.validInput : styles.invalidInput,
          ]}
          value={pinCode}
          onChangeText={handlePinCodeChange}
          keyboardType="number-pad"
          maxLength={4}
          ref={pinInputRef}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSubmit} disabled={!pinValid}>
          <View style={[styles.btn, !pinValid && styles.btnDisabled]}>
            <Text style={styles.btnText}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "flex-start",
    marginTop: 10,
  },
  backButton: {},
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  slider: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  sliderItem: {
    width: 25,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#FFF7EB",
    marginHorizontal: 5,
  },
  orangeSliderItem: {
    backgroundColor: "#FF7500",
  },
  header: {
    justifyContent: "flex-start",
    marginTop: 16,
    marginLeft: 12,
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  input: {
    borderBottomWidth: 2,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 16,
    paddingBottom: 8,
  },
  validInput: {
    borderBottomColor: "#12D18E",
  },
  invalidInput: {
    borderBottomColor: "red",
  },
  contentContainer: {
    padding: 12,
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#130138",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#888888",
    marginBottom: 24,
  },
  buttonContainer: {
    alignItems: "center",
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
  btnDisabled: {
    backgroundColor: "#999999",
  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SetPin;
