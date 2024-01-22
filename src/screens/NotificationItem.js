import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import ArrowTop from "../../assets/images/ArrowTop.png";

const NotificationItem = ({ notification, onAcceptJoinRequest, onDeclineJoinRequest, onAcceptInvite, onDeclineInvite, onMarkAsRead }) => {
  const isJoinRequest = notification.subject === "Join Request";
  const isInviteRequest = notification.subject === "Invite Request";

  const handleMarkAsRead = () => {
    onMarkAsRead(notification._id);
  };

  const handleAccept = () => {
    if (isJoinRequest) {
      onAcceptJoinRequest(notification._id);
    } else if (isInviteRequest) {
      onAcceptInvite(notification._id);
    }
  };

  const handleReject = () => {
    if (isJoinRequest) {
      onDeclineJoinRequest(notification._id);
    } else if (isInviteRequest) {
      onDeclineInvite(notification._id);
    }
  };

  const handleApprove = () => {
    if (isJoinRequest) {
      onAcceptJoinRequest(notification._id);
    } else if (isInviteRequest) {
      onAcceptInvite(notification._id);
    }
  };
  
  const handleDecline = () => {
    if (isJoinRequest) {
      onDeclineJoinRequest(notification._id);
    } else if (isInviteRequest) {
      onDeclineInvite(notification._id);
    }
  };
  

  return (
    <TouchableOpacity onPress={handleMarkAsRead}>
      <View style={styles.notificationItem}>
        <View style={styles.notificationBox}>
          <View style={styles.notificationInfo}>
            <View style={styles.ellipse} />
            <Text style={styles.notificationDate}>
              {new Date(notification.dateTime).toLocaleString()}
            </Text>
          </View>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationText}>{notification.message}</Text>
            {isJoinRequest && (
              <View style={styles.acceptRejectButtons}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={handleAccept}
                >
                  <Text style={styles.acceptText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={handleReject}
                >
                  <Text style={styles.rejectText}>Reject</Text>
                </TouchableOpacity>
              </View>
            )}
            {isInviteRequest && (
              <View style={styles.acceptRejectButtons}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={handleApprove}
                >
                  <Text style={styles.acceptText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={handleDecline}
                >
                  <Text style={styles.rejectText}>Decline</Text>
                </TouchableOpacity>
              </View>
            )}
            <Text style={styles.notificationComment}>"{notification.subject}"</Text>
            <Image style={styles.notificationArrow} source={ArrowTop} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    marginBottom: 16,
  },
  notificationBox: {
    borderRadius: 16,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  notificationText: {
    color: "#130138",
    fontFamily: "Roboto",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 3,
  },
  acceptRejectButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  rejectButton: {
    backgroundColor: "#F44336",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  acceptText: {
    color: "white",
    fontWeight: "bold",
  },
  rejectText: {
    color: "white",
    fontWeight: "bold",
  },
  notificationComment: {
    color: "#A9A9A9",
    fontFamily: "Roboto",
    fontSize: 14,
    lineHeight: 20,
  },
  notificationDate: {
    color: "#A9A9A9",
    fontFamily: "Roboto",
    fontSize: 14,
    lineHeight: 20,
  },
  notificationArrow: {
    height: 20,
    width: 20,
    marginLeft: "auto",
  },
  notificationContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    position: "relative",
  },
  ellipse: {
    backgroundColor: "#FF0000",
    borderRadius: 3.35,
    height: 7,
    width: 7,
    position: "absolute",
    top: 3,
    right: 3,
    marginTop: 0,
    marginRight: 0,
  },
});

export default NotificationItem;
