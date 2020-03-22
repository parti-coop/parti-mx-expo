import React from "react";
import { ViewStyle, StyleProp, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { View, ViewRow, ViewColumnCenter } from "./View";

import { TouchableOpacity } from "./TouchableOpacity";
import { Text } from "./Text";
import { useMutation } from "@apollo/react-hooks";
import { insertBoard } from "../graphql/mutation";
import { useStore } from "../Store";
import { showMessage } from "react-native-flash-message";
import RNPickerSelect from "react-native-picker-select";
import Modal from "react-native-modal";
import { TextInput } from "./TextInput";
const options = [
  { value: "notice", label: "소식" },
  { value: "suggestion", label: "제안" },
  { value: "event", label: "모임" },
  { value: "vote", label: "투표" }
];
export default (props: {
  style?: StyleProp<ViewStyle>;
  setVisible: (visible: boolean) => void;
}) => {
  const [{ group_id, user_id }, dispatch] = useStore();
  const [type, setType] = React.useState(options[0].value);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const bodyRef = React.useRef(null);
  function pickerHandler(value: string) {
    setType(value);
  }
  const [insert, { error, data }] = useMutation(insertBoard, {
    variables: { group_id, user_id, type, title, body }
  });
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
  async function saveHandler() {
    if (title.length === 0) {
      return;
    }
    await insert();
    showMessage({ type: "success", message: "게시판을 만들었습니다." });
    props.setVisible(false);
  }
  return (
    <View style={{ backgroundColor: "white", ...(props.style as Object) }}>
      <RNPickerSelect
        items={options}
        value={type}
        onValueChange={pickerHandler}
        placeholder={{}}
      />
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{ flex: 0 }}
        placeholder="게시판 이름"
        onSubmitEditing={() => bodyRef.current.focus()}
      />
      <TextInput
        value={body}
        onChangeText={setBody}
        style={{ flex: 0 }}
        placeholder="게시판 설명"
        ref={bodyRef}
        onSubmitEditing={saveHandler}
      />
      <TouchableOpacity onPress={saveHandler}>
        <Text>저장</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.setVisible(false)}>
        <Text>닫기</Text>
      </TouchableOpacity>
    </View>
  );
};
