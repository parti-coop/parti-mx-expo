import React from "react";
import { ViewStyle } from "react-native";

import { Image } from "./Image";
import { V0 } from "./View";
import { White11 } from "./Text";

import iconSympathy from "../../assets/iconSympathy.png";

export default (props: { style?: ViewStyle; count?: number }) => {
  const { style = {}, count = 0 } = props;
  return (
    <V0
      style={[
        {
          width: 35,
          height: 35,
          borderRadius: 15,
          backgroundColor: "#f35f5f",
        },
        style,
      ]}
    >
      <Image source={iconSympathy} style={{ tintColor: "white" }} />
      <White11 style={{ textAlign: "center", fontFamily: "notosans700" }}>
        {String(count)}
      </White11>
    </V0>
  );
};
