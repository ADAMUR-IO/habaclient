import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { backendUrl } from '../../config/config';
import { AuthContext } from "../components/AuthContext";

import wallet from "../../assets/images/wallet-2.png";
import notification from "../../assets/images/notification-bing.png";
import gift from "../../assets/images/gift_icon.png";
import chart from "../../assets/images/chart-2.png";
import avatar from "../../assets/images/avatar.png";
import axios from "axios";

const AccountSettings = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = React.useState(null);
  const { user, login } = useContext(AuthContext);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = user.token;
        const response = await axios.get(
          `${backendUrl}/api/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const renderMenu = () => {
    return (
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => navigation.navigate("UserWallet")}>
          <Image source={wallet} style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("GirlChattingWallet")}
        >
          <Image source={gift} style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ChamaWallet")}>
          <Image source={chart} style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ChamaWallet")}>
          <Image source={notification} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Settings")}
      >
        <ChevronLeftIcon size={30} color="#12D18E" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileImageContainer}>
          <Image source={avatar} style={styles.profileImage} />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Full Name </Text>
          <Text style={styles.value}>{userData?.fullName}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <Text style={styles.value}>
            {userData?.dateOfBirth ? userData.dateOfBirth : "Null"}
          </Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>
            {userData?.isAdmin ? "Haba Admin" : "Haba User"}
          </Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>
            {userData?.phoneNumber ? userData.phoneNumber : "Null"}
          </Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{userData?.email}</Text>
        </View>

        <View style={styles.editProfileButtonContainer}>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => navigation.navigate("EditUserAccount")}
          >
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {renderMenu()}

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  content: {
    flexGrow: 1,
    paddingTop: 40,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bodyContainer: {
    flex: 1,
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
  },
  editProfileButtonContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  editProfileButton: {
    width: 200,
    height: 45,
    backgroundColor: "#12D18E",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  editProfileButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  menu: {
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
  },
  menuIcon: {
    width: 50,
    height: 50,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
});

export default AccountSettings;
