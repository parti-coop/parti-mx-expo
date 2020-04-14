import React from "react";
import { ViewStyle } from "react-native";

import { View } from "./View";
export const LineSeperator = (props: { style?: ViewStyle }) => {
  return (
    <View
      style={[
        {
          borderTopColor: "#e4e4e4",
          borderTopWidth: 1,
          marginHorizontal: 30,
        },
        props.style,
      ]}
    />
  );
};
export const LineSeperatorFull = (props: { style?: ViewStyle }) => {
  return (
    <View
      style={[
        {
          borderTopColor: "#e4e4e4",
          borderTopWidth: 1,
        },
        props.style,
      ]}
    />
  );
};
export const SmallVerticalDivider = (props: { style?: ViewStyle }) => {
  return (
    <View
      style={[
        {
          width: 1,
          height: 11,
          backgroundColor: "#dedede",
          marginHorizontal: 4,
        },
        props.style,
      ]}
    />
  );
};
