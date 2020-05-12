import React from "react";
import { TextStyle } from "react-native";
import { View, ViewRow } from "./View";
import { Image } from "./Image";
import { Title22, Grey12 } from "./Text";

import iconCalendar from "../../assets/iconCalendar.png";

export default function ViewTitleCalendar(props: {
  title: string;
  value?: string;
}) {
  const { title, value = "" } = props;
  return (
    <View style={{ paddingHorizontal: 30, paddingTop: 15 }}>
      <Title22>{title}</Title22>
      <ViewRow style={{ marginTop: 5 }}>
        <Image source={iconCalendar} style={{ marginRight: 6 }} />
        <Grey12>{value}</Grey12>
        <Grey12>일까지</Grey12>
      </ViewRow>
    </View>
  );
}
