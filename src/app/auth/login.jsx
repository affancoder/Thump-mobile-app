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
import { useRef, useState } from "react";
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
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);

  const scrollViewRef = useRef(null);
  const emailInputRef = useRef(null);

  const isValidEmail =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleContinue = () => {
    if (!isValidEmail) {
      return;
    }

    router.push({
      pathname: "/auth/otp",
      params: {
        email,
      },
    });
  };

  const handleEmailFocus = () => {
    setFocused(true);

    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: 180,
        animated: true,
      });
    }, 250);
  };

  const handleEmailBlur = () => {
    setFocused(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === "ios" ? "padding" : "height"
        }
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* BRANDING */}

          <View style={styles.brandArea}>
            <View style={styles.logoWrapper}>
              <Text style={styles.logo}>
                THUMP
              </Text>

              <Text style={styles.logoTagline}>
                Beyond Limits
              </Text>
            </View>

            <Text style={styles.brandDescription}>
              Electronic Accessories In Your Way.
            </Text>
          </View>

          {/* LOGIN CARD */}

          <View style={styles.card}>
            <Text style={styles.heading}>
              Welcome Back
            </Text>

            <Text style={styles.subHeading}>
              Sign in with your email to continue
            </Text>

            {/* EMAIL LABEL */}

            <Text style={styles.label}>
              Email Address
            </Text>

            {/* EMAIL INPUT */}

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
                ref={emailInputRef}
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#87949A"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
              />
            </View>

            {/* CONTINUE BUTTON */}

            <Pressable
              style={({ pressed }) => [
                styles.continueButton,
                isValidEmail &&
                  styles.continueButtonActive,
                pressed && styles.pressed,
              ]}
              onPress={handleContinue}
            >
              <Text style={styles.continueText}>
                Continue
              </Text>

              <Ionicons
                name="arrow-forward"
                size={23}
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

          {/* FOOTER */}

          <View>
            <Text style={styles.footer}>
              Thump Beyond Limits ©2026
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

  /* BRANDING */

  brandArea: {
    backgroundColor: COLORS.primary,
    minHeight: 430,
    alignItems: "center",
    paddingTop:
      Platform.OS === "android" ? 55 : 35,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 58,
    borderBottomRightRadius: 58,
  },

  logoWrapper: {
    alignItems: "center",
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
    fontFamily: "Black Ops One",
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "center",
    marginTop: 28,
    letterSpacing: 0.2,
  },

  /* CARD */

  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginTop: -160,
    borderRadius: 32,
    paddingHorizontal: 22,
    paddingTop: 24,
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
    lineHeight: 25,
    marginTop: 4,
  },

  /* EMAIL */

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
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    backgroundColor: COLORS.inputBackground,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,
  },

  inputWrapperActive: {
    backgroundColor: "#E0F5F1",
    borderColor: COLORS.primaryDark,
  },

  input: {
    flex: 1,
    height: "100%",
    marginLeft: 12,

    fontSize: 16,
    color: COLORS.text,
  },

  /* CONTINUE */

  continueButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: COLORS.secondaryText,

    marginTop: 24,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    gap: 10,

    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 5,
  },

  continueButtonActive: {
    backgroundColor: "#079C87",
  },

  continueText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },

  /* TERMS */

  terms: {
    textAlign: "center",
    fontSize: 12,
    lineHeight: 23,
    color: COLORS.footer,
    marginTop: 27,
  },

  termsLink: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  /* FOOTER */

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