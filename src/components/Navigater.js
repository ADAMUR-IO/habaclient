import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContext } from "./AuthContext";

import Onboarding from "../Onboarding";

import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import SignInOTP from "../screens/SignInOTP";
import SignUpOTP from "../screens/SignUpOTP";
import SignUpName from "../screens/SignUpName";
import SignUpGender from "../screens/SignUpGender";
import SignUpBDay from "../screens/SignUpBDay";
import SignUpGoal from "../screens/SignUpGoal";
import SignUpChamaName from "../screens/SignUpChamaName";
import SignUpCryptoBabies from "../screens/SignUpCryptoBabies";
import SignUpCryptoCoins from "../screens/SignUpCryptoCoins";
import SignUpTime from "../screens/SignUpTime";

import SignUpMinBuy from "../screens/SignUpMinBuy";

import SignUpSaving from "../screens/SignUpSaving";

import Reports from "../screens/Reports";

import SignUpVerification from "../screens/SignUpVerification";
import SignUpSos from "../screens/SignUpSos";
import Terms from "../screens/Terms";
import SignUpBonus from "../screens/SignUpBonus";
import SetPin from "../screens/SetPin";
import InviteFlow from "../screens/InviteFlow";

import GirlChatting from "../screens/GirlChatting";
import GirlChattingWallet from "../screens/GirlChattingWallet";

import MarketScreenCrypto from "../screens/MarketScreenCrypto";

import Notification from "../screens/Notification";

import Deposit from "../screens/Deposit";

import Settings from "../screens/Settings";
import Wallet from "../screens/UserWallet";
import UserGift from "../screens/UserGift";
import Withdrawal from "../screens/Withdrawal";
import UserWallet from "../screens/UserWallet";
import ChamaWallet from "../screens/ChamaWallet";
import HomeInvestments from "../screens/HomeInvestments";
import ChamaMemberWallet from "../screens/ChamaMemberWallet";
import Phonenumber from "../screens/Phonenumber";
import SignInCreateChama from "../screens/SignInCreateChama";
import MarketScreenStocks from "../screens/MarketScreenStocks";
import LoginSettings from "../screens/LoginSettings";
import MarketScreenGovtBonds from "../screens/MarketScreenGovtBonds";
import MarketScreenMoneyMkts from "../screens/MarketScreenMoneyMkts";
import MarketScreenAll from "../screens/MarketScreenAll";
import MarketScreenNotSure from "../screens/MarketScreenNotSure";
import ForgotPassword from "../screens/ForgotPassword";
import ForgotPasswordReset from "../screens/ForgotPasswordReset";
import ResetPassword from "../screens/ResetPassword";
import ChamaNameWallet from "../screens/ChamaNameWallet";
import ChamaDescriptionWallet from "../screens/ChamaDescriptionWallet";
import ChamaInvestWallet from "../screens/ChamaInvestWallet";
import ChamaMarketScreenCrypto from "../screens/ChamaMarketScreenCrypto";
import ChamaMarketScreenGovtBonds from "../screens/ChamaMarketScreenGovtBonds";
import ChamaMarketScreenMoneyMkts from "../screens/ChamaMarketScreenMoneyMkts";
import ChamaMarketScreenStocks from "../screens/ChamaMarketScreenStocks";
import ChamaInvestTime from "../screens/ChamaInvestTime";
import ChamaMinBuy from "../screens/ChamaMinBuy";
import NotificationWallet from "../screens/NotificationWallet";
import PhoneNumberWallet from "../screens/PhoneNumberWallet";
import AccountSettings from "../screens/AccountSettings";
import PrivacyAndSecurity from "../screens/PrivacyAndSecurity";
import ServiceCenter from "../screens/ServiceCenter";
import Transactions from "../screens/Transactions";

import EditUserAccount from "../screens/EditUserAccount";
import MPESA_STK_PushScreen from "../screens/MPESA_STK_PushScreen";

const Stack = createNativeStackNavigator();

export default function Navigater() {
  const { user, login } = useContext(AuthContext);
  return (
    <AuthContext.Provider value={{ user, login }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="SignUp" component={SignUp} />

          <Stack.Screen name="SignIn" component={SignIn} />

          <Stack.Screen name="SignUpOTP" component={SignUpOTP} />

          <Stack.Screen name="SignInOTP" component={SignInOTP} />

          <Stack.Screen name="SignUpName" component={SignUpName} />

          <Stack.Screen name="SignUpGender" component={SignUpGender} />

          <Stack.Screen name="SignUpBDay" component={SignUpBDay} />

          <Stack.Screen name="SignUpGoal" component={SignUpGoal} />

          <Stack.Screen name="SignUpChamaName" component={SignUpChamaName} />
          <Stack.Screen name="ChamaNameWallet" component={ChamaNameWallet} />
          <Stack.Screen name="ChamaDescriptionWallet" component={ChamaDescriptionWallet} />
          <Stack.Screen name="ChamaInvestWallet" component={ChamaInvestWallet} />
          <Stack.Screen name="NotificationWallet" component={NotificationWallet} />
          <Stack.Screen name="PhoneNumberWallet" component={PhoneNumberWallet} />
          <Stack.Screen name="ChamaMarketScreenCrypto" component={ChamaMarketScreenCrypto} />
          <Stack.Screen name="ChamaMarketScreenGovtBonds" component={ChamaMarketScreenGovtBonds} />
          <Stack.Screen name="ChamaMarketScreenMoneyMkts"component={ChamaMarketScreenMoneyMkts} />
          <Stack.Screen name="ChamaMarketScreenStocks" component={ChamaMarketScreenStocks} />
          <Stack.Screen name="ChamaInvestTime" component={ChamaInvestTime} />
          <Stack.Screen name="ChamaMinBuy" component={ChamaMinBuy} />
          <Stack.Screen  name="SignUpCryptoBabies" component={SignUpCryptoBabies}/>

          <Stack.Screen name="SignUpCryptoCoins" component={SignUpCryptoCoins} />

          <Stack.Screen name="SignUpTime" component={SignUpTime} />

          <Stack.Screen name="SignUpMinBuy" component={SignUpMinBuy} />

          <Stack.Screen name="SignUpSaving" component={SignUpSaving} />

          <Stack.Screen name="Reports" component={Reports} />

          <Stack.Screen name="SignUpVerification" component={SignUpVerification} />

          <Stack.Screen name="SignUpSos" component={SignUpSos} />

          <Stack.Screen name="Terms" component={Terms} />

          <Stack.Screen name="SignUpBonus" component={SignUpBonus} />

          <Stack.Screen name="SetPin" component={SetPin} />

          <Stack.Screen name="InviteFlow" component={InviteFlow} />

          <Stack.Screen name="MarketScreenCrypto" component={MarketScreenCrypto} />
          <Stack.Screen name="MarketScreenStocks" component={MarketScreenStocks} />

          <Stack.Screen name="MarketScreenGovtBonds" component={MarketScreenGovtBonds}/>
          <Stack.Screen name="MarketScreenMoneyMkts" component={MarketScreenMoneyMkts} />
          <Stack.Screen name="MarketScreenAll" component={MarketScreenAll} />
          <Stack.Screen name="MarketScreenNotSure" component={MarketScreenNotSure} />
          <Stack.Screen name="GirlChatting" component={GirlChatting} />

          <Stack.Screen  name="GirlChattingWallet" component={GirlChattingWallet} />

          <Stack.Screen name="Notification" component={Notification} />

          <Stack.Screen name="Deposit" component={Deposit} />

          <Stack.Screen name="Settings" component={Settings} />

          <Stack.Screen name="Wallet" component={Wallet} />

          <Stack.Screen name="UserGift" component={UserGift} />

          <Stack.Screen name="UserWallet" component={UserWallet} />

          <Stack.Screen name="HomeInvestments" component={HomeInvestments} />

          <Stack.Screen name="PrivacyAndSecurity" component={PrivacyAndSecurity}  />
          <Stack.Screen name="Phonenumber" component={Phonenumber} />
          <Stack.Screen name="EditUserAccount" component={EditUserAccount} />
          <Stack.Screen name="SignInCreateChama" component={SignInCreateChama} />
          <Stack.Screen name="LoginSettings" component={LoginSettings} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ForgotPasswordReset" component={ForgotPasswordReset} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="AccountSettings" component={AccountSettings} />
          <Stack.Screen name="ServiceCenter" component={ServiceCenter} />
          <Stack.Screen name="Transactions" component={Transactions} />

          <Stack.Screen name="Withdrawal" component={Withdrawal} />

          <Stack.Screen name="ChamaWallet" component={ChamaWallet} />

          <Stack.Screen name="ChamaMemberWallet" component={ChamaMemberWallet} />
          <Stack.Screen name="MPESA_STK_PushScreen" component={MPESA_STK_PushScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
