import { React, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import img1 from "../Imgs/Girlchatting.png";

const GirlChatting = () => {
  const navigation = useNavigation();
  const [activePage, setActivePage] = useState([1, 2, 3, 4, 5, 6, 7]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("SetPin")}>
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
              activePage.includes(6) && styles.activeSliderItem,
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
        <View>
          <Image source={img1} style={styles.image} />
        </View>

        <Text style={styles.title}>
          Invite your chama members and get{" "}
          <Text style={styles.highlightedText}>KES 100</Text>
        </Text>

        <Text style={styles.subTitle}>
          <Text style={styles.bullet}>✨</Text> Invite your chama members
        </Text>

        <Text style={styles.subTitle}>
          <Text style={styles.bullet}>✨</Text> They get KES 200 when they
          accept your invite
        </Text>
      </View>

      <View style={styles.midbottomContainer}>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => navigation.navigate("Notification")}
        >
          <Text style={styles.shareText}>📧 Share my invite link</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Phonenumber")}
        >
          <Text style={styles.buttonText}> 📞 Enter phone number</Text>
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
  contentContainer: {
    flex: 1,
    padding: 2,
    alignItems: "center",
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#130138",
    marginBottom: 8,
  },
  highlightedText: {
    color: "#FF7500",
  },
  subTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 8,
    marginLeft: 8,
    fontSize: 15,
    color: "#130138",
  },
  bullet: {
    borderRadius: 999,
    margin: 2,
  },
  midbottomContainer: {
    alignItems: "center",
    marginBottom: -10,
  },
  shareButton: {
    width: 254,
    height: 45,
    backgroundColor: "#12D18E",
    marginVertical: 20,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  shareText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  bottomContainer: {
    alignItems: "center",
    marginBottom: 70,
  },
  button: {
    width: 254,
    height: 45,
    backgroundColor: "#EDF9F2",
    marginVertical: 20,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
});

export default GirlChatting;
