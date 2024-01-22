import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpSos = ({ route }) => {
  const navigation = useNavigation();
  const { fullName, phoneNumber, email, password, gender, dateOfBirth, selectedId, selfieWithId } = route.params;  
  const [emergencyContact, setEmergencyContact] = useState({
    fullName: '',
    relationship: '',
    phoneNumber: '',
    email: '',
  });
  const [activePage, setActivePage] = useState([1, 2, 3, 4, 5, 6]);

  const handleContinue = () => {
    navigation.navigate('Terms', {
      fullName,
      phoneNumber,
      email,
      password,
      gender,
      dateOfBirth,
      selectedId,
      selfieWithId,
      emergencyContact,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpVerification')}>
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

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Last Question, provide your emergency contact?
          <Text style={styles.emoji}>🆘</Text>
        </Text>

        <Text style={styles.subtitle}>
          The regulator requires us to provide this. We will never contact your emergency contact.
        </Text>

        <Text style={styles.label}>Full name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmergencyContact({ ...emergencyContact, fullName: text })}
        />

        <Text style={styles.label}>Relationship</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmergencyContact({ ...emergencyContact, relationship: text })}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}          
          keyboardType="phone-pad"
          onChangeText={(text) => setEmergencyContact({ ...emergencyContact, phoneNumber: text })}
        />

        <Text style={styles.label}>email</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          onChangeText={(text) => setEmergencyContact({ ...emergencyContact, email: text })}
        />
        
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
  contentContainer: {
    padding: 24,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 15,
    color: '#888888',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 16,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#12D18E',
    fontWeight: 'bold',    
    fontSize: 15,
    paddingVertical: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  checkboxLabel: {
    fontWeight: 'bold',
    marginLeft: 8,
    flex: 1,
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

export default SignUpSos;
