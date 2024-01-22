import { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView} from "react-native";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { backendUrl } from '../../config/config';
import { AuthContext } from "../components/AuthContext";
import { moneyMarkets, stocks, cryptocurrencies } from "../investments";

import logo from "../../assets/images/haba_logo.png";
import avatar from "../../assets/images/chama.png";
import profile from "../../assets/images/profileImage.png"
import wallet from "../../assets/images/wallet-2.png";
import notification from "../../assets/images/notification-bing.png";
import gift from "../../assets/images/gift_icon.png";
import award from "../../assets/images/award_icon.png";
import eye from "../../assets/images/eye_icon.png";
import key from "../../assets/images/key_square.png";
import circle from "../../assets/images/add_circle.png";
import compass from "../../assets/images/compass.png";
import chart from "../../assets/images/chart-2.png";

const Home = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [chamaData, setChamaData] = useState([]);
  const [myChamaData, setMyChamaData] = useState([]);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [isMyChamaClicked, setIsMyChamaClicked] = useState(false);
  const [isPopularChamaClicked, setIsPopularChamaClicked] = useState(false);  
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

    const fetchChamaData = async () => {
      try {
        const token = user.token;
        const response = await axios.get(
          `${backendUrl}/api/chamas`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setChamaData(response.data);
        } else {
          console.error("Failed to fetch chama data:", response.error);
        }
      } catch (error) {
        console.error("Failed to fetch chama data:", error);
      }
    };

    const fetchMyChamaData = async () => {
      try {
        const token = user.token;
        const response = await axios.get(
          `${backendUrl}/api/users/mychamas`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setMyChamaData(response.data);
        } else {
          console.error("Failed to fetch my chama data:", response.error);
        }
      } catch (error) {
        console.error("Failed to fetch my chama data:", error.response);
      }
    };

    loadProfileImage();
    fetchChamaData();
    fetchMyChamaData();
  }, [user, user.token]);

  const handlePress = () => {
    console.log("clicked");
  };

  const renderBanner = () => {
    const balance = isBalanceHidden ? "KES: 100.00" : "KES: XXX.XX";

    return (
      <View style={styles.banner}>
        <View style={styles.bannerImages}>
          <Image style={styles.logo} source={logo} />
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={profileImage ? { uri: profileImage } : profile}
                  style={styles.profileImage}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={[styles.text, { fontWeight: "700" }]}>
            Account Balance:
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[styles.text, { fontWeight: "bold", fontSize: 22 }]}>
              {balance}
            </Text>
            <TouchableOpacity
              onPress={() => setIsBalanceHidden(!isBalanceHidden)}
            >
              <Image source={key} style={styles.key} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => navigation.navigate("MPESA_STK_PushScreen")}
          >
            <Text
              style={[
                styles.buttonText,
                { backgroundColor: "#50AF95", color: "#fff" },
              ]}
            >
              Send
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={handlePress}>
            <Text style={[styles.buttonText, { backgroundColor: "#D9D9D9" }]}>
              Withdraw
            </Text>
          </TouchableOpacity>
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
          <View style={styles.featuresButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.featuresButtons,
                {
                  backgroundColor: isPopularChamaClicked
                    ? "#F3F3F3"
                    : "#ffffff",
                },
              ]}
              onPress={() => {
                setIsPopularChamaClicked(!isPopularChamaClicked);
                setIsMyChamaClicked(false);
              }}
            >
              <Image source={award} style={styles.featuresButtonsIcon} />
              <Text style={styles.featuresButtonsText}>Popular chamas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.featuresButtons,
                { backgroundColor: isMyChamaClicked ? "#F3F3F3" : "#ffffff" },
              ]}
              onPress={() => {
                setIsMyChamaClicked(!isMyChamaClicked);
                setIsPopularChamaClicked(false);
              }}
            >
              <Image source={eye} style={styles.featuresButtonsIcon} />
              <Text style={styles.featuresButtonsText}>My chama</Text>
            </TouchableOpacity>
          </View>
          {isMyChamaClicked ? (
            <ScrollView horizontal={true}>
              <View style={{ flexDirection: "row", marginHorizontal: 25 }}>
                {myChamaData.map((chama) => (
                  <View style={styles.chamaDetails} key={chama._id}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ChamaWallet", {
                          chamaId: chama._id,
                        })
                      }
                    >
                      <View style={styles.chamaAvatar}>
                        <View style={{ marginLeft: 10, marginTop: 5 }}>
                          <Image
                            source={avatar}
                            style={{ width: 30, height: 30, borderRadius: 50 }}
                          />

                          <Image
                            source={avatar}
                            style={{
                              width: 25,
                              height: 25,
                              borderRadius: 50,
                              marginLeft: 20,
                              marginTop: -10,
                            }}
                          />

                          <Image
                            source={avatar}
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: 50,
                              paddingBottom: 20,
                              marginLeft: 5,
                              marginTop: -15,
                            }}
                          />
                        </View>
                      </View>

                      <View style={styles.chama}>
                        <Text style={styles.chamaTitle}>{chama.chamaName}</Text>
                        <Text style={styles.chamaNumber}>
                          {chama.members.length} people
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginHorizontal: 35,
                  marginTop: 15,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 15,
                    backgroundColor: "#fff",
                    elevation: 15,
                  }}
                  onPress={() => navigation.navigate("ChamaNameWallet")}
                >
                  <Image
                    source={circle}
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: "center",
                      marginVertical: 7,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          ) : null}

          {isPopularChamaClicked ? (
            <ScrollView horizontal={true}>
              <View style={{ flexDirection: "row", marginHorizontal: 25 }}>
                {chamaData.map((chama) => (
                  <View style={styles.chamaDetails} key={chama._id}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ChamaWallet", {
                          chamaId: chama._id,
                        })
                      }
                    >
                      <View style={styles.chamaAvatar}>
                        <View style={{ marginLeft: 10, marginTop: 5 }}>
                          <Image
                            source={avatar}
                            style={{ width: 30, height: 30, borderRadius: 50 }}
                          />

                          <Image
                            source={avatar}
                            style={{
                              width: 25,
                              height: 25,
                              borderRadius: 50,
                              marginLeft: 20,
                              marginTop: -10,
                            }}
                          />

                          <Image
                            source={avatar}
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: 50,
                              paddingBottom: 20,
                              marginLeft: 5,
                              marginTop: -15,
                            }}
                          />
                          <Image
                            source={compass}
                            style={{
                              width: 20,
                              height: 20,
                              marginLeft: 25,
                              marginTop: -10,
                            }}
                          />
                        </View>
                      </View>

                      <View style={styles.chama}>
                        <Text style={styles.chamaTitle}>{chama.chamaName}</Text>
                        <Text style={styles.chamaNumber}>
                          {chama.members.length} people
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginHorizontal: 35,
                    marginTop: 15,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 15,
                      backgroundColor: "#fff",
                      elevation: 15,
                    }}
                    onPress={() => navigation.navigate("ChamaNameWallet")}
                  >
                    <Image
                      source={circle}
                      style={{
                        width: 30,
                        height: 30,
                        alignSelf: "center",
                        marginVertical: 7,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          ) : null}
          <TouchableOpacity
            style={styles.inviteButton}
            onPress={() => navigation.navigate("GirlChattingWallet")}
          >
            <Text style={styles.inviteButtonText}>Invite Friends</Text>
          </TouchableOpacity>
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
    backgroundColor: "#15133C",
    borderRadius: 30,
    padding: 50,
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
    width: 40,
    height: 40,
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
  myChamaContainer: {
    marginTop: 15,
  },
  myChamaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  myChamaHeaderText: {
    color: "#130138",
    fontFamily: "Rubik",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 1,
  },
  myChamaHeaderIcon: {
    width: 27,
    height: 26,
    marginLeft: 5,
  },
  addChamaButton: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 15,
  },
  addChamaButtonIcon: {
    width: 30,
    height: 30,
    alignSelf: "center",
    marginVertical: 7,
  },
  chamaListContainer: {
    flexDirection: "row",
    marginHorizontal: 25,
  },
  chamaDetails: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  chamaAvatar: {
    width: 64,
    height: 64,
    backgroundColor: "#F3F3F3",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  chamaAvatarImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  compassIcon: {
    width: 20,
    height: 20,
    marginLeft: 25,
    marginTop: -10,
  },
  chama: {
    alignItems: "center",
  },
  chamaTitle: {
    fontFamily: "Inter",
    fontWeight: "700",
    lineHeight: 15,
    fontSize: 14,
    color: "#242132",
    textAlign: "center",
    paddingTop: 10,
  },
  chamaNumber: {
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 15,
    fontSize: 12,
    color: "#888888",
    textAlign: "center",
    paddingTop: 2,
  },
  popularChamaContainer: {
    marginTop: 15,
  },
  popularChamaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  popularChamaHeaderText: {
    color: "#130138",
    fontFamily: "Rubik",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 1,
  },
  popularChamaHeaderIcon: {
    width: 27,
    height: 26,
    marginLeft: 5,
  },
  popularChamaListContainer: {
    flexDirection: "row",
    marginHorizontal: 25,
  },
  profileImageContainer: {
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 48,
  },
  inviteButton: {
    marginTop: 40,
    width: 182,
    height: 53,
    backgroundColor: "#FF7500",
    elevation: 10,
    borderWidth: 1,
    borderColor: "#FF7500",
    borderRadius: 20,
    alignSelf: "center",
  },
  inviteButtonText: {
    fontFamily: "Inter",
    fontWeight: "700",
    lineHeight: 25,
    color: "#fff",
    fontSize: 16,
    alignSelf: "center",
    marginVertical: 8,
  },
  popularSection: {
    marginTop: 15,
  },
  popularHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  popularHeaderText: {
    color: "#130138",
    fontFamily: "Rubik",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 1,
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

export default Home;