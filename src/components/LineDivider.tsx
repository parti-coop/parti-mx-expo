import React from "react";
import { View } from "./View";
export const LineSeperator = () => {
  return (
    <View
      style={{
        borderTopColor: "#e4e4e4",
        borderTopWidth: 1,
        marginHorizontal: 30
      }}
    />
  );
};
export const LineSeperatorFull = () => {
  return (
    <View
      style={{
        borderTopColor: "#e4e4e4",
        borderTopWidth: 1
      }}
    />
  );
};
export const SmallVerticalDivider = () => {
  return (
    <View
      style={{
        width: 1,
        height: 11,
        backgroundColor: "#dedede",
        marginHorizontal: 4
      }}
    />
  );
};
