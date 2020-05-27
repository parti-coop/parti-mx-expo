import React from "react";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "@apollo/react-hooks";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ImageInfo } from "expo-image-picker/src/ImagePicker.types";
import { RootStackParamList } from "./AppContainer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import { Title22, Mint13, Body16 } from "../components/Text";
import TouchableCalendar from "../components/TouchableCalendar";
import { TextInput } from "../components/TextInput";
import HeaderConfirm from "../components/HeaderConfirm";
import { View, ViewRow } from "../components/View";
import { LineSeperator } from "../components/LineDivider";
import HeaderBreadcrumb from "../components/HeaderBreadcrumb";
import BottomImageFile from "../components/BottomImageFile";
import { bgStyle, textStyle } from "../components/Styles";
import ViewNewImageFile from "../components/ViewNewImageFile";

import { File } from "../types";
import { uploadGetUriArray } from "../firebase";
import { useStore } from "../Store";
import { insertPost } from "../graphql/mutation";
import { addDays } from "date-fns";

export default function EventNew(props: {
  navigation: StackNavigationProp<RootStackParamList, "EventNew">;
  route: RouteProp<RootStackParamList, "EventNew">;
}) {
  const { boardId, boardName } = props.route.params;
  const [insert, { loading }] = useMutation(insertPost);
  const [{ group_id }, dispatch] = useStore();
  const [title, setTitle] = React.useState("");
  const now = new Date();
  const twoWeeksLater = addDays(now, 14);
  const [eventDate, setEventDate] = React.useState(twoWeeksLater);
  const [deadline, setDeadline] = React.useState(twoWeeksLater);
  const [place, setPlace] = React.useState("");
  const [body, setBody] = React.useState("");
  const [countPeople, setCountPeople] = React.useState(10);
  const [imageArr, setImageArr] = React.useState<Array<ImageInfo | undefined>>(
    []
  );
  const [fileArr, setFileArr] = React.useState<Array<File>>([]);
  const scrollRef = React.useRef(null);
  const { navigate } = useNavigation();
  function resetInput() {
    setTitle("");
    setBody("");
    setEventDate(twoWeeksLater);
    setDeadline(twoWeeksLater);
    setCountPeople(10);
    setPlace("");
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
        message: "모임명을 입력해주세요.",
        type: "warning",
      });
    }
    if (!body?.trim()) {
      return showMessage({
        message: "제안 내용을 입력해주세요.",
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
        metadata: { eventDate, place, deadline, countPeople },
        images,
        files,
      },
    });

    navigate("EventList");
  }
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  function countPeopleHandler(text: string) {
    const no = Number(text) || 0;
    setCountPeople(no);
  }
  const eventEnum = [
    [
      "모임명*",
      <TextInput
        value={title}
        maxLength={50}
        autoFocus
        onChangeText={setTitle}
        placeholderTextColor="#999999"
        style={[textStyle]}
        placeholder="모임명을 입력해 주세요"
      />,
    ],
    ["일시*", <TouchableCalendar useDate={[eventDate, setEventDate]} />],
    [
      "장소",
      <TextInput
        value={place}
        maxLength={50}
        onChangeText={setPlace}
        placeholderTextColor="#999999"
        style={textStyle}
        placeholder="예) 서울 시청 동그라미홀"
      />,
    ],
    [
      "모집인원*",
      <>
        <TextInput
          value={String(countPeople)}
          maxLength={10}
          onChangeText={countPeopleHandler}
          placeholderTextColor="#999999"
          style={textStyle}
          placeholder="100"
          keyboardType="numeric"
        />
        <Body16>명</Body16>
      </>,
    ],
    ["신청 마감일*", <TouchableCalendar useDate={[deadline, setDeadline]} />],
  ];
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
          {eventEnum.map(([t, b], index) => {
            return (
              <View key={index}>
                <ViewRow style={{ paddingHorizontal: 30 }}>
                  <Mint13
                    style={{
                      paddingVertical: 15,
                      width: 80,
                      fontFamily: "notosans700",
                    }}
                  >
                    {t}
                  </Mint13>
                  {b}
                </ViewRow>
                {index !== eventEnum.length - 1 && <LineSeperator />}
              </View>
            );
          })}
        </View>
        <View style={[bgStyle, { marginTop: 10 }]}>
          <View
            style={{
              paddingHorizontal: 30,
              paddingVertical: 20,
              flex: 1,
            }}
          >
            <Mint13
              style={{
                paddingBottom: 10,
                fontFamily: "notosans700",
              }}
            >
              제안 내용
            </Mint13>
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
