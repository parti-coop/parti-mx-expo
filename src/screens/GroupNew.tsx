import React from "react";
import { Image, ViewStyle, Keyboard } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StackHeaderProps } from "@react-navigation/stack";
import uuid from "uuid";
import { useMutation } from "@apollo/react-hooks";

import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import { Mint16, Title22, Sub16 } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { View } from "../components/View";
import { TORowCenter } from "../components/TouchableOpacity";
import HeaderConfirm from "../components/HeaderConfirm";
import { LineSeperator } from "../components/LineDivider";

import { useStore } from "../Store";
import { createNewGroup } from "../graphql/mutation";
import useBoardCreate from "../components/useBoardCreate";
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
export default (props: StackHeaderProps) => {
  const [{ user_id }, dispatch] = useStore();
  const [groupName, setGroupName] = React.useState("");
  const [bg_img_url, setImgUrl] = React.useState("");
  const [createDefaultSuggestionBoard] = useBoardCreate();
  const [create, { loading }] = useMutation(createNewGroup, {
    variables: { groupName, user_id, bg_img_url },
  });

  function addImage() {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2, 1],
      quality: 1,
    }).then((res) => {
      if (res.cancelled !== true) {
        setImgUrl(res.uri);
        console.log(res);
      }
    });
  }
  async function save() {
    async function createGroup(bg_img_url: string | null) {
      const res = await create({
        variables: { groupName, user_id, bg_img_url },
      });
      const group_id = res.data.insert_parti_2020_groups.returning[0].id;
      dispatch({ type: "SET_GROUP", group_id });
      return group_id;
    }
    dispatch({ type: "SET_LOADING", loading: true });
    let url = null;
    if (bg_img_url.length > 0) {
      url = await uploadImage(bg_img_url, `bgImg/${uuid.v4()}`).then((snap) =>
        snap.ref.getDownloadURL()
      );
    }
    const group_id = await createGroup(url);
    const board_id = await createDefaultSuggestionBoard(group_id);
    dispatch({ type: "SET_GROUP_AND_BOARD", group_id, board_id });
    props.navigation.navigate("Home");
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
          <Sub16 style={{ marginTop: 15 }}>그룹을 만들어 보세요</Sub16>
        </View>
        <View style={boxStyle}>
          <TextInput
            value={groupName}
            onChangeText={setGroupName}
            placeholder="그룹 이름 입력"
            onSubmitEditing={() => Keyboard.dismiss()}
            style={{
              fontSize: 17,
              textAlign: "center",
            }}
          />
          <LineSeperator />
          {bg_img_url.length > 0 && (
            <Image
              source={{ uri: bg_img_url }}
              resizeMode="contain"
              style={{ width: 400, height: 200, marginTop: 30 }}
            />
          )}
          <TORowCenter style={{ marginTop: 30 }} onPress={addImage}>
            <Image source={iconPhoto} style={{ marginRight: 5 }} />
            <Mint16>
              {bg_img_url.length === 0 ? "사진 추가" : "사진 변경"}
            </Mint16>
          </TORowCenter>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};
