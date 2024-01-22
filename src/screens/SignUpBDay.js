import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

const SignUpBDay = ({ route }) => {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(null);
  const [activePage, setActivePage] = useState([1, 2, 3]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const { fullName, phoneNumber, email, password, gender } = route.params;

  const handlePress = () => {    
    navigation.navigate("SignUpVerification", {
      fullName,
      phoneNumber,
      email,
      password,
      gender,
      dateOfBirth,
    });
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setDateOfBirth(formattedDate);
  };

  const handleContinue = () => {
    if (dateOfBirth) {
      handlePress();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpGender")}>
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
              activePage === 4 && styles.activeSliderItem,
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

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Cool!! When is your birthday? <Text style={styles.emoji}>🤴🏽</Text>
        </Text>

        <Text style={styles.label}>Birth date</Text>

        <View style={styles.datePickerContainer}>
          <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
            <View style={styles.calendarIcon}>
              <AntDesign name="calendar" size={24} color="#FFF" />
            </View>
          </TouchableOpacity>
          {startDate ? (
            <TextInput
              style={styles.selectedDateText}
              value={moment(startDate).format("MMM DD, YYYY")}
              editable={false}
            />
          ) : (
            <Text style={styles.placeholderText}>
              Tap on the calendar to pick a date
            </Text>
          )}
        </View>

        {isDatePickerVisible && (
          <CalendarPicker
            onDateChange={handleDateChange}
            selectedStartDate={startDate}
            minDate={moment().year(1950).startOf("year").toDate()}
            maxDate={new Date()}
            selectedDayColor="#FF7500"
            selectedDayTextColor="#FFF"
            todayBackgroundColor="#FFF7EB"
            todayTextStyle={{ fontWeight: "bold" }}
            textStyle={{ color: "#333" }}
            disabledDatesTextStyle={{ color: "#999" }}
            nextTitle="Next"
            previousTitle="Prev"
            dayShape="circle"
            customDates={[
              {
                date: moment(),
                containerStyle: { backgroundColor: "#FF7500" },
                textStyle: { color: "#FFF" },
              },
            ]}
          />
        )}
      </View>

      <TouchableOpacity style={styles.bottomContainer} onPress={handleContinue}>
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
  backButton: {
    marginRight: 10,
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
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
  },
  emoji: {
    fontSize: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 4,
    marginBottom: 6,
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
  datePickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  calendarIcon: {
    backgroundColor: "#FF7500",
    borderRadius: 4,
    padding: 8,
  },
  calendarIconText: {
    color: "#FFF",
  },
  selectedDateText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
  },
});

export default SignUpBDay;
