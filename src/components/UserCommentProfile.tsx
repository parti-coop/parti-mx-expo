import React from "react";
import { ViewStyle, TextStyle, ImageStyle } from "react-native";

import { Image } from "./Image";
import { View, ViewRow, V0 } from "./View";
import { Text } from "./Text";

import iconCommentUser from "../../assets/iconCommentUser.png";

const UserStyle = {
  width: 28,
  height: 29,
  borderRadius: 10,
  backgroundColor: "#c1c1c1",
} as ViewStyle;
const textStyle = {
  fontSize: 16,
  color: "#444444",
  fontFamily: "notosans700",
} as TextStyle;
export default function UserCommentProfile(props: {
  name: string;
  photoUrl?: string;
  style?: ViewStyle;
}) {
  const { photoUrl, name, style } = props;
  const userPhoto = (
    <Image source={{ uri: photoUrl }} style={UserStyle as ImageStyle} />
  );
  return (
    <ViewRow style={style}>
      {photoUrl ? (
        userPhoto
      ) : (
        <V0 style={[UserStyle]}>
          <Image source={iconCommentUser} resizeMode="contain" />
        </V0>
      )}

      <View style={{ marginLeft: 9, flexShrink: 1 }}>
        <Text style={textStyle} numberOfLines={1}>{name}</Text>
      </View>
    </ViewRow>
  );
}
