import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import axios from "axios";

import { AuthContext } from "../components/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { backendUrl } from '../../config/config';

const EditUserAccount = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

  const handleSubmit = async () => {
    try {
      const token = user.token;
      const response = await axios.put(
        `${backendUrl}/api/users/profile`,
        {
          fullName,
          email,
          phoneNumber,
          dateOfBirth,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFullName("");
      setEmail("");
      setDateOfBirth("");
      setPhoneNumber("");

      navigation.navigate("AccountSettings");
      // Handle success response if needed
    } catch (error) {
      console.error(error);
      // Handle error response if needed
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Settings")}
      >
        <ChevronLeftIcon size={30} color="#12D18E" />
      </TouchableOpacity>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        placeholder={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        value={dateOfBirth}
        placeholder={dateOfBirth}
        onChangeText={setDateOfBirth}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        placeholder={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 80,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
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
export default EditUserAccount;
