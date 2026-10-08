import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Screen({
  children,
  background = "#F3F4F8",
  statusBar = "light",
  style,
}) {
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: background,
        },
        style,
      ]}
    >
      <StatusBar style={statusBar} />
      {children}
    </View>
  );
}