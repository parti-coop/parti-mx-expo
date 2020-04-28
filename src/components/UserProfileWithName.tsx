import React from "react";
import { ViewStyle, TextStyle, ImageStyle } from "react-native";

import { Image, ImageCache } from "./Image";
import { View, ViewRow, V0 } from "./View";
import { Text } from "./Text";
import IconUser from "../../assets/iconUser.png";
const UserStyle = {
  width: 35,
  height: 35,
  borderRadius: 15,
  backgroundColor: "#c1c1c1",
  flex: 0,
} as ViewStyle;
const textStyle = {
  fontSize: 16,
  textAlign: "left",
  color: "#444444",
} as TextStyle;
export default (
  props: React.PropsWithoutRef<{ name: string; photoUrl?: string }>
) => {
  const { photoUrl, name } = props;
  const userPhoto = (
    <ImageCache uri={photoUrl} style={UserStyle as ImageStyle} />
  );
  return (
    <ViewRow>
      {photoUrl ? (
        userPhoto
      ) : (
        <V0 style={[UserStyle]}>
          <Image source={IconUser} resizeMode="center" />
        </V0>
      )}

      <View style={{ marginLeft: 11 }}>
        <Text style={textStyle}>{name}</Text>
      </View>
    </ViewRow>
  );
};
