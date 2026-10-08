import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const PRIMARY = "#08AA92";
const INACTIVE = "#829098";
const WHITE = "#FFFFFF";

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const focused = state.index === index;

          let iconName;

          if (route.name === "home") {
            iconName = focused
              ? "home"
              : "home-outline";
          }

          if (route.name === "shop") {
            iconName = focused
              ? "grid"
              : "grid-outline";
          }

          if (route.name === "account") {
            iconName = focused
              ? "person"
              : "person-outline";
          }

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={styles.tab}
              android_ripple={null}
              pressRetentionOffset={0}
            >
              <View
                style={[
                  styles.tabButton,
                  focused && styles.activeTabButton,
                ]}
              >
                <Ionicons
                  name={iconName}
                  size={24}
                  color={focused ? PRIMARY : INACTIVE}
                />

                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: focused
                        ? PRIMARY
                        : INACTIVE,
                    },
                  ]}
                >
                  {label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => (
        <CustomTabBar {...props} />
      )}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  
  safeArea: {
    flex: 1,
    backgroundColor: "#08AA92",
  },
  
  tabBarContainer: {
    backgroundColor: WHITE,
  },

  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    paddingHorizontal: 18,
    paddingVertical: 8,

    backgroundColor: WHITE,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  tabButton: {
    width: 92,
    height: 58,

    borderRadius: 22,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "transparent",
  },

  activeTabButton: {
    backgroundColor: "rgba(8, 170, 146, 0.13)",
    borderRadius: 22,
  },

  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
});