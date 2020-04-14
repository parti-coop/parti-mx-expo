import React from "react";
import { ViewStyle } from "react-native";

import { Image } from "./Image";
import { View } from "./View";
import iconNotification from "../../assets/iconNotification.png";
export default (props: { style?: ViewStyle }) => {
  return (
    <View
      style={[
        {
          width: 35,
          height: 35,
          backgroundColor: "#30ad9f",
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 8,
          marginRight: 12,
        },
        props.style,
      ]}
    >
      <Image
        style={{ width: 17, height: 18 }}
        resizeMode="contain"
        source={iconNotification}
      />
    </View>
  );
};
