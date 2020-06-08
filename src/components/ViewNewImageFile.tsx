import React from "react";
import { ViewProps, Alert, Keyboard, Vibration } from "react-native";

import { Image } from "./Image";
import { TWF0, TO0 } from "./TouchableOpacity";
import { ViewRow, View } from "./View";
import { Mint13, Body16 } from "./Text";
import { LineSeperator } from "./LineDivider";

import iconClosed from "../../assets/iconClosed.png";

export default function BottomImageFile(props: {
  style?: ViewProps;
  imageArr: any[];
  fileArr: any[];
  setFileArr: any;
  setImageArr: any;
}) {
  const { imageArr = [], fileArr = [], setFileArr, setImageArr } = props;
  async function fileDeleteHandler(fileIndex: number) {
    return Alert.alert("파일 삭제", "해당 파일을 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "삭제!",
        onPress: function () {
          fileArr.splice(fileIndex, 1);
          setFileArr([...fileArr]);
        },
      },
    ]);
  }
  async function imageLongpressHandler(imageIndex: number) {
    Keyboard.dismiss();
    Vibration.vibrate(100);
    return Alert.alert("이미지 삭제", "해당 이미지를 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "삭제!",
        onPress: function () {
          imageArr.splice(imageIndex, 1);
          setImageArr([...imageArr]);
        },
      },
    ]);
  }
  return (
    <>
      {imageArr.length > 0 && (
        <>
          <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
            {imageArr.map((o, i) => (
              <TWF0 key={i} onLongPress={() => imageLongpressHandler(i)}>
                <Image
                  source={o}
                  resizeMode="contain"
                  style={{
                    width: "100%",
                    aspectRatio: o.width / o.height,
                    marginBottom: 10,
                    height: "auto",
                  }}
                />
              </TWF0>
            ))}
          </View>
          <LineSeperator />
        </>
      )}
      {fileArr.length > 0 && (
        <>
          <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
            <Mint13 style={{ marginBottom: 20 }}>파일</Mint13>
            {fileArr.map((o, i) => (
              <ViewRow style={{ marginBottom: 10 }} key={i}>
                <Body16 style={{ flex: 1, marginRight: 20 }}>{o.name}</Body16>
                <TO0 key={i} onPress={() => fileDeleteHandler(i)}>
                  <Image source={iconClosed} />
                </TO0>
              </ViewRow>
            ))}
          </View>
          <LineSeperator />
        </>
      )}
    </>
  );
}
