import React from "react";
import { ViewStyle } from "react-native";

import { Image } from "./Image";
import { View, V0 } from "./View";
import COLORS from "./Colors";
import bgCheckboxOff from "../../assets/bgCheckboxOff.png";
import bgCheckboxOn from "../../assets/bgCheckboxOn.png";
import iconFormCheckbox from "../../assets/iconFormCheckbox.png";
export default function ViewCheckbox(props: {
  style?: ViewStyle;
  value: boolean;
}) {
  const { value, style } = props;

  return (
    <View style={style}>
      {value ? (
        <V0
          style={{
            width: 27,
            height: 27,
            borderRadius: 14,
            backgroundColor: COLORS.MINT,
          }}
        >
          <Image source={iconFormCheckbox} style={{ position: "absolute" }} />
        </V0>
      ) : (
        <V0
          style={{
            width: 27,
            height: 27,
            borderRadius: 14,
            backgroundColor: "#c1c1c1",
          }}
        />
      )}
    </View>
  );
}
