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
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { isExistingUser } from "../../context/authStore";

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

export default function OTP() {
  const { email } = useLocalSearchParams();

  const [otp, setOtp] = useState("");
  const [focused, setFocused] = useState(false);

  const scrollViewRef = useRef(null);
  const otpInputRef = useRef(null);

  const isValidOtp = otp.length === 6;

  const handleOtpChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    setOtp(numericValue.slice(0, 6));
  };

  const handleOtpFocus = () => {
    setFocused(true);

    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: 180,
        animated: true,
      });
    }, 250);
  };

  const handleOtpBlur = () => {
    setFocused(false);
  };

  const handleVerify = () => {
    if (!isValidOtp) {
      return;
    }

    const existingUser = isExistingUser(email || "");

    if (existingUser) {
      // Old user → Home
      router.replace("/(tabs)/home");
    } else {
      // New user → Complete Profile
      router.replace({
        pathname: "/auth/complete-profile",
        params: {
          email,
        },
      });
    }
  };

  const otpDigits = Array.from(
    { length: 6 },
    (_, index) => otp[index] || ""
  );

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

          {/* OTP CARD */}

          <View style={styles.card}>
            <Text style={styles.heading}>
              Verify OTP
            </Text>

            <Text style={styles.subHeading}>
              We've sent the 6-digit OTP to{" "}
              {email || "your email"}
            </Text>

            {/* OTP */}

            <Pressable
              style={[
                styles.otpWrapper,
                focused && styles.otpWrapperActive,
              ]}
              onPress={() => {
                otpInputRef.current?.focus();
              }}
            >
              <TextInput
                ref={otpInputRef}
                value={otp}
                onChangeText={handleOtpChange}
                keyboardType="number-pad"
                maxLength={6}
                onFocus={handleOtpFocus}
                onBlur={handleOtpBlur}
                style={styles.hiddenInput}
              />

              {otpDigits.map((digit, index) => (
                <View
                  key={index}
                  style={[
                    styles.otpBox,
                    focused &&
                      index === otp.length &&
                      styles.otpBoxActive,
                  ]}
                >
                  <Text style={styles.otpDigit}>
                    {digit}
                  </Text>
                </View>
              ))}
            </Pressable>

            {/* VERIFY BUTTON */}

            <Pressable
              style={({ pressed }) => [
                styles.verifyButton,
                isValidOtp &&
                  styles.verifyButtonActive,
                pressed && styles.pressed,
              ]}
              onPress={handleVerify}
            >
              <Text style={styles.verifyText}>
                Verify & Continue
              </Text>

              <Ionicons
                name="shield-checkmark-outline"
                size={24}
                color={COLORS.white}
              />
            </Pressable>

            {/* RESEND */}

            <View style={styles.resendContainer}>
              <Text style={styles.resendPrompt}>
                Didn't receive it?
              </Text>

              <Pressable>
                <Text style={styles.resendButton}>
                  Resend Code
                </Text>
              </Pressable>
            </View>
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
    backgroundColor: COLORS.primary,
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

  /* OTP */

  otpWrapper: {
    height: 64,
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    gap: 4,
    position: "relative",
  },

  otpWrapperActive: {
    borderRadius: 14,
  },

  hiddenInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
    zIndex: 2,
  },

  otpBox: {
    width: 43,
    height: 52,

    borderRadius: 12,

    backgroundColor: COLORS.inputBackground,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 0.5,

    marginTop: 16,
  },

  otpBoxActive: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },

  otpDigit: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },

  /* VERIFY */

  verifyButton: {
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

  verifyButtonActive: {
    backgroundColor: "#079C87",
  },

  verifyText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },

  /* RESEND */

  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },

  resendPrompt: {
    fontSize: 15,
    color: COLORS.secondaryText,
  },

  resendButton: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.primary,
    marginLeft: 6,
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