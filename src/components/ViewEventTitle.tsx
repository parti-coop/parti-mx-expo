import React from "react";
import { TextStyle } from "react-native";
import { View } from "./View";
import { Text } from "./Text";
import { formatDateFromString } from "../Utils/CalculateDays";
import { format } from "date-fns";
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
export default function ViewTitle(props: { title: string; date?: string }) {
  const { title, date } = props;
  let deadline = null;
  try {
    deadline = format(new Date(date), "yyyy.MM.dd");
  } catch (error) {}
  return (
    <View style={{ paddingHorizontal: 30, paddingTop: 15 }}>
      <Text style={titleStyle}>{title}</Text>
      <Text style={dateStyle}>{deadline} 까지</Text>
    </View>
  );
}
