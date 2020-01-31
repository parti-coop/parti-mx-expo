import React from "react";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Text, TextRound } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { ViewRowLeft } from "../components/View";
import { TouchableOpacity, TOEasy } from "../components/TouchableOpacity";
import { useStore } from "../Store";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@apollo/react-hooks";
import { updateGroupName } from "../graphql/mutation";
import { uploadImage } from "../firebase";
export default (
  props: NavigationStackScreenProps<{ title: string; bg_img_url: string }>
) => {
  const [{ group_id }, dispatch] = useStore();
  const [groupName, setGroupName] = React.useState(
    props.navigation.getParam("title")
  );
  const [bg_img_url, setImgUrl] = React.useState(
    props.navigation.getParam("bg_img_url")
  );
  const [update, { loading }] = useMutation(updateGroupName, {
    variables: { group_id, groupName, bg_img_url }
  });
  function save() {
    update().then(() => props.navigation.goBack());
  }

  function addImage() {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2, 1],
      quality: 0
    })
      .then(res => {
        if (res.cancelled !== true) {
          return uploadImage(res.uri, `${group_id}/bgImg`);
        }
      })
      .then(snap => snap.ref.getDownloadURL())
      .then(setImgUrl)
      .catch(alert);
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
        <Text>그룹 설정</Text>
        <TouchableOpacity style={{}} onPress={save}>
          <Text>저장</Text>
        </TouchableOpacity>
      </ViewRowLeft>
      <Text>그룹 설정 </Text>
      <TextInput
        value={groupName}
        onChange={e => setGroupName(e.nativeEvent.text)}
      />
      <Text>사진</Text>
      <Image
        source={{ uri: bg_img_url }}
        resizeMode="contain"
        style={{ flex: 1 }}
      />
      <TOEasy style={{}} onPress={addImage}>
        <Text>사진 변경</Text>
      </TOEasy>
    </>
  );
};
