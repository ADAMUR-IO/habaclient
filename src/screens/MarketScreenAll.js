import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";

import kqk from "../../assets/images/kq-k.png";
import pypl from "../../assets/images/pypl.png";
import aapl from "../../assets/images/aapl.png";
import sfc from "../../assets/images/sfc.png";

const MarketScreenAll = () => {
  const navigation = useNavigation();
  const [activePage, setActivePage] = useState([1, 2, 3, 4, 5]);

  const [loaded] = useFonts({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
    Rubik: require("../../assets/fonts/static-Rubik/Rubik-Regular.ttf"),
    Inter: require("../../assets/fonts/static/Inter-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUpCryptoBabies")}
        >
          <ChevronLeftIcon size={30} color="#A9A9A9" />
        </TouchableOpacity>
        <View style={styles.slider}>
          {[1, 2, 3, 4, 5, 6, 7].map((page) => (
            <View
              key={page}
              style={[
                styles.sliderItem,
                activePage.includes(page) && styles.activeSliderItem,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Select the <Text style={styles.titleHighlight}>Stocks</Text> you want
          to invest in?
          <Text style={styles.emoji}>👩</Text>
        </Text>
      </View>

      <Text style={styles.browseStocks}>Browse Stocks</Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Stocks Cards */}
        <View style={styles.stocksContainer}>
          <View style={styles.stocksRow}>
            <View style={styles.stockItem}>
              <LinearGradient
                colors={["#000000", "#676767"]}
                style={styles.stockCard}
              >
                <Image source={aapl} style={styles.stockImage} />
                <View style={styles.stockDetails}>
                  <Text style={styles.stockName}>AAPL</Text>
                  <Text style={styles.stockAmount}>364.11</Text>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.stockItem}>
              <LinearGradient
                colors={["rgba(58, 173, 44, 0.87)", "rgba(58, 173, 44, 0.78)"]}
                style={styles.stockCard}
              >
                <Image source={sfc} style={styles.stockImage} />
                <View style={styles.stockDetails}>
                  <Text style={styles.stockName}>SFC</Text>
                  <Text style={styles.stockAmount}>30.87</Text>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.stockItem}>
              <LinearGradient
                colors={["#FF6091", "#676767"]}
                style={styles.stockCard}
              >
                <View style={styles.stockDetails}>
                  <Text style={styles.stockName}>AAPL</Text>
                  <Text style={styles.stockAmount}>364.11</Text>
                </View>
              </LinearGradient>
            </View>
          </View>

          <View style={styles.stocksRow}>
            <View style={styles.stockItem}>
              <LinearGradient
                colors={["rgba(58, 173, 44, 0.87)", "rgba(58, 173, 44, 0.78)"]}
                style={styles.stockCard}
              >
                <Image source={pypl} style={styles.stockImage} />
                <View style={styles.stockDetails}>
                  <Text style={styles.stockName}>PYPL</Text>
                  <Text style={styles.stockAmount}>68.21</Text>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.stockItem}>
              <LinearGradient
                colors={["#000000", "#676767"]}
                style={styles.stockCard}
              >
                <Image source={kqk} style={styles.stockImage} />
                <View style={styles.stockDetails}>
                  <Text style={styles.stockName}>KQK</Text>
                  <Text style={styles.stockAmount}>87.15</Text>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.stockItem}>
              <LinearGradient
                colors={["#FF6091", "#676767"]}
                style={styles.stockCard}
              >
                <View style={styles.stockDetails}>
                  <Text style={styles.stockName}>AAPL</Text>
                  <Text style={styles.stockAmount}>364.11</Text>
                </View>
              </LinearGradient>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate("SignUpBonus")}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
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
  titleContainer: {
    marginTop: 32,
    marginBottom: 16,
  },
  title: {
    fontFamily: "Rubik",
    fontSize: 24,
    lineHeight: 32,
    color: "#000000",
    textAlign: "center",
  },
  titleHighlight: {
    fontFamily: "Rubik-Bold",
    color: "#FF6091",
  },
  emoji: {
    fontSize: 24,
  },
  browseStocks: {
    fontFamily: "Roboto",
    fontSize: 18,
    lineHeight: 24,
    color: "#000000",
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 32,
  },
  stocksContainer: {
    marginBottom: 16,
  },
  stocksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  stockItem: {
    flex: 1,
    marginRight: 8,
  },
  stockCard: {
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  stockImage: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  stockDetails: {
    flex: 1,
  },
  stockName: {
    fontFamily: "Rubik-Bold",
    fontSize: 16,
    lineHeight: 24,
    color: "#FFFFFF",
  },
  stockAmount: {
    fontFamily: "Inter",
    fontSize: 14,
    lineHeight: 20,
    color: "#FFFFFF",
  },
  bottomContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 70,
  },
  continueButton: {
    width: 254,
    height: 45,
    backgroundColor: "#12D18E",
    marginVertical: 20,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default MarketScreenAll;
