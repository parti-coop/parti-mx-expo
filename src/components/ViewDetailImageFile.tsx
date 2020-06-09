import React from "react";
import { ViewProps } from "react-native";
import { Linking } from "expo";
import { ImageInfo } from "expo-image-picker/src/ImagePicker.types";
import { downloadAsUUID } from "../Utils/download";

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

  return (
    <>
      {images?.length > 0 && (
        <View style={{ marginHorizontal: 30, marginTop: 40 }}>
          {images?.map((o: ImageInfo, i: number) => {
            function showImageViewerHandler() {
              setIsVisible(true);
              setImgIndex(i);
            }
            function longpressHandler() {
              downloadAsUUID(o.uri);
            }
            return (
              <TO0
                onPress={showImageViewerHandler}
                onLongPress={longpressHandler}
                key={i}
              >
                <ImageCache
                  uri={o.uri}
                  style={{
                    width: "100%",
                    aspectRatio: o.width / o.height,
                    height: "auto",
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
            function openFileHandler() {
              Linking.openURL(o.uri);
            }
            return (
              <TORow key={i} onPress={openFileHandler}>
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
