import React from "react";
import { ViewStyle } from "react-native";

import { Image } from "./Image";
import { View } from "./View";

import iconInvite from "../../assets/iconInvite.png";
export default (props: { style?: ViewStyle }) => {
  return (
    <View
      style={[
        {
          width: 35,
          height: 35,
          backgroundColor: "#fdbf19",
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
        source={iconInvite}
      />
    </View>
  );
};
