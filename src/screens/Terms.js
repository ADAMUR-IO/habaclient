import React, { useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Terms = ({ route }) => {
  const navigation = useNavigation();
  const [activePage, setActivePage] = useState([1, 2, 3, 4, 5]);
  const [checkboxStates, setCheckboxStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [allChecked, setAllChecked] = useState(false);
  const { fullName, phoneNumber, email, password, gender, dateOfBirth, selectedId, selfieWithId, emergencyContact }  = route.params;


  useEffect(() => {
    const isAllChecked = checkboxStates.every((state) => state);
    setAllChecked(isAllChecked);
  }, [checkboxStates]);

  const handleCheckboxChange = (index) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
  };

  const handleContinue = () => {
    if (allChecked) {
      navigation.navigate('SetPin', {
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        gender: gender,
        dateOfBirth: dateOfBirth,
        selectedId: selectedId,
        selfieWithId: selfieWithId,
        emergencyContact: emergencyContact,
        acceptedTermsAndConditions: true,
      });
    } else {
      Alert.alert('Please check all the checkboxes individually before continuing.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('SignUpSos')}
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

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          By checking the box, you agree to our terms and conditions.
        </Text>

        <View style={styles.scrollViewContainer}>
          <ScrollView style={styles.scrollView}>
            {checkboxes.map((checkbox, index) => (
              <View style={styles.checkboxContainer} key={index}>
                <Checkbox
                  value={checkboxStates[index]}
                  onValueChange={() => handleCheckboxChange(index)}
                  color="#12D18E"
                />
                <Text style={styles.checkboxLabel}>{checkbox.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleContinue}>
            <View style={[styles.btn, !allChecked && styles.disabledButton]}>
              <Text style={styles.btnText}>Continue</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const checkboxes = [
  { label: 'I certify that I am a national of the Republic of Kenya' },
  { label: 'I certify that I am a national of the Republic of Kenya' },
  { label: 'I certify that I am a national of the Republic of Kenya' },
  { label: 'I certify that I am a national of the Republic of Kenya' },
  {
    label:
      'I have read, understood and agree to be bound by all terms and disclosures, certifications and disclaimers applicable to me, as found on the legal page of the Haba website.',
  },
];

const styles = {
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
  backButton: {},
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  slider: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
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
  scrollViewContainer: {
    flex: 1,
  },
  scrollView: {
    borderRadius: 8,
    height: 420,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  checkboxLabel: {
    fontWeight: 'bold',
    marginLeft: 8,
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  spacing: {
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
};

export default Terms;
