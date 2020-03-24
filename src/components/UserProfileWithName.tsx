import React from "react";
import { ViewStyle, Image, TextStyle } from "react-native";
import { View, ViewRowLeft, ViewRow, ViewColumnCenter } from "./View";
import { Text } from "./Text";
import IconUser from "../../assets/icon-user.png";
const UserStyle = {
  width: 35,
  height: 35,
  borderRadius: 15,
  backgroundColor: "#c1c1c1",
  flex: 0
} as ViewStyle;
const textStyle = {
  fontSize: 16,
  textAlign: "left",
  color: "#444444"
} as TextStyle;
export default (props: React.PropsWithoutRef<{ name: string }>) => {
  return (
    <ViewRowLeft>
      <ViewColumnCenter style={[UserStyle]}>
        <Image source={IconUser} resizeMode="center" />
      </ViewColumnCenter>
      <View style={{marginLeft: 11}}>
        <Text style={textStyle}>{props.name}</Text>
      </View>
    </ViewRowLeft>
  );
};
