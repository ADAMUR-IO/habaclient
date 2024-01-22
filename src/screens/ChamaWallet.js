import { StatusBar } from "expo-status-bar";
import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { useFonts } from "expo-font";
import axios from "axios";

import { AuthContext } from "../components/AuthContext";
import { backendUrl } from '../../config/config';

import logo from "../../assets/images/haba_logo.png";
import avatar from "../../assets/images/chama.png";
import profile from "../../assets/images/profileImage.png"
import wallet from "../../assets/images/wallet-2.png";
import gift from "../../assets/images/gift_icon.png";
import key from "../../assets/images/key_square.png";
import buyIn from "../../assets/images/buy-in-icon.png";
import shares from "../../assets/images/shares-icon.png";
import returns from "../../assets/images/returns-icon.png";
import contributions from "../../assets/images/contributions-icon.png";
import circle from "../../assets/images/add_circle.png";
import chart from "../../assets/images/chart-2.png";
import notification from "../../assets/images/notification-bing.png";

export default function ChamaWallet() {
  const navigation = useNavigation();
  const route = useRoute();

  const { user } = useContext(AuthContext);
  const { chamaId } = route.params;
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [chamaData, setChamaData] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [isInvitePopupVisible, setIsInvitePopupVisible] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const [loaded] = useFonts({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
    Rubik: require("../../assets/fonts/static-Rubik/Rubik-Regular.ttf"),
    Inter: require("../../assets/fonts/static/Inter-Regular.ttf"),
    QuickSand: require("../../assets/fonts/static-quicksand/Quicksand-Regular.ttf"),
  });

  useEffect(() => {
    const fetchChamaData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/chamas/${chamaId}`);
        const { data } = response;
        setChamaData(data);
      } catch (error) {
        console.error("Error fetching chama data:", error.message);
      }
    };
  
    const refreshInterval = setInterval(() => {
      if (chamaId) {
        fetchChamaData();
        setIsMember(
          chamaData && chamaData.members.some((member) => member.user === user.id)
        );
      } else {
        console.error("Chama ID is missing or invalid.");
      }
    }, 1000); // Refresh every 1 seconds
  
    return () => clearInterval(refreshInterval);
  }, [chamaId, chamaData, user.id]);
  

  if (!loaded) {
    return null;
  }

  function handleRequestButtonPress() {
    setIsConfirmationVisible(true);
  }

  function handleInviteInputChange(text) {
    setInviteEmail(text);
  }

  function handleInviteSubmit() {
    console.log("Sending invitation to:", inviteEmail);

    setIsInvitePopupVisible(false);

    const inviteChamaURL = `${backendUrl}/api/chamas/${chamaId}/invite`;

    const userToken = user.token;

    axios
      .post(
        inviteChamaURL,
        { email: inviteEmail },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Invitation sent!", response.data.message);
      })
      .catch((error) => {
        console.error("Error sending invitation:", error.message);
      });
    const history = useNavigation();
    history.push("/chamaWallet");
  }  

  function handleConfirmExit() {
    console.log("Exit chama");
    setIsPopupVisible(false);
    const exitChamaURL = `${backendUrl}/api/chamas/${chamaId}/exit`;
  
    const userToken = user.token;
  
    axios
      .post(exitChamaURL, null, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        console.log(response.data.message);
        navigation.navigate("Wallet");
      })
      .catch((error) => {
        console.error("Error exiting chama:", error.message);
      });
  }

  function handleCancelExit() {
    setIsPopupVisible(false);
  }

  async function handleConfirm() {
    try {
      console.log("Confirmed");
      const joinRequestURL = `${backendUrl}/api/chamas/${chamaId}/join-request`;

      const userToken = user.token;
      const email = user.email;
      const userId = user.id;
      const userFullName = user.fullName;

      await axios.post(
        joinRequestURL,
        {
          userFullName: userFullName,
          userId: userId,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log("Request sent successfully!");
      setIsConfirmationVisible(false);
      setIsSuccessVisible(true);
    } catch (error) {
      console.error("Error sending join request:", error.message);
    }
  }

  function renderBanner() {
    let balance = "KES: 1000.00";
    return (
      <View style={styles.banner}>
        <View style={styles.bannerImages}>
          <Image style={styles.logo} source={logo}></Image>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <Image source={avatar} style={styles.avatar} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={[styles.text, { fontWeight: "700" }]}>
            Chama Balance:
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {isBalanceHidden ? (
              <Text style={[styles.text, { fontWeight: "bold", fontSize: 22 }]}>
                {balance}
              </Text>
            ) : (
              <Text style={[styles.text, { fontWeight: "bold", fontSize: 22 }]}>
                {(balance = "KES: XXX.XX")}
              </Text>
            )}

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
            onPress={() => navigation.navigate("Deposit")}
          >
            <Text
              style={[
                styles.buttonText,
                { backgroundColor: "#50AF95", color: "#fff" },
              ]}
            >
              Top up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => navigation.navigate("Withdrawal")}
          >
            <Text style={[styles.buttonText, { backgroundColor: "#D9D9D9" }]}>
              Withdrawal
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderMenu() {
    return (
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => navigation.navigate("UserWallet")}>
          <Image
            source={wallet}
            style={[styles.MenuIcons, { width: 40, height: 40 }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("GirlChattingWallet")}
        >
          <Image
            source={gift}
            style={[styles.MenuIcons, { width: 35, height: 40 }]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("HomeInvestments")}>
          <Image
            source={chart}
            style={[styles.MenuIcons, { width: 40, height: 40 }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("NotificationWallet")}
        >
          <Image
            source={notification}
            style={[styles.MenuIcons, { width: 40, height: 40 }]}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function onQClick() {
    return (
      <View
        style={{
          width: 48,
          height: 34,
          backgroundColor: "#FFFFFF",
          borderRadius: 7,
        }}
      ></View>
    );
  }

  function handleInvite() {
    setIsInvitePopupVisible(true);
  }

  function renderInvitePopup() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isInvitePopupVisible}
        onRequestClose={() => setIsInvitePopupVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter email:</Text>
            <TextInput
              style={styles.inviteInput}
              placeholder="Email"
              value={inviteEmail}
              onChangeText={handleInviteInputChange}
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setIsInvitePopupVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.modalConfirmButton]}
                onPress={handleInviteSubmit}
              >
                <Text style={styles.modalButtonText}>Send Invite</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  function renderConfirmationPopup() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isConfirmationVisible}
        onRequestClose={() => setIsConfirmationVisible(false)}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Confirmation</Text>
            <Text style={styles.popupText}>
              Are you sure you want to request to join the chama?
            </Text>
            <View style={styles.popupButtons}>
              <TouchableOpacity
                style={[styles.popupButton, styles.cancelButton]}
                onPress={() => setIsConfirmationVisible(false)}
              >
                <Text style={styles.popupButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.popupButton, styles.confirmButton]}
                onPress={handleConfirm}
              >
                <Text style={styles.popupButtonText}>Join</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  function renderSuccessPopup() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isSuccessVisible}
        onRequestClose={() => setIsSuccessVisible(false)}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Success</Text>
            <Text style={styles.popupText}>
              Your request to join the chama was successful!
            </Text>
            <TouchableOpacity
              style={[styles.popupButton, styles.confirmButton]}
              onPress={() => setIsSuccessVisible(false)}
            >
              <Text style={styles.popupButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderBanner()}

        <View style={styles.features}>
          <View style={styles.chamaMembers}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ChamaMemberWallet")}
            >
              <Image source={profile} style={styles.member} />
            </TouchableOpacity>
            <Image source={profile} style={styles.member} />
            <Image source={profile} style={styles.member} />
            <Image source={profile} style={styles.member} />
            <Image source={profile} style={styles.member} />
            <Image source={profile} style={styles.member} />
            <Text style={styles.memberNumber}>
              {chamaData && chamaData.members.length} people
            </Text>
          </View>
          <View style={styles.chamaGraph}>
            <Text style={styles.chamaName}>
              {chamaData && chamaData.chamaName}
            </Text>
          </View>
          <View style={styles.chamaAssets}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={styles.assetsIconsBg}>
                  <Image source={buyIn} style={styles.assetsIcons} />
                </View>
                <Text style={styles.assetsText}>Buy-in</Text>
              </View>
              <View>
                <Text style={styles.assetsAmount}>
                  {" "}
                  Kshs {chamaData && chamaData.minimumBuyIn}
                </Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={styles.assetsIconsBg}>
                  <Image source={shares} style={styles.assetsIcons} />
                </View>
                <Text style={styles.assetsText}>Shares</Text>
              </View>
              <View>
                <Text style={styles.assetsAmount}>$ 130K</Text>
              </View>
            </View>
          </View>
          <View style={styles.memberAssets}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={contributions}
                  style={[styles.assetsIcons, { width: 30, height: 30 }]}
                />

                <Text style={styles.assetsText}>Avg cost</Text>
              </View>
              <View>
                <Text style={styles.assetsAmount}>KES 130K</Text>
              </View>
            </View>
            <View style={{ paddingLeft: 65 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={returns}
                  style={[styles.assetsIcons, { width: 30, height: 30 }]}
                />

                <Text style={styles.assetsText}>Total Returns</Text>
              </View>
              <View>
                <Text style={styles.assetsAmount}>KES 130K</Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 25, marginHorizontal: 41 }}>
            <Text style={styles.annualEarningsText}>Annual Earnings</Text>
            <View style={styles.annualEarnings}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={[styles.earnings, { backgroundColor: "#12D18E" }]}
                />
                <Text style={styles.earningsText}>+28.54%</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={[styles.earnings, { backgroundColor: "#E31937" }]}
                />
                <Text style={styles.earningsText}>+28.54%</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={[styles.earnings, { backgroundColor: "#A3EDD3" }]}
                />
                <Text style={styles.earningsText}>+28.54%</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={[styles.earnings, { backgroundColor: "#FDB8B8" }]}
                />
                <Text style={styles.earningsText}>+28.54%</Text>
              </View>
            </View>
            <View style={styles.annualEarnings}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={[styles.earnings, { backgroundColor: "#12D18E" }]}
                />
                <Text style={styles.earningsText}>+28.54%</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={[styles.earnings, { backgroundColor: "#FDB8B8" }]}
                />
                <Text style={styles.earningsText}>+28.54%</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={[styles.earnings, { backgroundColor: "#12D18E" }]}
                />
                <Text style={styles.earningsText}>+28.54%</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={[styles.earnings, { backgroundColor: "#12D18E" }]}
                />
                <Text style={styles.earningsText}>+28.54%</Text>
              </View>
            </View>
            <View style={styles.qContainer}>
              <TouchableOpacity
                style={{
                  width: 48,
                  height: 34,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 7,
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#242132",
                }}
              >
                <Text style={styles.qText}>Q1/22</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.qText}>Q2/22</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.qText}>Q3/22</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.qText}>Q4/22</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.portfolio}>
            <Text style={styles.portfolioText}>Portfolio</Text>
            <View style={styles.portfolioContent}>
              <Text>Portfolio Content</Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 41,
              marginTop: 15,
              marginBottom: 160,
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {!isMember && (
              <TouchableOpacity
                style={[styles.requestButton, { backgroundColor: "#12D18E" }]}
                onPress={handleRequestButtonPress}
              >
                <Text style={styles.requestText}>Request to Join</Text>
              </TouchableOpacity>
            )}
            {isMember && (
              <>
                <TouchableOpacity
                  style={[styles.requestButton, { backgroundColor: "#FF7500" }]}
                  onPress={handleInvite}
                >
                  <Text style={styles.requestText}>Invite to Chama</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.requestButton,
                    { backgroundColor: "#440000", marginTop: 10 },
                  ]}
                  onPress={() => setIsPopupVisible(true)}
                >
                  <Text style={styles.requestText}>
                    Exit {chamaData && chamaData.chamaName}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* Request to Join Popup */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={isConfirmationVisible}
              onRequestClose={() => setIsConfirmationVisible(false)}
            >
              <View style={styles.popupContainer}>
                <View style={styles.popup}>
                  <Text style={styles.popupTitle}>Confirmation</Text>
                  <Text style={styles.popupText}>
                    Are you sure you want to join the chama?
                  </Text>
                  <View style={styles.popupButtons}>
                    <TouchableOpacity
                      style={[styles.popupButton, styles.cancelButton]}
                      onPress={() => setIsConfirmationVisible(false)}
                    >
                      <Text style={styles.popupButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.popupButton, styles.confirmButton]}
                      onPress={handleConfirm}
                    >
                      <Text style={styles.popupButtonText}>Join</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            {/* Exit Confirmation Popup */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={isPopupVisible}
              onRequestClose={() => setIsPopupVisible(false)}
            >
              <View style={styles.popupContainer}>
                <View style={styles.popup}>
                  <Text style={styles.popupTitle}>Confirmation</Text>
                  <Text style={styles.popupText}>
                    Are you sure you want to exit the chama?
                  </Text>
                  <View style={styles.popupButtons}>
                    <TouchableOpacity
                      style={[styles.popupButton, styles.cancelButton]}
                      onPress={handleCancelExit} // Call the handleCancelExit function when "Cancel" is pressed
                    >
                      <Text style={styles.popupButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.popupButton, styles.confirmButton]}
                      onPress={handleConfirmExit} // Call the handleConfirmExit function when "Exit" is pressed
                    >
                      <Text style={styles.popupButtonText}>Exit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            {/* Invite Popup */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={isInvitePopupVisible}
              onRequestClose={() => setIsInvitePopupVisible(false)}
            >
              <View style={styles.popupContainer}>
                <View style={styles.popup}>
                  <Text style={styles.popupTitle}>Invite</Text>
                  <Text style={styles.popupText}>
                    Enter the email of the person you want to invite:
                  </Text>
                  <TextInput
                    style={styles.inviteInput}
                    placeholder="Email"
                    value={inviteEmail}
                    onChangeText={handleInviteInputChange}
                  />
                  <View style={styles.popupButtons}>
                    <TouchableOpacity
                      style={[styles.popupButton, styles.cancelButton]}
                      onPress={() => setIsInvitePopupVisible(false)}
                    >
                      <Text style={styles.popupButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.popupButton, styles.confirmButton]}
                      onPress={handleInviteSubmit}
                    >
                      <Text style={styles.popupButtonText}>Send</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <TouchableOpacity
              style={{
                width: 45,
                height: 45,
                borderRadius: 15,
                backgroundColor: "#fff",
                elevation: 15,
              }}
              onPress={handleInvite}
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
        <StatusBar style="auto" />
      </ScrollView>
      {renderConfirmationPopup()}
      {isInvitePopupVisible && renderInvitePopup()}
      {isSuccessVisible && renderSuccessPopup()}

      {renderMenu()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  banner: {
    flex: 0.4,
    width: "100%",
    backgroundColor: "#15133C",
    borderRadius: 15,
    paddingBottom: 25,
  },
  bannerImages: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 42,
  },
  features: {
    flex: 0.5,
  },
  logo: {
    width: 108,
    height: 27.43,
    marginLeft: 39,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: "grey",
    borderRadius: 50,
    marginRight: 35,
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 18,
    color: "white",
    marginTop: 23,
    left: 35,
  },
  key: {
    width: 30,
    height: 30,
    marginRight: 35,
    marginTop: 25,
  },
  buttons: {
    marginTop: 30,
    marginHorizontal: 34,
    elevation: 15,
  },
  buttonText: {
    fontFamily: "Inter",
    fontWeight: "700",
    width: 130,
    height: 50,
    textAlign: "center",
    borderRadius: 20,
    paddingVertical: 13,
  },
  chamaMembers: {
    marginTop: 30,
    flexDirection: "row",
    marginHorizontal: 41,
  },
  member: {
    width: 30,
    height: 30,
  },
  memberNumber: {
    paddingTop: 20,
    color: "#FF7500",
    fontFamily: "Inter",
    fontSize: 10,
  },
  chamaGraph: {
    marginTop: 20,
    marginHorizontal: 41,
    marginBottom: 20,
  },
  chamaName: {
    fontFamily: "Rubik",
    fontSize: 18,
    lineHeight: 21,
    color: "#2f1155",
  },
  chamaAssets: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: 250,
  },
  memberAssets: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: 250,
    marginTop: 20,
  },
  assetsIconsBg: {
    width: 35,
    height: 35,
    backgroundColor: "#EDF9F2",
    borderRadius: 50,
  },
  assetsIcons: {
    width: 25,
    height: 25,
    alignSelf: "center",
    marginVertical: 5,
  },
  assetsText: {
    paddingLeft: 3,
    fontFamily: "QuickSand",
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 12,
    color: "#8B98B1",
  },
  assetsAmount: {
    marginLeft: 40,
    fontFamily: "Rubik",
    fontSize: 12,
    fontWeight: "700",
    color: "#50AF95",
    lineHeight: 14,
  },
  annualEarningsText: {
    fontFamily: "QuickSand",
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 18.75,
    color: "#2F1155",
  },
  annualEarnings: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  earnings: {
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  earningsText: {
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: 8,
    lineHeight: 10,
    color: "#000000",
    paddingLeft: 5,
  },
  qContainer: {
    marginTop: 20,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F3F3F3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 30,
    padding: 4,
  },
  qText: {
    color: "#888888",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 15,
    textAlign: "center",
  },
  portfolio: {
    marginHorizontal: 41,
    marginTop: 10,
  },
  portfolioText: {
    fontFamily: "QuickSand",
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 19,
    color: "#2F1155",
  },
  portfolioContent: {
    height: 100,
    marginTop: 5,
  },
  requestButton: {
    backgroundColor: "#12D18E",
    borderRadius: 40,
    width: 155,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
  },
  requestText: {
    fontFamily: "QuickSand",
    fontWeight: "700",
    fontSize: 15,
    lineHeight: 19,
    color: "#FFFFFF",
  },

  // Modal styles
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    minWidth: 100,
    marginHorizontal: 10,
  },
  modalButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalCancelButton: {
    backgroundColor: "#ff4d4d",
  },
  modalConfirmButton: {
    backgroundColor: "#12D18E",
  },
  menu: {
    position: "absolute",
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    width: 320,
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#D8DCE1",
    borderRadius: 30,
    backgroundColor: "#fff",
    elevation: 15,
    paddingHorizontal: 20,
    bottom: -8,
  },
  MenuIcons: {
    width: 50,
    height: 50,
  },
  popupContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: "80%",
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  popupText: {
    marginBottom: 16,
  },
  popupButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  popupButton: {
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "red",
  },
  confirmButton: {
    backgroundColor: "#12D18E",
  },
  popupButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  inviteInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
  },
});