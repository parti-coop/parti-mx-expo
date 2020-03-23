import React from "react";
import { Image } from "react-native";
import { StackHeaderProps } from "@react-navigation/stack";
import RNPickerSelect from "react-native-picker-select";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "@apollo/react-hooks";

import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import HeaderNew from "../components/HeaderNew";
import { View, ViewRow, ViewRowLeft } from "../components/View";
import { TouchableOpacity } from "../components/TouchableOpacity";

import { useStore } from "../Store";
import { insertSuggestion } from "../graphql/mutation";

import iconHome from "../../assets/iconHome.png";
import iconNavi from "../../assets/iconNavi.png";

const options = [
  { label: "30일 후 종료", value: 0 },
  { label: "멤버 과반수 동의시 종료", value: 1 },
  { label: "제안 정리시 종료", value: 2 }
];
export default (props: StackHeaderProps) => {
  const [insert, { loading }] = useMutation(insertSuggestion);
  const [{ board_id, user_id }, dispatch] = useStore();
  const [sTitle, setSTitle] = React.useState("");
  const [sContext, setSContext] = React.useState("");
  const [sBody, setSBody] = React.useState("");
  const [closingMethod, setClosingMethod] = React.useState(0);
  function insertPressHandler() {
    if (sTitle.trim() == "" || sTitle.trim().length > 20) {
      return showMessage({
        message: "제안명을 20자 이내로 입력해주세요.",
        type: "warning"
      });
    }
    if (sBody.trim() == "") {
      return showMessage({
        message: "제안 내용을 입력해주세요.",
        type: "warning"
      });
    }
    insert({
      variables: {
        sTitle,
        sContext,
        sBody,
        board_id,
        user_id,
        closingMethod
      }
    })
      .then(res => alert(JSON.stringify(res.data)))
      .then(e => props.navigation.goBack());
  }
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  function onPopupEvent(eventName, index) {
    if (eventName !== "itemSelected") return;
    switch (index) {
      // case 0:
      // case 3:
      //   return;
      default:
        return alert(index);
    }
  }
  return (
    <>
      <HeaderNew insert={insertPressHandler} />
      <ViewRowLeft style={{ paddingHorizontal: 30 }}>
        <Image source={iconHome} />
        <Image source={iconNavi} style={{ paddingHorizontal: 5 }} />
        <Text
          style={{
            fontSize: 13,
            lineHeight: 26,
            textAlign: "left",
            color: "#888888",
            paddingHorizontal: 2
          }}
        >
          제안 게시판
        </Text>
      </ViewRowLeft>
      <View style={{ paddingHorizontal: 28 }}>
        <Text
          style={{
            fontSize: 22,
            textAlign: "left",
            color: "#333333"
          }}
        >
          글 쓰기
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "stretch" }}>
        <ViewRow style={{ height: 50 }}>
          <Text>제안명*</Text>
          <TextInput
            value={sTitle}
            autoFocus
            onChange={e => setSTitle(e.nativeEvent.text)}
            style={{ flex: 1, textAlign: "right" }}
          />
        </ViewRow>
        <ViewRow>
          <Text>종료 방법</Text>
          <RNPickerSelect
            style={{ height: 50, flex: 1, justifyContent: "space-between" }}
            value={closingMethod}
            onValueChange={i => setClosingMethod(i)}
            items={options}
            placeholder={{}}
          />
        </ViewRow>
        <View style={{ flex: 1, padding: 20 }}>
          <Text>제안 배경</Text>
          <TextInput
            value={sContext}
            multiline
            textAlignVertical="top"
            placeholder="제안 배경을 입력해 주세요"
            onChange={e => setSContext(e.nativeEvent.text)}
            style={{ backgroundColor: "lightyellow", flex: 1, padding: 20 }}
          />
          <Text>제안 내용</Text>
          <TextInput
            value={sBody}
            multiline
            textAlignVertical="top"
            placeholder="제안 내용을 입력해 주세요"
            onChange={e => setSBody(e.nativeEvent.text)}
            style={{ backgroundColor: "lightgreen", flex: 1, padding: 20 }}
          />
        </View>
      </View>
    </>
  );
};
