import React, { Dispatch, SetStateAction } from "react";
import { ViewStyle, Image, ImageStyle } from "react-native";
import { launchImageLibraryAsync } from "expo-image-picker";
import { View, ViewColumnCenter } from "./View";
import { Mint14 } from "./Text";
import { TouchableOpacity, TOEasy, TO0 } from "../components/TouchableOpacity";
import iconProfile from "../../assets/iconProfile.png";

import btnDel from "../../assets/btnDel.png";
const UserStyle = {
  width: 83,
  height: 83,
  borderRadius: 25,
  backgroundColor: "#c1c1c1"
} as ViewStyle;
const UserImageStyle = {
  width: 83,
  height: 83,
  borderRadius: 25,
  backgroundColor: "#c1c1c1"
} as ImageStyle;

export default (props: {
  style?: ViewStyle;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
}) => {
  function addImage() {
    return launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0
    }).then(res => {
      if (res.cancelled !== true) {
        props.setUrl(res.uri);
      }
    });
  }
  if (!props.url) {
    return (
      <>
        <ViewColumnCenter style={[UserStyle, props.style]}>
          <Image source={iconProfile} />
        </ViewColumnCenter>

        <TO0 onPress={addImage}>
          <Mint14 style={{ marginTop: 9 }}>추가</Mint14>
        </TO0>
      </>
    );
  }
  return (
    <>
      <View>
        <Image source={{ uri: props.url }} style={[UserImageStyle]} />
        <TO0
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            backgroundColor: "#30ad9f",
            top: -8,
            right: -8,
            position: "absolute"
          }}
          onPress={() => props.setUrl(null)}
        >
          <Image source={btnDel} />
        </TO0>
      </View>
      <TO0 onPress={addImage}>
        <Mint14 style={{ marginTop: 9 }}>변경</Mint14>
      </TO0>
    </>
  );
};
