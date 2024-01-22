import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

import ArrowBottom from "../../assets/images/ArrowBottom.png";
import ArrowTop from "../../assets/images/ArrowTop.png";

const Notification = () => {
  return (
    <View style={styles.notificationContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("GirlChatting")}>
        <ChevronLeftIcon size={30} color="#A9A9A9" />
      </TouchableOpacity>
      <View style={styles.notification}>
        <Text style={styles.textWrapper}>Notification</Text>

        <View style={styles.notificationItem}>
          <View style={styles.rectangle} />
          <Text style={styles.notificationText}>
            You received an invite to join the cryprobabies circle from
            @Alexandr
          </Text>
          <Text style={styles.notificationLabel}>‘Investment’</Text>
          <Text style={styles.notificationDate}>29 June 2021, 7.14 PM</Text>
          <Image style={styles.notificationArrow} source={ArrowTop} />
          <View style={styles.ellipse} />
        </View>
        <View style={styles.notificationItem}>
          <View style={styles.rectangle} />
          <Text style={styles.notificationText}>
            You spent Rp 32.000 for Coffe Cetar back Tugu Sentral
          </Text>
          <Text style={styles.notificationLabel}>‘Buy drink’</Text>
          <Text style={styles.notificationDate}>29 June 2021, 9.02 AM</Text>
          <Image style={styles.notificationArrow} source={ArrowBottom} />
          <View style={styles.ellipse} />
        </View>
        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>
            You spent Rp 210.000 for pay Tokosbla ijo mera
          </Text>
          <Text style={styles.notificationLabel}>‘Buy items’</Text>
          <Text style={styles.notificationDate}>28 June 2021, 8.32 PM</Text>
          <Image style={styles.notificationArrow} source={ArrowBottom} />
        </View>
        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>
            You spent Rp 210.000 for pay Tokosbla ijo mera
          </Text>
          <Text style={styles.notificationLabel}>‘Buy items’</Text>
          <Text style={styles.notificationDate}>28 June 2021, 8.32 PM</Text>
          <Image style={styles.notificationArrow} source={ArrowBottom} />
        </View>
        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>
            You spent Rp 210.000 for pay Tokosbla ijo mera
          </Text>
          <Text style={styles.notificationLabel}>‘Buy items’</Text>
          <Text style={styles.notificationDate}>28 June 2021, 8.32 PM</Text>
          <Image style={styles.notificationArrow} source={ArrowBottom} />
        </View>
        <Text style={styles.notificationLabelNew}>New</Text>
        <Text style={styles.notificationLabelRecent}>Recent</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  notification: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    height: 812,
    position: "relative",
    width: 375,
  },
  textWrapper: {
    color: "#130138",
    fontFamily: "var(--heading-l-font-family)",
    fontSize: "var(--heading-l-font-size)",
    fontStyle: "var(--heading-l-font-style)",
    fontWeight: "var(--heading-l-font-weight)",
    left: 119,
    letterSpacing: "var(--heading-l-letter-spacing)",
    lineHeight: "var(--heading-l-line-height)",
    position: "absolute",
    textAlign: "center",
    top: 102,
    whiteSpace: "nowrap",
  },
  vuesaxLinearArrow: {
    height: 36,
    left: 32,
    position: "absolute",
    top: 40,
    width: 36,
  },
  notificationItem: {
    height: 89,
    left: 33,
    position: "absolute",
    top: 221,
    width: 316,
  },
  rectangle: {
    backgroundColor: "#ffffff",
    borderRadius: 16.77,
    boxShadow: "3.35px 3.35px 20.13px #00000014",
    height: 88,
    left: 0,
    position: "absolute",
    top: 1,
    width: 310,
  },
  notificationText: {
    color: "var(--gelap)",
    fontFamily: "var(--text-s-font-family)",
    fontSize: "var(--text-s-font-size)",
    fontStyle: "var(--text-s-font-style)",
    fontWeight: "var(--text-s-font-weight)",
    left: 28,
    letterSpacing: "var(--text-s-letter-spacing)",
    lineHeight: "var(--text-s-line-height)",
    position: "absolute",
    top: 24,
    width: 250,
  },
  notificationLabel: {
    color: "var(--gray-4)",
    fontFamily: "var(--helper-text-font-family)",
    fontSize: "var(--helper-text-font-size)",
    fontStyle: "var(--helper-text-font-style)",
    fontWeight: "var(--helper-text-font-weight)",
    left: 28,
    letterSpacing: "var(--helper-text-letter-spacing)",
    lineHeight: "var(--helper-text-line-height)",
    position: "absolute",
    top: 63,
    whiteSpace: "nowrap",
    width: 66,
  },
  notificationDate: {
    color: "var(--gray-4)",
    fontFamily: "var(--helper-text-font-family)",
    fontSize: "var(--helper-text-font-size)",
    fontStyle: "var(--helper-text-font-style)",
    fontWeight: "var(--helper-text-font-weight)",
    left: 28,
    letterSpacing: "var(--helper-text-letter-spacing)",
    lineHeight: "var(--helper-text-line-height)",
    position: "absolute",
    top: 9,
    whiteSpace: "nowrap",
    width: 101,
  },
  notificationArrow: {
    height: 20,
    left: 270,
    position: "absolute",
    top: 34,
    width: 20,
  },
  ellipse: {
    backgroundColor: "var(--merah)",
    borderRadius: 3.35,
    height: 7,
    left: 294,
    position: "absolute",
    top: 0,
    width: 7,
  },
  notificationLabelNew: {
    color: "var(--gelap)",
    fontFamily: "var(--text-m-font-family)",
    fontSize: "var(--text-m-font-size)",
    fontStyle: "var(--text-m-font-style)",
    fontWeight: "var(--text-m-font-weight)",
    left: 170,
    letterSpacing: "var(--text-m-letter-spacing)",
    lineHeight: "var(--text-m-line-height)",
    position: "absolute",
    top: 187,
    width: 35,
  },
  notificationLabelRecent: {
    color: "var(--gelap)",
    fontFamily: "var(--text-m-font-family)",
    fontSize: "var(--text-m-font-size)",
    fontStyle: "var(--text-m-font-style)",
    fontWeight: "var(--text-m-font-weight)",
    left: 161,
    letterSpacing: "var(--text-m-letter-spacing)",
    lineHeight: "var(--text-m-line-height)",
    position: "absolute",
    top: 423,
    whiteSpace: "nowrap",
    width: 54,
  },
});

export default Notification;
