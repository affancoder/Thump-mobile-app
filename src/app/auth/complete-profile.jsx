import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const TEAL = "#0BAF9A";
const BG = "#F3F5F8";
const TEXT = "#263238";
const MUTED = "#70808A";
const BORDER = "#DDE4E8";
const WHITE = "#FFFFFF";
const BUTTON = "#8EA0AA";

export default function CompleteProfile() {
  const router = useRouter();

  // Empty fields — no pre-filled data
  const [businessName, setBusinessName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  const handleSave = () => {
    // Backend/API integration will be added later.
    router.back();
  };

  const handleDiscard = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* ================= HEADER ================= */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={23} color={TEXT} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Edit Profile
          </Text>

          <TouchableOpacity
            style={styles.saveTopButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={styles.saveTopText}>
              Save
            </Text>
          </TouchableOpacity>
        </View>

        {/* ================= FORM ================= */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* ================= CONTACT DETAILS ================= */}

          <View style={styles.sectionCard}>
            <SectionTitle
              icon="person-outline"
              title="Contact Details"
            />

            <FieldLabel
              text="Business Name"
              required
            />

            <TextInput
              style={styles.input}
              value={businessName}
              onChangeText={setBusinessName}
              placeholder="Enter business name"
              placeholderTextColor="#98A6AE"
            />

            <FieldLabel
              text="Contact Person Name"
              required
            />

            <TextInput
              style={styles.input}
              value={contactPerson}
              onChangeText={setContactPerson}
              placeholder="Enter contact person name"
              placeholderTextColor="#98A6AE"
            />

            <FieldLabel text="Mobile Number" />

            <View style={styles.mobileBox}>
              <Text style={styles.mobilePlaceholder}>
                Mobile number
              </Text>

              <View style={styles.verifiedBadge}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={14}
                  color="#28C779"
                />

                <Text style={styles.verifiedText}>
                  Verified
                </Text>
              </View>
            </View>
          </View>

          {/* ================= DELIVERY ADDRESS ================= */}

          <View style={styles.sectionCard}>
            <SectionTitle
              icon="location-outline"
              title="Delivery Address"
            />

            <FieldLabel
              text="Address Line 1"
              required
            />

            <TextInput
              style={styles.input}
              value={address1}
              onChangeText={setAddress1}
              placeholder="Enter address"
              placeholderTextColor="#98A6AE"
            />

            <View style={styles.labelRow}>
              <Text style={styles.label}>
                Address Line 2
              </Text>

              <Text style={styles.optional}>
                Optional
              </Text>
            </View>

            <TextInput
              style={[styles.input, styles.optionalInput]}
              value={address2}
              onChangeText={setAddress2}
              placeholder="Street, Area, Landmark"
              placeholderTextColor="#98A6AE"
            />

            <View style={styles.row}>
              <View style={styles.halfField}>
                <FieldLabel
                  text="City"
                  required
                />

                <TextInput
                  style={styles.input}
                  value={city}
                  onChangeText={setCity}
                  placeholder="City"
                  placeholderTextColor="#98A6AE"
                />
              </View>

              <View style={styles.halfField}>
                <FieldLabel
                  text="State"
                  required
                />

                <TouchableOpacity
                  style={styles.dropdown}
                  activeOpacity={0.8}
                >
                  <Text style={styles.dropdownPlaceholder}>
                    Select state
                  </Text>

                  <Ionicons
                    name="chevron-down"
                    size={17}
                    color={MUTED}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.labelRow}>
              <Text style={styles.label}>
                Pincode
                <Text style={styles.required}>
                  {" "}*
                </Text>
              </Text>

              <Text style={styles.optional}>
                6 digits
              </Text>
            </View>

            <TextInput
              style={styles.input}
              value={pincode}
              onChangeText={setPincode}
              placeholder="Enter pincode"
              placeholderTextColor="#98A6AE"
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>

          {/* ================= GST DETAILS ================= */}

          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleLeft}>
                <View style={styles.iconBox}>
                  <Ionicons
                    name="card-outline"
                    size={19}
                    color={TEAL}
                  />
                </View>

                <Text style={styles.sectionTitle}>
                  GST Details
                </Text>

                <View style={styles.divider} />
              </View>

              <View style={styles.optionalBadge}>
                <Text style={styles.optionalBadgeText}>
                  Optional
                </Text>
              </View>
            </View>

            <FieldLabel text="GST Number" />

            <TextInput
              style={styles.input}
              value={gstNumber}
              onChangeText={setGstNumber}
              placeholder="Enter GST number"
              placeholderTextColor="#98A6AE"
              autoCapitalize="characters"
            />
          </View>

          {/* ================= SAVE ================= */}

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Ionicons
              name="checkmark"
              size={19}
              color={WHITE}
            />

            <Text style={styles.saveButtonText}>
              SAVE CHANGES
            </Text>
          </TouchableOpacity>

          {/* ================= DISCARD ================= */}

          <TouchableOpacity
            style={styles.discardButton}
            onPress={handleDiscard}
            activeOpacity={0.85}
          >
            <Text style={styles.discardText}>
              Discard Changes
            </Text>
          </TouchableOpacity>

          <View style={styles.bottomSpace} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* =========================
   SECTION TITLE
========================= */

function SectionTitle({ icon, title }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleLeft}>
        <View style={styles.iconBox}>
          <Ionicons
            name={icon}
            size={19}
            color={TEAL}
          />
        </View>

        <Text style={styles.sectionTitle}>
          {title}
        </Text>

        <View style={styles.divider} />
      </View>
    </View>
  );
}

/* =========================
   FIELD LABEL
========================= */

function FieldLabel({ text, required }) {
  return (
    <Text style={styles.label}>
      {text}

      {required && (
        <Text style={styles.required}>
          {" "}*
        </Text>
      )}
    </Text>
  );
}

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },

  keyboardView: {
    flex: 1,
  },

  /* ================= HEADER ================= */

  header: {
    height: 70,
    paddingHorizontal: 16,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: BG,
  },

  headerButton: {
    width: 38,
    height: 38,

    borderRadius: 12,

    backgroundColor: WHITE,

    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    position: "absolute",

    left: 0,
    right: 0,

    textAlign: "center",

    fontSize: 20,
    fontWeight: "700",

    color: TEXT,
  },

  saveTopButton: {
    marginLeft: "auto",

    minWidth: 60,
    height: 38,

    paddingHorizontal: 16,

    borderRadius: 22,

    backgroundColor: BUTTON,

    alignItems: "center",
    justifyContent: "center",
  },

  saveTopText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: "700",
  },

  /* ================= CONTENT ================= */

  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  sectionCard: {
    backgroundColor: WHITE,

    borderRadius: 17,

    padding: 18,

    marginBottom: 20,
  },

  /* ================= SECTION ================= */

  sectionHeader: {
    minHeight: 34,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 16,
  },

  sectionTitleLeft: {
    flex: 1,

    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 28,
    height: 28,

    borderRadius: 8,

    backgroundColor: "#E8F8F5",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 9,
  },

  sectionTitle: {
    color: TEAL,

    fontSize: 15,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    flex: 1,

    backgroundColor: "#E5E9EC",

    marginLeft: 10,
  },

  /* ================= LABEL ================= */

  label: {
    color: "#52636D",

    fontSize: 14,
    fontWeight: "500",

    marginBottom: 9,
  },

  required: {
    color: "#E04B4B",
  },

  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  optional: {
    color: "#8A989F",

    fontSize: 12,

    marginBottom: 9,
  },

  /* ================= INPUT ================= */

  input: {
    height: 51,

    borderWidth: 1.4,
    borderColor: TEAL,

    borderRadius: 11,

    paddingHorizontal: 14,

    fontSize: 15,
    color: TEXT,

    backgroundColor: "#F9FAFB",

    marginBottom: 19,
  },

  optionalInput: {
    borderColor: BORDER,
  },

  /* ================= MOBILE ================= */

  mobileBox: {
    height: 51,

    borderWidth: 1,
    borderColor: BORDER,

    borderRadius: 11,

    backgroundColor: "#F5F7F8",

    paddingHorizontal: 14,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  mobilePlaceholder: {
    color: "#98A6AE",
    fontSize: 15,
  },

  verifiedBadge: {
    height: 28,

    paddingHorizontal: 10,

    borderRadius: 15,

    backgroundColor: "#D8F8E9",

    flexDirection: "row",
    alignItems: "center",

    gap: 4,
  },

  verifiedText: {
    color: "#28C779",

    fontSize: 12,
    fontWeight: "600",
  },

  /* ================= ADDRESS ================= */

  row: {
    flexDirection: "row",
    justifyContent: "space-between",

    gap: 11,
  },

  halfField: {
    flex: 1,
  },

  dropdown: {
    height: 51,

    borderWidth: 1.4,
    borderColor: TEAL,

    borderRadius: 11,

    backgroundColor: "#F9FAFB",

    paddingHorizontal: 13,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 19,
  },

  dropdownPlaceholder: {
    color: "#98A6AE",
    fontSize: 14,
  },

  /* ================= GST ================= */

  optionalBadge: {
    height: 28,

    paddingHorizontal: 11,

    borderRadius: 14,

    borderWidth: 1,
    borderColor: BORDER,

    backgroundColor: "#F8FAFB",

    justifyContent: "center",
  },

  optionalBadgeText: {
    color: "#819099",
    fontSize: 12,
  },

  /* ================= BUTTONS ================= */

  saveButton: {
    height: 58,

    borderRadius: 14,

    backgroundColor: "#0BAF9A",

    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",

    gap: 7,

    marginBottom: 12,
  },

  saveButtonText: {
    color: WHITE,

    fontSize: 15,
    fontWeight: "800",

    letterSpacing: 0.5,
  },

  discardButton: {
    height: 54,

    borderRadius: 14,

    backgroundColor: WHITE,

    alignItems: "center",
    justifyContent: "center",
  },

  discardText: {
    color: "#8798A1",

    fontSize: 14,
    fontWeight: "500",
  },

  bottomSpace: {
    height: 20,
  },
});