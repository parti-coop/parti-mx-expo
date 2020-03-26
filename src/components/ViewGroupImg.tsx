import React from "react";
import { ScrollView, Image } from "react-native";
import { View, ViewRow } from "./View";
import iconGroupImg from "../../assets/icon-group-img.png";
import iconGroup from "../../assets/icon-group.png";
export default (props: { color?: boolean }) => {
  const { color = true } = props;
  return (
    <View
      style={{
        width: 35,
        height: 35,
        backgroundColor: "#30ad9f",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Image
        source={color ? iconGroup : iconGroupImg}
        style={{ width: 17, height: 18 }}
        resizeMode="contain"
      />
    </View>
  );
};
