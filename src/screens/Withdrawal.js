import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import logo from "../../assets/images/haba_logo.png";
import avatar from "../../assets/images/avatar.png";
import wallet from "../../assets/images/wallet-2.png";
import gift from "../../assets/images/gift_icon.png";
import chart from "../../assets/images/chart-2.png";
import notification from "../../assets/images/notification-bing.png";

const Withdrawal = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function handlePress() {
    console.log("clicked");
  }

  function renderMenu() {
    return (
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => navigation.navigate("UserWallet")}>
          <Image
            source={wallet}
            style={[styles.MenuIcons, { width: 40, height: 40 }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("GirlChattingWallet")}
        >
          <Image
            source={gift}
            style={[styles.MenuIcons, { width: 35, height: 40 }]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ChamaWallet")}>
          <Image
            source={chart}
            style={[styles.MenuIcons, { width: 40, height: 40 }]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ChamaWallet")}>
          <Image
            source={notification}
            style={[styles.MenuIcons, { width: 40, height: 40 }]}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderBanner() {
    return (
      <View style={styles.banner}>
        <View style={styles.bannerImages}>
          <Image style={styles.logo} source={logo} />
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Image source={avatar} style={styles.avatar} />
          </TouchableOpacity>
        </View>
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerText}>My Chama Name :</Text>
          <Text style={styles.bannerText}>My Chama code :</Text>
          <Text style={styles.bannerText}>My Chama Earnings:</Text>
        </View>
      </View>
    );
  }

  return (
    // <SafeAreaView style={styles.container}>
    <SafeAreaView style={[styles.container, { paddingBottom: 100 }]}>
      <ScrollView>
        {renderBanner()}
        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Text style={styles.heading}>Enter the amount to withdraw?</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={(text) => setAmount(text)}
            placeholder="KES 1200"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.phoneNumberInput}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />
        </KeyboardAvoidingView>
        <View style={styles.topUpButtonContainer}>
          <TouchableOpacity style={styles.topUpButton} onPress={handlePress()}>
            <Text style={styles.topUpButtonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {renderMenu()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 10,
    marginTop: 5,
  },
  banner: {
    backgroundColor: "#15133C",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  bannerImages: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  logo: {
    width: 108,
    height: 27.43,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: "grey",
    borderRadius: 50,
  },
  bannerTextContainer: {
    marginBottom: 20,
  },
  bannerText: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  amountInput: {
    backgroundColor: "#E5E5E5",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
    width: "80%",
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  phoneNumberInput: {
    backgroundColor: "#E5E5E5",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
    width: "80%",
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },

  topUpButtonContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  topUpButton: {
    width: 200,
    height: 45,
    backgroundColor: "#50AF95",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  topUpButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  menu: {
    position: "absolute",
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    width: 320,
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#D8DCE1",
    borderRadius: 30,
    backgroundColor: "#fff",
    elevation: 15,
    paddingHorizontal: 20,
    bottom: -8,
  },

  MenuIcons: {
    width: 50,
    height: 50,
  },
});

export default Withdrawal;
