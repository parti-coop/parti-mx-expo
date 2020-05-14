import React from "react";
import { ViewStyle } from "react-native";

import { Image } from "./Image";
import { View, V0 } from "./View";
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
        <V0>
          <Image source={bgCheckboxOn} />
          <Image source={iconFormCheckbox} style={{ position: "absolute" }} />
        </V0>
      ) : (
        <V0>
          <Image source={bgCheckboxOff} />
        </V0>
      )}
    </View>
  );
}
