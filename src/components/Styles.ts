import { StyleProp, ViewStyle, TextStyle } from "react-native";
export const whiteRoundBg: StyleProp<ViewStyle> = {
  borderRadius: 25,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.15)",
  elevation: 1,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowRadius: 1,
  shadowOpacity: 1,
};
export const bgStyle: StyleProp<ViewStyle> = {
  ...whiteRoundBg,
  alignItems: "stretch",
  paddingVertical: 10,
};

export const textStyle: StyleProp<TextStyle> = {
  fontSize: 16,
  textAlign: "left",
  color: "#555555",
  paddingHorizontal: 0,
  flex: 1,
};
