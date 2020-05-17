import React from "react";
import {} from "react-native";
import { showMessage } from "react-native-flash-message";
import { RootStackParamList } from "./AppContainer";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useMutation } from "@apollo/react-hooks";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { useNavigation } from "@react-navigation/native";
import { ImageInfo } from "expo-image-picker/src/ImagePicker.types";

import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import { Title22, Mint13 } from "../components/Text";
import { TextInput } from "../components/TextInput";
import HeaderConfirm from "../components/HeaderConfirm";
import { View, ViewRow } from "../components/View";
import { LineSeperator } from "../components/LineDivider";
import HeaderBreadcrumb from "../components/HeaderBreadcrumb";
import { bgStyle, textStyle } from "../components/Styles";
import BottomImageFile from "../components/BottomImageFile";
import ViewNewImageFile from "../components/ViewNewImageFile";

import { File } from "../types";
import { uploadGetUriArray } from "../firebase";
import { useStore } from "../Store";
import { insertPost } from "../graphql/mutation";

export default function NoticeNew(props: {
  navigation: StackNavigationProp<RootStackParamList, "NoticeNew">;
  route: RouteProp<RootStackParamList, "NoticeNew">;
}) {
  const { boardId, boardName } = props.route.params;
  const [insert, { loading }] = useMutation(insertPost);
  const [{ group_id }, dispatch] = useStore();
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [imageArr, setImageArr] = React.useState<Array<ImageInfo | undefined>>(
    []
  );
  const [fileArr, setFileArr] = React.useState<Array<File>>([]);
  const contextRef = React.useRef(null);
  const scrollRef = React.useRef(null);

  const { navigate } = useNavigation();
  function resetInput() {
    setTitle("");
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
        message: "소식명을 입력해주세요.",
        type: "warning",
      });
    }
    if (title?.trim()?.length > 20) {
      return showMessage({
        message: "소식명을 20자 이내로 입력해주세요.",
        type: "warning",
      });
    }
    if (!body?.trim()) {
      return showMessage({
        message: "소식 내용을 입력해주세요.",
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
        body,
        board_id: boardId,
        group_id,
        images,
        files,
      },
    });

    navigate("NoticeList");
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
            <Mint13 style={{ paddingVertical: 15, width: 80 }}>제목</Mint13>
            <TextInput
              value={title}
              autoFocus
              onChangeText={setTitle}
              placeholderTextColor="#999999"
              style={[textStyle]}
              onSubmitEditing={() => contextRef.current.focus()}
              placeholder="제목을 입력해 주세요"
            />
          </ViewRow>
        </View>
        <View style={[bgStyle, { marginTop: 10 }]}>
          <View
            style={{
              paddingHorizontal: 30,
              paddingVertical: 20,
              flex: 1,
            }}
          >
            <Mint13 style={{ paddingBottom: 10 }}>내용 입력</Mint13>
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
