import React from "react";
import { ViewStyle, Image, TextStyle, ImageStyle } from "react-native";
import { View, ViewRow, ViewColumnCenter } from "./View";
import { Text, Grey12 } from "./Text";
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
export default (props: { name: string; date: string; photoUrl?: string }) => {
  const { name, date, photoUrl } = props;
  const d = new Date(date).toLocaleTimeString();
  const userPhoto = (
    <Image source={{ uri: photoUrl }} style={UserStyle as ImageStyle} />
  );
  return (
    <ViewRow style={{ width: "50%", flexWrap: "nowrap", marginBottom: 20 }}>
      {photoUrl ? (
        userPhoto
      ) : (
        <ViewColumnCenter style={[UserStyle]}>
          <Image source={IconUser} resizeMode="center" />
        </ViewColumnCenter>
      )}
      <View style={{ marginLeft: 11 }}>
        <Text style={textStyle}>{name}</Text>
        <Grey12>{d}</Grey12>
      </View>
    </ViewRow>
  );
};
