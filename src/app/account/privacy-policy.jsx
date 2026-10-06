import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const TEAL = "#08AD92";
const BG = "#F1F3F8";
const WHITE = "#FFFFFF";
const TEXT = "#18232B";
const MUTED = "#6F7C84";
const BORDER = "#E3E7EB";

export default function PrivacyPolicy() {
  const router = useRouter();

  const [openSections, setOpenSections] = useState({
    information: true,
    usage: true,
    rights: true,
    contact: true,
  });

  const toggleSection = (section) => {
    setOpenSections((previous) => ({
      ...previous,
      [section]: !previous[section],
    }));
  };

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
            size={24}
            color={WHITE}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Privacy Policy
        </Text>
      </View>

      {/* ================= CONTENT ================= */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= INTRO CARD ================= */}

        <View style={styles.introCard}>
          <Text style={styles.logoText}>
            THUMP
          </Text>

          <Text style={styles.logoSubtitle}>
            Beyond Limits
          </Text>

          <Text style={styles.introText}>
            We collect minimal data needed to serve you better.
          </Text>

          <Text style={styles.introText}>
            Your information is encrypted, never sold, and you
            control it.
          </Text>
        </View>

        {/* ================= INFORMATION WE COLLECT ================= */}

        <PrivacySection
          icon="server-outline"
          title="Information We Collect"
          open={openSections.information}
          onPress={() => toggleSection("information")}
        >
          <Text style={styles.description}>
            We collect your name, phone number, address, and
            order details to process your orders and provide our
            services.
          </Text>
        </PrivacySection>

        {/* ================= HOW WE USE IT ================= */}

        <PrivacySection
          icon="trending-up-outline"
          title="How We Use It"
          open={openSections.usage}
          onPress={() => toggleSection("usage")}
        >
          <Text style={styles.description}>
            Your information is used to process orders,
            communicate about deliveries, improve our service,
            and send promotional offers if you opt in.
          </Text>
        </PrivacySection>

        {/* ================= YOUR RIGHTS ================= */}

        <PrivacySection
          icon="people-outline"
          title="Your Rights"
          open={openSections.rights}
          onPress={() => toggleSection("rights")}
        >
          <Text style={styles.description}>
            You can request access, correction, or deletion of
            your data anytime by contacting our support team.
          </Text>
        </PrivacySection>

        {/* ================= CONTACT US ================= */}

        <PrivacySection
          icon="mail-outline"
          title="Contact Us"
          open={openSections.contact}
          onPress={() => toggleSection("contact")}
        >
          <Text style={styles.description}>
            Questions? Reach us at support@thump.com or call
            {"\n"}
            +91 1800 123 4567. We respond within 48 hours.
          </Text>
        </PrivacySection>

        {/* ================= AGREEMENT ================= */}

        <View style={styles.agreementCard}>
          <Ionicons
            name="checkmark-circle-outline"
            size={18}
            color="#52C89A"
          />

          <Text style={styles.agreementText}>
            By using our app, you agree to this privacy policy.
          </Text>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* =====================================================
   PRIVACY SECTION
===================================================== */

function PrivacySection({
  icon,
  title,
  open,
  onPress,
  children,
}) {
  return (
    <View style={styles.sectionCard}>
      {/* Section Header */}

      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.sectionIcon}>
          <Ionicons
            name={icon}
            size={20}
            color={TEAL}
          />
        </View>

        <Text style={styles.sectionTitle}>
          {title}
        </Text>

        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color="#8B979D"
          style={styles.chevron}
        />
      </TouchableOpacity>

      {/* Section Content */}

      {open && (
        <View style={styles.sectionContent}>
          {children}
        </View>
      )}
    </View>
  );
}

/* == STYLES ===== */

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
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: "rgba(255,255,255,0.16)",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 12,
  },

  headerTitle: {
    color: WHITE,

    fontSize: 24,
    fontWeight: "700",
  },

  /* ================= SCROLL ================= */

  scrollView: {
    flex: 1,
    backgroundColor: BG,
  },

  content: {
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 20,
  },

  /* ================= INTRO ================= */

  introCard: {
    backgroundColor: WHITE,

    borderRadius: 17,
    paddingTop: 32,
    paddingBottom: 28,

    marginBottom: 20,

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },

  logoText: {
    color: "#000000",

    fontSize: 48,
    fontWeight: "900",

    letterSpacing: -2,

    lineHeight: 49,
  },

  logoSubtitle: {
    color: "#000000",

    fontSize: 14,
    fontWeight: "500",

    marginTop: -2,
    marginBottom: 30,
  },

  introText: {
    color: MUTED,

    fontSize: 13,

    lineHeight: 15,

    textAlign: "center",

    marginBottom: 2,
  },

  /* ================= SECTION ================= */

  sectionCard: {
    backgroundColor: WHITE,

    borderRadius: 16,

    marginBottom: 10,

    overflow: "hidden",

    borderWidth: 1,
    borderColor: "#E5E8EC",

    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  sectionHeader: {
    minHeight: 67,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,
  },

  sectionIcon: {
    width: 42,
    height: 42,

    borderRadius: 10,

    backgroundColor: "#E8F8F5",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 13,
  },

  sectionTitle: {
    flex: 1,

    color: TEXT,

    fontSize: 17,
    fontWeight: "700",
  },

  chevron: {
    marginLeft: 8,
  },

  sectionContent: {
    backgroundColor: "#F0F2F7",

    borderTopWidth: 1,
    borderTopColor: BORDER,

    paddingHorizontal: 16,
    paddingVertical: 13,
  },

  description: {
    color: MUTED,

    fontSize: 15,

    lineHeight: 24,
  },

  /* ================= AGREEMENT ================= */

  agreementCard: {
    minHeight: 57,

    borderRadius: 14,

    backgroundColor: WHITE,

    marginTop: 10,

    paddingHorizontal: 18,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  agreementText: {
    color: MUTED,

    fontSize: 13,

    marginLeft: 8,

    textAlign: "center",
  },

  bottomSpace: {
    height: 15,
  },
});