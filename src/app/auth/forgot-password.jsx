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

const COLORS = {
  primary: "#08AA92",
  white: "#FFFFFF",
  background: "#F3F4F8",
  text: "#182126",
  secondaryText: "#66757D",
  inputBackground: "#EEF9F7",
  footer: "#829098",
};

export default function ForgotPassword() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={COLORS.white}
              />
            </Pressable>

            <Text style={styles.logo}>THUMP</Text>
            <Text style={styles.tagline}>Beyond Limits</Text>
          </View>

          {/* Forgot Password Card */}
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={32}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.title}>Forgot Password?</Text>

            <Text style={styles.description}>
              Enter your email address and we'll send you a link to reset
              your password.
            </Text>

            {/* Email */}
            <Text style={styles.label}>Email Address</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={21}
                color={COLORS.secondaryText}
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                placeholderTextColor="#8C999F"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Send Reset Link */}
            <Pressable style={styles.resetButton}>
              <Text style={styles.resetButtonText}>
                Send Reset Link
              </Text>

              <Ionicons
                name="arrow-forward"
                size={21}
                color={COLORS.white}
              />
            </Pressable>

            {/* Back to Login */}
            <Pressable
              style={styles.loginLink}
              onPress={() => router.replace("/auth/login")}
            >
              <Ionicons
                name="arrow-back"
                size={18}
                color={COLORS.primary}
              />

              <Text style={styles.loginLinkText}>
                Back to Login
              </Text>
            </Pressable>
          </View>

          {/* Footer */}
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

  container: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },

  header: {
    backgroundColor: COLORS.primary,
    minHeight: 300,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50,
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },

  backButton: {
    position: "absolute",
    top: 24,
    left: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    color: COLORS.text,
    fontSize: 58,
    fontWeight: "900",
    letterSpacing: -3,
  },

  tagline: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: "700",
    marginTop: -4,
  },

  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 24,
    marginTop: -32,
    borderRadius: 30,
    paddingHorizontal: 26,
    paddingVertical: 30,

    elevation: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.inputBackground,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 18,
  },

  title: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
  },

  description: {
    color: COLORS.secondaryText,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 28,
  },

  label: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 9,
  },

  inputContainer: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.inputBackground,
  },

  input: {
    flex: 1,
    marginLeft: 11,
    fontSize: 16,
    color: COLORS.text,
  },

  resetButton: {
    height: 62,
    borderRadius: 19,
    backgroundColor: COLORS.primary,
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  resetButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "800",
  },

  loginLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 24,
  },

  loginLinkText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
  },

  footer: {
    color: COLORS.footer,
    fontSize: 13,
    textAlign: "center",
    marginTop: 28,
  },
});