import React from "react";
import { Keyboard } from "react-native";
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
import CandidateEdit, {
  removingIds,
  addingCandidates,
} from "../components/CandidateEdit";
import TouchableClosingMethod from "../components/TouchableClosingMethod";

import { uploadGetUriArray } from "../firebase";
import { File } from "../types";
import { useStore } from "../Store";
import { updateVote } from "../graphql/mutation";

export default function VoteEdit(props: {
  navigation: StackNavigationProp<RootStackParamList, "VoteEdit">;
  route: RouteProp<RootStackParamList, "VoteEdit">;
}) {
  const { vote } = props.route.params;
  const [update, { loading }] = useMutation(updateVote);
  const [, dispatch] = useStore();
  const [title, setTitle] = React.useState(vote.title);
  const [body, setBody] = React.useState(vote.body);
  const [candidates, setCandidates] = React.useState(
    [...vote.candidates] ?? []
  );
  const [isBinary, setBinary] = React.useState(vote.metadata.isBinary ?? false);
  const [isMultiple, setMultiple] = React.useState(
    vote.metadata.isMultiple ?? false
  );
  const [isAnonymous, setAnonymous] = React.useState(
    vote.metadata.isAnonymous ?? false
  );
  const [isResultHidden, setResultHidden] = React.useState(
    vote.metadata.isResultHidden ?? false
  );
  const [closingMethod, setClosingMethod] = React.useState(
    vote.metadata.closingMethod ?? "3days"
  );
  const [imageArr, setImageArr] = React.useState<Array<ImageInfo | undefined>>(
    vote.images ?? []
  );
  const [fileArr, setFileArr] = React.useState<Array<File>>(vote.files ?? []);
  const contextRef = React.useRef(null);
  const scrollRef = React.useRef(null);
  const { goBack } = useNavigation();

  function resetInput() {
    setTitle(vote.title);
    setBody(vote.body);
    setClosingMethod(vote.metadata?.closingMethod ?? "3days");
    setResultHidden(vote.metadata?.isResultHidden ?? false);
    setAnonymous(vote.metadata?.isAnonymous ?? false);
    setMultiple(vote.metadata?.isMultiple ?? false);
    setBinary(vote.metadata?.isBinary ?? false);
    setImageArr(vote.images ?? []);
    setFileArr(vote.files ?? []);
    setCandidates([...vote.candidates] ?? []);
    removingIds.length = 0;
    for (let i in addingCandidates) {
      delete addingCandidates[i];
    }
  }
  React.useEffect(() => {
    if (isBinary) {
      setMultiple(false);
    }
  }, [isBinary]);
  useFocusEffect(React.useCallback(resetInput, [vote]));

  async function insertPressHandler() {
    if (!title.trim()) {
      return showMessage({
        message: "투표명을 입력해주세요.",
        type: "warning",
      });
    }
    if (title?.trim()?.length > 20) {
      return showMessage({
        message: "투표명을 20자 이내로 입력해주세요.",
        type: "warning",
      });
    }
    if (!body?.trim()) {
      return showMessage({
        message: "투표 내용을 입력해주세요.",
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
    const candidateArray = [];
    for (const body in addingCandidates) {
      const order = addingCandidates[body];
      candidateArray.push({ order, body, post_id: vote.id });
    }
    console.log(candidateArray, removingIds, addingCandidates);
    await update({
      variables: {
        body,
        title,
        metadata: {
          isBinary,
          isMultiple,
          isAnonymous,
          closingMethod,
          isResultHidden,
        },
        id: vote.id,
        images,
        files,
        candidates: candidateArray,
        deletingIds: removingIds,
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

  return (
    <>
      <HeaderConfirm onPress={insertPressHandler} />
      <KeyboardAwareScrollView ref={scrollRef}>
        <HeaderBreadcrumb boardName={vote.board.title} />
        <View
          style={{ paddingHorizontal: 28, paddingBottom: 30, paddingTop: 20 }}
        >
          <Title22>투표 수정</Title22>
        </View>
        <View style={bgStyle}>
          <ViewRow style={{ paddingHorizontal: 30 }}>
            <Mint13 style={{ paddingVertical: 15, width: 80 }}>
              투표 제목*
            </Mint13>
            <TextInput
              value={title}
              autoFocus
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
              <CandidateEdit values={candidates} setValues={setCandidates} />
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
