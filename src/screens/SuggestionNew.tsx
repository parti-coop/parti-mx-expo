import React from "react";
import {} from "react-native";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "@apollo/react-hooks";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ImageInfo } from "expo-image-picker/src/ImagePicker.types";
import { RootStackParamList } from "./AppContainer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import { Title22, Mint13 } from "../components/Text";
import { TextInput } from "../components/TextInput";
import HeaderConfirm from "../components/HeaderConfirm";
import { View, ViewRow } from "../components/View";
import TouchableClosingMethod from "../components/TouchableClosingMethod";
import { LineSeperator } from "../components/LineDivider";
import HeaderBreadcrumb from "../components/HeaderBreadcrumb";
import BottomImageFile from "../components/BottomImageFile";
import { bgStyle, textStyle } from "../components/Styles";
import ViewNewImageFile from "../components/ViewNewImageFile";

import { File } from "../types";
import { uploadGetUriArray } from "../firebase";
import { useStore } from "../Store";
import { insertPost } from "../graphql/mutation";

const options = [
  { label: "30일 후 종료", value: "30days" },
  // { label: "멤버 과반수 동의시 종료", value: 1 },
  // { label: "제안 정리시 종료", value: 2 }
];

export default function SuggestionNew(props: {
  navigation: StackNavigationProp<RootStackParamList, "SuggestionNew">;
  route: RouteProp<RootStackParamList, "SuggestionNew">;
}) {
  const { boardId, boardName } = props.route.params;
  const [insert, { loading }] = useMutation(insertPost);
  const [{ group_id }, dispatch] = useStore();
  const [title, setTitle] = React.useState("");
  const [sContext, setSContext] = React.useState("");
  const [body, setBody] = React.useState("");
  const [closingMethod, setClosingMethod] = React.useState("30days");
  const [imageArr, setImageArr] = React.useState<Array<ImageInfo | undefined>>(
    []
  );
  const [fileArr, setFileArr] = React.useState<Array<File>>([]);
  const contextRef = React.useRef(null);
  const scrollRef = React.useRef(null);

  const { navigate } = useNavigation();
  function resetInput() {
    setTitle("");
    setSContext("");
    setBody("");
    setImageArr([]);
    setFileArr([]);
  }
  useFocusEffect(
    React.useCallback(() => {
      return resetInput;
    }, [])
  );

  async function insertPressHandler() {
    if (!title.trim()) {
      return showMessage({
        message: "제안명을 입력해주세요.",
        type: "warning",
      });
    }
    if (!body?.trim()) {
      return showMessage({
        message: "제안 내용을 입력해주세요.",
        type: "warning",
      });
    }
    if (!sContext?.trim()) {
      return showMessage({
        message: "제안 배경을 입력해주세요.",
        type: "warning",
      });
    }
    let images = null;
    dispatch({ type: "SET_LOADING", loading: true });
    if (imageArr.length > 0) {
      const urlArr = await Promise.all(imageArr.map(uploadGetUriArray));
      images = urlArr;
    }
    let files = null;
    if (fileArr.length > 0) {
      const urlArr = await Promise.all(fileArr.map(uploadGetUriArray));
      files = urlArr;
    }
    await insert({
      variables: {
        title,
        sContext,
        body,
        board_id: boardId,
        group_id,
        metadata: { closingMethod },
        images,
        files,
      },
    });

    navigate("SuggestionList");
  }
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  return (
    <>
      <HeaderConfirm onPress={insertPressHandler} />
      <KeyboardAwareScrollView ref={scrollRef}>
        <HeaderBreadcrumb boardName={boardName} />
        <View
          style={{ paddingHorizontal: 28, paddingBottom: 30, paddingTop: 20 }}
        >
          <Title22>글 쓰기</Title22>
        </View>
        <View style={bgStyle}>
          <ViewRow style={{ paddingHorizontal: 30 }}>
            <Mint13 style={{ paddingVertical: 15, width: 80 }}>제안명</Mint13>
            <TextInput
              value={title}
              maxLength={50}
              autoFocus
              onChangeText={setTitle}
              placeholderTextColor="#999999"
              style={[textStyle]}
              onSubmitEditing={() => contextRef.current.focus()}
              placeholder="제안명을 입력해 주세요"
            />
          </ViewRow>
          <LineSeperator />
          <ViewRow style={{ paddingHorizontal: 30 }}>
            <Mint13 style={{ paddingVertical: 15, width: 80 }}>
              종료 방법
            </Mint13>
            <TouchableClosingMethod
              value={closingMethod}
              onChange={setClosingMethod}
              items={options}
            />
          </ViewRow>
        </View>
        <View style={[bgStyle, { marginTop: 10 }]}>
          <View style={{ paddingHorizontal: 30, paddingVertical: 20, flex: 1 }}>
            <Mint13 style={{ paddingBottom: 10 }}>제안 배경</Mint13>
            <AutoGrowingTextInput
              value={sContext}
              multiline
              textAlignVertical="top"
              placeholder="제안 배경을 입력해 주세요"
              placeholderTextColor="#999999"
              onChangeText={setSContext}
              style={[textStyle, { minHeight: 50 }]}
              ref={contextRef}
            />
          </View>
          <LineSeperator />
          <View
            style={{
              paddingHorizontal: 30,
              paddingVertical: 20,
              flex: 1,
            }}
          >
            <Mint13 style={{ paddingBottom: 10 }}>제안 내용</Mint13>
            <AutoGrowingTextInput
              value={body}
              multiline
              textAlignVertical="top"
              placeholder="제안 내용을 입력해 주세요"
              placeholderTextColor="#999999"
              onChangeText={setBody}
              style={[textStyle, { minHeight: 180 }]}
            />
          </View>
          <LineSeperator />
          <ViewNewImageFile
            imageArr={imageArr}
            fileArr={fileArr}
            setFileArr={setFileArr}
            setImageArr={setImageArr}
          />
          <BottomImageFile
            imageArr={imageArr}
            fileArr={fileArr}
            setFileArr={setFileArr}
            setImageArr={setImageArr}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
