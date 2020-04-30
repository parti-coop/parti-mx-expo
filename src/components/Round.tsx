import React from "react";
import { ViewStyle, TouchableOpacityProps } from "react-native";

import { Image } from "./Image";
import { V0 } from "./View";
import { Text } from "./Text";
import { TOCenter } from "./TouchableOpacity";

import iconSearch from "../../assets/iconSearch.png";
export function Round35(
  props: TouchableOpacityProps & {
    padding?: number;
    source?: any;
    style?: ViewStyle;
  }
) {
  const { padding = 30, source = iconSearch, style, ...prop } = props;
  return (
    <TOCenter {...prop} style={{ padding }}>
      <V0
        style={[
          {
            width: 35,
            height: 35,
            borderRadius: 15,
            backgroundColor: "#30ad9f",
          },
          style,
        ]}
      >
        <Image source={source} style={{ tintColor: "white" }} />
      </V0>
    </TOCenter>
  );
}
export function RoundDDays(
  props: TouchableOpacityProps & {
    style?: ViewStyle;
    number?: number;
  }
) {
  const { style, number = 0 } = props;
  return (
    <V0
      style={[
        {
          width: 54,
          height: 54,
          borderRadius: 22.2,
          backgroundColor: "#ffffff",
          borderStyle: "solid",
          borderWidth: 2,
          borderColor: "#30ad9f",
          margin: 15,
          flex: 0,
        },
        style,
      ]}
    >
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "#4a9f95",
          fontFamily: "notosans900",
          lineHeight: 17,
        }}
      >
        D
      </Text>
      <Text
        style={{
          fontSize: 14,
          textAlign: "left",
          color: "#4a9f95",
          fontFamily: "notosans900",
          lineHeight: 15,
        }}
      >
        {number}
      </Text>
    </V0>
  );
}
