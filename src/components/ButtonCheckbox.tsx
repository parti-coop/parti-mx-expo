import React from "react";
import { ViewStyle, Keyboard } from "react-native";

import { Image } from "./Image";
import { TO0 } from "./TouchableOpacity";
import { View, V0 } from "./View";
import COLORS from "./Colors";
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
        <TO0 onPress={off}>
          <V0
            style={{
              width: 27,
              height: 27,
              borderRadius: 14,
              backgroundColor: COLORS.MINT,
            }}
          />
          <Image source={iconFormCheckbox} style={{ position: "absolute" }} />
        </TO0>
      ) : (
        <TO0 onPress={on}>
          <V0
            style={{
              width: 27,
              height: 27,
              borderRadius: 14,
              backgroundColor: "#c1c1c1",
            }}
          />
        </TO0>
      )}
    </View>
  );
}
