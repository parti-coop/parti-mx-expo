import React from "react";
import { StyleProp, TextStyle, Image } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "@apollo/react-hooks";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibraryAsync } from "expo-image-picker";

import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import { Text, Title22, Mint16 } from "../components/Text";
import { TextInput } from "../components/TextInput";
import HeaderConfirm from "../components/HeaderConfirm";
import { View, ViewRow, V0 } from "../components/View";
import { TO1, TO0 } from "../components/TouchableOpacity";
import TouchableClosingMethod from "../components/TouchableClosingMethod";
import LineSeperator from "../components/LineSeperator";
import HeaderSuggestion from "../components/HeaderSuggestion";

import { useStore } from "../Store";
import { insertSuggestion } from "../graphql/mutation";

const options = [
  { label: "30일 후 종료", value: 0 },
  // { label: "멤버 과반수 동의시 종료", value: 1 },
  // { label: "제안 정리시 종료", value: 2 }
];
const labelStyle: StyleProp<TextStyle> = {
  fontSize: 13,
  textAlign: "left",
  color: "#30ad9f",
  width: 80,
};
const textStyle: StyleProp<TextStyle> = {
  fontSize: 16,
  textAlign: "left",
  color: "#555555",
  paddingHorizontal: 0,
  flex: 1,
};

export default () => {
  const [insert, { loading }] = useMutation(insertSuggestion);
  const [{ board_id, user_id, group_id }, dispatch] = useStore();
  const [sTitle, setSTitle] = React.useState("");
  const [sContext, setSContext] = React.useState("");
  const [sBody, setSBody] = React.useState("");
  const [closingMethod, setClosingMethod] = React.useState(0);
  const [imageArr, setImageArr] = React.useState([]);
  const contextRef = React.useRef(null);
  const scrollRef = React.useRef(null);

  const { navigate } = useNavigation();
  function resetInput() {
    setSTitle("");
    setSContext("");
    setSBody("");
    // Keyboard.dismiss();
  }
  async function addImage() {
    return launchImageLibraryAsync({
      quality: 1,
    }).then((res) => {
      if (res.cancelled !== true) {
        setImageArr([...imageArr, res]);
      }
    });
  }
  async function insertPressHandler() {
    if (sTitle.trim() == "" || sTitle.trim().length > 20) {
      return showMessage({
        message: "제안명을 20자 이내로 입력해주세요.",
        type: "warning",
      });
    }
    if (sBody.trim() == "") {
      return showMessage({
        message: "제안 내용을 입력해주세요.",
        type: "warning",
      });
    }
    await insert({
      variables: {
        sTitle,
        sContext,
        sBody,
        board_id,
        group_id,
        user_id,
        closingMethod,
      },
    });
    resetInput();
    navigate("SuggestionList");
  }
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  return (
    <>
      <HeaderConfirm onPress={insertPressHandler} />
      <KeyboardAwareScrollView ref={scrollRef}>
        <HeaderSuggestion />
        <View
          style={{ paddingHorizontal: 28, paddingBottom: 30, paddingTop: 20 }}
        >
          <Title22>글 쓰기</Title22>
        </View>
        <View
          style={{
            alignItems: "stretch",
            borderRadius: 25,
            backgroundColor: "#ffffff",
            shadowColor: "rgba(0, 0, 0, 0.15)",
            elevation: 1,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowRadius: 1,
            shadowOpacity: 1,
          }}
        >
          <ViewRow style={{ paddingHorizontal: 30 }}>
            <Text style={[labelStyle, { paddingVertical: 24 }]}>제안명</Text>
            <TextInput
              value={sTitle}
              autoFocus
              onChangeText={setSTitle}
              placeholderTextColor="#999999"
              style={[textStyle]}
              onSubmitEditing={() => contextRef.current.focus()}
              placeholder="제안명을 입력해 주세요"
            />
          </ViewRow>
          <LineSeperator />
          <ViewRow style={{ paddingHorizontal: 30 }}>
            <Text style={labelStyle}>종료 방법</Text>
            <TouchableClosingMethod
              value={closingMethod}
              onChange={setClosingMethod}
              items={options}
            />
          </ViewRow>
        </View>
        <View
          style={{
            marginTop: 10,
            alignItems: "stretch",
            borderRadius: 25,
            backgroundColor: "#ffffff",
            shadowColor: "rgba(0, 0, 0, 0.15)",
            elevation: 1,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowRadius: 1,
            shadowOpacity: 1,
            flex: 1,
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
              flex: 1,
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
          {imageArr.length > 0 && (
            <>
              <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
                {imageArr.map((o, i) => (
                  <TO0 key={i} style={{ marginBottom: 10 }}>
                    <Image
                      source={o}
                      resizeMode="cover"
                      style={{ width: "100%", height: 186 }}
                    />
                  </TO0>
                ))}
              </View>
              <LineSeperator />
            </>
          )}
          <ViewRow style={{ padding: 22 }}>
            <TO1 onPress={addImage}>
              <Mint16 style={{ textAlign: "center" }}>사진 첨부</Mint16>
            </TO1>
            <View
              style={{
                width: 1,
                height: 11,
                backgroundColor: "#e4e4e4",
              }}
            />
            <TO1>
              <Mint16 style={{ textAlign: "center", flex: 1 }}>
                파일 첨부
              </Mint16>
            </TO1>
          </ViewRow>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};
