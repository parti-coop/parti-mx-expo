import React from "react";
import { ViewStyle, TouchableOpacityProps } from "react-native";

import { Image } from "./Image";
import { V0 } from "./View";
import { Text } from "./Text";
import { TO0 } from "./TouchableOpacity";

import iconClosed from "../../assets/iconClosed.png";
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
    <TO0 {...prop} style={{ padding }}>
      <V0
        style={[
          {
            width: 35,
            height: 35,
            borderRadius: 15,
            backgroundColor: "#12BD8E",
          },
          style,
        ]}
      >
        <Image source={source} style={{ tintColor: "white" }} />
      </V0>
    </TO0>
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
          borderColor: "#12BD8E",
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
export function RoundMonthDate(
  props: TouchableOpacityProps & {
    style?: ViewStyle;
    value?: string;
  }
) {
  const { style, value = "0" } = props;
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
          borderColor: "#12BD8E",
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
        ~
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
        {value}
      </Text>
    </V0>
  );
}
export function RoundClear(
  props: TouchableOpacityProps & {
    style?: ViewStyle;
  }
) {
  const { style } = props;
  return (
    <TO0
      {...props}
      style={[
        {
          width: 30,
          height: 30,
          borderRadius: 10,
          backgroundColor: "#12BD8E",
        },
        style,
      ]}
    >
      <Image source={iconClosed} style={{ tintColor: "white" }} />
    </TO0>
  );
}
