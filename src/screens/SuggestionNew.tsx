import React from "react";
import { Image, StyleProp, TextStyle } from "react-native";
import { StackHeaderProps } from "@react-navigation/stack";
import RNPickerSelect from "react-native-picker-select";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "@apollo/react-hooks";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import HeaderNew from "../components/HeaderNew";
import { View, ViewRow, ViewRowLeft } from "../components/View";
import { TOEasy } from "../components/TouchableOpacity";
import TouchableClosingMethod from "../components/TouchableClosingMethod";
import LineSeperator from "../components/LineSeperator";

import { useStore } from "../Store";
import { insertSuggestion } from "../graphql/mutation";

import iconHome from "../../assets/iconHome.png";
import iconNavi from "../../assets/iconNavi.png";

const options = [
  { label: "30일 후 종료", value: 0 },
  { label: "멤버 과반수 동의시 종료", value: 1 },
  { label: "제안 정리시 종료", value: 2 }
];
const labelStyle: StyleProp<TextStyle> = {
  fontSize: 13,
  textAlign: "left",
  color: "#30ad9f",
  width: 80
};
const textStyle: StyleProp<TextStyle> = {
  fontSize: 16,
  textAlign: "left",
  color: "#555555",
  paddingHorizontal: 0,
  flex: 1
};

export default (props: StackHeaderProps) => {
  const [insert, { loading }] = useMutation(insertSuggestion);
  const [{ board_id, user_id }, dispatch] = useStore();
  const [sTitle, setSTitle] = React.useState("");
  const [sContext, setSContext] = React.useState("");
  const [sBody, setSBody] = React.useState("");
  const [closingMethod, setClosingMethod] = React.useState(0);
  const contextRef = React.useRef(null);
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

  return (
    <>
      <HeaderNew insert={insertPressHandler} />
      <ViewRowLeft style={{ paddingHorizontal: 30 }}>
        <Image source={iconHome} />
        <Image source={iconNavi} style={{ paddingHorizontal: 5 }} />
        <Text
          style={{
            fontSize: 13,
            textAlign: "left",
            color: "#888888",
            paddingHorizontal: 2
          }}
        >
          제안 게시판
        </Text>
      </ViewRowLeft>
      <View
        style={{ paddingHorizontal: 28, paddingBottom: 30, paddingTop: 20 }}
      >
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
      <View
        style={{
          alignItems: "stretch",
          borderRadius: 25,
          backgroundColor: "#ffffff",
          shadowColor: "rgba(0, 0, 0, 0.15)",
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowRadius: 1,
          shadowOpacity: 1
        }}
      >
        <ViewRowLeft style={{ paddingHorizontal: 30 }}>
          <Text style={[labelStyle, { paddingVertical: 24 }]}>제안명</Text>
          <TextInput
            value={sTitle}
            autoFocus
            onChangeText={setSTitle}
            placeholderTextColor="#999999"
            style={textStyle}
            onSubmitEditing={() => contextRef.current.focus()}
          />
        </ViewRowLeft>
        <LineSeperator />
        <ViewRowLeft
          style={{
            paddingHorizontal: 30
          }}
        >
          <Text style={labelStyle}>종료 방법</Text>
          <TouchableClosingMethod
            value={closingMethod}
            onChange={setClosingMethod}
            items={options}
          />
        </ViewRowLeft>
      </View>
      <View
        style={{
          marginTop: 10,
          alignItems: "stretch",
          borderRadius: 25,
          backgroundColor: "#ffffff",
          shadowColor: "rgba(0, 0, 0, 0.15)",
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowRadius: 1,
          shadowOpacity: 1,
          flex: 1
        }}
      >
        <View style={{ padding: 30, paddingBottom: 20, flex: 1 }}>
          <Text style={[labelStyle, { paddingBottom: 19 }]}>제안 배경</Text>
          <AutoGrowingTextInput
            value={sContext}
            multiline
            textAlignVertical="top"
            placeholder="제안 배경을 입력해 주세요"
            placeholderTextColor="#999999"
            onChangeText={setSContext}
            style={[textStyle]}
            ref={contextRef}
          />
        </View>
        <LineSeperator />
        <View
          style={{
            padding: 30,
            paddingBottom: 20,
            flex: 1
          }}
        >
          <Text style={[labelStyle, { paddingBottom: 19 }]}>제안 내용</Text>
          <AutoGrowingTextInput
            value={sBody}
            multiline
            textAlignVertical="top"
            placeholder="제안 내용을 입력해 주세요"
            placeholderTextColor="#999999"
            onChangeText={setSBody}
            style={[textStyle]}
          />
        </View>
        <LineSeperator />
        <ViewRow style={{ padding: 22 }}>
          <TOEasy>
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                color: "#30ad9f"
              }}
            >
              사진 첨부
            </Text>
          </TOEasy>
          <View
            style={{
              width: 1,
              height: 11,
              backgroundColor: "#e4e4e4"
            }}
          />
          <TOEasy>
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                color: "#30ad9f",
                flex: 1
              }}
            >
              파일 첨부
            </Text>
          </TOEasy>
        </ViewRow>
      </View>
    </>
  );
};
