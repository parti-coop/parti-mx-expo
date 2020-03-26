import React from "react";
import { ScrollView, Image, StyleProp, ViewStyle } from "react-native";
import { View, ViewRow } from "./View";
import { Text } from "./Text";
import iconGroupImg from "../../assets/icon-group-img.png";
import iconGroup from "../../assets/icon-group.png";
export default (props: { style?: StyleProp<ViewStyle> }) => {
  return (
    <View
      style={{
        width: 28,
        height: 21,
        borderRadius: 10.5,
        backgroundColor: "#ff4848",
        alignItems: "center",
        justifyContent: "center",
        ...(props.style as Object)
      }}
    >
      <Text
        style={{
          fontSize: 13,
          textAlign: "center",
          color: "#ffffff"
        }}
      >
        N
      </Text>
    </View>
  );
};
