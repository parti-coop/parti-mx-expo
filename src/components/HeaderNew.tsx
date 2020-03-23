import React from "react";
import { Share, Image } from "react-native";
import { View, ViewRow } from "./View";
import { TouchableOpacity } from "./TouchableOpacity";
import { useNavigation } from "@react-navigation/native";
import iconBack from "../../assets/iconBack.png";
import btnWrite from "../../assets/btnWrite.png";
export default (props: { insert: () => void }) => {
  const { goBack } = useNavigation();
  return (
    <ViewRow style={{ justifyContent: "space-between" }}>
      <TouchableOpacity
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-start",
          padding: 30
        }}
        onPress={goBack}
      >
        <Image source={iconBack} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: "flex-end",
          padding: 30
        }}
        onPress={props.insert}
      >
        <Image source={btnWrite} />
      </TouchableOpacity>
    </ViewRow>
  );
};
