import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const PRIMARY = "#08AA92";
const DARK = "#172126";
const MUTED = "#829098";
const BACKGROUND = "#F3F4F8";
const WHITE = "#FFFFFF";

const categories = [
  {
    title: "Charging Cables",
    image: require("../../../assets/images/charging-cables.webp"),
  },
  {
    title: "Chargers & Adapters",
    image: require("../../../assets/images/chargers-adapters.webp"),
  },
  {
    title: "Power Banks",
    image: require("../../../assets/images/power-banks.webp"),
  },
  {
    title: "Headphones & Earphones",
    image: require("../../../assets/images/headphones-earphones.webp"),
  },
  {
    title: "Cases & Covers",
    image: require("../../../assets/images/cases-covers.webp"),
  },
  {
    title: "Mounts & Stands",
    image: require("../../../assets/images/mounts-stands.webp"),
  },
  {
    title: "Smartwatch Accessories",
    image: require("../../../assets/images/smartwatch-accessories.webp"),
  },
  {
    title: "Speakers",
    image: require("../../../assets/images/speakers.webp"),
  },
  {
    title: "Other Accessories",
    image: require("../../../assets/images/other-accessories.webp"),
  },
  {
    title: "Mobiles",
    image: require("../../../assets/images/mobiles.webp"),
  },
];

export default function Home() {
  const openCategory = (category) => {
    router.push({
      pathname: "/(tabs)/shop",
      params: {
        category,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= HEADER ================= */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            {/* Profile */}
            <View style={styles.profileSection}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>AN</Text>
              </View>

              <View style={styles.greetingContainer}>
                <Text style={styles.greeting}>Good Evening</Text>
                <Text style={styles.userName}>WEKIBF LKENG</Text>
              </View>
            </View>

            {/* Header Icons */}
            <View style={styles.headerActions}>
              <Pressable
                style={styles.headerIconButton}
                onPress={() => router.push("/notifications")}
              >
                <Ionicons
                  name="notifications-outline"
                  size={27}
                  color={WHITE}
                />
              </Pressable>

              <Pressable
                style={styles.headerIconButton}
                onPress={() => router.push("/cart")}
              >
                <Ionicons
                  name="cart-outline"
                  size={29}
                  color={WHITE}
                />
              </Pressable>
            </View>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={23}
              color={MUTED}
            />

            <TextInput
              style={styles.searchInput}
              placeholder="Search cables, chargers, cases..."
              placeholderTextColor={MUTED}
              returnKeyType="search"
              onSubmitEditing={() => router.push("/(tabs)/shop")}
            />
          </View>
        </View>

        {/* ================= CONTENT ================= */}
        <View style={styles.content}>
          {categories.map((category) => (
            <View key={category.title} style={styles.categorySection}>
              {/* Section Header */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  {category.title}
                </Text>

                <Pressable
                  onPress={() => openCategory(category.title)}
                  hitSlop={8}
                >
                  <Text style={styles.viewAll}>
                    View All &gt;
                  </Text>
                </Pressable>
              </View>

              {/* Category Image */}
              <Pressable
                style={styles.categoryCard}
                onPress={() => openCategory(category.title)}
              >
                <Image
                  source={category.image}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />

                {/* Label */}
                <View style={styles.categoryLabel}>
                  <Text style={styles.categoryLabelText}>
                    {category.title}
                  </Text>
                </View>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
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

  contentContainer: {
    paddingBottom: 20,
  },

  /* ==== HEADER == */

  header: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 57,
    height: 57,
    borderRadius: 29,
    backgroundColor: "#6bb440",
    borderWidth: 1.5,
    borderColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: WHITE,
    fontSize: 20,
    fontWeight: "500",
  },

  greetingContainer: {
    marginLeft: 13,
  },

  greeting: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 2,
  },

  userName: {
    color: WHITE,
    fontSize: 17,
    fontWeight: "700",
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  headerIconButton: {
    width: 35,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  /* ================= SEARCH ================= */

  searchContainer: {
    height: 46,
    backgroundColor: WHITE,
    borderRadius: 15,
    marginTop: 14,
    paddingHorizontal: 17,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: DARK,
    paddingVertical: 0,
  },

  /* ================= CONTENT ================= */

  content: {
    paddingHorizontal: 12,
    paddingTop: 23,
  },

  categorySection: {
    marginBottom: 23,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  sectionTitle: {
    color: DARK,
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
  },

  viewAll: {
    color: PRIMARY,
    fontSize: 16,
    fontWeight: "700",
  },

  /* ================= CATEGORY CARD ================= */

  categoryCard: {
    width: "100%",
    height: 225,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#DDDDDD",
  },

  categoryImage: {
    width: "100%",
    height: "100%",
  },

  categoryLabel: {
    position: "absolute",
    top: 14,
    left: 17,
    backgroundColor: "rgba(40, 43, 61, 0.92)",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 9,
  },

  categoryLabelText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: "600",
  },
});