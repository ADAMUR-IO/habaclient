import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import axios from "axios";

import { backendUrl } from '../../config/config';
import { AuthContext } from "../components/AuthContext";
import NotificationItem from "./NotificationItem";

const NotificationWallet = () => {
  const [notificationsData, setNotificationsData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchNotificationsData();
  }, []);

  const fetchNotificationsData = async () => {
    try {
      const token = user.token;
      const response = await axios.get(
        `${backendUrl}/api/users/mynotifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setNotificationsData(response.data);
      } else {
        console.error("Failed to fetch Notifications:", response.error);
      }
    } catch (error) {
      console.error("Failed to fetch Notifications:", error);
    }
  };

  const handleAcceptJoinRequest = async (notificationId, chamaId) => {
    try {
      const userToken = user.token;
      console.log(user.id);
      const response = await axios.put(
        `${backendUrl}/api/chamas/${chamaId}/join-request/accept/${notificationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Join request accepted successfully");
        fetchNotificationsData();
      } else {
        console.error("Failed to accept join request:", response.error);
      }
    } catch (error) {
      console.error("Failed to accept join request:", error);
    }
  };

  const handleDeclineJoinRequest = async (notificationId, chamaId) => {
    try {
      const userToken = user.token;
      const response = await axios.put(
        `${backendUrl}/api/chamas/${chamaId}/join-request/decline/${notificationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Join request declined successfully");
        fetchNotificationsData();
      } else {
        console.error("Failed to decline join request:", response.error);
      }
    } catch (error) {
      console.error("Failed to decline join request:", error);
    }
  };

  const handleAcceptInvite = async (notificationId, chamaId) => {
    try {
      const userToken = user.token;
      console.log(user.id);
      const response = await axios.put(
        `${backendUrl}/api/chamas/${chamaId}/invite/accept/${notificationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Invite accepted successfully");
        fetchNotificationsData();
      } else {
        console.error("Failed to accept invite:", response.error);
      }
    } catch (error) {
      console.error("Failed to accept invite:", error);
    }
  };

  const handleDeclineInvite = async (notificationId, chamaId) => {
    try {
      const userToken = user.token;
      const response = await axios.put(
        `${backendUrl}/api/chamas/${chamaId}/invite/decline/${notificationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Invite declined successfully");
        fetchNotificationsData();
      } else {
        console.error("Failed to decline invite:", response.error);
      }
    } catch (error) {
      console.error("Failed to decline invite:", error);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const userToken = user.token;
      const response = await axios.put(
        `${backendUrl}/api/users/notifications/${notificationId}`,
        { status: "read" },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Notification marked as read successfully");
        fetchNotificationsData();
      } else {
        console.error("Failed to mark notification as read:", response.error);
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const newNotifications = notificationsData.filter(
    (notification) => notification.status === "unread"
  );
  const recentNotifications = notificationsData.filter(
    (notification) => notification.status === "read"
  );

  return (
    <View style={styles.notificationContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("GirlChatting")}>
        <ChevronLeftIcon size={30} color="#A9A9A9" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.notification}>
          <Text style={styles.textWrapper}>Notifications</Text>

          <Text style={styles.notificationLabel}>New</Text>
          {newNotifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onAcceptJoinRequest={
                notification.subject === "Join Request"
                  ? () => handleAcceptJoinRequest(notification._id, notification.chamaId)
                  : null
              }
              onDeclineJoinRequest={
                notification.subject === "Join Request"
                  ? () => handleDeclineJoinRequest(notification._id, notification.chamaId)
                  : null
              }
              onAcceptInvite={
                notification.subject === "Invite Request"
                  ? () => handleAcceptInvite(notification._id, notification.chamaId)
                  : null
              }
              onDeclineInvite={
                notification.subject === "Invite Request"
                  ? () => handleDeclineInvite(notification._id, notification.chamaId)
                  : null
              }
              onMarkAsRead={handleMarkAsRead}
            />
          ))}

          <Text style={styles.notificationLabel}>Recent</Text>
          {recentNotifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onAcceptJoinRequest={
                notification.subject === "Join Request"
                  ? () => handleAcceptJoinRequest(notification._id, notification.chamaId)
                  : null
              }
              onDeclineJoinRequest={
                notification.subject === "Join Request"
                  ? () => handleDeclineJoinRequest(notification._id, notification.chamaId)
                  : null
              }
              onAcceptInvite={
                notification.subject === "Invite Request"
                  ? () => handleAcceptInvite(notification._id, notification.chamaId)
                  : null
              }
              onDeclineInvite={
                notification.subject === "Invite Request"
                  ? () => handleDeclineInvite(notification._id, notification.chamaId)
                  : null
              }
              onMarkAsRead={handleMarkAsRead}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  notification: {
    backgroundColor: "#ffffff",
    padding: 16,
  },
  textWrapper: {
    color: "#130138",
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  notificationLabel: {
    color: "#130138",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
});

export default NotificationWallet;
