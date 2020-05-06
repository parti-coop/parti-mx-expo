import React, { Dispatch, SetStateAction } from "react";
import { ViewStyle, ImageStyle } from "react-native";
import { launchImageLibraryAsync } from "expo-image-picker";

import { Image, ImageCache } from "./Image";
import { View, V0 } from "./View";
import { Mint14 } from "./Text";
import { TO0 } from "../components/TouchableOpacity";

import iconProfile from "../../assets/iconProfile.png";
import iconClosed from "../../assets/iconClosed.png";

const UserStyle = {
  width: 83,
  height: 83,
  borderRadius: 25,
  backgroundColor: "#c1c1c1",
} as ViewStyle;
const UserImageStyle = {
  width: 83,
  height: 83,
  borderRadius: 25,
  backgroundColor: "#c1c1c1",
} as ImageStyle;

export default function UserProfileBig(props: {
  style?: ViewStyle;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
}) {
  function addImage() {
    launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    }).then((res) => {
      if (res.cancelled !== true) {
        props.setUrl(res.uri);
      }
    });
  }
  if (!props.url) {
    return (
      <>
        <V0 style={[UserStyle, props.style]}>
          <Image source={iconProfile} />
        </V0>

        <TO0 onPress={addImage}>
          <Mint14 style={{ marginTop: 9 }}>추가</Mint14>
        </TO0>
      </>
    );
  }
  return (
    <>
      <View>
        <ImageCache uri={props.url} style={[UserImageStyle]} />
        <TO0
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            backgroundColor: "#12BD8E",
            top: -8,
            right: -8,
            position: "absolute",
          }}
          onPress={() => props.setUrl("")}
        >
          <Image source={iconClosed} style={{ tintColor: "white" }} />
        </TO0>
      </View>
      <TO0 onPress={addImage}>
        <Mint14 style={{ marginTop: 9 }}>변경</Mint14>
      </TO0>
    </>
  );
}
