import React, { useEffect, useState } from "react";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { getProfile, subscribeToProfile } from "../../context/profileStore";

const PRIMARY = "#08AA92";
const DARK = "#172126";
const MUTED = "#829098";
const BACKGROUND = "#F3F4F8";
const WHITE = "#FFFFFF";
const footer = "#829098";

export default function Account() {
  const router = useRouter();

  const [dashboardOpen, setDashboardOpen] = useState(false);

  /* =====================================================
     PROFILE COMPLETION
  ===================================================== */

  const [profile, setProfile] = useState(getProfile());

  useEffect(() => {
    return subscribeToProfile((updatedProfile) => {
      setProfile(updatedProfile);
    });
  }, []);

  const requiredFields = [
    profile.businessName,
    profile.contactPerson,
    profile.mobile,
    profile.address1,
    profile.city,
    profile.state,
    profile.pincode,
  ];

  const filledFields = requiredFields.filter(
    (field) => field && field.trim() !== "",
  ).length;

  const profilePercentage = Math.round(
    (filledFields / requiredFields.length) * 100,
  );

  const profileComplete = profilePercentage === 100;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        {/* ================= HEADER ================= */}

        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>

          <Text style={styles.headerSubtitle}>
            Manage your account and preferences
          </Text>
        </View>

        {/* ================= CONTENT ================= */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {/* ================= PROFILE CARD ================= */}

          <View style={styles.profileCard}>
            <View style={styles.profileTop}>
              {/* Avatar */}

              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>AN</Text>
                </View>

                <View style={styles.onlineBadge}>
                  <Ionicons name="checkmark" size={11} color={WHITE} />
                </View>
              </View>

              {/* Profile Details */}

              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>KJFND LONJL</Text>

                <View style={styles.companyRow}>
                  <Ionicons name="business-outline" size={16} color={PRIMARY} />

                  <Text style={styles.companyName}>XARHYH Enterprises</Text>
                </View>

                <Text style={styles.phoneNumber}>+96 0101010101</Text>

                {/* ================= PROFILE COMPLETION ================= */}

                <View
                  style={[
                    styles.completeBadge,
                    !profileComplete && styles.incompleteBadge,
                  ]}
                >
                  <Ionicons
                    name={
                      profileComplete
                        ? "checkmark-circle-outline"
                        : "time-outline"
                    }
                    size={14}
                    color={profileComplete ? PRIMARY : "#D88A1A"}
                  />

                  <Text
                    style={[
                      styles.completeText,
                      !profileComplete && styles.incompleteText,
                    ]}
                  >
                    {profileComplete
                      ? "Profile Complete"
                      : `${profilePercentage}% Profile Complete`}
                  </Text>
                </View>
              </View>
            </View>

            {/* Statistics */}

            <View style={styles.statsContainer}>
              {/* Orders */}

              <View style={styles.statItem}>
                <View style={styles.statIconGreen}>
                  <Ionicons
                    name="bag-handle-outline"
                    size={23}
                    color="#36C98B"
                  />
                </View>

                <View style={styles.statTextContainer}>
                  <Text style={styles.statNumber}>0</Text>

                  <Text style={styles.statTitle}>Total Orders</Text>

                  <Text style={styles.statSubtitle}>View your orders</Text>
                </View>
              </View>

              {/* Divider */}

              <View style={styles.statDivider} />

              {/* GST */}

              <View style={styles.statItem}>
                <View style={styles.statIconPurple}>
                  <Ionicons
                    name="document-text-outline"
                    size={23}
                    color="#6C63D9"
                  />
                </View>

                <View style={styles.statTextContainer}>
                  <Text style={styles.pendingText}>Pending</Text>

                  <Text style={styles.statTitle}>GST Status</Text>

                  <Text style={styles.statSubtitle}>Not Registered</Text>
                </View>
              </View>
            </View>
          </View>

          {/* ================= MANUAL REVIEW ================= */}

          <View style={styles.reviewCard}>
            <View style={styles.reviewTop}>
              <View style={styles.reviewIcon}>
                <Ionicons name="time-outline" size={24} color="#FFFFFF" />
              </View>

              <View style={styles.reviewTextContainer}>
                <Text style={styles.reviewTitle}>Manual Review</Text>

                <Text style={styles.reviewDescription}>
                  No GST provided. Admin will review your profile manually.
                </Text>
              </View>
            </View>

            <View style={styles.reviewDivider} />

            <View style={styles.notificationRow}>
              <Ionicons name="time-outline" size={15} color="#C18A25" />

              <Text style={styles.notificationText}>
                You'll be notified once reviewed
              </Text>
            </View>
          </View>

          {/* ================= MENU ================= */}

          <View style={styles.menuCard}>
            {/* My Dashboard */}

            <MenuRow
              icon="grid-outline"
              iconType="dashboard"
              title="My Dashboard"
              subtitle="Orders, Delivery & Payments overview"
              arrow={dashboardOpen ? "chevron-up" : "chevron-down"}
              onPress={() => setDashboardOpen(!dashboardOpen)}
            />

            {/* Dashboard Sub Menu */}

            {dashboardOpen && (
              <View style={styles.subMenu}>
                <SubMenuRow
                  icon="bag-handle-outline"
                  iconType="green"
                  title="Orders"
                  subtitle="PO, Purchase Return, Complaints"
                />

                <SubMenuRow
                  icon="car-outline"
                  iconType="blue"
                  title="Orders & Delivery"
                  subtitle="Delivered, Payment Failed, Cancelled, Pending"
                />

                <SubMenuRow
                  icon="card-outline"
                  iconType="purple"
                  title="Payments"
                  subtitle="Payment History, Failed, Advance & Refund"
                />
              </View>
            )}

            {/* My Credit */}

            <MenuRow
              icon="card-outline"
              iconType="credit"
              title="My Credit"
              subtitle="View credit balance & transaction ledger"
              arrow="chevron-forward"
              onPress={() => router.push("/account/credit")}
            />

            {/* Edit Profile */}

            <MenuRow
              icon="person-outline"
              iconType="profile"
              title="Edit Profile"
              subtitle="Update your personal information"
              arrow="chevron-forward"
              onPress={() => router.push("/auth/complete-profile")}
            />

            {/* My Orders */}

            <MenuRow
              icon="bag-outline"
              iconType="orders"
              title="My Orders"
              subtitle="Track and view your orders"
              arrow="chevron-forward"
              onPress={() => router.push("/account/orders")}
            />

            {/* Complaints */}

            <MenuRow
              icon="alert-circle-outline"
              title="Complaints"
              iconType="complaints"
              subtitle="Raise and track your complaints"
              arrow="chevron-forward"
              onPress={() => router.push("/account/complaints")}
            />

            {/* Privacy Policy */}

            <MenuRow
              icon="shield-outline"
              iconType="privacy"
              title="Privacy Policy"
              subtitle="Read our privacy policy"
              arrow="chevron-forward"
              onPress={() => router.push("/account/privacy-policy")}
              last
            />
          </View>

          <View style={styles.bottomSpace} />

          <Pressable
            style={({ pressed }) => [
              styles.logoutButton,
              pressed && styles.logoutPressed,
            ]}
            onPress={() => {
              router.replace("/auth/login");
            }}
          >
            <Ionicons name="log-out-outline" size={25} color="#D93636" />

            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
          {/* FOOTER */}

          <View>
            <Text style={styles.footer}>Thump Beyond Limits ©2026</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/* =====================================================
   MAIN MENU ROW
===================================================== */

function MenuRow({ icon, iconType, title, subtitle, arrow, onPress, last }) {
  return (
    <Pressable
      style={[styles.menuRow, last && styles.lastMenuRow]}
      onPress={onPress}
    >
      <View
        style={[
          styles.menuIcon,

          iconType === "dashboard" && styles.iconDashboard,

          iconType === "credit" && styles.iconCredit,

          iconType === "profile" && styles.iconProfile,

          iconType === "orders" && styles.iconOrders,

          iconType === "complaints" && styles.iconComplaints,

          iconType === "privacy" && styles.iconPrivacy,
        ]}
      >
        <Ionicons
          name={icon}
          size={23}
          color={
            iconType === "dashboard"
              ? "#6C63D9"
              : iconType === "credit"
                ? "#27AE60"
                : iconType === "profile"
                  ? PRIMARY
                  : iconType === "orders"
                    ? "#36C98B"
                    : iconType === "complaints"
                      ? "#D88A1A"
                      : iconType === "privacy"
                        ? "#6574D9"
                        : PRIMARY
          }
        />
      </View>

      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{title}</Text>

        <Text style={styles.menuSubtitle} numberOfLines={2}>
          {subtitle}
        </Text>
      </View>

      <Ionicons name={arrow} size={23} color="#829098" />
    </Pressable>
  );
}

/* =====================================================
   SUB MENU ROW
===================================================== */

function SubMenuRow({ icon, iconType, title, subtitle }) {
  let iconColor = PRIMARY;
  let iconBackground = "#E8F8F4";

  if (iconType === "blue") {
    iconColor = "#4A88D8";
    iconBackground = "#EEF5FD";
  }

  if (iconType === "purple") {
    iconColor = "#8764D8";
    iconBackground = "#F3EEFD";
  }

  return (
    <View style={styles.subMenuRow}>
      <View
        style={[
          styles.subMenuIcon,
          {
            backgroundColor: iconBackground,
          },
        ]}
      >
        <Ionicons name={icon} size={22} color={iconColor} />
      </View>

      <View style={styles.subMenuText}>
        <Text style={styles.subMenuTitle}>{title}</Text>

        <Text style={styles.subMenuSubtitle}>{subtitle}</Text>
      </View>

      <Ionicons name="chevron-down" size={20} color="#829098" />
    </View>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#08AA92",
  },

  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  /* ================= HEADER ================= */

  header: {
    height: 90,
    backgroundColor: PRIMARY,

    paddingHorizontal: 27,
    paddingTop: 17,

    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
  },

  headerTitle: {
    color: WHITE,
    fontSize: 25,
    fontWeight: "700",
  },

  headerSubtitle: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 15,
    marginTop: 9,
  },

  /* ================= CONTENT ================= */

  contentContainer: {
    paddingHorizontal: 19,
    paddingTop: 22,
    paddingBottom: 20,
  },

  /* ================= PROFILE CARD ================= */

  profileCard: {
    backgroundColor: WHITE,
    borderRadius: 22,

    paddingHorizontal: 19,
    paddingTop: 20,
    paddingBottom: 17,

    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },

  profileTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarContainer: {
    width: 75,
    height: 75,

    alignItems: "center",
    justifyContent: "center",

    position: "relative",
  },

  avatar: {
    width: 57,
    height: 57,

    borderRadius: 29,

    backgroundColor: "#6655E8",

    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: WHITE,
    fontSize: 21,
    fontWeight: "500",
  },

  onlineBadge: {
    position: "absolute",

    right: 5,
    bottom: 7,

    width: 18,
    height: 18,

    borderRadius: 9,

    backgroundColor: "#22B783",

    borderWidth: 2,
    borderColor: WHITE,

    alignItems: "center",
    justifyContent: "center",
  },

  profileDetails: {
    flex: 1,
    marginLeft: 7,
  },

  profileName: {
    color: DARK,
    fontSize: 20,
    fontWeight: "700",
  },

  companyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  companyName: {
    color: PRIMARY,
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 5,
  },

  phoneNumber: {
    color: MUTED,
    fontSize: 14,
    marginTop: 7,
  },

  completeBadge: {
    alignSelf: "flex-start",

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#DDF7F1",

    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 15,

    marginTop: 8,
  },

  completeText: {
    color: PRIMARY,
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },

  /* ================= INCOMPLETE PROFILE ================= */

  incompleteBadge: {
    backgroundColor: "#FFF3D6",
  },

  incompleteText: {
    color: "#D88A1A",
  },

  /* ================= STATS ================= */

  statsContainer: {
    marginTop: 19,

    minHeight: 99,

    borderRadius: 15,

    backgroundColor: "#FAFAFA",

    flexDirection: "row",
    alignItems: "center",
  },

  statItem: {
    flex: 1,

    flexDirection: "row",
    alignItems: "center",
  },

  statDivider: {
    width: 1,
    height: 70,

    backgroundColor: "#E8EBEC",

    marginHorizontal: 8,
  },

  statIconGreen: {
    width: 50,
    height: 50,

    borderRadius: 14,

    backgroundColor: "#E5F8F0",

    alignItems: "center",
    justifyContent: "center",
  },

  statIconPurple: {
    width: 50,
    height: 50,

    borderRadius: 14,

    backgroundColor: "#EEEAFE",

    alignItems: "center",
    justifyContent: "center",
  },

  statTextContainer: {
    marginLeft: 10,
    flex: 1,
  },

  statNumber: {
    color: PRIMARY,
    fontSize: 22,
    fontWeight: "700",
  },

  pendingText: {
    color: "#D88A1A",
    fontSize: 17,
    fontWeight: "700",
  },

  statTitle: {
    color: DARK,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },

  statSubtitle: {
    color: MUTED,
    fontSize: 12,
    marginTop: 5,
  },

  /* ================= MANUAL REVIEW ================= */

  reviewCard: {
    backgroundColor: "#FFF3BE",

    borderRadius: 17,

    borderWidth: 1,
    borderColor: "#F0D16A",

    marginTop: 16,

    paddingHorizontal: 17,
    paddingVertical: 16,

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },

  reviewTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  reviewIcon: {
    width: 47,
    height: 47,

    borderRadius: 24,

    backgroundColor: "#D88909",

    alignItems: "center",
    justifyContent: "center",
  },

  reviewTextContainer: {
    flex: 1,
    marginLeft: 13,
  },

  reviewTitle: {
    color: "#B77715",
    fontSize: 16,
    fontWeight: "700",
  },

  reviewDescription: {
    color: "#85784E",
    fontSize: 13,

    marginTop: 4,

    lineHeight: 19,
  },

  reviewDivider: {
    height: 1,

    backgroundColor: "#E5D28A",

    marginTop: 14,
    marginBottom: 10,
  },

  notificationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  notificationText: {
    color: "#B0842B",
    fontSize: 12,
    marginLeft: 5,
  },

  /* ================= MENU ================= */

  menuCard: {
    backgroundColor: WHITE,

    borderRadius: 21,

    marginTop: 16,

    paddingHorizontal: 15,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },

  menuRow: {
    minHeight: 84,

    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "#ECEFF0",
  },

  lastMenuRow: {
    borderBottomWidth: 0,
  },

  menuIcon: {
    width: 50,
    height: 50,

    borderRadius: 21,

    alignItems: "center",
    justifyContent: "center",
  },

  iconDashboard: {
    backgroundColor: "#EEEDFF",
  },

  iconCredit: {
    backgroundColor: "#E5F8F0",
  },

  iconProfile: {
    backgroundColor: "#E5F6F4",
  },

  iconOrders: {
    backgroundColor: "#E7F8F1",
  },

  iconComplaints: {
    backgroundColor: "#f8f0e7",
  },

  iconPrivacy: {
    backgroundColor: "#EEF0FF",
  },

  menuTextContainer: {
    flex: 1,

    marginLeft: 13,
    marginRight: 8,
  },

  menuTitle: {
    color: DARK,
    fontSize: 17,
    fontWeight: "600",
  },

  menuSubtitle: {
    color: MUTED,
    fontSize: 13,

    marginTop: 5,

    lineHeight: 18,
  },

  /* ================= SUB MENU ================= */

  subMenu: {
    marginLeft: 34,

    borderLeftWidth: 3,
    borderLeftColor: "#E1F4EF",

    paddingLeft: 18,
  },

  subMenuRow: {
    minHeight: 105,

    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "#ECEFF0",
  },

  subMenuIcon: {
    width: 48,
    height: 48,

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",
  },

  subMenuText: {
    flex: 1,

    marginLeft: 15,
    marginRight: 7,
  },

  subMenuTitle: {
    color: DARK,
    fontSize: 17,
    fontWeight: "600",
  },

  subMenuSubtitle: {
    color: MUTED,
    fontSize: 13,

    marginTop: 5,

    lineHeight: 18,
  },

  bottomSpace: {
    height: 25,
  },
  /* FOOTER */

  footer: {
    textAlign: "center",
    color: footer,
    fontSize: 14,
  },
  logoutButton: {
    width: "100%",
    height: 54,
    borderWidth: 1,
    borderColor: "#d9363671",
    borderRadius: 14,
    backgroundColor: "#FFF1F1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginBottom: 30,
  },

  logoutText: {
    color: "#D93636",
    fontSize: 18,
    fontWeight: "700",
  },

  logoutPressed: {
    opacity: 0.7,
  },
});
