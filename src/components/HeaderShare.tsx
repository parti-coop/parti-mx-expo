import React from "react";
import { Share } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Image } from "./Image";
import { ViewRow } from "./View";
import { TouchableOpacity } from "./TouchableOpacity";

import iconBack from "../../assets/iconBack.png";
import btnShare from "../../assets/btnShare.png";

export default (props: { id: number }) => {
  const { goBack } = useNavigation();
  return (
    <ViewRow style={{ justifyContent: "space-between" }}>
      <TouchableOpacity
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-start",
          padding: 30,
        }}
        onPress={goBack}
      >
        <Image source={iconBack} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: "flex-end",
          padding: 30,
        }}
        onPress={(e) => Share.share({ message: "제안을 공유합니다." })}
      >
        <Image source={btnShare} />
      </TouchableOpacity>
    </ViewRow>
  );
};
