import React from "react";
import { TextStyle } from "react-native";
import { View } from "./View";
import { Text } from "./Text";
const titleStyle = {
  fontSize: 22,
  textAlign: "left",
  color: "#333333"
} as TextStyle;
const dateStyle = {
  fontSize: 14,
  lineHeight: 25,
  textAlign: "left",
  color: "#909090"
} as TextStyle;
export default (props: { title: string; updated_at: string }) => {
  const { title, updated_at } = props;
  const date = new Date(updated_at).toLocaleString();
  return (
    <View style={{ paddingHorizontal: 30, paddingTop: 20 }}>
      <Text style={titleStyle}>{title}</Text>
      <Text style={dateStyle}>{date}</Text>
    </View>
  );
};
