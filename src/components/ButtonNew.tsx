import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Image } from "./Image";
import { TouchableOpacity } from "./TouchableOpacity";

import btnFloatingWrite from "../../assets/btnFloatingWrite.png";

const rectangle3Copy3 = {
  width: 56,
  height: 51,
  borderRadius: 18,
  backgroundColor: "#12BD8E",
  shadowColor: "rgba(0, 0, 0, 0.35)",
  elevation: 1,
  shadowOffset: {
    width: -1.8,
    height: -2.4,
  },
  shadowRadius: 7,
  shadowOpacity: 1,
};
export default (props: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        rectangle3Copy3,
        {
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 50,
          right: 16,
        },
      ]}
    >
      <Image source={btnFloatingWrite} />
    </TouchableOpacity>
  );
};
