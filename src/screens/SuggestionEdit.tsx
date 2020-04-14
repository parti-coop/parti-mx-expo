import React from "react";
import {
  StyleProp,
  TextStyle,
  Image,
  Keyboard,
  Vibration,
  Alert,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "@apollo/react-hooks";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import HeaderConfirm from "../components/HeaderConfirm";
import { View, ViewRow } from "../components/View";
import { TO1, TO0 } from "../components/TouchableOpacity";
import TouchableClosingMethod from "../components/TouchableClosingMethod";
import LineSeperator from "../components/LineSeperator";
import HeaderSuggestion from "../components/HeaderSuggestion";
import { ImageInfo } from "expo-image-picker/src/ImagePicker.types";

import { useStore } from "../Store";
import { updateSuggestion } from "../graphql/mutation";
import { RootStackParamList } from "./AppContainer";
import { uploadImageUUID } from "../firebase";
const options = [
  { label: "30일 후 종료", value: 0 },
  // { label: "멤버 과반수 동의시 종료", value: 1 }
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
export default (props: {
  navigation: StackNavigationProp<RootStackParamList, "SuggestionEdit">;
  route: RouteProp<RootStackParamList, "SuggestionEdit">;
}) => {
  const suggestion = props.route.params.suggestion;
  const { id } = suggestion;
  const [sTitle, setSTitle] = React.useState(suggestion.title);
  const [sContext, setSContext] = React.useState(suggestion.context);
  const [sBody, setSBody] = React.useState(suggestion.body);
  const [closingMethod, setClosingMethod] = React.useState(
    suggestion.closing_method
  );
  const [imageArr, setImageArr] = React.useState<
    Array<ImageInfo | undefined | string>
  >(suggestion.images);
  const contextRef = React.useRef(null);
  const scrollRef = React.useRef(null);
  const [{ user_id }, dispatch] = useStore();
  const { goBack } = useNavigation();
  const [update, { loading }] = useMutation(updateSuggestion);
  async function addImage() {
    Keyboard.dismiss();
    return launchImageLibraryAsync({
      quality: 1,
    }).then(({ cancelled, ...res }) => {
      if (cancelled !== true) {
        setImageArr([...imageArr, res as ImageInfo]);
      }
    });
  }
  async function longpressHandler(imageIndex: number) {
    Keyboard.dismiss();
    Vibration.vibrate(500);
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
    let images = null;
    dispatch({ type: "SET_LOADING", loading: true });
    if (imageArr?.length > 0) {
      const urlArr = await Promise.all(
        imageArr.map(async (o, i: number) => {
          if (typeof o === "string") {
            return o;
          } else {
            return uploadImageUUID(o.uri, "posts").then((snap) =>
              snap.ref.getDownloadURL()
            );
          }
        })
      );
      images = "{" + urlArr.join(",") + "}";
    }
    await update({
      variables: {
        sBody,
        sTitle,
        sContext,
        closingMethod,
        id,
        user_id,
        images,
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
    setSTitle(suggestion.title);
    setSContext(suggestion.context);
    setSBody(suggestion.body);
    setClosingMethod(suggestion.closing_method);
    setImageArr(suggestion.images);
  }, [suggestion]);
  return (
    <>
      <HeaderConfirm onPress={updateHandler} />
      <KeyboardAwareScrollView ref={scrollRef}>
        <HeaderSuggestion />
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
          {imageArr?.length > 0 && (
            <>
              <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
                {imageArr?.map((o, i) => (
                  <TO0
                    key={i}
                    style={{ marginBottom: 10 }}
                    onLongPress={() => longpressHandler(i)}
                  >
                    <Image
                      source={typeof o === "string" ? { uri: o } : o}
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
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  color: "#30ad9f",
                }}
              >
                사진 첨부
              </Text>
            </TO1>
            <View
              style={{
                width: 1,
                height: 11,
                backgroundColor: "#e4e4e4",
              }}
            />
            <TO1>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  color: "#30ad9f",
                  flex: 1,
                }}
              >
                파일 첨부
              </Text>
            </TO1>
          </ViewRow>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};
