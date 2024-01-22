import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpTime = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);

  const tabOptions = [
    "3 Months",
    "6 Months",
    "9 Months",
    "12 Months",
    "15 Months",
    "18 Months",
    "24 Months",
    "30 Months",
    "36 Months",
  ];

  const renderTabs = () => {
    const columns = 3;
    const rows = Math.ceil(tabOptions.length / columns);

    return Array.from(Array(rows)).map((_, rowIndex) => (
      <View key={`row-${rowIndex}`} style={styles.tabRow}>
        {tabOptions
          .slice(rowIndex * columns, (rowIndex + 1) * columns)
          .map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.tabItem,
                selectedOption === option && styles.selected,
              ]}
              onPress={() => setSelectedOption(option)}
            >
              <Text style={styles.tabLabel}>{option}</Text>
            </TouchableOpacity>
          ))}
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUpCryptoBabies")}
        >
          <ChevronLeftIcon size={30} color="#A9A9A9" />
        </TouchableOpacity>

        <View style={styles.slider}>
          <View style={[styles.sliderItem, styles.activeSliderItem]} />
          <View style={[styles.sliderItem, styles.activeSliderItem]} />
          <View style={[styles.sliderItem, styles.activeSliderItem]} />
          <View style={[styles.sliderItem, styles.activeSliderItem]} />
          <View style={[styles.sliderItem, styles.activeSliderItem]} />          
          <View style={styles.sliderItem} />
          <View style={styles.sliderItem} />          
        </View>
      </View>

      <View style={styles.bottonContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Cool!! How long will <Text style={styles.chamaName}>ChamaName</Text>{" "}
            invest?{" "}
            <Image
              source={require("../Imgs/twemoji_alarm-clock.png")}
              style={styles.image}
            />
          </Text>
          <View style={styles.tabsContainer}>{renderTabs()}</View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.bottonContainer}
        onPress={() => navigation.navigate("SignUpMinBuy")}
      >
        <View style={styles.btn}>
          <Text style={styles.text}>Continue</Text>
        </View>
      </TouchableOpacity>
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
  tabsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  tabItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FF7500",
    marginHorizontal: 5,
    marginVertical: 8,
  },
  tabLabel: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#130138",
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "center",
  },

  selected: {
    backgroundColor: "#12D18E",
    borderColor: "#12D18E",
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

export default SignUpTime;
