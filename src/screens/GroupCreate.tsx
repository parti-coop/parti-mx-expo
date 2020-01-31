import React from "react";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import uuid from "uuid";
import { ViewRowLeft } from "../components/View";
import { TouchableOpacity, TOEasy } from "../components/TouchableOpacity";
import { useStore } from "../Store";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useMutation } from "@apollo/react-hooks";
import { createNewGroup } from "../graphql/mutation";
import { uploadImage } from "../firebase";
export default (props: NavigationStackScreenProps<{}>) => {
  const [{ user_id }, dispatch] = useStore();
  const [groupName, setGroupName] = React.useState("");
  const [bg_img_url, setImgUrl] = React.useState("");
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
  function save() {
    dispatch({ type: "SET_LOADING", loading: true });
    uploadImage(bg_img_url, `bgImg/${uuid.v4()}`)
      .then(snap => snap.ref.getDownloadURL())
      .then(bg_img_url =>
        create({ variables: { groupName, user_id, bg_img_url } }).then(res =>
          dispatch({
            type: "SET_GROUP",
            group_id: res.data.insert_parti_2020_groups.returning[0].id
          })
        )
      )
      .then(() => props.navigation.navigate("Home"));
  }
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  return (
    <>
      <ViewRowLeft>
        <TouchableOpacity style={{}} onPress={e => props.navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={60} />
        </TouchableOpacity>
        <Text>그룹</Text>
        <TouchableOpacity style={{}} onPress={save}>
          <Text>만들기</Text>
        </TouchableOpacity>
      </ViewRowLeft>
      <Text>그룹을 만들어 보세요</Text>
      <TextInput
        value={groupName}
        onChange={e => setGroupName(e.nativeEvent.text)}
        placeholder="그룹 이름 입력"
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
