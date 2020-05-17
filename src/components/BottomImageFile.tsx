import React from "react";
import { ViewProps } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { launchImageLibraryAsync } from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/src/ImagePicker.types";
import { File } from "../types";

import { Image } from "./Image";
import { TORowCenter } from "./TouchableOpacity";
import { ViewRow } from "./View";
import { Mint16 } from "./Text";
import { SmallVerticalDivider } from "./LineDivider";

import iconPhoto from "../../assets/iconPhoto.png";
import btnFile from "../../assets/btnFile.png";
export default function BottomImageFile(props: {
  style?: ViewProps;
  imageArr: ImageInfo[];
  setImageArr: any;
  setFileArr: any;
  fileArr: File[];
}) {
  const { imageArr, setImageArr, setFileArr, fileArr } = props;
  async function imageUploadHandler() {
    return launchImageLibraryAsync({
      quality: 1,
    }).then(({ cancelled, ...res }) => {
      if (cancelled !== true) {
        setImageArr([...imageArr, res as ImageInfo]);
      }
    });
  }
  async function fileUploadHandler() {
    const file = await DocumentPicker.getDocumentAsync();
    const { type, ...rest } = file;
    if (type === "success") {
      setFileArr([...fileArr, rest as File]);
    }
  }
  return (
    <ViewRow style={{ padding: 15 }}>
      <TORowCenter onPress={imageUploadHandler} style={{ flex: 1 }}>
        <Image source={iconPhoto} style={{ margin: 5 }} />
        <Mint16 style={{ textAlign: "center" }}>사진 첨부</Mint16>
      </TORowCenter>
      <SmallVerticalDivider />
      <TORowCenter onPress={fileUploadHandler} style={{ flex: 1 }}>
        <Image source={btnFile} style={{ margin: 5 }} />
        <Mint16 style={{ textAlign: "center" }}>파일 첨부</Mint16>
      </TORowCenter>
    </ViewRow>
  );
}
