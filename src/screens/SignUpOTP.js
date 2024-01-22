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

const SignUpOTP = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params;

  const [otp, setOTP] = useState("");
  const codeInput1Ref = useRef(null);
  const codeInput2Ref = useRef(null);
  const codeInput3Ref = useRef(null);
  const codeInput4Ref = useRef(null);

  const handleCodeChange = (index, value) => {
    let updatedOTP = otp;

    if (value === "") {
      // Allow deleting characters
      updatedOTP = updatedOTP.slice(0, index);
    } else {
      updatedOTP =
        updatedOTP.slice(0, index) + value + updatedOTP.slice(index + 1);
    }

    if (index > 0 && value === "") {
      // Move to the previous box if deleting a value
      switch (index) {
        case 1:
          codeInput1Ref.current.focus();
          break;
        case 2:
          codeInput2Ref.current.focus();
          break;
        case 3:
          codeInput3Ref.current.focus();
          break;
        default:
          break;
      }
    } else if (index < 3 && value !== "") {
      // Move to the next box
      switch (index) {
        case 0:
          codeInput2Ref.current.focus();
          break;
        case 1:
          codeInput3Ref.current.focus();
          break;
        case 2:
          codeInput4Ref.current.focus();
          break;
        default:
          break;
      }
    }

    setOTP(updatedOTP);
  };

  const handleVerification = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/users/verify-otp`,
        {
          email: email,
          otp: otp,
        }
      );

      console.log(response.data);

      if (response.data.message === "OTP verification successful") {
        navigation.navigate("SignUpName");
      } else {
        console.log("OTP verification failed.");
      }
    } catch (error) {
      console.error("Error occurred during OTP verification:", error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <ChevronLeftIcon size={30} color="#A9A9A9" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>
          You've got email{" "}
          <Text role="img" aria-label="mail">
            📩
          </Text>
        </Text>

        <Text style={styles.subtitle}>
          Enter OTP sent to your email or phone number for verification.
        </Text>

        <View style={styles.otpContainer}>
          <TextInput
            style={styles.otpInput}
            value={otp.charAt(0)}
            onChangeText={(value) => handleCodeChange(0, value)}
            keyboardType="number-pad"
            maxLength={1}
            ref={codeInput1Ref}
          />
          <TextInput
            style={styles.otpInput}
            value={otp.charAt(1)}
            onChangeText={(value) => handleCodeChange(1, value)}
            keyboardType="number-pad"
            maxLength={1}
            ref={codeInput2Ref}
          />
          <TextInput
            style={styles.otpInput}
            value={otp.charAt(2)}
            onChangeText={(value) => handleCodeChange(2, value)}
            keyboardType="number-pad"
            maxLength={1}
            ref={codeInput3Ref}
          />
          <TextInput
            style={styles.otpInput}
            value={otp.charAt(3)}
            onChangeText={(value) => handleCodeChange(3, value)}
            keyboardType="number-pad"
            maxLength={1}
            ref={codeInput4Ref}
          />
        </View>

        <TouchableOpacity onPress={handleVerification}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Confirm</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.resendText}>Didn't receive code?</Text>

        <Text style={styles.resendInfo}>
          You can resend code in <Text style={styles.resendCountdown}>30s</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 12,
    marginLeft: 12,
  },
  container: {
    padding: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    textAlign: "left",
    color: "#999999",
    marginBottom: 4,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  otpInput: {
    flex: 1,
    aspectRatio: 1,
    fontSize: 24,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#CCCCCC",
    textAlign: "center",
    marginHorizontal: 4,
  },

  btn: {
    width: "100%",
    height: 45,
    backgroundColor: "#12D18E",
    marginVertical: 10,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  resendText: {
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 5,
  },
  resendInfo: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    textAlign: "left",
    color: "#999999",
    marginBottom: 4,
  },
  resendCountdown: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    textAlign: "left",
    color: "#999999",
    marginBottom: 4,
  },
});

export default SignUpOTP;
