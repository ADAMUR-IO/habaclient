import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


const SignInOTP = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState('');

  const confirmCode = async () => {
    //try {
     // await Auth.confirmSignUp(phoneNumber, code);
      //Alert.alert(`Sign up confirmed!`);
   // } catch (error) {
      //console.error(error);
     // Alert.alert(`Error confirming sign up. Please try again.`);
   // }
  };

  return (
    <SafeAreaView>
      <View style={{ marginTop: 6, paddingLeft: 2 }}>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <ChevronLeftIcon size={30} color="#A9A9A9" />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 6 }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#333333', marginBottom: 8 }}>
          You've got SMS
          <Text role="img" aria-label="mail">
            📩
          </Text>
          {text}
        </Text>

        <Text style={{ fontSize: 12, color: '#666666' }}>
          Please enter your phone number. We will send you an OTP for verification in the next step
        </Text>

        <TextInput
          placeholder="OTP"
          style={{ padding: 4, marginTop: 2, marginBottom: 2, borderBottomWidth: 2, backgroundColor: '#CCCCCC' }}
          onChangeText={setCode}
          keyboardType="number-pad"
        />
        <TouchableOpacity onPress={confirmCode}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16, textAlign: 'center', borderRadius: 30, marginTop: 20, marginBottom: 20, marginLeft: 32, marginRight: 32, height: 47, width: 327, backgroundColor: '#50AF95', padding: 20 }}>
            Confirm
          </Text>
        </TouchableOpacity>

        <Text style={{ fontWeight: 'bold', marginTop: 4, marginBottom: 5, textAlign: 'center' }}>
          Didn't receive code?
        </Text>

        <View style={{ height: 0, width: 298, left: 35, top: 367.4892578125, backgroundColor: '#12D18E' }} />

        <Text style={{ color: '#BDBDBD', fontWeight: 'bold', textAlign: 'center' }}>
          You can resend code in
          <Text style={{ color: '#FF7500' }}> 30s</Text>
        </Text>
      </View>

      <View style={{ position: 'absolute', bottom: -44, justifyContent: 'center', borderRadius: 50, backgroundColor: '#50AF95', padding: 8, width: 300, alignItems: 'center', marginLeft: 8 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16, textAlign: 'center' }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInOTP;
