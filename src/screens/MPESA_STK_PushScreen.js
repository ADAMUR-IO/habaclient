import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import axios from "axios";

import { AuthContext } from "../components/AuthContext";

const MPESA_STK_PushScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const handlePhoneChange = (newPhone) => {
    // Trim the phone number and set it in the state
    setPhone(newPhone.trim());
  };

  const handleAmountChange = (newAmount) => {
    // Trim the amount and set it in the state
    setAmount(newAmount.trim());
  };

  // Function to initiate the payment
  const initiatePayment = async () => {
    setIsLoading(true);
    try {
      const token = user.token;

      console.log(token);
      console.log(phone);
      console.log(amount);
      const response = await axios.post(
        "https://789b-196-216-66-94.ngrok-free.app/api/mpesa/stkpush",
        {
          phone: phone,
          amount: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header with the token
          },
        }
      );

      // Handle the API response from your backend server
      if (response.data.status === "success") {
        // Payment was successful
        setPaymentStatus("Payment Successful");
        // Fetch and update the last 10 transactions
        updateTransactions();
      } else {
        // Payment failed or other error occurred
        setPaymentStatus("Payment Failed");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      setPaymentStatus("Payment Failed");
    }
    setIsLoading(false);
  };

  // Function to generate dummy transactions (replace this with actual data from API)
  const generateDummyTransactions = () => {
    const dummyTransactions = [];
    for (let i = 1; i <= 10; i++) {
      dummyTransactions.push({
        id: i,
        amount: `Transaction Amount ${i}`,
        date: `Transaction Date ${i}`,
      });
    }
    return dummyTransactions;
  };

  // Function to fetch and update the transactions (call this when needed, e.g., after a successful payment)
  const updateTransactions = () => {
    const dummyTransactions = generateDummyTransactions();
    setTransactions(dummyTransactions);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Wallet")}
      >
        <ChevronLeftIcon size={30} color="#12D18E" />
      </TouchableOpacity>

      <Text style={styles.title}>MPESA STK Push</Text>

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={handlePhoneChange} // Use the custom function for phone number input
      />

      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={handleAmountChange} // Use the custom function for amount input
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={initiatePayment}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Processing..." : "Pay Now"}
        </Text>
      </TouchableOpacity>

      {paymentStatus !== "" && (
        <Text style={styles.paymentStatus}>
          Payment Status: {paymentStatus}
        </Text>
      )}

      {/* Transaction Table */}
      <Text style={styles.transactionTitle}>Last 10 Transactions</Text>
      {transactions.length > 0 ? (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <Text>{item.amount}</Text>
              <Text>{item.date}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No transactions found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#12D18E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  paymentStatus: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});

export default MPESA_STK_PushScreen;
