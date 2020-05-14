import React from "react";
import { ViewStyle, Keyboard } from "react-native";

import { Image } from "./Image";
import { TO0, TOCenter } from "./TouchableOpacity";
import { View } from "./View";
import bgCheckboxOff from "../../assets/bgCheckboxOff.png";
import bgCheckboxOn from "../../assets/bgCheckboxOn.png";
import iconFormCheckbox from "../../assets/iconFormCheckbox.png";
export default function ButtonCheckbox(props: {
  style?: ViewStyle;
  value: boolean;
  setValue: (v: boolean) => void;
}) {
  const { value, setValue, style } = props;
  function off() {
    Keyboard.dismiss();
    setValue(false);
  }
  function on() {
    Keyboard.dismiss();
    setValue(true);
  }
  return (
    <View style={style}>
      {value ? (
        <TOCenter onPress={off}>
          <Image source={bgCheckboxOn} />
          <Image source={iconFormCheckbox} style={{ position: "absolute" }} />
        </TOCenter>
      ) : (
        <TO0 onPress={on}>
          <Image source={bgCheckboxOff} />
        </TO0>
      )}
    </View>
  );
}
