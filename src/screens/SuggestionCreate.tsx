import React from "react";
import { Picker } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { View, ViewRow } from "../components/View";
import { TouchableOpacity } from "../components/TouchableOpacity";
import { useMutation } from "@apollo/react-hooks";
import { useStore } from "../Store";
import { insertSuggestion } from "../graphql/mutation";
import Spinner from "react-native-loading-spinner-overlay";
import { showMessage } from "react-native-flash-message";
export default (props: NavigationStackScreenProps) => {
  const [insert, { loading }] = useMutation(insertSuggestion);
  const [{ board_id, created_by, updated_by }] = useStore();
  const [sTitle, setSTitle] = React.useState("");
  const [sContext, setSContext] = React.useState("");
  const [sBody, setSBody] = React.useState("");
  const [closingMethod, setClosingMethod] = React.useState(0);
  function insertPressHandler(e) {
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
        created_by,
        updated_by,
        closingMethod
      }
    })
      .then(res => alert(JSON.stringify(res.data)))
      .then(e => props.navigation.goBack());
  }

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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TouchableOpacity
          onPress={e => props.navigation.goBack()}
          style={{ flex: 1, alignItems: "center", padding: 20 }}
        >
          <Text style={{ color: "blue", fontSize: 20 }}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 3, alignItems: "center", padding: 20 }}
        >
          <Text style={{ color: "black", fontSize: 28 }}>제안하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={insertPressHandler}
          style={{ flex: 1, alignItems: "center", padding: 20 }}
        >
          <Text style={{ color: "blue", fontSize: 20 }}>등록</Text>
        </TouchableOpacity>
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
          <Picker
            style={{ height: 50, flex: 1, justifyContent: "space-between" }}
            selectedValue={closingMethod}
            onValueChange={i => setClosingMethod(i)}
          >
            {[
              "30일 후 종료",
              "멤버 과반수 동의시 종료",
              "제안 정리시 종료"
            ].map((g: any, i: number) => (
              <Picker.Item label={g} value={i} key={i} />
            ))}
          </Picker>
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
      <Spinner visible={loading} textContent="로딩중입니다..." />
    </>
  );
};
