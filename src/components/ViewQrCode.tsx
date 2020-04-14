import React from "react";
import { ViewStyle } from "react-native";

import { Image } from "./Image";
import { View } from "./View";

import iconQr from "../../assets/icon-qr.png";

export default (props: { style?: ViewStyle }) => {
  return (
    <View
      style={[
        {
          width: 35,
          height: 35,
          backgroundColor: "#ffa8bf",
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
        },
        props.style,
      ]}
    >
      <Image
        style={{ width: 17, height: 18 }}
        resizeMode="contain"
        source={iconQr}
      />
    </View>
  );
};
