import React from "react";
import {
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Linking,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const PhoneNumberWallet = () => {
  const navigation = useNavigation();
  //   const [activePage, setActivePage] = useState([1, 2, 3, 4, 5, 6, 7]);

  async function shareMessage() {
    try {
      await Linking.shareAsync({
        message: "Join Haba app at https://habaapp.com/",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("GirlChattingWallet")}
        >
          <ChevronLeftIcon size={30} color="#A9A9A9" />
        </TouchableOpacity>
        {/* <View style={styles.slider}>
          {[1, 2, 3, 4, 5, 6, 7].map((page) => (
            <View
              key={page}
              style={[
                styles.sliderItem,
                activePage.includes(page) && styles.activeSliderItem,
              ]}
            />
          ))}
        </View> */}
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Enter phone number to share link to</Text>
        <TextInput style={styles.input} placeholder="+1234567891" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              "sms:+1234567890?body=join habaapp at https://habaapp.com"
            );
          }}
          style={styles.shareButton}
        >
          <Text style={styles.shareButtonText}> 📞 Share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Wallet")}>
          <View style={styles.btn}>
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
    marginTop: 40,
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
  activeSliderItem: {
    backgroundColor: "#FF7500",
  },
  formContainer: {
    padding: 6,
    marginTop: 4,
  },
  title: {
    fontWeight: "bold",
    marginTop: 4,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: "#12D18E",
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 70,
  },
  shareButton: {
    width: 254,
    height: 50,
    backgroundColor: "#EDF9F2",
    marginBottom: 30,
    marginTop: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  shareButtonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  btn: {
    width: 254,
    height: 50,
    backgroundColor: "#12D18E",
    borderRadius: 25,
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

export default PhoneNumberWallet;
