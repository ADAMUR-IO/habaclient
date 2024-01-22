import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Buttons() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <View style={styles.btn}>
          <Text style={styles.text}>Sign in</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <View style={styles.btn}>
          <Text style={styles.text}>Sign up</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  btn: {
    width: 254,
    height: 45,
    backgroundColor: "#12D18E",
    margin: 10,
    borderRadius: 40,
    alignItems: "center",
    fontSize: 30,
  },
  text: {
    color: "white",
    padding: 8,
    fontSize: 20,
    fontWeight: "bold",
  },
});
