import React from "react";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "./AppContainer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { ViewRow } from "../components/View";
import { TouchableOpacity, TOEasy } from "../components/TouchableOpacity";
import { useStore } from "../Store";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@apollo/react-hooks";
import { updateGroupName } from "../graphql/mutation";
import { uploadImage } from "../firebase";
export default (props: {
  navigation: StackNavigationProp<RootStackParamList, "GroupSetting">;
  route: RouteProp<RootStackParamList, "GroupSetting">;
}) => {
  const [{ group_id }, dispatch] = useStore();
  const [groupName, setGroupName] = React.useState(props.route.params.title);
  const [bg_img_url, setImgUrl] = React.useState(props.route.params.bg_img_url);
  const [update, { loading }] = useMutation(updateGroupName, {
    variables: { group_id, groupName, bg_img_url }
  });
  function save() {
    dispatch({ type: "SET_LOADING", loading: true });
    uploadImage(bg_img_url, `${group_id}/bgImg`)
      .then(snap => snap.ref.getDownloadURL())
      .then(bg_img_url =>
        update({ variables: { bg_img_url, group_id, groupName } })
      )
      .then(() => props.navigation.goBack());
  }

  function addImage() {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2, 1],
      quality: 0
    })
      .then(res => {
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
      <ViewRow>
        <TouchableOpacity style={{}} onPress={e => props.navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={60} />
        </TouchableOpacity>
        <Text>그룹 설정</Text>
        <TouchableOpacity style={{}} onPress={save}>
          <Text>저장</Text>
        </TouchableOpacity>
      </ViewRow>
      <Text>그룹 설정 </Text>
      <TextInput
        value={groupName}
        onChange={e => setGroupName(e.nativeEvent.text)}
      />
      <Text>사진</Text>
      {bg_img_url.length > 0 ? (
        <Image
          source={{ uri: bg_img_url }}
          resizeMode="contain"
          style={{ flex: 1 }}
        />
      ) : (
        <Text>사진 없음</Text>
      )}

      <TOEasy style={{}} onPress={addImage}>
        <Text>사진 변경</Text>
      </TOEasy>
    </>
  );
};
