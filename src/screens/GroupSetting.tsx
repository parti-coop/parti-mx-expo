import React from "react";
import { ScrollView, Share, Picker } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Text, TextRound } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { View, ViewRow, ViewRowLeft } from "../components/View";
import LoadingIndicator from "../components/LoadingIndicator";
import {
  TouchableOpacity,
  TORow,
  TOEasy
} from "../components/TouchableOpacity";
import { useStore } from "../Store";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@apollo/react-hooks";
import { updateGroupName } from "../graphql/mutation";
export default (props: NavigationStackScreenProps<{ groupName: string }>) => {
  const [{ group_id }, dispatch] = useStore();
  const [groupName, setGroupName] = React.useState(
    props.navigation.getParam("groupName")
  );
  const [update, { loading }] = useMutation(updateGroupName, {
    variables: { group_id, groupName }
  });
  function save() {
    update().then(() => props.navigation.goBack());
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
      <TOEasy style={{}} onPress={save}>
        <Text>사진 변경</Text>
      </TOEasy>
    </>
  );
};
