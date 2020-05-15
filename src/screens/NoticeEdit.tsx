import React from "react";
import { StyleProp, TextStyle, Keyboard } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "@apollo/react-hooks";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as DocumentPicker from "expo-document-picker";

import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import { Text, Title22 } from "../components/Text";
import { TextInput } from "../components/TextInput";
import HeaderConfirm from "../components/HeaderConfirm";
import { View, ViewRow } from "../components/View";
import { TO0 } from "../components/TouchableOpacity";
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

const labelStyle: StyleProp<TextStyle> = {
  fontSize: 13,
  textAlign: "left",
  color: "#12BD8E",
  width: 80,
};

export default function NoticeEdit(props: {
  navigation: StackNavigationProp<RootStackParamList, "NoticeEdit">;
  route: RouteProp<RootStackParamList, "NoticeEdit">;
}) {
  const notice = props.route.params.notice;
  const { id } = notice;
  const [title, setTitle] = React.useState(notice.title);
  const [body, setBody] = React.useState(notice.body);
  const [imageArr, setImageArr] = React.useState<Array<ImageInfo>>(
    notice.images ?? []
  );
  const [fileArr, setFileArr] = React.useState<Array<File>>(notice.files ?? []);
  const contextRef = React.useRef(null);
  const scrollRef = React.useRef(null);
  const [, dispatch] = useStore();
  const { goBack } = useNavigation();
  const [update, { loading }] = useMutation(updatePost);
  async function imageUploadHandler() {
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

  async function fileUploadHandler() {
    const file = await DocumentPicker.getDocumentAsync();
    const { type, ...rest } = file;
    if (type === "success") {
      setFileArr([...fileArr, rest as File]);
    }
  }

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
    setTitle(notice.title);
    setBody(notice.body);
    setImageArr(notice.images ?? []);
    setFileArr(notice.files ?? []);
  }, [notice]);
  return (
    <>
      <HeaderConfirm onPress={updateHandler} />
      <KeyboardAwareScrollView ref={scrollRef}>
        <HeaderBreadcrumb boardName={notice.board.title} />
        <View
          style={{ paddingHorizontal: 28, paddingBottom: 30, paddingTop: 20 }}
        >
          <Title22>글 쓰기</Title22>
        </View>
        <View style={bgStyle}>
          <ViewRow style={{ paddingHorizontal: 30 }}>
            <Text style={[labelStyle, { paddingVertical: 15 }]}>제목</Text>
            <TextInput
              value={title}
              autoFocus
              onChangeText={setTitle}
              placeholderTextColor="#999999"
              style={textStyle}
              onSubmitEditing={() => contextRef.current.focus()}
            />
          </ViewRow>
        </View>
        <View style={[bgStyle, { marginTop: 10 }]}>
          <View
            style={{
              padding: 30,
              paddingBottom: 20,
              flex: 1,
            }}
          >
            <Text style={[labelStyle, { paddingBottom: 10 }]}>내용 입력</Text>
            <AutoGrowingTextInput
              value={body}
              multiline
              textAlignVertical="top"
              placeholder="내용을 입력해 주세요"
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
            onFile={fileUploadHandler}
            onImage={imageUploadHandler}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
