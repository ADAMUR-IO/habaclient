import {React, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MarketScreenMoneyMkts = () => {
  const navigation = useNavigation();
  const [activePage, setActivePage] = useState([1, 2, 3, 4, 5]);
  const mmData = [
    {
      id: '1',
      name: 'ICEA LION',
      symbol: 'ICEA LION',
      image: require('../Imgs/icea-lion.png'),
      price: '$49.87',
      change: '+1.25%',
    },
    {
      id: '2',
      name: 'Vanguard',
      symbol: 'Vanguard',
      image: require('../Imgs/Vanguard.png'),
      price: '$28.10',
      change: '-0.75%',
    },
    {
		id: '3',
		name: 'Sanlam',
		symbol: 'Sanlam',
		image: require('../Imgs/sanlam.png'),
		price: '$42.50',
		change: '+2.10%',
	  },
	  {
		id: '4',
		name: 'S & P 500',
		symbol: 'S & P 500',
		image: require('../Imgs/snp500.png'),
		price: '$25.80',
		change: '-1.50%',
	  },
	  {
		id: '5',
		name: 'DOW J',
		symbol: 'DOW J',
		image: require('../Imgs/dowJ.png'),
		price: '$180.20',
		change: '+3.75%',
	  },
	  {
		id: '6',
		name: 'NCBA',
		symbol: 'NCBA',
		image: require('../Imgs/NCBA.png'),
		price: '$5.30',
		change: '+0.80%',
	  },
	  {
		id: '7',
		name: 'CIC Group',
		symbol: 'CIC Group',
		image: require('../Imgs/CIC_Group.png'),
		price: '$10.40',
		change: '-0.25%',
	  },
    {
      id: '8',
      name: 'Britam',
      symbol: 'Britam',
      image: require('../Imgs/Britam.png'),
      price: '$10.40',
      change: '-0.25%',
      },
  ];


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpCryptoBabies')}>
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

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Select the <Text style={styles.investmentName}>Money Market</Text> you  want to invest in.
          <Text style={styles.emoji}>💰</Text>
        </Text>
      </View>

      <Text style={styles.subtitle}>Browse Money Markets</Text>


	  <ScrollView style={styles.scrollView}>
        <View style={styles.mmCards}>
          <FlatList
            data={mmData}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item: mm }) => (
              <TouchableOpacity key={mm.id} style={styles.mmCard}>
                <View style={styles.mmCardImageContainer}>
                <View style={styles.mmCardImageBackground}>
                  <Image source={mm.image} style={styles.mmCardImage} />
                </View>
				</View>
				<Text style={styles.mmCardText}>{mm.name}</Text>
				<Text style={styles.mmCardTextSmall}>{mm.symbol}</Text>
				<Text style={styles.mmCardText}>{mm.price}</Text>
				<Text style={styles.mmCardTextSmall}>{mm.change}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>

	  
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUpTime')}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#130138',
    marginBottom: 10,
  },
  investmentName: {
    color: "#FF7500",
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#130138',
  },
  scrollView: {
    flex: 1,
    marginBottom: 0,
  },
  mmCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  mmCard: {
	width: '48%',  
	marginBottom: 20,
	alignItems: 'center',
  },
  mmCardImageContainer: {
    width: 120,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#FF7500',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  mmCardImageBackground: {
    width: 115,
    height: 95,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mmCardImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  mmCardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#130138',
  },
  mmCardTextSmall: {
    fontSize: 12,
    color: '#A9A9A9',
  },
  bottomContainer: {
    alignItems: "center",    
    justifyContent: "flex-end",
    marginBottom: 70,
  },
  button: {
	width: 254,
    height: 45,
    backgroundColor: "#12D18E",
    marginVertical: 20,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default MarketScreenMoneyMkts;

