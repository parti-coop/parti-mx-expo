import React from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

import { Image } from "./Image";
import { ViewRow } from "./View";
import { TouchableOpacity } from "./TouchableOpacity";

import btnOk from "../../assets/btnOk.png";

export default function HeaderOnlyConfirm(props: { onPress?: () => void }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ViewRow style={{ justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={{
            alignItems: "flex-end",
            padding: 30,
          }}
          onPress={props.onPress}
        >
          <Image source={btnOk} />
        </TouchableOpacity>
      </ViewRow>
    </TouchableWithoutFeedback>
  );
}
