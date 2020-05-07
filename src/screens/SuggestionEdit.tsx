import React from "react";
import {
  StyleProp,
  TextStyle,
  Keyboard,
  Vibration,
  Alert,
  ViewStyle,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "@apollo/react-hooks";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as DocumentPicker from "expo-document-picker";

import { Image } from "../components/Image";
import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import { Text, Mint13, Body16, Mint16 } from "../components/Text";
import { TextInput } from "../components/TextInput";
import HeaderConfirm from "../components/HeaderConfirm";
import { View, ViewRow } from "../components/View";
import { TO1, TO0, TWF0 } from "../components/TouchableOpacity";
import TouchableClosingMethod from "../components/TouchableClosingMethod";
import { LineSeperator, SmallVerticalDivider } from "../components/LineDivider";
import HeaderBreadcrumb from "../components/HeaderBreadcrumb";
import { ImageInfo } from "expo-image-picker/src/ImagePicker.types";

import { useStore } from "../Store";
import { updatePost } from "../graphql/mutation";
import { RootStackParamList } from "./AppContainer";
import { uploadFileUUID } from "../firebase";
import { File } from "../types";

import iconClosed from "../../assets/iconClosed.png";

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
const textStyle: StyleProp<TextStyle> = {
  fontSize: 16,
  textAlign: "left",
  color: "#555555",
  paddingHorizontal: 0,
  flex: 1,
};
const bgStyle: StyleProp<ViewStyle> = {
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
};
function promiseArray(o: ImageInfo | File) {
  return new Promise(async function (res) {
    let uri = o.uri;
    if (uri.startsWith("file://")) {
      uri = await uploadFileUUID(o.uri, "posts").then((snap) =>
        snap.ref.getDownloadURL()
      );
    }
    return res({ ...o, uri });
  });
}

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
  async function addImage() {
    Keyboard.dismiss();
    return launchImageLibraryAsync({
      quality: 1,
    }).then(({ cancelled, ...res }) => {
      if (cancelled !== true) {
        setImageArr([...imageArr, res as ImageInfo]);
        Keyboard.dismiss();
      }
    });
  }
  async function fileDeleteHandler(fileIndex: number) {
    return Alert.alert("파일 삭제", "해당 파일을 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "삭제!",
        onPress: function () {
          fileArr.splice(fileIndex, 1);
          setFileArr([...fileArr]);
        },
      },
    ]);
  }
  async function fileUploadHandler() {
    const file = await DocumentPicker.getDocumentAsync();
    const { type, ...rest } = file;
    if (type === "success") {
      setFileArr([...fileArr, rest as File]);
    }
  }
  async function longpressHandler(imageIndex: number) {
    Keyboard.dismiss();
    Vibration.vibrate(100);
    return Alert.alert("이미지 삭제", "해당 이미지를 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "삭제!",
        onPress: function () {
          imageArr.splice(imageIndex, 1);
          setImageArr([...imageArr]);
        },
      },
    ]);
  }
  async function updateHandler() {
    dispatch({ type: "SET_LOADING", loading: true });
    let images = null;
    if (imageArr.length > 0) {
      const urlArr = await Promise.all(imageArr.map(promiseArray));
      images = urlArr;
    }
    let files = null;
    if (fileArr.length > 0) {
      const urlArr = await Promise.all(fileArr.map(promiseArray));
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
  React.useEffect(() => {
    setTitle(suggestion.title);
    setSContext(suggestion.context);
    setBody(suggestion.body);
    setClosingMethod(suggestion.metadata?.closingMethod ?? 0);
    setImageArr(suggestion.images ?? []);
    setFileArr(suggestion.files ?? []);
  }, [suggestion]);
  return (
    <>
      <HeaderConfirm onPress={updateHandler} />
      <KeyboardAwareScrollView ref={scrollRef}>
        <HeaderBreadcrumb boardName={suggestion.board.title} />
        <View
          style={{ paddingHorizontal: 28, paddingBottom: 30, paddingTop: 20 }}
        >
          <Text
            style={{
              fontSize: 22,
              textAlign: "left",
              color: "#333333",
            }}
          >
            글 쓰기
          </Text>
        </View>
        <View style={bgStyle}>
          <ViewRow style={{ paddingHorizontal: 30 }}>
            <Text style={[labelStyle, { paddingVertical: 24 }]}>제안명</Text>
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
            <Text style={labelStyle}>종료 방법</Text>
            <TouchableClosingMethod
              value={closingMethod}
              onChange={setClosingMethod}
              items={options}
            />
          </ViewRow>
        </View>
        <View style={[bgStyle, { marginTop: 10 }]}>
          <View style={{ padding: 30, paddingBottom: 20, flex: 1 }}>
            <Text style={[labelStyle, { paddingBottom: 19 }]}>제안 배경</Text>
            <AutoGrowingTextInput
              value={sContext}
              multiline
              textAlignVertical="top"
              placeholder="제안 배경을 입력해 주세요"
              placeholderTextColor="#999999"
              onChangeText={setSContext}
              style={[textStyle, , { minHeight: 50 }]}
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
          {imageArr?.length > 0 && (
            <>
              <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
                {imageArr?.map((o, i) => (
                  <TWF0
                    key={i}
                    style={{ marginBottom: 10 }}
                    onLongPress={() => longpressHandler(i)}
                  >
                    <Image
                      source={o}
                      resizeMode="cover"
                      style={{ width: "100%", height: 186 }}
                    />
                  </TWF0>
                ))}
              </View>
              <LineSeperator />
            </>
          )}
          {fileArr.length > 0 && (
            <>
              <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
                <Mint13 style={{ marginBottom: 20 }}>파일</Mint13>
                {fileArr.map((o, i) => (
                  <ViewRow style={{ marginBottom: 10 }} key={i}>
                    <Body16 style={{ flex: 1, marginRight: 20 }}>
                      {o.name}
                    </Body16>
                    <TO0 key={i} onPress={() => fileDeleteHandler(i)}>
                      <Image source={iconClosed} />
                    </TO0>
                  </ViewRow>
                ))}
              </View>
              <LineSeperator />
            </>
          )}
          <ViewRow style={{ padding: 22 }}>
            <TO1 onPress={addImage}>
              <Mint16 style={{ textAlign: "center" }}>사진 첨부</Mint16>
            </TO1>
            <SmallVerticalDivider />
            <TO1 onPress={fileUploadHandler}>
              <Mint16 style={{ textAlign: "center" }}>파일 첨부</Mint16>
            </TO1>
          </ViewRow>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
