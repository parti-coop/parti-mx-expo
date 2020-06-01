import { StyleProp, ViewStyle, TextStyle } from "react-native";
import COLORS from "./Colors";

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
export const mintBg: StyleProp<ViewStyle> = {
  ...(whiteRoundBg as Object),
  shadowRadius: 1,
  shadowColor: "rgba(0, 0, 0, 0.32)",
  backgroundColor: COLORS.MINT,
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
export const flatWhiteBg: StyleProp<ViewStyle> = {
  backgroundColor: "#ffffff",
  marginHorizontal: 30,
  borderRadius: 25,
  // marginBottom: 60,
  marginBottom: 20,
};
