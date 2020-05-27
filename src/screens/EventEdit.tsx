import React from "react";
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
import { Title22, Body16, Mint13 } from "../components/Text";
import { TextInput } from "../components/TextInput";
import HeaderConfirm from "../components/HeaderConfirm";
import { View, ViewRow } from "../components/View";
import { LineSeperator } from "../components/LineDivider";
import HeaderBreadcrumb from "../components/HeaderBreadcrumb";
import { ImageInfo } from "expo-image-picker/src/ImagePicker.types";
import { bgStyle, textStyle } from "../components/Styles";
import BottomImageFile from "../components/BottomImageFile";
import ViewNewImageFile from "../components/ViewNewImageFile";
import TouchableCalendar from "../components/TouchableCalendar";

import { useStore } from "../Store";
import { updatePost } from "../graphql/mutation";
import { RootStackParamList } from "./AppContainer";
import { uploadGetUriArray } from "../firebase";
import { File } from "../types";

export default function EventEdit(props: {
  navigation: StackNavigationProp<RootStackParamList, "EventEdit">;
  route: RouteProp<RootStackParamList, "EventEdit">;
}) {
  const event = props.route.params.event;
  const { id } = event;
  const [title, setTitle] = React.useState(event.title);
  const [body, setBody] = React.useState(event.body);
  const [eventDate, setEventDate] = React.useState(
    new Date(event?.metadata?.eventDate)
  );
  const [deadline, setDeadline] = React.useState(
    new Date(event?.metadata?.deadline)
  );
  const [place, setPlace] = React.useState(event?.metadata?.place);
  const [countPeople, setCountPeople] = React.useState(
    event?.metadata?.countPeople
  );
  const [imageArr, setImageArr] = React.useState<Array<ImageInfo>>(
    event.images ?? []
  );
  const [fileArr, setFileArr] = React.useState<Array<File>>(event.files ?? []);
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
        metadata: { eventDate, place, deadline, countPeople },
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
    setTitle(event?.title);
    setBody(event?.body);
    setEventDate(new Date(event?.metadata?.eventDate));
    setDeadline(new Date(event?.metadata?.deadline));
    setCountPeople(event?.metadata?.countPeople);
    setPlace(event?.metadata?.place);
    setImageArr(event.images ?? []);
    setFileArr(event.files ?? []);
  }
  useFocusEffect(React.useCallback(resetInput, [event]));
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
      <HeaderConfirm onPress={updateHandler} />
      <KeyboardAwareScrollView ref={scrollRef}>
        <HeaderBreadcrumb boardName={event.board.title} />
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
              padding: 30,
              paddingBottom: 20,
              flex: 1,
            }}
          >
            <Mint13
              style={{
                paddingBottom: 10,
                width: 80,
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
