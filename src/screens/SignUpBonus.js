import { React, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import img1 from "../Imgs/confetti-ball.png";

const SignUpBonus = () => {
  const navigation = useNavigation();
  const [activePage, setActivePage] = useState([1, 2, 3, 4, 5]);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const animatedStyle = {
    transform: [{ rotateY: rotateInterpolate }],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Terms")}>
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
            Congratulations! You get KES 200!{" "}
            <Text style={styles.unlockText}>Unlock another KES 100</Text>
          </Text>

          <Animated.Image source={img1} style={[styles.image, animatedStyle]} />

          <View style={styles.subtitleContainer}>
            <View style={styles.dotContainer}>
              <View style={styles.dot}>
                <Text style={styles.dotNumber}>1</Text>
              </View>
              <Text style={styles.subtitleText}>
                You signed up and unlocked free KES 200
              </Text>
            </View>

            <View style={styles.dotContainer}>
              <View style={styles.dot}>
                <Text style={styles.dotNumber}>2</Text>
              </View>
              <Text style={styles.subtitleText}>
                Invite your chama members and unlock even more free KES 200 or
                you can skip this step!
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.midbottomContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate("GirlChatting")}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.skipButtonText}>Skip this step</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 16,
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
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  unlockText: {
    color: "#12D18E",
  },
  image: {
    marginLeft: 64,
    marginTop: 16,
  },
  subtitleContainer: {
    alignItems: "flex-start",
    marginTop: 8,
    marginBottom: 16,
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  dot: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: "#12D18E",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  dotNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  subtitleText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  midbottomContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: -15,
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
  bottomContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 70,
  },
  skipButton: {
    width: 254,
    height: 45,
    backgroundColor: "#EDF9F2",
    marginVertical: 20,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  skipButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
});

export default SignUpBonus;
