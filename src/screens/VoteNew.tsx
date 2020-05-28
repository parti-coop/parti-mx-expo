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
import ToggleBox from "../components/ToggleBox";
import { LineSeperator } from "../components/LineDivider";
import HeaderBreadcrumb from "../components/HeaderBreadcrumb";
import { bgStyle, textStyle } from "../components/Styles";
import BottomImageFile from "../components/BottomImageFile";
import ViewNewImageFile from "../components/ViewNewImageFile";
import CandidateNew from "../components/CandidateNew";
import TouchableClosingMethod from "../components/TouchableClosingMethod";

import { File } from "../types";
import { uploadGetUriArray } from "../firebase";
import { useStore } from "../Store";
import { insertVote } from "../graphql/mutation";

export default function VoteNew(props: {
  navigation: StackNavigationProp<RootStackParamList, "VoteNew">;
  route: RouteProp<RootStackParamList, "VoteNew">;
}) {
  const { boardId, boardName } = props.route.params;
  const [insert, { loading }] = useMutation(insertVote);
  const [{ group_id }, dispatch] = useStore();
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [candidates, setCandidates] = React.useState(["", ""]);
  const [isBinary, setBinary] = React.useState(false);
  const [isMultiple, setMultiple] = React.useState(false);
  const [isAnonymous, setAnonymous] = React.useState(false);
  const [isResultHidden, setResultHidden] = React.useState(false);
  const [closingMethod, setClosingMethod] = React.useState("7days");
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
    setClosingMethod("7days");
    setResultHidden(false);
    setAnonymous(false);
    setMultiple(false);
    setBinary(false);
    setCandidates(["", ""]);
  }
  useFocusEffect(
    React.useCallback(() => {
      return resetInput;
    }, [])
  );

  async function insertPressHandler() {
    if (!title.trim()) {
      return showMessage({
        message: "투표명을 입력해주세요.",
        type: "warning",
      });
    }
    if (!body?.trim()) {
      return showMessage({
        message: "투표 내용을 입력해주세요.",
        type: "warning",
      });
    }

    if (candidates.filter((c) => c.trim().length > 0).length < 2) {
      return showMessage({
        message: "항목을 2개 이상 입력해주세요",
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
    let candidateObjects = candidates.map((c, i) => ({
      body: c,
      order: i + 1,
    }));
    if (isBinary) {
      candidateObjects = [
        { body: "찬성", order: 1 },
        { body: "중립", order: 2 },
        { body: "반대", order: 3 },
        { body: "잘 모르겠습니다", order: 4 },
      ];
    }
    await insert({
      variables: {
        title,
        body,
        board_id: boardId,
        group_id,
        metadata: {
          isBinary,
          isMultiple,
          isAnonymous,
          closingMethod,
          isResultHidden,
        },
        images,
        files,
        candidates: candidateObjects,
      },
    });

    navigate("VoteList");
  }
  React.useEffect(() => {
    if (isBinary) {
      setMultiple(false);
    }
  }, [isBinary]);
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
            <Mint13 style={{ paddingVertical: 15, width: 80 }}>
              투표 제목*
            </Mint13>
            <TextInput
              value={title}
              autoFocus
              maxLength={50}
              onChangeText={setTitle}
              placeholderTextColor="#999999"
              style={[textStyle]}
              onSubmitEditing={() => contextRef.current.focus()}
              placeholder="제목 입력"
            />
          </ViewRow>
          <LineSeperator />
          <ViewRow
            style={{ paddingHorizontal: 30, justifyContent: "space-between" }}
          >
            <Mint13 style={{ width: 80, paddingVertical: 15 }}>
              찬반투표 사용
            </Mint13>
            <ToggleBox value={isBinary} changeHandler={setBinary} />
          </ViewRow>
        </View>
        {!isBinary && (
          <View style={[bgStyle, { marginTop: 10 }]}>
            <View
              style={{ paddingHorizontal: 30, paddingVertical: 20, flex: 1 }}
            >
              <Mint13 style={{}}>투표 항목</Mint13>
              <CandidateNew values={candidates} setValues={setCandidates} />
            </View>
          </View>
        )}
        <View style={[bgStyle, { marginTop: 10 }]}>
          <ViewRow
            style={{ paddingHorizontal: 30, justifyContent: "space-between" }}
          >
            <Mint13 style={{ width: 80, paddingVertical: 15 }}>종료일</Mint13>
            <TouchableClosingMethod
              value={closingMethod}
              onChange={setClosingMethod}
              items={[
                { label: "7일 후 종료", value: "7days" },
                { label: "3일 후 종료", value: "3days" },
                { label: "토론 정리시 종료", value: "manual" },
              ]}
            />
          </ViewRow>
          <LineSeperator />
          {!isBinary && (
            <>
              <ViewRow
                style={{
                  paddingHorizontal: 30,
                  justifyContent: "space-between",
                }}
              >
                <Mint13 style={{ width: 80, paddingVertical: 15 }}>
                  복수 투표
                </Mint13>
                <ToggleBox value={isMultiple} changeHandler={setMultiple} />
              </ViewRow>
              <LineSeperator />
            </>
          )}
          <ViewRow
            style={{ paddingHorizontal: 30, justifyContent: "space-between" }}
          >
            <Mint13 style={{ width: 80, paddingVertical: 15 }}>
              익명 투표
            </Mint13>
            <ToggleBox value={isAnonymous} changeHandler={setAnonymous} />
          </ViewRow>
          <LineSeperator />
          <ViewRow
            style={{ paddingHorizontal: 30, justifyContent: "space-between" }}
          >
            <Mint13 style={{ paddingVertical: 15 }}>
              종료 될 때까지 중간 투표 집계를 숨깁니다.
            </Mint13>
            <ToggleBox value={isResultHidden} changeHandler={setResultHidden} />
          </ViewRow>
        </View>
        <View style={[bgStyle, { marginTop: 10 }]}>
          <View style={{ paddingHorizontal: 30, paddingVertical: 20, flex: 1 }}>
            <Mint13 style={{ paddingBottom: 10 }}>투표 내용</Mint13>
            <AutoGrowingTextInput
              value={body}
              multiline
              textAlignVertical="top"
              placeholder="투표 내용을 입력해 주세요"
              placeholderTextColor="#999999"
              onChangeText={setBody}
              style={[textStyle, { minHeight: 100 }]}
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
