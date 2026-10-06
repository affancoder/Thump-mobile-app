import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const productImage = require("../../../assets/images/charging-cables.webp");

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const PRIMARY = "#08AA92";
const DARK = "#172126";
const MUTED = "#829098";
const BACKGROUND = "#F3F4F8";
const WHITE = "#FFFFFF";

export default function Cart() {
  const [quantity, setQuantity] = useState(1);

  const price = 267;
  const oldPrice = 320.4;

  const subtotal = price * quantity;

  const taxableAmount = subtotal / 1.18;
  const igst = subtotal - taxableAmount;

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  const clearCart = () => {
    setQuantity(0);
  };

  const removeItem = () => {
    setQuantity(0);
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top"]}
    >
      <View style={styles.container}>

        {/* ================= HEADER ================= */}

        <View style={styles.header}>

          <View style={styles.headerTop}>

            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons
                name="arrow-back"
                size={25}
                color={WHITE}
              />
            </Pressable>

            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>
                My Cart ({quantity > 0 ? 1 : 0})
              </Text>

              <Text style={styles.headerSubtitle}>
                Review your items and proceed
              </Text>
            </View>

            <Pressable
              style={styles.clearCartButton}
              onPress={clearCart}
            >
              <Text style={styles.clearCartText}>
                Clear Cart
              </Text>

              <Ionicons
                name="trash-outline"
                size={18}
                color={WHITE}
              />
            </Pressable>

          </View>

        </View>

        {/* ================= CONTENT ================= */}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >

          {/* ================= ITEMS ================= */}

          <Text style={styles.sectionTitle}>
            Items
          </Text>

          {quantity > 0 ? (
            <View style={styles.productCard}>

              {/* Product Image */}

              <View style={styles.imageWrapper}>
                <Image
                  source={productImage}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              </View>

              {/* Product Information */}

              <View style={styles.productInfo}>

                <Text style={styles.brand}>
                  TEMPT
                </Text>

                <Text
                  style={styles.productName}
                  numberOfLines={2}
                >
                  TEMPT BLITZ 100W C TO C
                  {"\n"}
                  CABLE TS-1098
                </Text>

                <View style={styles.priceContainer}>

                  <Text style={styles.currentPrice}>
                    ₹267
                  </Text>

                  <Text style={styles.oldPrice}>
                    ₹{oldPrice}
                  </Text>

                </View>

              </View>

              {/* Delete */}

              <Pressable
                style={styles.deleteButton}
                onPress={removeItem}
              >
                <Ionicons
                  name="trash-outline"
                  size={19}
                  color="#E26B6B"
                />
              </Pressable>

              {/* Quantity */}

              <View style={styles.quantityContainer}>

                <Pressable
                  style={styles.quantityButton}
                  onPress={decreaseQuantity}
                >
                  <Text style={styles.minusText}>
                    −
                  </Text>
                </Pressable>

                <Text style={styles.quantityText}>
                  {quantity}
                </Text>

                <Pressable
                  style={styles.quantityButton}
                  onPress={increaseQuantity}
                >
                  <Text style={styles.plusText}>
                    +
                  </Text>
                </Pressable>

              </View>

            </View>
          ) : (
            <View style={styles.emptyCart}>
              <Ionicons
                name="cart-outline"
                size={55}
                color={MUTED}
              />

              <Text style={styles.emptyCartTitle}>
                Your cart is empty
              </Text>

              <Text style={styles.emptyCartText}>
                Add products to continue
              </Text>
            </View>
          )}

          {/* ================= BILL DETAILS ================= */}

          {quantity > 0 && (
            <View style={styles.billCard}>

              <Text style={styles.billTitle}>
                Bill Details
              </Text>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>
                  Subtotal (GST Inclusive)
                </Text>

                <Text style={styles.billValue}>
                  ₹{subtotal.toFixed(2)}
                </Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>
                  Taxable Amount
                </Text>

                <Text style={styles.billValue}>
                  ₹{taxableAmount.toFixed(2)}
                </Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>
                  IGST (18%) (Included)
                </Text>

                <Text style={styles.billValue}>
                  ₹{igst.toFixed(2)}
                </Text>
              </View>

              <View style={styles.billDivider} />

              <View style={styles.totalRow}>
                <Text style={styles.totalBillLabel}>
                  Total Amount (Inclusive of GST)
                </Text>

                <Text style={styles.totalBillValue}>
                  ₹{subtotal.toFixed(2)}
                </Text>
              </View>

            </View>
          )}

          <View style={styles.bottomSpace} />

        </ScrollView>

        {/* ================= BOTTOM CHECKOUT ================= */}

        {quantity > 0 && (
          <View style={styles.bottomArea}>

            {/* GST Message */}

            <View style={styles.gstMessage}>

              <Ionicons
                name="information-circle"
                size={17}
                color="#078A7A"
              />

              <Text style={styles.gstMessageText}>
                All prices are inclusive of GST
              </Text>

            </View>

            {/* Checkout */}

            <View style={styles.checkoutArea}>

              <View style={styles.bottomTotal}>

                <Text style={styles.bottomTotalLabel}>
                  Total
                </Text>

                <Text style={styles.bottomTotalAmount}>
                  ₹{subtotal.toFixed(2)}
                </Text>

                <Text style={styles.inclusiveText}>
                  (Inclusive of GST)
                </Text>

              </View>

              <Pressable
                style={styles.addButton}
                onPress={() => {
                  // Checkout flow will be connected later.
                }}
              >
                <Text style={styles.addButtonText}>
                  Add ₹233
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={23}
                  color={WHITE}
                />
              </Pressable>

            </View>

          </View>
        )}

      </View>
    </SafeAreaView>
  );
}

/* == STYLES ===== */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  /* ================= HEADER ================= */

  header: {
    backgroundColor: PRIMARY,
    height: 100,

    paddingHorizontal: 22,
    paddingTop: 14,

    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,

    backgroundColor: "rgba(255,255,255,0.18)",

    alignItems: "center",
    justifyContent: "center",
  },

  headerTextContainer: {
    flex: 1,
    marginLeft: 14,
  },

  headerTitle: {
    color: WHITE,
    fontSize: 21,
    fontWeight: "700",
  },

  headerSubtitle: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 15,
    marginTop: 3,
  },

  clearCartButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  clearCartText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: "600",
  },

  /* ================= CONTENT ================= */

  scrollView: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 23,
  },

  sectionTitle: {
    color: DARK,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 19,
  },

  /* ================= PRODUCT ================= */

  productCard: {
    minHeight: 202,

    backgroundColor: WHITE,
    borderRadius: 18,

    padding: 16,

    flexDirection: "row",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,

    position: "relative",
  },

  imageWrapper: {
    width: 117,
    height: 117,

    borderRadius: 10,
    overflow: "hidden",

    backgroundColor: "#EEEEEE",
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  productInfo: {
    flex: 1,
    marginLeft: 16,
    paddingRight: 35,
  },

  brand: {
    color: PRIMARY,
    fontSize: 13,
    fontWeight: "700",

    marginBottom: 9,
  },

  productName: {
    color: DARK,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "600",
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 9,
    gap: 9,
  },

  currentPrice: {
    color: DARK,
    fontSize: 20,
    fontWeight: "700",
  },

  oldPrice: {
    color: "#9BA4A8",
    fontSize: 13,
    textDecorationLine: "line-through",
  },

  /* ================= DELETE ================= */

  deleteButton: {
    position: "absolute",
    right: 13,
    top: 15,

    width: 35,
    height: 35,

    borderRadius: 10,

    backgroundColor: "#FFF1F1",

    alignItems: "center",
    justifyContent: "center",
  },

  /* ================= QUANTITY ================= */

  quantityContainer: {
    position: "absolute",

    right: 13,
    bottom: 15,

    height: 42,

    borderRadius: 10,

    backgroundColor: "#E9F7F4",

    borderWidth: 1,
    borderColor: "#CDECE6",

    flexDirection: "row",
    alignItems: "center",
  },

  quantityButton: {
    width: 36,
    height: 40,

    alignItems: "center",
    justifyContent: "center",
  },

  minusText: {
    color: "#B8C5C8",
    fontSize: 20,
    fontWeight: "500",
  },

  plusText: {
    color: PRIMARY,
    fontSize: 20,
    fontWeight: "500",
  },

  quantityText: {
    minWidth: 18,

    textAlign: "center",

    color: PRIMARY,
    fontSize: 17,
    fontWeight: "700",
  },

  /* ================= BILL ================= */

  billCard: {
    backgroundColor: WHITE,

    borderRadius: 18,

    marginTop: 19,

    paddingHorizontal: 22,
    paddingVertical: 21,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  billTitle: {
    color: DARK,
    fontSize: 20,
    fontWeight: "700",

    marginBottom: 25,
  },

  billRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 22,
  },

  billLabel: {
    color: MUTED,
    fontSize: 15,
  },

  billValue: {
    color: DARK,
    fontSize: 15,
    fontWeight: "600",
  },

  billDivider: {
    height: 1,
    backgroundColor: "#EDF0F1",

    marginTop: 1,
    marginBottom: 16,
  },

  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  totalBillLabel: {
    color: DARK,
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
  },

  totalBillValue: {
    color: PRIMARY,
    fontSize: 18,
    fontWeight: "700",
  },

  /* ================= EMPTY ================= */

  emptyCart: {
    backgroundColor: WHITE,
    borderRadius: 18,

    minHeight: 250,

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },

  emptyCartTitle: {
    color: DARK,
    fontSize: 18,
    fontWeight: "700",

    marginTop: 12,
  },

  emptyCartText: {
    color: MUTED,
    fontSize: 14,

    marginTop: 5,
  },

  /* ================= BOTTOM ================= */

  bottomArea: {
    backgroundColor: WHITE,

    borderTopWidth: 1,
    borderTopColor: "#E7EBEC",
    marginBottom: 50,
  },

  gstMessage: {
    height: 49,

    backgroundColor: "#E4F6F3",

    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 7,
  },

  gstMessageText: {
    color: "#078A7A",
    fontSize: 14,
    fontWeight: "600",
  },

  checkoutArea: {
    height: 80,

    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  bottomTotal: {
    justifyContent: "center",
  },

  bottomTotalLabel: {
    color: MUTED,
    fontSize: 14,
  },

  bottomTotalAmount: {
    color: DARK,
    fontSize: 20,
    fontWeight: "700",
    marginTop: 6,
  },

  inclusiveText: {
    color: MUTED,
    fontSize: 12,

    marginTop: 2,
  },

  addButton: {
    height: 50,

    minWidth: 150,

    paddingHorizontal: 19,

    borderRadius: 13,

    backgroundColor: PRIMARY,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 10,
  },

  addButtonText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: "700",
  },

  bottomSpace: {
    height: 25,
  },
});