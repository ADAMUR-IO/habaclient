import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  ChevronLeftIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

const Reports = () => {
  const navigation = useNavigation();
  const [current, setCurrent] = useState("test");
  const [activePage, setActivePage] = useState([1, 2, 3, 4 , 5]);

  const handleContinue = () => {
    navigation.navigate("SignUpVerification");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("SignUpSaving")}
        >
          <ChevronLeftIcon size={30} color="#A9A9A9" />
        </TouchableOpacity>
        <View style={styles.slider}>
          <View style={[styles.sliderItem, activePage.includes(1) && styles.activeSliderItem]} />
          <View style={[styles.sliderItem, activePage.includes(2) && styles.activeSliderItem]} />
		  <View style={[styles.sliderItem, activePage.includes(3) && styles.activeSliderItem]} />
		  <View style={[styles.sliderItem, activePage.includes(4) && styles.activeSliderItem]} />
		  <View style={[styles.sliderItem, activePage.includes(5) && styles.activeSliderItem]} />          
          <View style={[styles.sliderItem, activePage === 6 && styles.activeSliderItem]} />
          <View style={[styles.sliderItem, activePage === 7 && styles.activeSliderItem]} />          
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Do you want reports on contributions?
          <Text style={styles.emoji}>📑</Text>
        </Text>
      </View>

      <View style={styles.radioButtonContainer}>
        <RadioButtonGroup
          containerStyle={{ marginBottom: 10 }}
          selected={current}
          onSelected={(value) => setCurrent(value)}
          radioBackground="#12D18E"
        >
          <RadioButtonItem
            value="test"
            label={<Text style={styles.radioButtonLabel}>Yes</Text>}
          />

          <RadioButtonItem
            value="test1"
            label={<Text style={styles.radioButtonLabel}>No</Text>}
          />
        </RadioButtonGroup>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    marginTop: 10,
  },
  contentContainer: {
    padding: 6,
    marginTop: 10,
  },
  slider: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  sliderItem: {
    width: 25,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#FFF7EB',
    marginHorizontal: 5,
  },
  activeSliderItem: {
    backgroundColor: '#FF7500',
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 6,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 21,
    color: '#333',
  },
  emoji: {
    fontSize: 20,
  },
  radioButtonContainer: {
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 10,
  },
  radioButtonLabel: {
    marginLeft: 1,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 6,
    fontSize: 15,
    borderBottomWidth: 2,
    borderColor: '#12D18E',
    width: 260,
    height: 50,
    lineHeight: 50,
  },
  bottomContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 70,
  },
  btn: {
    width: 254,
    height: 45,
    backgroundColor: '#12D18E',
    marginVertical: 20,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Reports;
