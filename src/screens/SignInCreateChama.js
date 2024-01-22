import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpChamaName = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = () => {
    if (!input) {
      setError('Please enter your Chama name');
      setIsValid(false);
      return;
    }

    if (input.length < 5 || input.length > 100) {
      setError('Enter a valid Chama name');
      setIsValid(false);
      return;
    }

    setError('');
    setIsValid(true);

    // Send input to the server
    setInput('');
    navigation.navigate('SignUpCryptoBabies');
  };

  return (
    <SafeAreaView style={{ marginTop: 2 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 6, padding: 4 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
          <XMarkIcon size={30} color="#A9A9A9" />
        </TouchableOpacity>
      </View>

      <View style={{ padding: 6, marginTop: 2 }}>
        <Text style={{ fontWeight: 'bold', color: '#333333', marginBottom: 8, fontSize: 22 }}>
          What is your Chama name?
          <Text role="img" aria-label="wave">
            🌴
          </Text>
        </Text>
        <Text style={{ fontWeight: 'bold', marginTop: 4, marginBottom: 5, fontSize: 15 }}>Chama name</Text>

        <TextInput
          style={{ borderBottomWidth: 2, borderBottomColor: 'black', fontWeight: 'bold' }}
          value={input}
          onChangeText={text => setInput(text)}
          onBlur={handleSubmit}
        />

        {error && <Text style={{ color: 'red', marginTop: 4, fontSize: 12 }}>{error}</Text>}
      </View>

      <View style={{ position: 'absolute', bottom: -300, justifyContent: 'center', borderRadius: 50, backgroundColor: '#50AF95', padding: 8, width: 300, alignItems: 'center', marginLeft: 8 }}>
        <TouchableOpacity disabled={!isValid} onPress={handleSubmit}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16, textAlign: 'center' }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpChamaName;
