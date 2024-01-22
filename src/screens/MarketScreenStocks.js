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

import kqk from '../../assets/images/kq-k.png';
import pypl from '../../assets/images/pypl.png';
import aapl from '../../assets/images/aapl.png';
import sfc from '../../assets/images/sfc.png';

const MarketScreenStocks = () => {
  const navigation = useNavigation();
  const [activePage, setActivePage] = useState([1, 2, 3, 4, 5]);

  const stocksData = [
    { symbol: 'AAPL', amount: '364.11', color: ['#000000', '#676767'], image: aapl },
    { symbol: 'SFC', amount: '30.87', color: ['rgba(58, 173, 44, 0.87)', 'rgba(58, 173, 44, 0.78)'], image: sfc },
    { symbol: 'AAPL', amount: '364.11', color: ['#FF6091', '#676767'] },
    { symbol: 'PYPL', amount: '68.21', color: ['rgba(58, 173, 44, 0.87)', 'rgba(58, 173, 44, 0.78)'], image: pypl },
    { symbol: 'KQK', amount: '87.15', color: ['#000000', '#676767'], image: kqk },
    { symbol: 'AAPL', amount: '364.11', color: ['#FF6091', '#676767'] },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.stockItem}>
      <LinearGradient
        colors={item.color}
        style={styles.stockCard}
      >
        {item.image && (
          <Image source={item.image} style={styles.stockImage} />
        )}
        <View style={styles.stockDetails}>
          <Text style={styles.stockName}>{item.symbol}</Text>
          <Text style={styles.stockAmount}>{item.amount}</Text>
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
          Select the <Text style={styles.titleHighlight}>Stocks</Text> you want to invest in?
          <Text style={styles.emoji}>💰</Text>
        </Text>
      </View>

      <Text style={styles.browseStocks}></Text>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.stocksContainer}>
          <FlatList
            data={stocksData}
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
  browseStocks: {
    fontSize: 18,
    lineHeight: 24,
    color: '#000000',
    marginBottom: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  stocksContainer: {
    paddingHorizontal: 16,
  },
  stockItem: {
    flex: 1,
    marginBottom: 20,
    aspectRatio: 1,
  },
  stockCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '93%', 
  },
  stockImage: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  stockDetails: {
    flex: 1,
  },
  stockName: {
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  stockAmount: {
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

export default MarketScreenStocks;
