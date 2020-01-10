import React from "react";
import { Picker } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { View, ViewRow } from "../components/View";
import { TouchableOpacity } from "../components/TouchableOpacity";
import { useMutation } from "@apollo/react-hooks";
import { useStore } from "../Store";
import { updateSuggestion } from "../graphql/mutation";
import Spinner from "react-native-loading-spinner-overlay";

export default (props: NavigationStackScreenProps<{ suggestion: any }>) => {
  const suggestion = props.navigation.getParam("suggestion");
  const { id } = suggestion;
  const [sTitle, setSTitle] = React.useState(suggestion.title);
  const [sContext, setSContext] = React.useState(suggestion.context);
  const [sBody, setSBody] = React.useState(suggestion.body);
  const [closingMethod, setClosingMethod] = React.useState(
    suggestion.closing_method
  );
  const [{ user_id }] = useStore();
  const [update, { loading }] = useMutation(updateSuggestion, {
    variables: {
      sBody,
      sTitle,
      sContext,
      closingMethod,
      id,
      user_id
    }
  });
  return (
    <>
      <ViewRow>
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
          onPress={e =>
            update()
              .then(res => alert(JSON.stringify(res.data)))
              .then(e => props.navigation.goBack())
          }
          style={{ flex: 1, alignItems: "center", padding: 20 }}
        >
          <Text style={{ color: "blue", fontSize: 20 }}>등록</Text>
        </TouchableOpacity>
      </ViewRow>
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
