import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "@apollo/react-hooks";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import {
  useNavigation,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import { Text, Title22 } from "../components/Text";
import { TextInput } from "../components/TextInput";
import HeaderConfirm from "../components/HeaderConfirm";
import { View, ViewRow } from "../components/View";
import TouchableClosingMethod from "../components/TouchableClosingMethod";
import { LineSeperator } from "../components/LineDivider";
import HeaderBreadcrumb from "../components/HeaderBreadcrumb";
import { ImageInfo } from "expo-image-picker/src/ImagePicker.types";
import { bgStyle, textStyle } from "../components/Styles";
import BottomImageFile from "../components/BottomImageFile";
import ViewNewImageFile from "../components/ViewNewImageFile";

import { useStore } from "../Store";
import { updatePost } from "../graphql/mutation";
import { RootStackParamList } from "./AppContainer";
import { uploadGetUriArray } from "../firebase";
import { File } from "../types";

const options = [
  { label: "30일 후 종료", value: 0 },
  // { label: "멤버 과반수 동의시 종료", value: 1 }
  // { label: "제안 정리시 종료", value: 2 }
];
const labelStyle: StyleProp<TextStyle> = {
  fontSize: 13,
  textAlign: "left",
  color: "#12BD8E",
  width: 80,
};

export default function SuggestionEdit(props: {
  navigation: StackNavigationProp<RootStackParamList, "SuggestionEdit">;
  route: RouteProp<RootStackParamList, "SuggestionEdit">;
}) {
  const suggestion = props.route.params.suggestion;
  const { id } = suggestion;
  const [title, setTitle] = React.useState(suggestion.title);
  const [sContext, setSContext] = React.useState(suggestion.context);
  const [body, setBody] = React.useState(suggestion.body);
  const [closingMethod, setClosingMethod] = React.useState(
    suggestion.metadata?.closingMethod ?? 0
  );
  const [imageArr, setImageArr] = React.useState<Array<ImageInfo>>(
    suggestion.images ?? []
  );
  const [fileArr, setFileArr] = React.useState<Array<File>>(
    suggestion.files ?? []
  );
  const contextRef = React.useRef(null);
  const scrollRef = React.useRef(null);
  const [, dispatch] = useStore();
  const { goBack } = useNavigation();
  const [update, { loading }] = useMutation(updatePost);

  async function updateHandler() {
    dispatch({ type: "SET_LOADING", loading: true });
    let images = null;
    if (imageArr.length > 0) {
      const urlArr = await Promise.all(imageArr.map(uploadGetUriArray));
      images = urlArr;
    }
    let files = null;
    if (fileArr.length > 0) {
      const urlArr = await Promise.all(fileArr.map(uploadGetUriArray));
      files = urlArr;
    }
    await update({
      variables: {
        body,
        title,
        sContext,
        metadata: { closingMethod },
        id,
        images,
        files,
      },
    });
    showMessage({
      message: "수정되었습니다.",
      type: "success",
    });
    goBack();
  }
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  function resetInput() {
    setTitle(suggestion.title);
    setSContext(suggestion.context);
    setBody(suggestion.body);
    setClosingMethod(suggestion.metadata?.closingMethod ?? 0);
    setImageArr(suggestion.images ?? []);
    setFileArr(suggestion.files ?? []);
  }
  useFocusEffect(React.useCallback(resetInput, [suggestion]));
  return (
    <>
      <HeaderConfirm onPress={updateHandler} />
      <KeyboardAwareScrollView ref={scrollRef}>
        <HeaderBreadcrumb boardName={suggestion.board.title} />
        <View
          style={{ paddingHorizontal: 28, paddingBottom: 30, paddingTop: 20 }}
        >
          <Title22>글 쓰기</Title22>
        </View>
        <View style={bgStyle}>
          <ViewRow style={{ paddingHorizontal: 30 }}>
            <Text style={[labelStyle, { paddingVertical: 15 }]}>제안명</Text>
            <TextInput
              value={title}
              autoFocus
              onChangeText={setTitle}
              placeholderTextColor="#999999"
              style={textStyle}
              onSubmitEditing={() => contextRef.current.focus()}
            />
          </ViewRow>
          <LineSeperator />
          <ViewRow
            style={{
              paddingHorizontal: 30,
            }}
          >
            <Text style={[labelStyle, { paddingVertical: 15 }]}>종료 방법</Text>
            <TouchableClosingMethod
              value={closingMethod}
              onChange={setClosingMethod}
              items={options}
            />
          </ViewRow>
        </View>
        <View style={[bgStyle, { marginTop: 10 }]}>
          <View style={{ padding: 30, paddingBottom: 20, flex: 1 }}>
            <Text style={[labelStyle, { paddingBottom: 10 }]}>제안 배경</Text>
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
              padding: 30,
              paddingBottom: 20,
              flex: 1,
            }}
          >
            <Text style={[labelStyle, { paddingBottom: 10 }]}>제안 내용</Text>
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
