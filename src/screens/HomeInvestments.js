import { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView} from "react-native";
import { useFonts } from "expo-font";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../components/AuthContext";
import { moneyMarkets, stocks, cryptocurrencies } from "../investments";

import logo from "../../assets/images/whitelogo.png";
import avatar from "../../assets/images/invest.png";
import wallet from "../../assets/images/wallet-2.png";
import notification from "../../assets/images/notification-bing.png";
import gift from "../../assets/images/gift_icon.png";
import chart from "../../assets/images/chart-2.png";

const HomeInvestments= ({ navigation }) => {
  const { user } = useContext(AuthContext);  
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const [loaded] = useFonts({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
    Rubik: require("../../assets/fonts/static-Rubik/Rubik-Regular.ttf"),
    Inter: require("../../assets/fonts/static/Inter-Regular.ttf"),
    QuickSand: require("../../assets/fonts/static-quicksand/Quicksand-Regular.ttf"),
  });


  useEffect(() => {

    const loadProfileImage = async () => {
      try {
        if (user && user.token) {
          const imageURL = await AsyncStorage.getItem(
            `profileImage_${user.id}`
          );

          if (imageURL) {
            setProfileImage(imageURL);
          }
        }
      } catch (error) {
        console.log("Error loading profile image from AsyncStorage:", error);
      }
    };

    
    loadProfileImage();
    
  }, [user]);

  const handlePress = () => {
    console.log("clicked");
  };

  const renderBanner = () => {
    const balance = isBalanceHidden ? "KES: 100.00" : "KES: XXX.XX";

    return (
      <View style={styles.banner}>
        <View style={styles.bannerImages}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserWallet")}
        >
          <ChevronLeftIcon size={30} color="#A9A9A9" />
        </TouchableOpacity>
          <Image style={styles.logo} source={logo} />
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={profileImage ? { uri: profileImage } : avatar}
                  style={styles.profileImage}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View> 
      </View>
    );
  };

  const renderMenu = () => {
    return (
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => navigation.navigate("UserWallet")}>
          <Image
            source={wallet}
            style={[styles.menuIcons, { width: 40, height: 40 }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("GirlChattingWallet")}
        >
          <Image
            source={gift}
            style={[styles.menuIcons, { width: 35, height: 40 }]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("HomeInvestments")}>
          <Image
            source={chart}
            style={[styles.menuIcons, { width: 40, height: 40 }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("NotificationWallet")}
        >
          <Image
            source={notification}
            style={[styles.menuIcons, { width: 40, height: 40 }]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderPopularStocks = () => {
    return (
      <View style={[styles.popularSection, { marginTop: 20 }]}>
        <View style={styles.popularHeader}>
          <Text style={styles.featuresButtonsText}>Popular Stocks</Text>
        </View>
        <ScrollView horizontal={true}>
          {stocks.map((stock, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => handleStockCardPress(stock)}
            >              
              <Image source={stock.image} style={styles.cardlogo} />
              <View style={styles.cardContent}> 
                <Text style={styles.symbol}>{stock.symbol}</Text>
                <Text style={styles.yield}>Yield: {stock.yield}</Text>
                <Text style={styles.subheading}>Min: {stock.minInvestmentAmount}</Text>
                <Text style={styles.subheading}>Scope: {stock.investmentHorizon}</Text>
              
                {/* ... */}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };  

  const renderMoneyMarkets = () => {
    return (
      <View style={[styles.moneyMarketsSection,  { marginTop: 20 }]}>
        <View style={styles.moneyMarketsHeader}>
          <Text style={styles.featuresButtonsText}>Money Markets</Text>
        </View>
        <ScrollView horizontal={true}>
          {moneyMarkets.map((market, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => handleMoneyMarketCardPress(market)}
            >              
              <Image source={market.image} style={styles.cardlogo} />
              <View style={styles.cardContent}>
                <Text style={styles.name}>{market.name}</Text>
                <Text style={styles.yield}>Yield: {market.yield}</Text>
                <Text style={styles.stat}>Min: {market.minInvestmentAmount}</Text>
                {/* Add more money market-related data here if needed */}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };
  
  const renderCryptocurrencies = () => {
    return (
      <View style={[styles.cryptocurrenciesSection,  { marginTop: 20 }]}>
        <View style={styles.cryptocurrenciesHeader}>
          <Text style={styles.featuresButtonsText}>Cryptocurrencies</Text>
        </View>
        <ScrollView horizontal={true}>
          {cryptocurrencies.map((crypto, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => handleCryptoCardPress(crypto)}
            >
              <Image source={crypto.image} style={styles.cardlogo} />
              <View style={styles.cardContent}>
                <Text style={styles.name}>{crypto.name}</Text>
                <Text style={styles.symbol}>{crypto.symbol}</Text>
                <Text style={styles.yield}>price: {crypto.price}</Text>
                <Text style={styles.stat}>ATH: {crypto.allTimeHigh}</Text>
                <Text style={styles.stat}>ATL:  {crypto.allTimeLow}</Text>              
                {/* Add more cryptocurrency-related data here if needed */}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };
  
  

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderBanner()}

        <View style={styles.features}>          
          
          {renderPopularStocks()}
          {renderCryptocurrencies() }
          {renderMoneyMarkets()}
        </View>
      </ScrollView>
      {renderMenu()}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  banner: {
    flex: 0.4,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 30,
    marginTop:0,
  },
  bannerImages: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 108,
    height: 27.43,
  },
  avatar: {
    width: 30,
    height: 20,
    borderRadius: 50,
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 18,
    color: "white",
    marginTop: 10,
  },
  key: {
    width: 30,
    height: 30,
  },
  buttons: {
    flex: 1,
    margin: 10,
    elevation: 10,
  },
  buttonText: {
    fontFamily: "Inter",
    fontWeight: "700",
    textAlign: "center",
    borderRadius: 20,
    paddingVertical: 13,
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    width: 320,
    alignSelf: "center",
    marginBottom: 0,
    borderWidth: 1,
    borderColor: "#D8DCE1",
    borderRadius: 30,
    backgroundColor: "#fff",
    elevation: 15,
    paddingHorizontal: 20,
  },
  menuIcons: {
    width: 50,
    height: 50,
  },
  features: {
    flex: 0.6,
    paddingHorizontal: 20,
  },
  featuresButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  featuresButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 25,
    width: 170,
    height: 35,
    borderRadius: 15,
  },
  featuresButtonsIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  featuresButtonsText: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 14,
    color: "#242132",
    lineHeight: 15,
  },  
  profileImageContainer: {
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 48,
  },  
  card: {
    width: 132,
    height: 170,
    flexShrink: 0,
    borderRadius: 16,
    backgroundColor: "#FFF",
    shadowColor: "#242132",
    shadowOpacity: 0.12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 12,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: "#FFF7EB",
  },
  cardlogo: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 80,
    height: 35,
  },
  cardContent: {
    alignItems: "center",
  },
  name: {
    fontFamily: "Inter",
    fontWeight: "500",
    lineHeight: 15,
    fontSize: 14,
    color: "#242132",
    textAlign: "center",
    paddingTop: 10,
  },
  symbol: {
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 15,
    fontSize: 10,
    color: "#888888",
    textAlign: "center",
    paddingTop: 2,
  },
  yield: {
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 15,
    fontSize: 12,
    color: "#50AF95",
    textAlign: "center",
    paddingTop: 2,
  },
});

export default HomeInvestments;