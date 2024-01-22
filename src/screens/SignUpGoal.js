import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import RadioButtonGroup from "expo-radio-button";
import { Dimensions } from "react-native";

export default function SignUpGoal() {
  const navigation = useNavigation();
  const route = useRoute();
  const [current, setCurrent] = useState("test");
  const [activePage, setActivePage] = useState([1, 2, 3, 4]);
  const [registrationOption, setRegistrationOption] = useState(null);
  const { fullName, phoneNumber, email, password, gender, dateOfBirth } = route.params;

  const handlePress = () => {
    if (registrationOption) {
      switch (registrationOption) {
        case "CreateChama":
          navigation.navigate("SignUpChamaName", {
            fullName,
            phoneNumber,
            email,
            password,
            gender,
            dateOfBirth,
            registrationOption,
          });
          break;
        case "JoinChama":
          navigation.navigate("SignUpVerification", {
            fullName,
            phoneNumber,
            email,
            password,
            gender,
            dateOfBirth,
            registrationOption,
          });
          break;
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
      <TouchableOpacity onPress={() => navigation.navigate("SignUpBDay")}>
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
            activePage === 5 && styles.activeSliderItem,
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

    <View style={styles.titleContainer}>
      <Text style={styles.title}>
        What do you want to achieve with haba?{" "}
        <Text style={styles.emoji}>👩🏽‍💼</Text>
      </Text>
    </View>

    <View style={styles.radioButtonContainer}>
      <RadioButtonGroup
        containerStyle={styles.radioButtonGroupContainer}
        selected={registrationOption}
        onSelected={(value) => setRegistrationOption(value)}
        radioBackground="#12D18E"
      >
        <TouchableOpacity onPress={() => setRegistrationOption("CreateChama")}>
          <View style={styles.radioButtonLabelContainer}>
            <View
              style={[
                styles.radioButton,
                current === "CreateChama" &&
                  styles.radioButtonSelected,
              ]}
            />
            <Text style={styles.radioButtonLabelText}>
              I want to create an investment chama
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setRegistrationOption("JoinChama")}>
          <View style={styles.radioButtonLabelContainer}>
            <View
              style={[
                styles.radioButton,
                current === "JoinChama" && styles.radioButtonSelected,
              ]}
            />
            <Text style={styles.radioButtonLabelText}>
              I want to join an investment chama
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setRegistrationOption("Explore")}>
          <View style={styles.radioButtonLabelContainer}>
            <View
              style={[
                styles.radioButton,
                current === "Explore" && styles.radioButtonSelected,
              ]}
            />
            <Text style={styles.radioButtonLabelText}>I want to explore</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setRegistrationOption("NotSure")}>
          <View style={styles.radioButtonLabelContainer}>
            <View
              style={[
                styles.radioButton,
                current === "NotSure" && styles.radioButtonSelected,
              ]}
            />
            <Text style={styles.radioButtonLabelText}>I am not sure yet</Text>
          </View>
        </TouchableOpacity>
      </RadioButtonGroup>
    </View>

    <TouchableOpacity
      style={styles.bottonContainer}
      onPress={() => handlePress(registrationOption)}
    >
      <View style={styles.btn}>
        <Text style={styles.text}>Continue</Text>
      </View>
    </TouchableOpacity>

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
  titleContainer: {
    padding: 6,
    marginTop: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
  },
  emoji: {
    fontSize: 20,
  },
  radioButtonContainer: {
    marginLeft: 4,
  },
  radioButtonGroupContainer: {
    marginBottom: 10,
  },
  radioButtonLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#12D18E",
    marginRight: 5,
  },
  radioButtonSelected: {
    backgroundColor: "#12D18E",
  },
  radioButtonLabelText: {
    marginLeft: 5,
    fontWeight: "bold",
    fontSize: 15,
    borderBottomWidth: 2,
    borderColor: "#12D18E",
    height: 50,
    lineHeight: 50,
    width: componentWidth,
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
  selected: {
    backgroundColor: "#12D18E",
  },
});
