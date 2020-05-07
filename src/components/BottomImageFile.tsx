import React from "react";
import { ViewProps } from "react-native";

import { Image } from "./Image";
import { TORowCenter } from "./TouchableOpacity";
import { ViewRow } from "./View";
import { Mint16 } from "./Text";
import { SmallVerticalDivider } from "./LineDivider";

import iconPhoto from "../../assets/iconPhoto.png";
import btnFile from "../../assets/btnFile.png";
export default function BottomImageFile(props: {
  style?: ViewProps;
  onImage: any;
  onFile: any;
}) {
  const { onImage, onFile } = props;
  return (
    <ViewRow style={{ padding: 15 }}>
      <TORowCenter onPress={onImage} style={{ flex: 1 }}>
        <Image source={iconPhoto} style={{ margin: 5 }} />
        <Mint16 style={{ textAlign: "center" }}>사진 첨부</Mint16>
      </TORowCenter>
      <SmallVerticalDivider />
      <TORowCenter onPress={onFile} style={{ flex: 1 }}>
        <Image source={btnFile} style={{ margin: 5 }} />
        <Mint16 style={{ textAlign: "center" }}>파일 첨부</Mint16>
      </TORowCenter>
    </ViewRow>
  );
}
