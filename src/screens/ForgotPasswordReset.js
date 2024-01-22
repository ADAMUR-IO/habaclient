import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

import { backendUrl } from "../../config/config";

const ForgotPasswordReset = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [otp, setOtp] = useState("");
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const { params } = route;
    if (params && params.email) {
      setEmail(params.email);
    }
  }, [route]);

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/users/reset/verify-otp`,
        { email, otp }
      );

      if (response.status === 200 && response.data && response.data.message === "OTP verification successful") {
        setShowNewPasswordFields(true);
      } else {
        console.error("Failed to verify OTP");
      }
    } catch (error) {
      console.error("Error in handleVerifyOTP:", error);
    }
  };
  
  

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        `${backendUrl}/api/users/reset-password`,
        { email, newPassword }
      );

      if (response.status === 200 && response.data && response.data.message === "Password reset successful") {
        navigation.navigate("SignIn");
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password Reset</Text>

      {!showNewPasswordFields ? (
        <>
          <Text style={styles.description}>
            Please enter the OTP sent to your email address.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="OTP"
            value={otp}
            keyboardType="numeric"
            onChangeText={(text) => setOtp(text)}
          />
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={handleVerifyOTP}
            disabled={!otp}
          >
            <Text style={styles.verifyButtonText}>
                {loading ? "Verifying..." : "Verify OTP"}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.description}>
            Please enter your new password.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            secureTextEntry={!showPassword} 
            onChangeText={(text) => setNewPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            secureTextEntry={!showPassword}  
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity
            style={styles.togglePasswordButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.togglePasswordButtonText}>
              {showPassword ? 'Hide Password' : 'Show Password'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetPassword}
            disabled={!newPassword || newPassword !== confirmPassword}
          >
            <Text style={styles.resetButtonText}>
                {loading ? "Resetting..." : "Reset Password"}
            </Text>

            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null}

          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text style={styles.backButtonText}>Back to Forgot Password</Text>
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
    marginBottom: 16,
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
  verifyButton: {
    backgroundColor: "#12D18E",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  verifyButtonText: {
    color: "white",
    fontSize: 16,
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
  togglePasswordButton: {
    marginTop: 10,
  },
  togglePasswordButtonText: {
    color: "#007BFF",
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
  backButton: {
    marginTop: 16,
  },
  backButtonText: {
    color: "#007BFF",
    fontSize: 16,
  },
});

export default ForgotPasswordReset;
