import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpChamaName = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [activePage, setActivePage] = useState([1, 2, 3, 4, 5]);

  const handlePress = () => {
    navigation.navigate("SignUpSaving");    
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpGoal")}>
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

      <View style={styles.content}>
        <Text style={styles.title}>
          What is your Chama name?
          <Image source={require("../Imgs/chama.png")} style={styles.image} />
        </Text>

        <Text style={styles.subtitle}>Chama name</Text>

        <TextInput
          style={styles.input}
          value={input}
          onChangeText={(text) => setInput(text)}
        ></TextInput>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      <TouchableOpacity
        style={styles.bottonContainer}
        onPress={() => handlePress()}
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
    backgroundColor: "#F9F9F9",
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
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    color: "#222222",
    fontSize: 20,
    marginBottom: 16,
  },
  subtitle: {
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    fontSize: 15,
    color: "#222222",
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#12D18E",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 16,
    paddingBottom: 8,
  },
  error: {
    color: "red",
    marginTop: 8,
    fontSize: 12,
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
  image: {
    width: 40,
    height: 40,
    marginLeft: 5,
  },
});

export default SignUpChamaName;
