import React from "react";
import { ViewStyle, ImageStyle } from "react-native";

import { Image, ImageCache } from "./Image";
import { View, ViewRow, V0 } from "./View";
import { Caption16, Grey12 } from "./Text";
import IconUser from "../../assets/icon-user.png";
const UserStyle = {
  width: 35,
  height: 35,
  borderRadius: 15,
  backgroundColor: "#c1c1c1",
  flex: 0,
} as ViewStyle;

export default (props: { name: string; sub: string; photoUrl?: string }) => {
  const { name, sub, photoUrl } = props;
  const userPhoto = (
    <ImageCache uri={photoUrl} style={UserStyle as ImageStyle} />
  );
  return (
    <ViewRow style={{ width: "50%", flexWrap: "nowrap", marginBottom: 20 }}>
      {photoUrl ? (
        userPhoto
      ) : (
        <V0 style={[UserStyle]}>
          <Image source={IconUser} resizeMode="center" />
        </V0>
      )}
      <View style={{ marginLeft: 11 }}>
        <Caption16>{name}</Caption16>
        <Grey12>{sub}</Grey12>
      </View>
    </ViewRow>
  );
};