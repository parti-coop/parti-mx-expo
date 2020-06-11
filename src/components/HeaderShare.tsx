import React from "react";
import { Share, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { Image } from "./Image";
import { ViewRow } from "./View";
import { TouchableOpacity } from "./TouchableOpacity";
import { boardTypes } from "./boardTypes";
import iconBack from "../../assets/iconBack.png";
import btnShare from "../../assets/btnShare.png";
import { useStore } from "../Store";

export default (props: { id: number; type: boardTypes }) => {
  const { id, type } = props;
  const [{ group_id }] = useStore();
  const { goBack } = useNavigation();
  const shareLink = React.useCallback(() => {
    const url = Linking.makeUrl("share", { id: String(id), type, group_id });
    const shareObj = Platform.select({
      ios: {
        title: "제안 공유",
        url,
      },
      android: {
        title: "제안 공유",
        message: "제안을 공유합니다" + url,
      },
    });
    Share.share(shareObj);
  }, [id, type, group_id]);
  return (
    <ViewRow style={{ justifyContent: "space-between" }}>
      <TouchableOpacity
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-start",
          padding: 30,
        }}
        onPress={goBack}
      >
        <Image source={iconBack} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: "flex-end",
          padding: 30,
        }}
        onPress={shareLink}
      >
        <Image source={btnShare} />
      </TouchableOpacity>
    </ViewRow>
  );
};
