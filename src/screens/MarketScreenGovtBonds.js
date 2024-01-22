import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const MarketScreenGovtBonds = () => {
  const navigation = useNavigation();
  const [activePage, setActivePage] = useState([1, 2, 3, 4, 5]);

  const bondsData = [
    { symbol: 'Treasury Bonds', color: ['#0C2340', '#3E6BB1'] },
    { symbol: 'Treasury Bills', color: ['#1C6E66', '#54B9AA'] },
    { symbol: 'Infrastructure Bonds', color: ['#4C2C1D', '#7E5D45'] },
    { symbol: 'Green Bonds', color: ['#1E7E34', '#56C55D'] },
    { symbol: 'Social Bonds', color: ['#FF7F00', '#FFA85D'] },
    { symbol: 'Retail Infrastructure Bond (M-Akiba)', color: ['#4B0082', '#A982D3'] },
    { symbol: 'Eurobonds', color: ['#8F7B7B', '#C0C0C0'] },
    { symbol: 'Sovereign Sukuk', color: ['#800000', '#A52A2A'] },
  ];
  

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.bondItem}>
      <LinearGradient
        colors={item.color}
        style={styles.bondCard}
      >
        {item.image && (
          <Image source={item.image} style={styles.bondImage} />
        )}
        <View style={styles.bondDetails}>
          <Text style={styles.bondName}>{item.symbol}</Text>
          <Text style={styles.bondAmount}>{item.amount}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

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
          Select the <Text style={styles.titleHighlight}>Government Bonds</Text> you want to invest in?
          <Text style={styles.emoji}>💰</Text>
        </Text>
      </View>

      <Text style={styles.browseBonds}></Text>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.bondsContainer}>
          <FlatList
            data={bondsData}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('SignUpBonus')}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
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
  title: {
    fontSize: 24,    
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  titleHighlight: {
    color: '#FF7500',
  },
  emoji: {
    fontSize: 24,
  },
  browseBonds: {
    fontSize: 18,
    lineHeight: 24,
    color: '#000000',
    marginBottom: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  bondsContainer: {
    paddingHorizontal: 16,
  },
  bondItem: {
    flex: 1,
    marginBottom: 20,
    aspectRatio: 1,
  },
  bondCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '93%', 
  },
  bondImage: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  bondDetails: {
    flex: 1,
  },
  bondName: {
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  bondAmount: {
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 70,
  },
  continueButton: {
    width: 254,
    height: 45,
    backgroundColor: '#12D18E',
    marginVertical: 20,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MarketScreenGovtBonds;
