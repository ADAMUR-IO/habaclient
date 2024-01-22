import { React } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChamaMarketScreenCrypto = () => {
  const navigation = useNavigation();
  const cryptoData = [
    {
      id: "1",
      name: "Bitcoin",
      symbol: "BTC",
      image: require("../Imgs/Bitcoin.png"),
      price: "$40,987",
      change: "+1.25%",
    },
    {
      id: "2",
      name: "Ethereum",
      symbol: "ETH",
      image: require("../Imgs/Ethereum.png"),
      price: "$2,810",
      change: "-0.75%",
    },
    {
      id: "3",
      name: "Avalanche",
      symbol: "AVAX",
      image: require("../Imgs/Avalanche.png"),
      price: "$42.50",
      change: "+2.10%",
    },
    {
      id: "4",
      name: "Cosmos",
      symbol: "ATOM",
      image: require("../Imgs/Cosmos.png"),
      price: "$25.80",
      change: "-1.50%",
    },
    {
      id: "5",
      name: "Solana",
      symbol: "SOL",
      image: require("../Imgs/Solana.png"),
      price: "$180.20",
      change: "+3.75%",
    },
    {
      id: "6",
      name: "Osmosis",
      symbol: "OSMO",
      image: require("../Imgs/osmosis.png"),
      price: "$5.30",
      change: "+0.80%",
    },
    {
      id: "7",
      name: "Evmos",
      symbol: "EVMOS",
      image: require("../Imgs/Evmos.png"),
      price: "$10.40",
      change: "-0.25%",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ChamaInvestWallet")}
        >
          <ChevronLeftIcon size={30} color="#A9A9A9" />
        </TouchableOpacity>
        {/* <View style={styles.slider}>
          {[1, 2, 3, 4, 5, 6, 7].map((page) => (
            <View
              key={page}
              style={[
                styles.sliderItem,
                activePage.includes(page) && styles.activeSliderItem,
              ]}
            />
          ))}
        </View> */}
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Select the <Text style={styles.investmentName}>Coins</Text> you want
          to invest in ?<Text style={styles.emoji}>💰</Text>
        </Text>
      </View>

      <Text style={styles.subtitle}>Browse Crypto</Text>

      <ScrollView style={styles.scrollView}>
        <View style={styles.cryptoCards}>
          <FlatList
            data={cryptoData}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item: crypto }) => (
              <TouchableOpacity key={crypto.id} style={styles.cryptoCard}>
                <View style={styles.cryptoCardImageContainer}>
                  <View style={styles.cryptoCardImageBackground}>
                    <Image
                      source={crypto.image}
                      style={styles.cryptoCardImage}
                    />
                  </View>
                </View>
                <Text style={styles.cryptoCardText}>{crypto.name}</Text>
                <Text style={styles.cryptoCardTextSmall}>{crypto.symbol}</Text>
                <Text style={styles.cryptoCardText}>{crypto.price}</Text>
                <Text style={styles.cryptoCardTextSmall}>{crypto.change}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ChamaInvestTime")}
        >
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
    backgroundColor: "#FFFFFF",
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
    fontWeight: "bold",
    color: "#130138",
    marginBottom: 10,
  },
  investmentName: {
    color: "#FF7500",
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    color: "#130138",
  },
  scrollView: {
    flex: 1,
    marginBottom: 0,
  },
  cryptoCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  cryptoCard: {
    width: "48%",
    marginBottom: 20,
    alignItems: "center",
  },
  cryptoCardImageContainer: {
    width: 120,
    height: 100,
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  cryptoCardImageBackground: {
    width: 100,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#FF7500",
    justifyContent: "center",
    alignItems: "center",
  },
  cryptoCardImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  cryptoCardText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#130138",
  },
  cryptoCardTextSmall: {
    fontSize: 12,
    color: "#A9A9A9",
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

export default ChamaMarketScreenCrypto;
