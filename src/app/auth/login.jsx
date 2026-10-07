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
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  primary: "#08AA92",
  primaryDark: "#079C87",
  background: "#F3F4F8",
  white: "#FFFFFF",
  text: "#182126",
  secondaryText: "#66757D",
  inputBackground: "#EEF9F7",
  border: "#08AA92",
  footer: "#829098",
};

export default function Login() {
  const [focused, setFocused] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Branding Area */}
          <View style={styles.brandArea}>
            <View style={styles.logoWrapper}>
              <Text style={styles.logo}>THUMP</Text>
              <Text style={styles.logoTagline}>Beyond Limits</Text>
            </View>

            <Text style={styles.brandDescription}>
              Electronic Accessories In Your Way.
            </Text>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            <Text style={styles.heading}>Welcome Back</Text>

            <Text style={styles.subHeading}>
              Sign in to continue to your account
            </Text>

            <Text style={styles.label}>Email Address</Text>

            {/* Email Input */}
            <View
              style={[
                styles.inputWrapper,
                focused && styles.inputWrapperActive,
              ]}
            >
              <Ionicons
                name="mail-outline"
                size={23}
                color={COLORS.primary}
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#87949A"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
            </View>

            {/* Continue */}
            <Pressable
              style={({ pressed }) => [
                styles.continueButton,
                pressed && styles.pressed,
              ]}
              onPress={() => {
                // Frontend only for now
                router.push("/(tabs)/home");
              }}
            >
              <Text style={styles.continueText}>Continue</Text>

              <Ionicons
                name="arrow-forward"
                size={24}
                color={COLORS.white}
              />
            </Pressable>

            {/* OR */}
            <View style={styles.orContainer}>
              <View style={styles.divider} />

              <Text style={styles.orText}>or</Text>

              <View style={styles.divider} />
            </View>

            {/* Google */}
            <Pressable
              style={({ pressed }) => [
                styles.googleButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.googleIcon}>G</Text>

              <Text style={styles.googleText}>
                Continue with Google
              </Text>
            </Pressable>

            {/* Terms */}
            <Text style={styles.terms}>
              By continuing, you agree to our{" "}
              <Text style={styles.termsLink}>Terms</Text>
              {" & "}
              <Text style={styles.termsLink}>Privacy Policy</Text>

              <Text style={styles.footer}>
                Thump Beyond Limits ©2026
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.text,
  },

  flex: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 28,
  },

  brandArea: {
    backgroundColor: COLORS.primary,
    minHeight: 430,
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 55 : 35,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 58,
    borderBottomRightRadius: 58,
  },

  logoWrapper: {
    alignItems: "center",
    marginTop: 55,
  },

  logo: {
    fontSize: 74,
    lineHeight: 78,
    fontWeight: "900",
    letterSpacing: -3,
    color: "#000000",
  },

  logoTagline: {
    fontSize: 19,
    lineHeight: 34,
    fontWeight: "500",
    color: "#000000",
    marginTop: -10,
  },

  brandDescription: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 28,
    letterSpacing: 0.2,
  },

  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginTop: -120,
    borderRadius: 32,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 34,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
  },

  subHeading: {
    fontSize: 16,
    color: COLORS.secondaryText,
    lineHeight: 29,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.secondaryText,
    marginTop: 22,
    marginBottom: 12,
  },

  inputWrapper: {
    height: 56,
    width: "100%",
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 14,
    backgroundColor: COLORS.inputBackground,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  inputWrapperActive: {
    backgroundColor: "#E0F5F1",
    borderColor: COLORS.primaryDark,
  },

  input: {
    flex: 1,
    marginLeft: 5,
    fontSize: 16,
    color: COLORS.text,
  },


  continueButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: COLORS.secondaryText,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,

    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 5,
  },

  continueText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },

  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E2E4",
  },

  orText: {
    marginHorizontal: 16,
    fontSize: 18,
    color: "#829098",
  },

  googleButton: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  googleIcon: {
    fontSize: 26,
    fontWeight: "800",
    color: "#4285F4",
  },

  googleText: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text,
  },
  terms: {
    textAlign: "center",
    fontSize: 12,
    lineHeight: 23,
    color: "#829098",
    marginTop: 27,
  },

  termsLink: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  footer: {
    textAlign: "center",
    color: COLORS.footer,
    fontSize: 14,
    marginTop: 20,
  },

  pressed: {
    opacity: 0.75,
  },
});