import React from "react";
import { Image } from "react-native";
import { ViewRow } from "./View";
import { TouchableOpacity } from "./TouchableOpacity";
import { useNavigation } from "@react-navigation/native";
import iconBack from "../../assets/iconBack.png";
export default (props: { board?: any }) => {
  const { navigate } = useNavigation();
  return (
    <ViewRow>
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
    </ViewRow>
  );
};
