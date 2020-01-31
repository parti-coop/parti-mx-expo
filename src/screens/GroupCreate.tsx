import React from "react";
import * as ImagePicker from "expo-image-picker";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Text, TextRound } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { ViewRowLeft } from "../components/View";
import { TouchableOpacity, TOEasy } from "../components/TouchableOpacity";
import { useStore } from "../Store";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useMutation } from "@apollo/react-hooks";
import { createNewGroup } from "../graphql/mutation";
export default (props: NavigationStackScreenProps<{}>) => {
  const [{ group_id }, dispatch] = useStore();
  const [groupName, setGroupName] = React.useState("");
  const [create, { loading }] = useMutation(createNewGroup, {
    variables: { groupName }
  });
  function addImage() {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2, 1],
      quality: 0
    })
      .then(image => {
        console.log(image);
      })
      .catch(alert);
  }
  function save() {
    create()
      .then(res =>
        dispatch({
          type: "SET_GROUP",
          group_id: res.data.insert_parti_2020_groups.returning[0].id
        })
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
      <TOEasy style={{}} onPress={addImage}>
        <AntDesign name="camerao" />
        <Text>사진 추가</Text>
      </TOEasy>
    </>
  );
};
