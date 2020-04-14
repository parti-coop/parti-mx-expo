import React from "react";
import { Image, ViewStyle, Keyboard } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@apollo/react-hooks";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import { RootStackParamList } from "./AppContainer";
import { Title22, Mint16 } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { View } from "../components/View";
import { TORow, TORowCenter } from "../components/TouchableOpacity";
import HeaderConfirm from "../components/HeaderConfirm";
import { LineSeperator } from "../components/LineDivider";

import { useStore } from "../Store";
import { updateGroupName } from "../graphql/mutation";
import { uploadImage } from "../firebase";

import iconPhoto from "../../assets/iconPhoto.png";

const boxStyle = {
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.15)",
  elevation: 1,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowRadius: 1,
  shadowOpacity: 1,
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
  marginTop: 50,
  justifyContent: "flex-start",
  alignItems: "stretch",
  paddingVertical: 50,
  flex: 1,
} as ViewStyle;
export default (props: {
  navigation: StackNavigationProp<RootStackParamList, "GroupSetting">;
  route: RouteProp<RootStackParamList, "GroupSetting">;
}) => {
  const [{ group_id }, dispatch] = useStore();
  const [groupName, setGroupName] = React.useState(props.route.params.title);
  const [bg_img_url, setImgUrl] = React.useState(props.route.params.bg_img_url);
  const [update, { loading }] = useMutation(updateGroupName, {
    variables: { group_id, groupName, bg_img_url },
  });
  function save() {
    dispatch({ type: "SET_LOADING", loading: true });
    uploadImage(bg_img_url, `${group_id}/bgImg`)
      .then((snap) => snap.ref.getDownloadURL())
      .then((bg_img_url) =>
        update({ variables: { bg_img_url, group_id, groupName } })
      )
      .then(() => props.navigation.goBack());
  }

  function addImage() {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2, 1],
      quality: 1,
    })
      .then((res) => {
        if (res.cancelled !== true) {
          setImgUrl(res.uri);
        }
      })
      .catch(alert);
  }
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  return (
    <>
      <HeaderConfirm onPress={save} />
      <KeyboardAwareScrollView>
        <View style={{ paddingHorizontal: 30 }}>
          <Title22>그룹</Title22>
        </View>
        <View style={boxStyle}>
          <TextInput
            value={groupName}
            onChangeText={setGroupName}
            placeholder="그룹 이름 입력"
            onSubmitEditing={() => Keyboard.dismiss()}
            autoFocus={true}
            style={{
              fontSize: 17,
              textAlign: "center",
              marginBottom: 30,
            }}
          />
          <LineSeperator />
          {bg_img_url && (
            <Image
              source={{ uri: bg_img_url }}
              resizeMode="contain"
              style={{
                width: 300,
                height: 150,
                marginTop: 30,
              }}
            />
          )}
          <TORowCenter style={{ marginTop: 30 }} onPress={addImage}>
            <Image source={iconPhoto} style={{ marginRight: 5 }} />
            <Mint16>{bg_img_url ? "사진 변경" : "사진 추가"}</Mint16>
          </TORowCenter>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};
