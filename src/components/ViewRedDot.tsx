import React from "react";
import { ViewStyle } from "react-native";

import { View } from "./View";

export default (props: { style?: ViewStyle }) => {
  return (
    <View
      style={[
        props.style,
        {
          width: 8,
          height: 8,
          backgroundColor: "#ff4848",
          borderRadius: 4,
        },
      ]}
    />
  );
};
