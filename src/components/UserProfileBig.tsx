import React from "react";
import { ViewStyle, Image } from "react-native";
import { ViewRow, ViewColumnCenter } from "./View";
import { Label14 } from "./Text";
import { TouchableOpacity, TOEasy, TO0 } from "../components/TouchableOpacity";
import iconProfile from "../../assets/iconProfile.png";

import btnDel from "../../assets/btnDel.png";
const UserStyle = {
  width: 83,
  height: 83,
  borderRadius: 25,
  backgroundColor: "#c1c1c1",
  flex: 0
} as ViewStyle;
export default (props: { style?: ViewStyle }) => {
  return (
    <>
      <ViewColumnCenter style={[UserStyle, props.style]}>
        <Image source={iconProfile} />
        <TO0
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            backgroundColor: "#30ad9f",
            top: -8,
            right: -8,
            position: "absolute"
          }}
        >
          <Image source={btnDel} />
        </TO0>
      </ViewColumnCenter>
      <TO0>
        <Label14 style={{marginTop: 9}}>변경</Label14>
      </TO0>
    </>
  );
};
