import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

import { backendUrl } from '../../config/config';
import { AuthContext } from "../components/AuthContext";

const ChamaMinBuy = ({ route }) => {
  const navigation = useNavigation();
  const [minimumBuyIn, setMinimumBuyIn] = useState("");
  const { user } = useContext(AuthContext);
  const { chamaName, description, lockInPeriod } = route.params;

  const handleContinue = async () => {
    try {
      const token = user.token;
      const response = await axios.post(
        `${backendUrl}/api/chamas/new`,
        {
          chamaName,
          description,
          lockInPeriod,
          minimumBuyIn,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Chama registration successful:", {
          chamaName,
          description,
          lockInPeriod,
          minimumBuyIn,
        });
        navigation.navigate("Wallet");
      } else {
        console.error("Chama registration failed:", error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ChamaInvestTime")}
        >
          <ChevronLeftIcon size={30} color="#A9A9A9" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          What is <Text style={styles.chamaName}>{chamaName}</Text> minimum buy
          in?
          <Text style={styles.emoji}>💸</Text>
        </Text>

        <View style={styles.pickerContainer}>
          <TextInput
            value={minimumBuyIn}
            onChangeText={setMinimumBuyIn}
            keyboardType="numeric"
            style={styles.picker}
            placeholder="Enter amount"
          />
        </View>
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
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "flex-start",
    marginTop: 10,
  },
  contentContainer: {
    padding: 6,
    marginTop: 10,
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  chamaName: {
    color: "#12D18E",
    fontWeight: "bold",
  },
  emoji: {
    fontSize: 20,
  },
  pickerContainer: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  picker: {
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderColor: "#12D18E",
    width: "100%",
    height: 50,
    lineHeight: 50,
    fontSize: 18,
    textAlign: "center",
  },
  bottomContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
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

export default ChamaMinBuy;
