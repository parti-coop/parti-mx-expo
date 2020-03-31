import React from "react";
import { Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import { View, ViewRow } from "./View";
import { TouchableOpacity } from "./TouchableOpacity";
import { useNavigation } from "@react-navigation/native";
import iconBack from "../../assets/iconBack.png";
import btnOk from "../../assets/btnOk.png";
export default (props: { onPress?: () => void }) => {
  const { goBack } = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          onPress={props.onPress}
        >
          <Image source={btnOk} />
        </TouchableOpacity>
      </ViewRow>
    </TouchableWithoutFeedback>
  );
};
