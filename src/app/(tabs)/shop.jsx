import React, { useMemo, useState } from "react";

import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const PRIMARY = "#08AA92";
const DARK = "#172126";
const MUTED = "#829098";
const BG = "#F3F4F8";
const WHITE = "#FFFFFF";

/* =====================================================
   FILTER OPTIONS
===================================================== */

const categories = [
  "All Electronics Items",
  "Charging Cables",
  "Chargers & Adapters",
  "Power Banks",
  "Neckbands",
];

const brands = [
  "All Brands",
  "Apple",
  "Oppo",
  "Vivo",
  "Samsung",
  "OnePlus",
  "Realme",
  "Xiaomi",
  "boAt",
  "JBL",
  "GOVO",
  "TEMPT",
];

const priceRanges = [
  "All Prices",
  "Under ₹500",
  "₹500 - ₹1000",
  "₹1000 - ₹2000",
  "Above ₹2000",
];

/* =====================================================
   PRODUCTS
===================================================== */

const products = [
  {
    id: "1",
    brand: "GOVO",
    name: "GOKIXX NACKBAND 651",
    category: "Neckbands",
    price: 380,
    oldPrice: 456,
    discount: "17% OFF",
    image: require("../../../assets/images/charging-cables.webp"),
    inStock: true,
  },

  {
    id: "2",
    brand: "GOVO",
    name: "GOKIXX NACKBAND 620",
    category: "Neckbands",
    price: 340,
    oldPrice: 408,
    discount: "17% OFF",
    image: require("../../../assets/images/chargers-adapters.webp"),
    inStock: true,
  },

  {
    id: "3",
    brand: "TEMPT",
    name: "TEMPT BLITZ 100W C TO C CABLE TS-1098",
    category: "Charging Cables",
    price: 267,
    oldPrice: 320.4,
    discount: "17% OFF",
    image: require("../../../assets/images/charging-cables.webp"),
    inStock: true,
  },

  {
    id: "4",
    brand: "Vivo",
    name: "Vivo 6a type c flash cable",
    category: "Charging Cables",
    price: 450,
    oldPrice: 599,
    discount: "",
    image: require("../../../assets/images/charging-cables.webp"),
    inStock: false,
  },
];

/* =====================================================
   SHOP
===================================================== */

export default function Shop() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest First");

  /* =====================================================
     APPLIED FILTERS
  ===================================================== */

  const [stockOnly, setStockOnly] = useState(false);
  const [discountedOnly, setDiscountedOnly] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(
    "All Electronics Items"
  );

  const [selectedBrand, setSelectedBrand] = useState("All Brands");

  const [selectedPriceRange, setSelectedPriceRange] =
    useState("All Prices");

  /* =====================================================
     TEMP FILTERS

     These are used inside the popup.
     They only become active after pressing Apply Filters.
  ===================================================== */

  const [tempCategory, setTempCategory] = useState(
    "All Electronics Items"
  );

  const [tempBrand, setTempBrand] = useState("All Brands");

  const [tempPriceRange, setTempPriceRange] =
    useState("All Prices");

  const [tempStockOnly, setTempStockOnly] = useState(false);

  const [tempDiscountedOnly, setTempDiscountedOnly] =
    useState(false);

  /* =====================================================
     FILTER MODAL
  ===================================================== */

  const [filterVisible, setFilterVisible] = useState(false);

  /* =====================================================
     CHECK WHETHER ANY FILTER IS ACTIVE
  ===================================================== */

  const hasActiveFilters =
    stockOnly ||
    discountedOnly ||
    selectedCategory !== "All Electronics Items" ||
    selectedBrand !== "All Brands" ||
    selectedPriceRange !== "All Prices";

  /* =====================================================
     OPEN FILTER SHEET
  ===================================================== */

  const openFilterSheet = () => {
    /*
      Copy currently applied filters into temporary state.
      This allows the user to change options without
      immediately changing the product list.
    */

    setTempCategory(selectedCategory);
    setTempBrand(selectedBrand);
    setTempPriceRange(selectedPriceRange);
    setTempStockOnly(stockOnly);
    setTempDiscountedOnly(discountedOnly);

    setFilterVisible(true);
  };

  /* =====================================================
     CLOSE FILTER SHEET
  ===================================================== */

  const closeFilterSheet = () => {
    setFilterVisible(false);
  };

  /* =====================================================
     APPLY FILTERS
  ===================================================== */

  const applyFilters = () => {
    setSelectedCategory(tempCategory);
    setSelectedBrand(tempBrand);
    setSelectedPriceRange(tempPriceRange);
    setStockOnly(tempStockOnly);
    setDiscountedOnly(tempDiscountedOnly);

    setFilterVisible(false);
  };

  /* =====================================================
     RESET FILTERS
  ===================================================== */

  const resetFilters = () => {
    setTempCategory("All Electronics Items");
    setTempBrand("All Brands");
    setTempPriceRange("All Prices");
    setTempStockOnly(false);
    setTempDiscountedOnly(false);

    setSelectedCategory("All Electronics Items");
    setSelectedBrand("All Brands");
    setSelectedPriceRange("All Prices");
    setStockOnly(false);
    setDiscountedOnly(false);
  };

  /* =====================================================
     FILTER PRODUCTS
  ===================================================== */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /* =================================================
       SEARCH
    ================================================= */

    if (search.trim()) {
      const value = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(value) ||
          product.brand.toLowerCase().includes(value) ||
          product.category.toLowerCase().includes(value)
      );
    }

    /* =================================================
       CATEGORY
    ================================================= */

    if (selectedCategory !== "All Electronics Items") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    /* =================================================
       BRAND
    ================================================= */

    if (selectedBrand !== "All Brands") {
      result = result.filter(
        (product) =>
          product.brand.toLowerCase() ===
          selectedBrand.toLowerCase()
      );
    }

    /* =================================================
       PRICE RANGE
    ================================================= */

    if (selectedPriceRange === "Under ₹500") {
      result = result.filter((product) => product.price < 500);
    }

    if (selectedPriceRange === "₹500 - ₹1000") {
      result = result.filter(
        (product) =>
          product.price >= 500 &&
          product.price <= 1000
      );
    }

    if (selectedPriceRange === "₹1000 - ₹2000") {
      result = result.filter(
        (product) =>
          product.price > 1000 &&
          product.price <= 2000
      );
    }

    if (selectedPriceRange === "Above ₹2000") {
      result = result.filter((product) => product.price > 2000);
    }

    /* =================================================
       STOCK
    ================================================= */

    if (stockOnly) {
      result = result.filter((product) => product.inStock);
    }

    /* =================================================
       DISCOUNT
    ================================================= */

    if (discountedOnly) {
      result = result.filter(
        (product) => product.discount
      );
    }

    /* =================================================
       SORT
    ================================================= */

    if (sort === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "Name: A to Z") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sort === "Name: Z to A") {
      result.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    return result;
  }, [
    search,
    sort,
    stockOnly,
    discountedOnly,
    selectedCategory,
    selectedBrand,
    selectedPriceRange,
  ]);

  /* =====================================================
     SORT
  ===================================================== */

  const changeSort = () => {
    const options = [
      "Newest First",
      "Price: Low to High",
      "Price: High to Low",
      "Name: A to Z",
      "Name: Z to A",
    ];

    const currentIndex = options.indexOf(sort);

    const nextIndex =
      (currentIndex + 1) % options.length;

    setSort(options[nextIndex]);
  };

  /* =====================================================
     QUICK STOCK FILTER
  ===================================================== */

  const toggleStockQuickFilter = () => {
    setStockOnly((previousValue) => !previousValue);
  };

  /* =====================================================
     QUICK DISCOUNT FILTER
  ===================================================== */

  const toggleDiscountQuickFilter = () => {
    setDiscountedOnly((previousValue) => !previousValue);
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top"]}
    >
      <View style={styles.container}>

        {/* =====================================================
            TOP AREA
        ===================================================== */}

        <View style={styles.topArea}>

          {/* TOP ROW */}

          <View style={styles.topRow}>

            {/* BACK */}

            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons
                name="arrow-back"
                size={25}
                color={DARK}
              />
            </Pressable>

            {/* TITLE */}

            <View style={styles.titleArea}>
              <Text style={styles.title}>
                All Products
              </Text>

              <Text style={styles.subtitle}>
                130 items found
              </Text>
            </View>

            {/* CART */}

            <Pressable
              style={styles.cartButton}
              onPress={() => router.push("/cart")}
            >
              <Ionicons
                name="cart-outline"
                size={27}
                color={PRIMARY}
              />

              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  1
                </Text>
              </View>
            </Pressable>

          </View>

          {/* =====================================================
              SEARCH
          ===================================================== */}

          <View style={styles.searchRow}>

            {/* SEARCH BOX */}

            <View style={styles.searchBox}>

              <Ionicons
                name="search-outline"
                size={22}
                color={MUTED}
              />

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search cables, chargers, cases..."
                placeholderTextColor={MUTED}
                style={styles.searchInput}
              />

            </View>

            {/* FILTER ICON */}

            <Pressable
              style={[
                styles.filterIconButton,
                hasActiveFilters &&
                  styles.filterIconButtonActive,
              ]}
              onPress={openFilterSheet}
            >
              <Ionicons
                name="options-outline"
                size={25}
                color={WHITE}
              />
            </Pressable>

          </View>

          {/* =====================================================
              FILTER CHIPS
          ===================================================== */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >

            {/* SORT */}

            <Pressable
              style={styles.sortButton}
              onPress={changeSort}
            >
              <Text style={styles.sortText}>
                {sort}
              </Text>

              <Ionicons
                name="chevron-down"
                size={17}
                color={PRIMARY}
              />
            </Pressable>

            {/* FILTER */}

            <Pressable
              style={[
                styles.filterButton,
                hasActiveFilters &&
                  styles.activeFilter,
              ]}
              onPress={openFilterSheet}
            >
              <Ionicons
                name="funnel-outline"
                size={18}
                color={
                  hasActiveFilters
                    ? WHITE
                    : PRIMARY
                }
              />

              <Text
                style={[
                  styles.filterText,
                  hasActiveFilters &&
                    styles.activeFilterText,
                ]}
              >
                Filter
              </Text>
            </Pressable>

            {/* IN STOCK */}

            <Pressable
              style={[
                styles.stockButton,
                stockOnly && styles.activeStock,
              ]}
              onPress={toggleStockQuickFilter}
            >
              <Text
                style={[
                  styles.stockText,
                  stockOnly &&
                    styles.activeStockText,
                ]}
              >
                In Stock
              </Text>
            </Pressable>

            {/* ON SALE */}

            <Pressable
              style={[
                styles.extraFilter,
                discountedOnly &&
                  styles.activeSaleFilter,
              ]}
              onPress={toggleDiscountQuickFilter}
            >
              <Text
                style={[
                  styles.extraFilterText,
                  discountedOnly &&
                    styles.activeSaleText,
                ]}
              >
                On Sale
              </Text>
            </Pressable>

          </ScrollView>

        </View>

        {/* =====================================================
            PRODUCTS
        ===================================================== */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productContainer}
        >

          {filteredProducts.length > 0 ? (
            <View style={styles.grid}>

              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </View>
          ) : (
            <View style={styles.emptyState}>

              <Ionicons
                name="search-outline"
                size={45}
                color={MUTED}
              />

              <Text style={styles.emptyTitle}>
                No Products Found
              </Text>

              <Text style={styles.emptyText}>
                Try changing your filters or search.
              </Text>

            </View>
          )}

        </ScrollView>

        {/* =====================================================
            CART SUMMARY
        ===================================================== */}

        <View style={styles.cartSummary}>

          <View style={styles.cartSummaryLeft}>

            <View style={styles.summaryCartIcon}>

              <Ionicons
                name="bag-handle-outline"
                size={24}
                color={PRIMARY}
              />

              <View style={styles.summaryBadge}>
                <Text style={styles.summaryBadgeText}>
                  1
                </Text>
              </View>

            </View>

            <View>

              <Text style={styles.totalLabel}>
                Total Amount
              </Text>

              <Text style={styles.totalAmount}>
                ₹267
              </Text>

            </View>

          </View>

          <Pressable
            style={styles.viewCartButton}
            onPress={() => router.push("/cart")}
          >
            <Text style={styles.viewCartText}>
              View Cart
            </Text>

            <Ionicons
              name="arrow-forward"
              size={20}
              color={WHITE}
            />
          </Pressable>

        </View>

        {/* =====================================================
            FILTER BOTTOM SHEET
        ===================================================== */}

        <Modal
          visible={filterVisible}
          transparent
          animationType="slide"
          onRequestClose={closeFilterSheet}
        >

          <View style={styles.modalOverlay}>

            {/* BACKDROP */}

            <Pressable
              style={styles.modalBackdrop}
              onPress={closeFilterSheet}
            />

            {/* BOTTOM SHEET */}

            <View style={styles.filterSheet}>

              {/* HANDLE */}

              <View style={styles.sheetHandle} />

              {/* HEADER */}

              <View style={styles.sheetHeader}>

                <View>
                  <Text style={styles.sheetTitle}>
                    Filter Products
                  </Text>

                  <Text style={styles.sheetSubtitle}>
                    Choose your preferences
                  </Text>
                </View>

                <Pressable
                  style={styles.closeButton}
                  onPress={closeFilterSheet}
                >
                  <Ionicons
                    name="close"
                    size={24}
                    color={DARK}
                  />
                </Pressable>

              </View>

              {/* FILTER CONTENT */}

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                  styles.sheetContent
                }
              >

                {/* =================================================
                    CATEGORIES
                ================================================= */}

                <View style={styles.filterSection}>

                  <Text style={styles.sectionTitle}>
                    Categories
                  </Text>

                  <View style={styles.optionsWrap}>

                    {categories.map((category) => {
                      const active =
                        tempCategory === category;

                      return (
                        <Pressable
                          key={category}
                          style={[
                            styles.optionChip,
                            active &&
                              styles.optionChipActive,
                          ]}
                          onPress={() =>
                            setTempCategory(category)
                          }
                        >

                          {active && (
                            <Ionicons
                              name="checkmark"
                              size={16}
                              color={WHITE}
                            />
                          )}

                          <Text
                            style={[
                              styles.optionText,
                              active &&
                                styles.optionTextActive,
                            ]}
                          >
                            {category}
                          </Text>

                        </Pressable>
                      );
                    })}

                  </View>

                </View>

                {/* =================================================
                    BRANDS
                ================================================= */}

                <View style={styles.filterSection}>

                  <Text style={styles.sectionTitle}>
                    Brands
                  </Text>

                  <View style={styles.optionsWrap}>

                    {brands.map((brand) => {
                      const active =
                        tempBrand === brand;

                      return (
                        <Pressable
                          key={brand}
                          style={[
                            styles.optionChip,
                            active &&
                              styles.optionChipActive,
                          ]}
                          onPress={() =>
                            setTempBrand(brand)
                          }
                        >

                          {active && (
                            <Ionicons
                              name="checkmark"
                              size={16}
                              color={WHITE}
                            />
                          )}

                          <Text
                            style={[
                              styles.optionText,
                              active &&
                                styles.optionTextActive,
                            ]}
                          >
                            {brand}
                          </Text>

                        </Pressable>
                      );
                    })}

                  </View>

                </View>

                {/* =================================================
                    PRICE RANGE
                ================================================= */}

                <View style={styles.filterSection}>

                  <Text style={styles.sectionTitle}>
                    Price Range
                  </Text>

                  <View style={styles.optionsWrap}>

                    {priceRanges.map((range) => {
                      const active =
                        tempPriceRange === range;

                      return (
                        <Pressable
                          key={range}
                          style={[
                            styles.optionChip,
                            active &&
                              styles.optionChipActive,
                          ]}
                          onPress={() =>
                            setTempPriceRange(range)
                          }
                        >

                          {active && (
                            <Ionicons
                              name="checkmark"
                              size={16}
                              color={WHITE}
                            />
                          )}

                          <Text
                            style={[
                              styles.optionText,
                              active &&
                                styles.optionTextActive,
                            ]}
                          >
                            {range}
                          </Text>

                        </Pressable>
                      );
                    })}

                  </View>

                </View>

                {/* =================================================
                    AVAILABILITY
                ================================================= */}

                <View style={styles.filterSection}>

                  <Text style={styles.sectionTitle}>
                    Availability
                  </Text>

                  {/* IN STOCK */}

                  <Pressable
                    style={[
                      styles.availabilityOption,
                      tempStockOnly &&
                        styles.availabilityOptionActive,
                    ]}
                    onPress={() =>
                      setTempStockOnly(
                        (previousValue) =>
                          !previousValue
                      )
                    }
                  >

                    <View
                      style={
                        styles.availabilityLeft
                      }
                    >

                      <View
                        style={[
                          styles.availabilityIcon,
                          tempStockOnly &&
                            styles.availabilityIconActive,
                        ]}
                      >
                        <Ionicons
                          name="cube-outline"
                          size={20}
                          color={
                            tempStockOnly
                              ? WHITE
                              : PRIMARY
                          }
                        />
                      </View>

                      <View>
                        <Text
                          style={
                            styles.availabilityTitle
                          }
                        >
                          In Stock Only
                        </Text>

                        <Text
                          style={
                            styles.availabilitySubtitle
                          }
                        >
                          Show products currently available
                        </Text>
                      </View>

                    </View>

                    <View
                      style={[
                        styles.checkCircle,
                        tempStockOnly &&
                          styles.checkCircleActive,
                      ]}
                    >
                      {tempStockOnly && (
                        <Ionicons
                          name="checkmark"
                          size={15}
                          color={WHITE}
                        />
                      )}
                    </View>

                  </Pressable>

                  {/* DISCOUNTED */}

                  <Pressable
                    style={[
                      styles.availabilityOption,
                      tempDiscountedOnly &&
                        styles.availabilityOptionActive,
                    ]}
                    onPress={() =>
                      setTempDiscountedOnly(
                        (previousValue) =>
                          !previousValue
                      )
                    }
                  >

                    <View
                      style={
                        styles.availabilityLeft
                      }
                    >

                      <View
                        style={[
                          styles.availabilityIcon,
                          tempDiscountedOnly &&
                            styles.availabilityIconActive,
                        ]}
                      >
                        <Ionicons
                          name="pricetag-outline"
                          size={20}
                          color={
                            tempDiscountedOnly
                              ? WHITE
                              : PRIMARY
                          }
                        />
                      </View>

                      <View>
                        <Text
                          style={
                            styles.availabilityTitle
                          }
                        >
                          Discounted Only
                        </Text>

                        <Text
                          style={
                            styles.availabilitySubtitle
                          }
                        >
                          Show products currently on sale
                        </Text>
                      </View>

                    </View>

                    <View
                      style={[
                        styles.checkCircle,
                        tempDiscountedOnly &&
                          styles.checkCircleActive,
                      ]}
                    >
                      {tempDiscountedOnly && (
                        <Ionicons
                          name="checkmark"
                          size={15}
                          color={WHITE}
                        />
                      )}
                    </View>

                  </Pressable>

                </View>

              </ScrollView>

              {/* =================================================
                  BOTTOM ACTIONS
              ================================================= */}

              <View style={styles.sheetActions}>

                {/* RESET */}

                <Pressable
                  style={styles.resetButton}
                  onPress={resetFilters}
                >
                  <Text style={styles.resetText}>
                    Reset
                  </Text>
                </Pressable>

                {/* APPLY */}

                <Pressable
                  style={styles.applyButton}
                  onPress={applyFilters}
                >
                  <Text style={styles.applyText}>
                    Apply Filters
                  </Text>

                  <Ionicons
                    name="checkmark"
                    size={20}
                    color={WHITE}
                  />
                </Pressable>

              </View>

            </View>

          </View>

        </Modal>

      </View>
    </SafeAreaView>
  );
}

/* =====================================================
   PRODUCT CARD
===================================================== */

function ProductCard({ product }) {
  return (
    <Pressable
      style={styles.productCard}
      onPress={() => {
        // Product details route will be connected later.
      }}
    >

      {/* DISCOUNT */}

      {product.discount ? (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {product.discount}
          </Text>
        </View>
      ) : null}

      {/* WISHLIST */}

      <Pressable
        style={styles.wishlistButton}
        onPress={(event) =>
          event.stopPropagation()
        }
      >
        <Ionicons
          name="heart-outline"
          size={22}
          color="#829098"
        />
      </Pressable>

      {/* IMAGE */}

      <View style={styles.imageContainer}>

        <Image
          source={product.image}
          style={styles.productImage}
          resizeMode="cover"
        />

      </View>

      {/* DOTS */}

      <View style={styles.dots}>

        <View style={styles.activeDot} />

        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />

      </View>

      {/* BRAND */}

      <Text style={styles.brand}>
        {product.brand}
      </Text>

      {/* PRODUCT NAME */}

      <Text
        style={styles.productName}
        numberOfLines={2}
      >
        {product.name}
      </Text>

      {/* PRICE */}

      <View style={styles.priceRow}>

        <Text style={styles.price}>
          ₹{product.price}
        </Text>

        <Text style={styles.oldPrice}>
          ₹{product.oldPrice}
        </Text>

      </View>

      {/* ADD / OUT OF STOCK */}

      {product.inStock ? (
        <Pressable style={styles.addButton}>

          <Ionicons
            name="cart-outline"
            size={17}
            color={WHITE}
          />

          <Text style={styles.addText}>
            Add
          </Text>

        </Pressable>
      ) : (
        <View style={styles.outOfStock}>

          <Text style={styles.outOfStockText}>
            Out of Stock
          </Text>

        </View>
      )}

    </Pressable>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({

  /* =====================================================
     MAIN
  ===================================================== */

  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },

  container: {
    flex: 1,
    backgroundColor: BG,
  },

  /* =====================================================
     TOP
  ===================================================== */

  topArea: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 0,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },

  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  titleArea: {
    flex: 1,
    marginLeft: 13,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: DARK,
  },

  subtitle: {
    fontSize: 13,
    color: MUTED,
    marginTop: 1,
  },

  cartButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  cartBadge: {
    position: "absolute",
    right: 3,
    top: 1,
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },

  cartBadgeText: {
    color: WHITE,
    fontSize: 10,
    fontWeight: "700",
  },

  /* =====================================================
     SEARCH
  ===================================================== */

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  searchBox: {
    flex: 1,
    height: 50,
    backgroundColor: WHITE,
    borderRadius: 15,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 5,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginLeft: 11,
    fontSize: 15,
    color: DARK,
  },

  filterIconButton: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },

  filterIconButtonActive: {
    backgroundColor: "#078F7D",
  },

  /* =====================================================
     FILTER CHIPS
  ===================================================== */

  filterRow: {
    paddingVertical: 13,
    gap: 9,
  },

  sortButton: {
    height: 48,
    paddingHorizontal: 17,
    borderRadius: 24,
    backgroundColor: WHITE,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },

  sortText: {
    fontSize: 14,
    color: DARK,
  },

  filterButton: {
    height: 48,
    paddingHorizontal: 15,
    borderRadius: 24,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: "#E4E8EA",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  activeFilter: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },

  filterText: {
    fontSize: 14,
    color: PRIMARY,
  },

  activeFilterText: {
    color: WHITE,
  },

  stockButton: {
    height: 48,
    paddingHorizontal: 19,
    borderRadius: 24,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: "#E4E8EA",
    justifyContent: "center",
  },

  activeStock: {
    backgroundColor: "#E3F7F3",
    borderColor: PRIMARY,
  },

  stockText: {
    fontSize: 14,
    color: DARK,
  },

  activeStockText: {
    color: PRIMARY,
    fontWeight: "600",
  },

  extraFilter: {
    height: 48,
    paddingHorizontal: 15,
    borderRadius: 24,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: "#E4E8EA",
    justifyContent: "center",
  },

  activeSaleFilter: {
    backgroundColor: "#E3F7F3",
    borderColor: PRIMARY,
  },

  extraFilterText: {
    fontSize: 14,
    color: DARK,
  },

  activeSaleText: {
    color: PRIMARY,
    fontWeight: "600",
  },

  /* =====================================================
     PRODUCTS
  ===================================================== */

  productContainer: {
    paddingHorizontal: 10,
    paddingBottom: 110,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  productCard: {
    width: "49%",
    minHeight: 365,
    backgroundColor: WHITE,
    borderRadius: 17,
    padding: 12,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,

    position: "relative",
    marginBottom: 10,
  },

  discountBadge: {
    position: "absolute",
    left: 17,
    top: 16,
    zIndex: 5,
    backgroundColor: PRIMARY,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 8,
  },

  discountText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: "700",
  },

  wishlistButton: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 5,

    width: 39,
    height: 39,
    borderRadius: 20,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.09,
    shadowRadius: 4,
    elevation: 3,
  },

  imageContainer: {
    width: "100%",
    height: 185,
    borderRadius: 9,
    overflow: "hidden",
    backgroundColor: "#EEEEEE",
  },

  productImage: {
    width: "100%",
    height: "100%",
  },

  dots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 13,
    marginBottom: 8,
    paddingLeft: 5,
  },

  activeDot: {
    width: 19,
    height: 6,
    borderRadius: 3,
    backgroundColor: PRIMARY,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D9E0E3",
  },

  brand: {
    fontSize: 13,
    color: MUTED,
    marginBottom: 7,
  },

  productName: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
    color: DARK,
    minHeight: 40,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 7,
  },

  price: {
    color: PRIMARY,
    fontSize: 18,
    fontWeight: "700",
  },

  oldPrice: {
    color: "#9BA4A8",
    fontSize: 12,
    textDecorationLine: "line-through",
  },

  addButton: {
    position: "absolute",
    right: 10,
    bottom: 10,

    backgroundColor: PRIMARY,
    height: 38,
    paddingHorizontal: 12,
    borderRadius: 10,

    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  addText: {
    color: WHITE,
    fontSize: 13,
    fontWeight: "600",
  },

  outOfStock: {
    position: "absolute",
    right: 10,
    bottom: 10,

    backgroundColor: "#FCECEC",
    paddingHorizontal: 9,
    paddingVertical: 9,
    borderRadius: 9,
  },

  outOfStockText: {
    color: "#D75B5B",
    fontSize: 11,
    fontWeight: "600",
  },

  /* =====================================================
     EMPTY STATE
  ===================================================== */

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 90,
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: DARK,
    marginTop: 14,
  },

  emptyText: {
    fontSize: 14,
    color: MUTED,
    marginTop: 6,
    textAlign: "center",
  },

  /* =====================================================
     CART SUMMARY
  ===================================================== */

  cartSummary: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,

    height: 70,
    backgroundColor: WHITE,

    borderTopWidth: 1,
    borderTopColor: "#E7EBEC",

    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cartSummaryLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  summaryCartIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  summaryBadge: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },

  summaryBadgeText: {
    color: WHITE,
    fontSize: 10,
    fontWeight: "700",
  },

  totalLabel: {
    fontSize: 12,
    color: MUTED,
  },

  totalAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: DARK,
    marginTop: 2,
  },

  viewCartButton: {
    height: 42,
    paddingHorizontal: 21,
    borderRadius: 12,
    backgroundColor: PRIMARY,

    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  viewCartText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: "700",
  },

  /* =====================================================
     FILTER MODAL
  ===================================================== */

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },

  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  filterSheet: {
    height: "75%",
    backgroundColor: WHITE,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: "hidden",
  },

  sheetHandle: {
    width: 45,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D5DCDD",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 3,
  },

  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF0F1",
  },

  sheetTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: DARK,
  },

  sheetSubtitle: {
    fontSize: 13,
    color: MUTED,
    marginTop: 3,
  },

  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F3F5F5",
    alignItems: "center",
    justifyContent: "center",
  },

  sheetContent: {
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 25,
  },

  /* =====================================================
     FILTER SECTIONS
  ===================================================== */

  filterSection: {
    paddingTop: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: DARK,
    marginBottom: 11,
  },

  optionsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },

  optionChip: {
    minHeight: 42,
    paddingHorizontal: 14,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#E1E6E7",
    backgroundColor: WHITE,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },

  optionChipActive: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },

  optionText: {
    fontSize: 13,
    color: DARK,
    fontWeight: "500",
  },

  optionTextActive: {
    color: WHITE,
    fontWeight: "600",
  },

  /* =====================================================
     AVAILABILITY
  ===================================================== */

  availabilityOption: {
    minHeight: 70,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E4E8EA",
    backgroundColor: WHITE,

    paddingHorizontal: 13,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 10,
  },

  availabilityOptionActive: {
    borderColor: PRIMARY,
    backgroundColor: "#F0FBF9",
  },

  availabilityLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  availabilityIcon: {
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: "#E8F8F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  availabilityIconActive: {
    backgroundColor: PRIMARY,
  },

  availabilityTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: DARK,
  },

  availabilitySubtitle: {
    fontSize: 12,
    color: MUTED,
    marginTop: 3,
  },

  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#CBD2D5",
    alignItems: "center",
    justifyContent: "center",
  },

  checkCircleActive: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },

  /* =====================================================
     SHEET ACTIONS
  ===================================================== */

  sheetActions: {
    flexDirection: "row",
    gap: 10,

    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,

    borderTopWidth: 1,
    borderTopColor: "#E8ECED",
    backgroundColor: WHITE,
  },

  resetButton: {
    flex: 0.8,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDE3E5",
    backgroundColor: WHITE,

    alignItems: "center",
    justifyContent: "center",
  },

  resetText: {
    fontSize: 15,
    fontWeight: "700",
    color: DARK,
  },

  applyButton: {
    flex: 1.7,
    height: 52,
    borderRadius: 14,
    backgroundColor: PRIMARY,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  applyText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: "700",
  },
});