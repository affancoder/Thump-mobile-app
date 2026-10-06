import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const TEAL = "#08AD92";
const BG = "#F3F5F9";
const WHITE = "#FFFFFF";
const TEXT = "#18232B";
const MUTED = "#78858D";
const BORDER = "#DCE2E7";

export default function Complaints() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* ================= HEADER ================= */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Ionicons
            name="arrow-back"
            size={25}
            color={WHITE}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Complaints
        </Text>
      </View>

      {/* ================= CONTENT ================= */}

      <View style={styles.content}>
        {/* Select Purchased Product */}

        <Text style={styles.sectionTitle}>
          Select Purchased Product
        </Text>

        {/* Search */}

        <View style={styles.searchBox}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search by product name / order ID"
            placeholderTextColor="#9AA6AE"
            style={styles.searchInput}
          />

          <Ionicons
            name="search-outline"
            size={23}
            color="#78858D"
          />
        </View>

        {/* ================= EMPTY STATE ================= */}

        <View style={styles.emptyState}>
          <View style={styles.warningIcon}>
            <Ionicons
              name="warning-outline"
              size={51}
              color="#C8D4E2"
            />
          </View>

          <Text style={styles.emptyTitle}>
            No Purchased Products Found
          </Text>

          <Text style={styles.emptyDescription}>
            Products from your past orders will appear here to
            file complaints.
          </Text>
        </View>
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
    height: 72,

    backgroundColor: TEAL,

    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 20,
  },

  backButton: {
    width: 43,
    height: 43,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 12,
  },

  headerTitle: {
    color: WHITE,

    fontSize: 24,
    fontWeight: "700",
  },

  /* ================= CONTENT ================= */

  content: {
    flex: 1,

    paddingHorizontal: 20,
    paddingTop: 22,
  },

  sectionTitle: {
    color: TEXT,

    fontSize: 20,
    fontWeight: "700",

    marginBottom: 18,
  },

  /* ================= SEARCH ================= */

  searchBox: {
    height: 63,

    backgroundColor: WHITE,

    borderWidth: 1.5,
    borderColor: BORDER,

    borderRadius: 15,

    paddingHorizontal: 17,

    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    flex: 1,

    height: "100%",

    color: TEXT,

    fontSize: 16,

    paddingHorizontal: 2,
  },

  /* ================= EMPTY STATE ================= */

  emptyState: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 28,

    paddingBottom: 95,
  },

  warningIcon: {
    width: 82,
    height: 82,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 24,
  },

  emptyTitle: {
    color: TEXT,

    fontSize: 21,
    fontWeight: "700",

    textAlign: "center",

    marginBottom: 10,
  },

  emptyDescription: {
    color: MUTED,

    fontSize: 15,

    lineHeight: 23,

    textAlign: "center",

    maxWidth: 340,
  },
});