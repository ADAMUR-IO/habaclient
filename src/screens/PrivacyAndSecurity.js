import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import wallet from "../../assets/images/wallet-2.png";
import notification from "../../assets/images/notification-bing.png";
import gift from "../../assets/images/gift_icon.png";
import chart from "../../assets/images/chart-2.png";

const PrivacyAndSecurity = () => {
  const navigation = useNavigation();

  const renderMenu = () => {
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Settings")}
      >
        <ChevronLeftIcon size={30} color="#12D18E" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Privacy and Security</Text>
        <View style={styles.policyItem}>
          <Text style={styles.policyNumber}>1.</Text>
          <Text style={styles.policyText}>
            Data Collection: Our application only collects the necessary data
            required to provide you with our services. We do not collect any
            personal information unless it is necessary for the functioning of
            the application.
          </Text>
        </View>
        <View style={styles.policyItem}>
          <Text style={styles.policyNumber}>2.</Text>
          <Text style={styles.policyText}>
            Data Storage: All data collected by our application is stored
            securely and is protected against unauthorized access. We use
            industry-standard security measures to protect your data.
          </Text>
        </View>
        <View style={styles.policyItem}>
          <Text style={styles.policyNumber}>3.</Text>
          <Text style={styles.policyText}>
            Data Sharing: We do not share your data with any third-party unless
            it is required to provide our services or we have your explicit
            consent. We also do not sell your data to any third-party.
          </Text>
        </View>
        <View style={styles.policyItem}>
          <Text style={styles.policyNumber}>4.</Text>
          <Text style={styles.policyText}>
            Encryption: All data transmitted between our servers and your device
            is encrypted using industry-standard encryption protocols. This
            ensures that your data is protected against interception by
            unauthorized parties.
          </Text>
        </View>
      </View>

      {renderMenu()}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    top: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  policyItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  policyNumber: {
    marginRight: 10,
    fontWeight: "bold",
  },
  policyText: {
    flex: 1,
    fontSize: 15,
  },
  menu: {
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
  },
  MenuIcons: {
    width: 50,
    height: 50,
  },
});

export default PrivacyAndSecurity;
