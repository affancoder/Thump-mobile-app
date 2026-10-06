import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const TEAL = "#08A98F";
const BG = "#F2F4F9";
const WHITE = "#FFFFFF";
const TEXT = "#18232B";
const MUTED = "#8B979F";

export default function Notifications() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    {
      name: "All",
      icon: "file-tray-outline",
    },
    {
      name: "Approval",
      icon: "shield-outline",
    },
    {
      name: "Orders",
      icon: "cube-outline",
    },
    {
      name: "Alerts",
      icon: "notifications-outline",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* ================= HEADER ================= */}

      <View style={styles.header}>
        {/* Decorative curved circle */}
        <View style={styles.headerCircle} />

        {/* Top Row */}
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={WHITE}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Notifications
          </Text>

          <View style={styles.headerRightSpace} />
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          You're all caught up
        </Text>

        {/* ================= FILTER TABS ================= */}

        <View style={styles.tabsContainer}>
          {tabs.map((tab) => {
            const active = activeTab === tab.name;

            return (
              <TouchableOpacity
                key={tab.name}
                style={[
                  styles.tab,
                  active && styles.activeTab,
                ]}
                onPress={() => setActiveTab(tab.name)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={tab.icon}
                  size={16}
                  color={active ? TEAL : WHITE}
                />

                <Text
                  style={[
                    styles.tabText,
                    active && styles.activeTabText,
                  ]}
                >
                  {tab.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ================= EMPTY STATE ================= */}

      <View style={styles.emptyState}>
        <View style={styles.emptyIconCircle}>
          <Ionicons
            name="notifications-off-outline"
            size={46}
            color={TEAL}
          />
        </View>

        <Text style={styles.emptyTitle}>
          All caught up!
        </Text>

        <Text style={styles.emptyDescription}>
          No new notifications right now.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },

  /* ================= HEADER ================= */

  header: {
    height: 160,

    backgroundColor: TEAL,

    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,

    paddingHorizontal: 20,

    overflow: "hidden",
  },

  headerCircle: {
    position: "absolute",

    width: 190,
    height: 190,

    borderRadius: 95,

    right: -55,
    top: -75,

    backgroundColor: "rgba(255,255,255,0.055)",
  },

  topRow: {
    height: 66,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginTop: 3,
  },

  backButton: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: "rgba(255,255,255,0.14)",

    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,

    marginLeft: 14,

    color: WHITE,

    fontSize: 26,
    fontWeight: "700",
  },

  headerRightSpace: {
    width: 48,
  },

  subtitle: {
    color: "rgba(255,255,255,0.78)",

    fontSize: 12,

    marginTop: 1,
    marginBottom: 16,
  },

  /* ================= TABS ================= */

  tabsContainer: {
    height: 47,

    borderRadius: 24,

    backgroundColor: "rgba(255,255,255,0.13)",

    padding: 5,

    flexDirection: "row",
    alignItems: "center",
  },

  tab: {
    flex: 1,

    height: 37,

    borderRadius: 19,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 5,
  },

  activeTab: {
    backgroundColor: WHITE,
  },

  tabText: {
    color: "rgba(255,255,255,0.9)",

    fontSize: 13,

    fontWeight: "500",
  },

  activeTabText: {
    color: TEAL,

    fontWeight: "600",
  },

  /* ================= EMPTY STATE ================= */

  emptyState: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    paddingBottom: 70,
  },

  emptyIconCircle: {
    width: 94,
    height: 94,

    borderRadius: 47,

    backgroundColor: "#E9F4F5",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 27,
  },

  emptyTitle: {
    color: TEXT,

    fontSize: 25,
    fontWeight: "700",

    marginBottom: 9,
  },

  emptyDescription: {
    color: MUTED,

    fontSize: 16,

    textAlign: "center",
  },
});