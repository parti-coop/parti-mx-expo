import React from "react";
import { TextStyle } from "react-native";
import { View } from "./View";
import { Text } from "./Text";
import { formatDateFromString } from "../Utils/CalculateDays";
const titleStyle = {
  fontSize: 22,
  textAlign: "left",
  color: "#333333",
} as TextStyle;
const dateStyle = {
  fontSize: 14,
  lineHeight: 25,
  textAlign: "left",
  color: "#909090",
  fontFamily: "notosans700",
} as TextStyle;
export default function ViewTitle(props: {
  title: string;
  updated_at?: string;
}) {
  const { title, updated_at = null } = props;
  const date = formatDateFromString(updated_at);
  return (
    <View style={{ paddingHorizontal: 30, paddingTop: 15 }}>
      <Text style={titleStyle}>{title}</Text>
      {!!updated_at && <Text style={dateStyle}>{date}</Text>}
    </View>
  );
}
