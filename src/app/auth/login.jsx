import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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
  const { width } = useWindowDimensions();

  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);

  const scrollViewRef = useRef(null);

  const isValidEmail =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleContinue = () => {
    if (!isValidEmail) return;

    router.push({
      pathname: "/auth/otp",
      params: { email },
    });
  };

  const handleEmailFocus = () => {
    setFocused(true);

    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: 150,
        animated: true,
      });
    }, 300);
  };

  const handleEmailBlur = () => {
    setFocused(false);
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "bottom"]}
      >
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : undefined
          }
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.scroll}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* =========================
                GREEN HEADER
            ========================== */}

            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Text
                  style={[
                    styles.logo,
                    {
                      fontSize: width < 360 ? 60 : 72,
                    },
                  ]}
                >
                  THUMP
                </Text>

                <Text
                  style={[
                    styles.logoTagline,
                    {
                      fontSize: width < 360 ? 17 : 19,
                    },
                  ]}
                >
                  Beyond Limits
                </Text>
              </View>

              <Text style={styles.description}>
                Electronic Accessories In Your Way.
              </Text>
            </View>

            {/* =========================
                LOGIN CARD
            ========================== */}

            <View style={styles.card}>
              <Text style={styles.heading}>
                Welcome Back
              </Text>

              <Text style={styles.subHeading}>
                Sign in with your email to continue
              </Text>

              <Text style={styles.label}>
                Email Address
              </Text>

              {/* EMAIL INPUT */}

              <View
                style={[
                  styles.inputContainer,
                  focused && styles.inputContainerFocused,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={22}
                  color={COLORS.primary}
                />

                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#87949A"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                  returnKeyType="done"
                />
              </View>

              {/* CONTINUE BUTTON */}

              <Pressable
                onPress={handleContinue}
                style={({ pressed }) => [
                  styles.button,

                  isValidEmail
                    ? styles.buttonActive
                    : styles.buttonDisabled,

                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.buttonText}>
                  Continue
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={22}
                  color={COLORS.white}
                />
              </Pressable>

              {/* TERMS */}

              <Text style={styles.terms}>
                By continuing, you agree to our{" "}
                <Text style={styles.termsLink}>
                  Terms
                </Text>
                {" & "}
                <Text style={styles.termsLink}>
                  Privacy Policy
                </Text>
              </Text>
            </View>

            {/* =========================
                FOOTER
            ========================== */}

            <View style={styles.footerContainer}>
              <Text style={styles.footer}>
                Thump Beyond Limits ©2026
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  // =========================
  // SCREEN
  // =========================

  screen: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  keyboard: {
    flex: 1,
  },

  scroll: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  // =========================
  // HEADER
  // =========================

  header: {
    width: "100%",

    backgroundColor: COLORS.primary,

    alignItems: "center",

    paddingTop: 45,
    paddingBottom: 145,

    paddingHorizontal: 20,

    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },

  logoContainer: {
    alignItems: "center",
  },

  logo: {
    color: "#000000",

    fontWeight: "900",

    letterSpacing: -3,

    lineHeight: 76,
  },

  logoTagline: {
    color: "#000000",

    fontWeight: "500",

    marginTop: -8,
  },

  description: {
    color: COLORS.white,

    fontSize: 18,

    fontWeight: "500",

    textAlign: "center",

    marginTop: 28,

    maxWidth: 320,
  },

  // =========================
  // CARD
  // =========================

  card: {
    backgroundColor: COLORS.white,

    marginHorizontal: 20,

    marginTop: -110,

    borderRadius: 30,

    paddingHorizontal: 22,

    paddingTop: 25,

    paddingBottom: 32,

    // iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,

    // Android
    elevation: 6,
  },

  heading: {
    fontSize: 26,

    fontWeight: "700",

    color: COLORS.text,
  },

  subHeading: {
    fontSize: 16,

    color: COLORS.secondaryText,

    marginTop: 5,

    lineHeight: 24,
  },

  // =========================
  // LABEL
  // =========================

  label: {
    fontSize: 16,

    fontWeight: "600",

    color: COLORS.secondaryText,

    marginTop: 22,

    marginBottom: 12,
  },

  // =========================
  // INPUT
  // =========================

  inputContainer: {
    height: 56,

    width: "100%",

    flexDirection: "row",

    alignItems: "center",

    borderWidth: 1.5,

    borderColor: COLORS.border,

    borderRadius: 14,

    backgroundColor: COLORS.inputBackground,

    paddingHorizontal: 16,
  },

  inputContainerFocused: {
    backgroundColor: "#E0F5F1",

    borderColor: COLORS.primaryDark,
  },

  input: {
    flex: 1,

    height: 56,

    marginLeft: 12,

    fontSize: 16,

    color: COLORS.text,

    paddingVertical: 0,
  },

  // =========================
  // BUTTON
  // =========================

  button: {
    height: 56,

    marginTop: 24,

    borderRadius: 14,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 10,
  },

  buttonActive: {
    backgroundColor: COLORS.primaryDark,
  },

  buttonDisabled: {
    backgroundColor: COLORS.secondaryText,
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonText: {
    color: COLORS.white,

    fontSize: 18,

    fontWeight: "700",
  },

  // =========================
  // TERMS
  // =========================

  terms: {
    textAlign: "center",

    color: COLORS.footer,

    fontSize: 12,

    lineHeight: 22,

    marginTop: 25,

    paddingHorizontal: 5,
  },

  termsLink: {
    color: COLORS.primary,

    fontWeight: "700",
  },

  // =========================
  // FOOTER
  // =========================

  footerContainer: {
    alignItems: "center",

    paddingHorizontal: 20,

    paddingTop: 20,

    paddingBottom: 10,
  },

  footer: {
    color: COLORS.footer,

    fontSize: 14,

    textAlign: "center",
  },
});