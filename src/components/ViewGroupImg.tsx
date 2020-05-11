import React from "react";
import { View } from "./View";
import { Image } from "./Image";
import iconGroup from "../../assets/iconGroup.png";
export default function ViewGroupImg() {
  return (
    <View
      style={{
        width: 35,
        height: 35,
        backgroundColor: "#12BD8E",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Image source={iconGroup} resizeMode="contain" />
    </View>
  );
}
