import React from "react";
import { View } from "./View";
import { Image } from "./Image";
import appIcon from "../../assets/appIcon.png";
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
      <Image
        source={appIcon}
        style={{ width: 35, height: 35, borderRadius: 20 }}
        resizeMode="contain"
      />
    </View>
  );
}
