import React from "react";
import { ViewStyle, TouchableOpacityProps } from "react-native";

import { Image } from "./Image";
import { V0 } from "./View";
import { TOCenter } from "./TouchableOpacity";

import iconSearch from "../../assets/iconSearch.png";
export default (
  props: TouchableOpacityProps & {
    padding?: number;
    source?: any;
    style?: ViewStyle;
  }
) => {
  const { padding = 30, source = iconSearch, style, ...prop } = props;
  return (
    <TOCenter {...prop} style={{ padding }}>
      <V0
        style={[
          {
            width: 35,
            height: 35,
            borderRadius: 15,
            backgroundColor: "#30ad9f",
          },
          style,
        ]}
      >
        <Image source={source} style={{ tintColor: "white" }} />
      </V0>
    </TOCenter>
  );
};
