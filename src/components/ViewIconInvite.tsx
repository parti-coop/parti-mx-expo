import React from "react";
import {  Image , ViewStyle} from "react-native";
import { View } from "./View";
import iconInvite from "../../assets/icon-invite.png";
export default (props: {style?: ViewStyle}) => {
  return (
    <View
      style={{
        ...props.style,
        width: 35,
        height: 35,
        backgroundColor: "#fdbf19",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8,
        marginRight: 12
      }}
    >
      <Image
        style={{ width: 17, height: 18 }}
        resizeMode="contain"
        source={iconInvite}
      />
    </View>
  );
};
