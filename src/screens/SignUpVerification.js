import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import camera from '../Imgs/camera.png';
import imageplaceholder from '../Imgs/image.png';

const SignUpVerification = ({ route }) => {
  const navigation = useNavigation();
  const { fullName, phoneNumber, email, password, gender, dateOfBirth } = route.params;
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [selectId, setSelectedId] = useState(null);
  const [selfieWithId, setSelfieWithId] = useState({});
  const [activePage, setActivePage] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedId(result.uri);
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to Internal Storage</Text>;
  }

  const openCamera = async () => {
    let cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus.status !== 'granted') {
      alert('Permission to access the camera was denied');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelfieWithId(result.uri);
    }
  };

  const OpenCameraButton = () => {
    return (
      <TouchableOpacity onPress={openCamera} style={styles.cameraButton}>
        <Image source={camera} style={styles.cameraIcon} />
        <Text style={styles.cameraText}>Open the camera and take your photo</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpBDay')}>
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
          Upload a copy of your <Text style={styles.emoji}>🆔</Text> National ID Card
        </Text>

        <Text style={styles.description}>This is a quick step to secure your investments</Text>

        <View style={styles.uploadContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image source={imageplaceholder} style={styles.image} />
          </TouchableOpacity>

          {selectId && <Image source={{ uri: selectId.uri }} />}
          <Text style={styles.cameraText}>Select ID</Text>
        </View>


        <Text style={styles.orText}>And</Text>
        <Text style={styles.title}>
          Now take a quick selfie with your ID
          <Image source={require('../Imgs/noto_selfie.png')} style={styles.image} />
        </Text>

        <View style={styles.uploadContainer}>
          <TouchableOpacity onPress={openCamera}>
            <OpenCameraButton />
          </TouchableOpacity>
          {selfieWithId && <Image source={{ uri: selfieWithId.uri }} />} 
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate('SignUpSos', {
              fullName,
              phoneNumber,
              email,
              password,
              gender,
              dateOfBirth,
              selectedId: {},
              selfieWithId: {},
            })
          }
        >
          <Text style={styles.text}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
    padding: 6,
    marginTop: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginRight: 8,
  },
  emoji: {
    fontSize: 20,
  },
  description: {
    fontSize: 15,
    color: '#888',
    marginBottom: 16,
  },
  uploadContainer: {
    padding: 16,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  cameraIcon: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    tintColor: '#FF7500',
  },
  cameraText: {
    color: '#12D18E',
    fontSize: 14,
    marginLeft: 8,
    textAlign: 'center',
  },
  orText: {
    color: '#FF7500',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
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
};

export default SignUpVerification;