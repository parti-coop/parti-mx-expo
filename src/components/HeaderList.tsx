import React from "react";
import { Share, Image } from "react-native";
import { View, ViewRow } from "./View";
import { TouchableOpacity } from "./TouchableOpacity";
import { useNavigation } from "@react-navigation/native";
import iconBack from "../../assets/iconBack.png";
import iconSearch from "../../assets/iconSearch.png";
export default (props: { board?: any }) => {
  const { navigate } = useNavigation();
  return (
    <ViewRow style={{ justifyContent: "space-between" }}>
      <TouchableOpacity
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-start",
          padding: 30
        }}
        onPress={() => navigate("Home")}
      >
        <Image source={iconBack} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: "flex-end",
          padding: 30
        }}
        onPress={e => Share.share({ message: "제안을 공유합니다." })}
      >
        <Image source={iconSearch} />
      </TouchableOpacity>
    </ViewRow>
  );
};