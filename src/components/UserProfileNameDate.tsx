import React from "react";
import { ViewStyle, ImageStyle } from "react-native";

import { Image, ImageCache } from "./Image";
import { View, ViewRow, V0 } from "./View";
import { Caption16, Grey12 } from "./Text";

import { formatDateFromString } from "../Utils/CalculateDays";

import IconUser from "../../assets/iconUser.png";

const UserStyle = {
  width: 35,
  height: 35,
  borderRadius: 15,
  backgroundColor: "#c1c1c1",
  flex: 0,
} as ViewStyle;

export default function UserProfileNameDate(props: {
  name: string;
  date: string;
  photoUrl?: string;
  style?: ViewStyle;
}) {
  const { name, date, photoUrl, style } = props;
  const d = formatDateFromString(date);
  const userPhoto = (
    <ImageCache uri={photoUrl} style={UserStyle as ImageStyle} />
  );
  return (
    <ViewRow style={[{ flexShrink: 1 }, style]}>
      {photoUrl ? (
        userPhoto
      ) : (
        <V0 style={[UserStyle]}>
          <Image source={IconUser} resizeMode="center" />
        </V0>
      )}
      <View style={{ marginLeft: 11, flexShrink: 1 }}>
        <Caption16 style={{ fontFamily: "notosans700" }} numberOfLines={1}>
          {name}
        </Caption16>
        <Grey12 style={{ fontFamily: "notosans700" }}>{d}</Grey12>
      </View>
    </ViewRow>
  );
}
