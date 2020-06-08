import React from "react";
import { ViewProps } from "react-native";
import { Linking } from "expo";
import { ImageInfo } from "expo-image-picker/src/ImagePicker.types";

import { TORow, TO0 } from "./TouchableOpacity";
import { View } from "./View";
import { Mint13, Body16 } from "./Text";
import { ImageCache, ImageView } from "./Image";

import { File } from "../types";
export default function BottomImageFile(props: {
  style?: ViewProps;
  images: any[];
  files: any[];
}) {
  const { images = [], files = [] } = props;
  const [visible, setIsVisible] = React.useState(false);
  const [imgIndex, setImgIndex] = React.useState(0);
  function showImageViewerHandler(index: number) {
    setIsVisible(true);
    setImgIndex(index);
  }

  function openFileHandler(file: File) {
    Linking.openURL(file.uri);
  }
  return (
    <>
      {images?.length > 0 && (
        <View style={{ marginHorizontal: 30, marginTop: 40 }}>
          {images?.map((o: ImageInfo, i: number) => {
            return (
              <TO0 onPress={() => showImageViewerHandler(i)} key={i}>
                <ImageCache
                  uri={o.uri}
                  style={{
                    width: "100%",
                    // height: 186,
                    aspectRatio: o.width / o.height,
                    marginBottom: 10,
                    resizeMode: "cover",
                  }}
                />
              </TO0>
            );
          })}
        </View>
      )}
      {files?.length > 0 && (
        <View style={{ marginHorizontal: 30, marginTop: 40 }}>
          <Mint13 style={{ marginBottom: 20 }}>파일</Mint13>
          {files?.map((o: File, i: number) => {
            return (
              <TORow key={i} onPress={() => openFileHandler(o)}>
                <Body16>{o.name}</Body16>
              </TORow>
            );
          })}
        </View>
      )}
      <ImageView
        images={images}
        imageIndex={imgIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </>
  );
}
