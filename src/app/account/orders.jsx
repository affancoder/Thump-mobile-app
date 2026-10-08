import React from "react";

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const PRIMARY = "#08AA92";
const DARK = "#172126";
const MUTED = "#829098";
const BACKGROUND = "#F3F4F8";
const WHITE = "#FFFFFF";

export default function Orders() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>

        {/* ================= HEADER ================= */}

        <View style={styles.header}>

          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color={WHITE}
            />
          </Pressable>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>
              My Orders
            </Text>

            <Text style={styles.headerSubtitle}>
              Track and view your orders
            </Text>
          </View>

        </View>

        {/* ================= CONTENT ================= */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >

          {/* ================= ORDER SUMMARY ================= */}

          <View style={styles.summaryCard}>

            <View style={styles.summaryIcon}>
              <Ionicons
                name="bag-handle-outline"
                size={27}
                color={PRIMARY}
              />
            </View>

            <View style={styles.summaryText}>
              <Text style={styles.summaryTitle}>
                My Orders
              </Text>

              <Text style={styles.summarySubtitle}>
                Track and view your orders
              </Text>
            </View>

            <View style={styles.orderCount}>
              <Text style={styles.orderCountNumber}>
                0
              </Text>

              <Text style={styles.orderCountLabel}>
                Orders
              </Text>
            </View>

          </View>

          {/* ================= FILTERS ================= */}

          <View style={styles.filterCard}>

            <View style={styles.filterHeader}>
              <Text style={styles.sectionTitle}>
                Orders
              </Text>

              <Pressable style={styles.filterButton}>
                <Ionicons
                  name="filter-outline"
                  size={18}
                  color={PRIMARY}
                />

                <Text style={styles.filterText}>
                  Filter
                </Text>
              </Pressable>
            </View>

            <View style={styles.filterDivider} />

            <View style={styles.filterTabs}>

              <View style={styles.activeTab}>
                <Text style={styles.activeTabText}>
                  All
                </Text>
              </View>

              <View style={styles.inactiveTab}>
                <Text style={styles.inactiveTabText}>
                  Pending
                </Text>
              </View>

              <View style={styles.inactiveTab}>
                <Text style={styles.inactiveTabText}>
                  Delivered
                </Text>
              </View>

            </View>

          </View>

          {/* ================= EMPTY STATE ================= */}

          <View style={styles.emptyCard}>

            <View style={styles.emptyIconContainer}>
              <Ionicons
                name="bag-outline"
                size={43}
                color={PRIMARY}
              />
            </View>

            <Text style={styles.emptyTitle}>
              No Orders Yet
            </Text>

            <Text style={styles.emptyDescription}>
              You haven't placed any orders yet.
              Your orders will appear here once
              you make a purchase.
            </Text>

            <Pressable
              style={styles.shopButton}
              onPress={() => router.push("/(tabs)/shop")}
            >
              <Ionicons
                name="grid-outline"
                size={18}
                color={WHITE}
              />

              <Text style={styles.shopButtonText}>
                Start Shopping
              </Text>
            </Pressable>

          </View>

          <View style={styles.bottomSpace} />

        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

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
    minHeight: 96,

    backgroundColor: PRIMARY,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 17,

    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  backButton: {
    width: 43,
    height: 43,

    borderRadius: 22,

    backgroundColor: "rgba(255,255,255,0.15)",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 13,
  },

  headerTextContainer: {
    flex: 1,
  },

  headerTitle: {
    color: WHITE,
    fontSize: 24,
    fontWeight: "700",
  },

  headerSubtitle: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 14,

    marginTop: 5,
  },

  /* ================= CONTENT ================= */

  contentContainer: {
    paddingHorizontal: 19,
    paddingTop: 20,
    paddingBottom: 20,
  },

  /* ================= SUMMARY ================= */

  summaryCard: {
    backgroundColor: WHITE,

    borderRadius: 20,

    paddingHorizontal: 17,
    paddingVertical: 17,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },

  summaryIcon: {
    width: 53,
    height: 53,

    borderRadius: 16,

    backgroundColor: "#E5F8F0",

    alignItems: "center",
    justifyContent: "center",
  },

  summaryText: {
    flex: 1,
    marginLeft: 13,
  },

  summaryTitle: {
    color: DARK,
    fontSize: 18,
    fontWeight: "700",
  },

  summarySubtitle: {
    color: MUTED,
    fontSize: 13,

    marginTop: 5,
  },

  orderCount: {
    alignItems: "center",
    justifyContent: "center",

    minWidth: 58,
  },

  orderCountNumber: {
    color: PRIMARY,
    fontSize: 22,
    fontWeight: "700",
  },

  orderCountLabel: {
    color: MUTED,
    fontSize: 11,

    marginTop: 2,
  },

  /* ================= FILTER ================= */

  filterCard: {
    backgroundColor: WHITE,

    borderRadius: 20,

    marginTop: 16,

    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 13,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    color: DARK,
    fontSize: 18,
    fontWeight: "700",
  },

  filterButton: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 11,
    paddingVertical: 7,

    borderRadius: 10,

    backgroundColor: "#E8F8F4",
  },

  filterText: {
    color: PRIMARY,
    fontSize: 13,
    fontWeight: "600",

    marginLeft: 5,
  },

  filterDivider: {
    height: 1,

    backgroundColor: "#ECEFF0",

    marginTop: 14,
  },

  filterTabs: {
    flexDirection: "row",

    marginTop: 13,
  },

  activeTab: {
    paddingHorizontal: 18,
    paddingVertical: 8,

    borderRadius: 12,

    backgroundColor: PRIMARY,
  },

  activeTabText: {
    color: WHITE,
    fontSize: 13,
    fontWeight: "600",
  },

  inactiveTab: {
    paddingHorizontal: 18,
    paddingVertical: 8,

    borderRadius: 12,

    marginLeft: 7,

    backgroundColor: "#F1F3F4",
  },

  inactiveTabText: {
    color: MUTED,
    fontSize: 13,
    fontWeight: "500",
  },

  /* ================= EMPTY STATE ================= */

  emptyCard: {
    backgroundColor: WHITE,

    borderRadius: 22,

    marginTop: 16,

    paddingHorizontal: 25,
    paddingVertical: 40,

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  emptyIconContainer: {
    width: 88,
    height: 88,

    borderRadius: 44,

    backgroundColor: "#E5F8F0",

    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    color: DARK,

    fontSize: 21,
    fontWeight: "700",

    marginTop: 19,
  },

  emptyDescription: {
    color: MUTED,

    fontSize: 14,

    lineHeight: 21,

    textAlign: "center",

    marginTop: 9,

    maxWidth: 300,
  },

  shopButton: {
    height: 48,

    paddingHorizontal: 22,

    borderRadius: 14,

    backgroundColor: PRIMARY,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginTop: 22,
  },

  shopButtonText: {
    color: WHITE,

    fontSize: 14,
    fontWeight: "700",

    marginLeft: 7,
  },

  bottomSpace: {
    height: 30,
  },
});