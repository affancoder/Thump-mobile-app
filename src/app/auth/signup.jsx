import React, { useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
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

import { updateProfile } from "../../context/profileStore";

const COLORS = {
  primary: "#08AA92",
  background: "#F3F4F8",
  white: "#FFFFFF",
  text: "#182126",
  secondaryText: "#66757D",
  inputBackground: "#EEF9F7",
};

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = () => {
    /*
      Save the mobile number into the shared
      frontend profile store.

      Backend/API integration will be added later.
    */
    updateProfile({
      contactPerson: fullName.trim(),
      mobile: mobile.trim(),
    });

    router.push("/(tabs)/home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}

          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons
                name="arrow-back"
                size={25}
                color={COLORS.text}
              />
            </Pressable>

            <View style={styles.logoWrapper}>
              <Text style={styles.logo}>THUMP</Text>

              <Text style={styles.logoTagline}>
                Beyond Limits
              </Text>
            </View>
          </View>

          {/* Signup Card */}

          <View style={styles.card}>
            <Text style={styles.heading}>
              Create Account
            </Text>

            <Text style={styles.subHeading}>
              Create your account to get started
            </Text>

            {/* Name */}

            <Text style={styles.label}>
              Full Name
            </Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={22}
                color={COLORS.primary}
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#87949A"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* Email */}

            <Text style={styles.label}>
              Email Address
            </Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={22}
                color={COLORS.primary}
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#87949A"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Phone */}

            <Text style={styles.label}>
              Mobile Number
            </Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="call-outline"
                size={22}
                color={COLORS.primary}
              />

              <TextInput
                style={styles.input}
                placeholder="Enter mobile number"
                placeholderTextColor="#87949A"
                keyboardType="phone-pad"
                value={mobile}
                onChangeText={setMobile}
              />
            </View>

            {/* Password */}

            <Text style={styles.label}>
              Password
            </Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={23}
                color={COLORS.primary}
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#87949A"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Create Account */}

            <Pressable
              style={({ pressed }) => [
                styles.createButton,
                pressed && styles.pressed,
              ]}
              onPress={handleCreateAccount}
            >
              <Text style={styles.createButtonText}>
                Create Account
              </Text>

              <Ionicons
                name="arrow-forward"
                size={23}
                color={COLORS.white}
              />
            </Pressable>

            {/* Existing Account */}

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Already have an account?
              </Text>

              <Pressable
                onPress={() =>
                  router.replace("/auth/login")
                }
              >
                <Text style={styles.loginButton}>
                  Sign In
                </Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.footer}>
            Thump Beyond Limits ©2026
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  flex: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  header: {
    backgroundColor: COLORS.primary,
    minHeight: 400,
    paddingTop: Platform.OS === "android" ? 30 : 15,
    paddingHorizontal: 25,
    alignItems: "center",
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },

  backButton: {
    position: "absolute",
    left: 25,
    top: Platform.OS === "android" ? 38 : 28,
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },

  logoWrapper: {
    alignItems: "center",
    marginTop: 75,
  },

  logo: {
    fontSize: 70,
    lineHeight: 62,
    fontWeight: "900",
    letterSpacing: -3,
    color: "#000000",
  },

  logoTagline: {
    fontSize: 20,
    color: "#000000",
    marginTop: -6,
  },

  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginTop: -158,
    borderRadius: 32,
    padding: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.text,
  },

  subHeading: {
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.secondaryText,
    marginTop: 4,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.secondaryText,
    marginTop: 25,
    marginBottom: 9,
  },

  inputWrapper: {
    height: 52,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 14,
    backgroundColor: COLORS.inputBackground,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
    marginLeft: 5,
    fontSize: 16,
    color: COLORS.text,
  },

  createButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  createButtonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

  loginText: {
    color: COLORS.secondaryText,
    fontSize: 16,
  },

  loginButton: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 6,
  },

  footer: {
    textAlign: "center",
    color: "#829098",
    fontSize: 16,
    marginTop: 35,
  },

  pressed: {
    opacity: 0.75,
  },
});