import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import wallet from "../../assets/images/wallet-2.png";
import notification from "../../assets/images/notification-bing.png";
import gift from "../../assets/images/gift_icon.png";
import chart from "../../assets/images/chart-2.png";

const Transactions = () => {
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
        onPress={() => navigation.goBack()}
      >
        <ChevronLeftIcon size={30} color="#12D18E" />
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Text style={styles.title}>Chat with Us</Text>
            <Text style={styles.paragraph}>
              Sorry, we aren't online at the moment. Leave a message and we'll
              get back to you.
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Enter your name</Text>
              <TextInput style={styles.input} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Enter your email</Text>
              <TextInput style={styles.input} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Message</Text>
              <TextInput
                style={[styles.input, styles.messageInput]}
                multiline
                numberOfLines={4}
              />
            </View>

            <TouchableOpacity style={styles.buttonContainer}>
              <View style={styles.btn}>
                <Text style={styles.text}>Send Message</Text>
              </View>
            </TouchableOpacity>

            {renderMenu()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* {renderMenu()} */}
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
    marginLeft: 10,
    marginTop: 10,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  messageInput: {
    height: 100,
  },
  buttonContainer: {
    alignItems: "center",
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

export default Transactions;
