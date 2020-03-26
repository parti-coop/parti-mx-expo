import React from "react";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StackHeaderProps } from "@react-navigation/stack";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import uuid from "uuid";
import { ViewRow } from "../components/View";
import { TouchableOpacity, TOEasy } from "../components/TouchableOpacity";
import { useStore } from "../Store";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useMutation } from "@apollo/react-hooks";
import { createNewGroup } from "../graphql/mutation";
import useBoardCreate from "../graphql/useBoardCreate";
import { uploadImage } from "../firebase";
export default (props: StackHeaderProps) => {
  const [{ user_id }, dispatch] = useStore();
  const [groupName, setGroupName] = React.useState("");
  const [bg_img_url, setImgUrl] = React.useState("");
  const [createDefaultSuggestionBoard] = useBoardCreate();
  const [create, { loading }] = useMutation(createNewGroup, {
    variables: { groupName, user_id, bg_img_url }
  });

  function addImage() {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2, 1],
      quality: 0
    }).then(res => {
      if (res.cancelled !== true) {
        setImgUrl(res.uri);
      }
    });
  }
  async function save() {
    async function createGroup(bg_img_url: string | null) {
      const res = await create({
        variables: { groupName, user_id, bg_img_url }
      });
      const group_id = res.data.insert_parti_2020_groups.returning[0].id;
      dispatch({ type: "SET_GROUP", group_id });
      return group_id;
    }
    dispatch({ type: "SET_LOADING", loading: true });
    let url = null;
    if (bg_img_url.length > 0) {
      url = await uploadImage(bg_img_url, `bgImg/${uuid.v4()}`).then(snap =>
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
      <ViewRow style={{ justifyContent: "space-between" }}>
        <TouchableOpacity style={{}} onPress={e => props.navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={60} />
        </TouchableOpacity>
        <Text>그룹 만들기</Text>
        <TouchableOpacity style={{}} onPress={save}>
          <Text>저장</Text>
        </TouchableOpacity>
      </ViewRow>
      <Text>그룹을 만들어 보세요</Text>
      <TextInput
        value={groupName}
        onChange={e => setGroupName(e.nativeEvent.text)}
        placeholder="그룹 이름 입력"
        onSubmitEditing={save}
      />
      {bg_img_url.length > 0 ? (
        <Image
          source={{ uri: bg_img_url }}
          resizeMode="contain"
          style={{ flex: 1 }}
        />
      ) : (
        <Text>배경 사진 없음</Text>
      )}

      <TOEasy style={{}} onPress={addImage}>
        <AntDesign name="camerao" />
        <Text>{bg_img_url.length > 0 ? "사진 추가" : "사진 변경"}</Text>
      </TOEasy>
    </>
  );
};
