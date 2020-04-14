import React from "react";
import { ViewStyle } from "react-native";

import { Image } from "./Image";
import { View, ViewRow } from "./View";

import iconCommunity from "../../assets/iconCommunity.png";
import iconNews from "../../assets/iconNews.png";
import iconSuggest from "../../assets/iconSuggest.png";
import iconVote from "../../assets/iconVote.png";

export default (props: { type?: string; style?: ViewStyle }) => {
  let icon = iconSuggest;
  switch (props.type) {
    case "notice":
      icon = iconNews;
      break;
    case "vote":
      icon = iconVote;
      break;
    case "event":
      icon = iconCommunity;
      break;
  }
  return (
    <View
      style={[
        {
          width: 35,
          height: 35,
          backgroundColor: "#30ad9f",
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
        },
        props.style,
      ]}
    >
      <Image
        source={icon}
        style={{ width: 17, height: 18 }}
        resizeMode="contain"
      />
    </View>
  );
};
