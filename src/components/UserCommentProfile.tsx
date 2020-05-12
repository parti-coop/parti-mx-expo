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
  flex: 0,
} as ViewStyle;
const textStyle = {
  fontSize: 16,
  textAlign: "left",
  color: "#444444",
  fontFamily: "notosans700",
} as TextStyle;
export default (
  props: React.PropsWithoutRef<{ name: string; photoUrl?: string }>
) => {
  const { photoUrl, name } = props;
  const userPhoto = (
    <Image source={{ uri: photoUrl }} style={UserStyle as ImageStyle} />
  );
  return (
    <ViewRow>
      {photoUrl ? (
        userPhoto
      ) : (
        <V0 style={[UserStyle]}>
          <Image source={iconCommentUser} resizeMode="contain" />
        </V0>
      )}

      <View style={{ marginLeft: 9 }}>
        <Text style={textStyle}>{name}</Text>
      </View>
    </ViewRow>
  );
};
