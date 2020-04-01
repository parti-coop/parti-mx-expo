import React from "react";
import { Image } from "react-native";
import { ViewRow } from "./View";
import { TouchableOpacity } from "./TouchableOpacity";
import { useNavigation } from "@react-navigation/native";
import iconBack from "../../assets/iconBack.png";
export default (props: { board?: any }) => {
  const { navigate, goBack } = useNavigation();
  function backHandler() {
    try {
      goBack();
    } catch (error) {
      navigate("Home");
    }
  }
  return (
    <ViewRow>
      <TouchableOpacity
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-start",
          padding: 30
        }}
        onPress={backHandler}
      >
        <Image source={iconBack} />
      </TouchableOpacity>
    </ViewRow>
  );
};
