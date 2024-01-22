import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  ChevronLeftIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpMinBuy = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState("Unknown");
  const [activePage, setActivePage] = useState([1, 2, 3, 4, 5]);

  const handleContinue = () => {
    navigation.navigate("SignUpSaving");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpTime")}>
          <ChevronLeftIcon size={30} color="#A9A9A9" />
        </TouchableOpacity>

        <View style={styles.slider}>
          <View
            style={[
              styles.sliderItem,
              activePage.includes(1) && styles.activeSliderItem,
            ]}
          />
          <View
            style={[
              styles.sliderItem,
              activePage.includes(2) && styles.activeSliderItem,
            ]}
          />
          <View
            style={[
              styles.sliderItem,
              activePage.includes(3) && styles.activeSliderItem,
            ]}
          />
          <View
            style={[
              styles.sliderItem,
              activePage.includes(4) && styles.activeSliderItem,
            ]}
          />
          <View
            style={[
              styles.sliderItem,
              activePage.includes(5) && styles.activeSliderItem,
            ]}
          />
          <View
            style={[
              styles.sliderItem,
              activePage === 6 && styles.activeSliderItem,
            ]}
          />
          <View
            style={[
              styles.sliderItem,
              activePage === 7 && styles.activeSliderItem,
            ]}
          />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          What is <Text style={styles.chamaName}>Cryptobabies</Text> minimum buy
          in?
          <Text style={styles.emoji}>💸</Text>
        </Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={amount}
            onValueChange={(value, index) => setAmount(value)}
            mode="dropdown" // Android only
            style={styles.picker}
          >
            <Picker.Item
              label="Choose amount"
              value="Unknown"
              style={styles.title}
            />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="50" value="50" />
            <Picker.Item label="100" value="100" />
            <Picker.Item label="200" value="200" />
            <Picker.Item label="500" value="500" />
          </Picker>
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
  slider: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
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

export default SignUpMinBuy;
