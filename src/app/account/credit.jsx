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

export default function Credit() {
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
              My Credit
            </Text>

            <Text style={styles.headerSubtitle}>
              View credit balance & transaction ledger
            </Text>
          </View>

        </View>

        {/* ================= CONTENT ================= */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >

          {/* ================= CREDIT BALANCE ================= */}

          <View style={styles.balanceCard}>

            <View style={styles.balanceTop}>

              <View style={styles.balanceIcon}>
                <Ionicons
                  name="card-outline"
                  size={28}
                  color={PRIMARY}
                />
              </View>

              <View style={styles.balanceTitleContainer}>
                <Text style={styles.balanceLabel}>
                  Available Credit
                </Text>

                <Text style={styles.balanceStatus}>
                  Active
                </Text>
              </View>

            </View>

            <Text style={styles.balanceAmount}>
              ₹0.00
            </Text>

            <Text style={styles.balanceDescription}>
              Your available credit balance
            </Text>

          </View>

          {/* ================= CREDIT INFORMATION ================= */}

          <View style={styles.infoCard}>

            <Text style={styles.sectionTitle}>
              Credit Overview
            </Text>

            <View style={styles.infoRow}>

              <View style={styles.infoIcon}>
                <Ionicons
                  name="wallet-outline"
                  size={21}
                  color="#27AE60"
                />
              </View>

              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>
                  Credit Limit
                </Text>

                <Text style={styles.infoValue}>
                  ₹0.00
                </Text>
              </View>

            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>

              <View style={styles.infoIconBlue}>
                <Ionicons
                  name="cash-outline"
                  size={21}
                  color="#4A88D8"
                />
              </View>

              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>
                  Used Credit
                </Text>

                <Text style={styles.infoValue}>
                  ₹0.00
                </Text>
              </View>

            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>

              <View style={styles.infoIconPurple}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={21}
                  color="#8764D8"
                />
              </View>

              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>
                  Available Balance
                </Text>

                <Text style={styles.infoValue}>
                  ₹0.00
                </Text>
              </View>

            </View>

          </View>

          {/* ================= TRANSACTION LEDGER ================= */}

          <View style={styles.ledgerCard}>

            <View style={styles.ledgerHeader}>
              <View>
                <Text style={styles.sectionTitle}>
                  Transaction Ledger
                </Text>

                <Text style={styles.ledgerSubtitle}>
                  Your credit transactions will appear here
                </Text>
              </View>

              <View style={styles.ledgerIcon}>
                <Ionicons
                  name="receipt-outline"
                  size={22}
                  color={PRIMARY}
                />
              </View>
            </View>

            <View style={styles.ledgerDivider} />

            {/* Empty State */}

            <View style={styles.emptyState}>

              <View style={styles.emptyIcon}>
                <Ionicons
                  name="document-text-outline"
                  size={38}
                  color={PRIMARY}
                />
              </View>

              <Text style={styles.emptyTitle}>
                No Transactions Yet
              </Text>

              <Text style={styles.emptyDescription}>
                Your credit transaction history will
                appear here once transactions are made.
              </Text>

            </View>

          </View>

          {/* ================= NOTE ================= */}

          <View style={styles.noteCard}>

            <Ionicons
              name="information-circle-outline"
              size={21}
              color={PRIMARY}
            />

            <Text style={styles.noteText}>
              Credit balance and transaction details will
              be updated when credit activity is available.
            </Text>

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
    backgroundColor: BACKGROUND,
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

  /* ================= BALANCE ================= */

  balanceCard: {
    backgroundColor: WHITE,

    borderRadius: 22,

    paddingHorizontal: 20,
    paddingVertical: 20,

    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },

  balanceTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  balanceIcon: {
    width: 54,
    height: 54,

    borderRadius: 16,

    backgroundColor: "#E5F8F0",

    alignItems: "center",
    justifyContent: "center",
  },

  balanceTitleContainer: {
    flex: 1,
    marginLeft: 13,
  },

  balanceLabel: {
    color: DARK,
    fontSize: 17,
    fontWeight: "700",
  },

  balanceStatus: {
    alignSelf: "flex-start",

    color: "#27AE60",
    fontSize: 12,
    fontWeight: "600",

    backgroundColor: "#E5F8F0",

    paddingHorizontal: 9,
    paddingVertical: 4,

    borderRadius: 10,

    marginTop: 5,
  },

  balanceAmount: {
    color: PRIMARY,

    fontSize: 31,
    fontWeight: "700",

    marginTop: 20,
  },

  balanceDescription: {
    color: MUTED,

    fontSize: 13,

    marginTop: 4,
  },

  /* ================= INFORMATION ================= */

  infoCard: {
    backgroundColor: WHITE,

    borderRadius: 21,

    marginTop: 16,

    paddingHorizontal: 17,
    paddingVertical: 17,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  sectionTitle: {
    color: DARK,
    fontSize: 18,
    fontWeight: "700",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",

    minHeight: 68,
  },

  infoIcon: {
    width: 45,
    height: 45,

    borderRadius: 13,

    backgroundColor: "#E5F8F0",

    alignItems: "center",
    justifyContent: "center",
  },

  infoIconBlue: {
    width: 45,
    height: 45,

    borderRadius: 13,

    backgroundColor: "#EEF5FD",

    alignItems: "center",
    justifyContent: "center",
  },

  infoIconPurple: {
    width: 45,
    height: 45,

    borderRadius: 13,

    backgroundColor: "#F3EEFD",

    alignItems: "center",
    justifyContent: "center",
  },

  infoText: {
    flex: 1,
    marginLeft: 13,
  },

  infoTitle: {
    color: MUTED,
    fontSize: 13,
  },

  infoValue: {
    color: DARK,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#ECEFF0",
  },

  /* ================= LEDGER ================= */

  ledgerCard: {
    backgroundColor: WHITE,

    borderRadius: 21,

    marginTop: 16,

    paddingHorizontal: 17,
    paddingVertical: 17,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  ledgerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  ledgerSubtitle: {
    color: MUTED,
    fontSize: 12,

    marginTop: 5,

    maxWidth: 260,
  },

  ledgerIcon: {
    width: 45,
    height: 45,

    borderRadius: 13,

    backgroundColor: "#E8F8F4",

    alignItems: "center",
    justifyContent: "center",
  },

  ledgerDivider: {
    height: 1,

    backgroundColor: "#ECEFF0",

    marginTop: 15,
  },

  emptyState: {
    alignItems: "center",

    paddingVertical: 28,
    paddingHorizontal: 15,
  },

  emptyIcon: {
    width: 76,
    height: 76,

    borderRadius: 38,

    backgroundColor: "#E8F8F4",

    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    color: DARK,

    fontSize: 18,
    fontWeight: "700",

    marginTop: 15,
  },

  emptyDescription: {
    color: MUTED,

    fontSize: 13,

    lineHeight: 20,

    textAlign: "center",

    marginTop: 7,

    maxWidth: 290,
  },

  /* ================= NOTE ================= */

  noteCard: {
    flexDirection: "row",
    alignItems: "flex-start",

    backgroundColor: "#E8F8F4",

    borderRadius: 15,

    marginTop: 16,

    paddingHorizontal: 15,
    paddingVertical: 14,
  },

  noteText: {
    flex: 1,

    color: "#52756E",

    fontSize: 12,

    lineHeight: 18,

    marginLeft: 9,
  },

  bottomSpace: {
    height: 30,
  },
});