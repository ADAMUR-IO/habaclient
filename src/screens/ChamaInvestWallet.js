import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

export default function ChamaInvestWallet() {
  const navigation = useNavigation();
  const [current, setCurrent] = useState("test");
  const [selectedOption, setSelectedOption] = useState(null);
  const [activePage, setActivePage] = useState([1, 2, 3, 4, 5]);
  const { width } = Dimensions.get("window");
  const componentWidth = width * 0.8;

  const handlePress = () => {
    if (selectedOption) {
      switch (selectedOption) {
        case "ChamaMarketScreenCrypto":
          navigation.navigate("ChamaMarketScreenCrypto");
          break;
        case "ChamaMarketScreenGovtBonds":
          navigation.navigate("ChamaMarketScreenGovtBonds");
          break;
        case "ChamaMarketScreenMoneyMkts":
          navigation.navigate("ChamaMarketScreenMoneyMkts");
          break;
        case "ChamaMarketScreenStocks":
          navigation.navigate("ChamaMarketScreenStocks");
          break;
        // case "MarketScreenAll":
        //   navigation.navigate("MarketScreenAll");
        //   break;
        // case "SignUpVerification":
        //   navigation.navigate("SignUpVerification");
        //   break;
        // Add cases for other options if needed
        default:
          break;
      }
    } else {
      // Display an error message or prevent navigation
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ChamaSavingWallet")}
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
      <View style={styles.content}>
        <Text style={styles.title}>
          What will <Text style={styles.chamaName}>MyNewChama</Text> invest in?
          <Text style={styles.icon}> 💼</Text>
        </Text>

        <View style={styles.radioButtonsContainer}>
          <RadioButtonGroup
            containerStyle={{ marginBottom: 10 }}
            selected={current}
            onSelected={(value) => setCurrent(value)}
            radioBackground="#12D18E"
          >
            <TouchableOpacity
              onPress={() => setSelectedOption("ChamaMarketScreenCrypto")}
            >
              <RadioButtonItem
                value="ChamaMarketScreenCrypto"
                style={
                  selectedOption === "ChamaMarketScreenCrypto"
                    ? styles.selected
                    : {}
                }
                label={
                  <Text style={styles.radioButtonLabel}>Crypto markets</Text>
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedOption("ChamaMarketScreenMoneyMkts")}
            >
              <RadioButtonItem
                value="ChamaMarketScreenMoneyMkts"
                style={
                  selectedOption === "ChamaMarketScreenMoneyMkts"
                    ? styles.selected
                    : {}
                }
                label={
                  <Text style={styles.radioButtonLabel}>
                    Money Markets - EFT's,REITS
                  </Text>
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedOption("ChamaMarketScreenGovtBonds")}
            >
              <RadioButtonItem
                value="ChamaMarketScreenGovtBonds"
                style={
                  selectedOption === "ChamaMarketScreenGovtBonds"
                    ? styles.selected
                    : {}
                }
                label={
                  <Text style={styles.radioButtonLabel}>Government bonds</Text>
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedOption("ChamaMarketScreenStocks")}
            >
              <RadioButtonItem
                value="ChamaMarketScreenStocks"
                style={
                  selectedOption === "ChamaMarketScreenStocks"
                    ? styles.selected
                    : {}
                }
                label={<Text style={styles.radioButtonLabel}>Stocks</Text>}
              />
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => setSelectedOption("MarketScreenAll")}
            >
              <RadioButtonItem
                value="MarketScreenAll"
                style={
                  selectedOption === "MarketScreenAll" ? styles.selected : {}
                }
                label={
                  <Text style={styles.radioButtonLabel}>All of the above</Text>
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedOption("SignUpVerification")}
            >
              <RadioButtonItem
                value="SignUpVerification"
                style={
                  selectedOption === "SignUpVerification" ? styles.selected : {}
                }
                label={
                  <Text style={styles.radioButtonLabel}>Not sure yet</Text>
                }
              />
            </TouchableOpacity> */}
          </RadioButtonGroup>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.bottonContainer}
          onPress={() => handlePress()}
        >
          <View style={styles.btn}>
            <Text style={styles.text}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const { width } = Dimensions.get("window");
const componentWidth = width * 0.8;

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
  slider: {
    flexDirection: "row",
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
  content: {
    flex: 1,
    padding: 6,
  },
  title: {
    fontWeight: "bold",
    color: "#130138",
    fontSize: 20,
    marginBottom: 6,
  },
  chamaName: {
    color: "#12D18E",
  },
  icon: {
    color: "#50AF95",
  },
  radioButtonsContainer: {
    marginLeft: 4,
  },
  radioButtonLabel: {
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 6,
    fontSize: 13,
    borderBottomWidth: 2,
    borderBottomColor: "#12D18E",
    height: 50,
    lineHeight: 50,
    width: componentWidth,
  },
  selected: {
    backgroundColor: "#12D18E",
  },
  bottonContainer: {
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
