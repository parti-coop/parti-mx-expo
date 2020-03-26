import React from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  TextProps,
  ViewProps,
  Image
} from "react-native";
import uuid from "uuid";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useMutation } from "@apollo/react-hooks";
import { useLazyQuery } from "@apollo/react-hooks";
import { Ionicons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import { useDebouncedCallback } from "use-debounce";

import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import { RootStackParamList } from "./AppContainer";
import { TextInput } from "../components/TextInput";
import { Text, Label13, Label14 } from "../components/Text";
import {
  View,
  ViewRow,
  ViewColumnStretch,
  ViewColumnCenter
} from "../components/View";
import UserProfileBig from "../components/UserProfileBig";

import HeaderConfirm from "../components/HeaderConfirm";
import LineSeperator from "../components/LineSeperator";

import { updateUserName } from "../graphql/mutation";
import { whoami, searchDuplicateName } from "../graphql/query";
import { auth, IdTokenResult } from "../firebase";
import { uploadImage } from "../firebase";
import { useStore } from "../Store";

const box = {
  borderRadius: 25,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.15)",
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowRadius: 1,
  shadowOpacity: 1
} as ViewProps;

const textStyle = {
  fontSize: 16,
  color: "#555555",
  paddingHorizontal: 10
} as TextProps;
export default (props: {
  navigation: StackNavigationProp<RootStackParamList, "Profile">;
  route: RouteProp<RootStackParamList, "Profile">;
}) => {
  const { navigate } = props.navigation;
  const [{ user_id }, dispatch] = useStore();
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [photoUrl, setPhotoUrl] = React.useState("");
  const [updateName] = useMutation(updateUserName);
  const [firstFetch, searchDuplicateQuery] = useLazyQuery(searchDuplicateName, {
    variables: { name: userName, id: user_id }
  });
  const [isInUse, setInUse] = React.useState(false);
  const [fetchName, userNameQuery] = useLazyQuery(whoami, {
    variables: { id: user_id }
  });
  const [debouncedCallback] = useDebouncedCallback(function() {
    if (searchDuplicateQuery.refetch) {
      searchDuplicateQuery.refetch();
    } else {
      firstFetch();
    }
  }, 1000);
  const [debouncedRefreshToken] = useDebouncedCallback(refreshAuthToken, 2000);
  const warningMsg = `"${userName}" 은 이미 사용중인 별명입니다.`;
  async function refreshAuthToken() {
    return auth.currentUser
      .getIdTokenResult(true)
      .then(res => res as IdTokenResult)
      .then(({ claims }) => {
        console.log(claims);
        if (claims["https://hasura.io/jwt/claims"]) {
          const userId = Number(
            claims["https://hasura.io/jwt/claims"]["x-hasura-user-id"]
          );
          dispatch({ type: "SET_USER", user_id: userId });
          fetchName();
        } else {
          debouncedRefreshToken();
        }
      })
      .catch(() => dispatch({ type: "SET_LOADING", loading: false }));
  }
  React.useEffect(() => {
    if (!user_id) {
      // 처음 가입
      dispatch({ type: "SET_LOADING", loading: true });
      debouncedRefreshToken();
    } else {
      fetchName();
    }
  }, []);
  React.useEffect(() => {
    const { data, loading } = userNameQuery;
    if (data && data.parti_2020_users.length) {
      dispatch({ type: "SET_LOADING", loading });
      setUserName(data.parti_2020_users[0].name || "");
      setEmail(data.parti_2020_users[0].email || "");
      setPhotoUrl(data.parti_2020_users[0].photo_url || "");
    }
  }, [userNameQuery]);
  React.useEffect(() => {
    const { data } = searchDuplicateQuery;
    if (data && data.parti_2020_users.length) {
      showMessage({
        type: "warning",
        message: warningMsg
      });
      setInUse(true);
    } else {
      setInUse(false);
    }
  }, [searchDuplicateQuery.data]);

  function nicknameHandler(text: string) {
    setUserName(text);
    if (text.trim().length > 0) {
      debouncedCallback();
    }
  }
  async function saveHandler() {
    if (isInUse) {
      showMessage({
        type: "warning",
        message: warningMsg
      });
      return false;
    }
    dispatch({ type: "SET_LOADING", loading: true });
    let url = photoUrl;
    try {
      const prevPhoroUrl = userNameQuery.data.parti_2020_users[0].photo_url;
      if (photoUrl !== prevPhoroUrl) {
        console.log("new photo uploading");
        url = await uploadImage(photoUrl, `profile/${uuid.v4()}`).then(snap =>
          snap.ref.getDownloadURL()
        );
      }
    } catch (error) {}
    await updateName({
      variables: { id: user_id, name: userName, photo_url: url }
    }).then(console.log);
    navigate("Home");
    dispatch({ type: "SET_LOADING", loading: false });
  }
  return (
    <>
      <HeaderConfirm onPress={saveHandler} />
      <ViewColumnStretch
        style={{ alignItems: "stretch", marginHorizontal: 30, marginTop: 12 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text
              style={{
                fontSize: 22,
                color: "#333333"
              }}
            >
              프로필
            </Text>
            <ViewColumnCenter style={{ marginTop: 70, marginBottom: 60 }}>
              <UserProfileBig url={photoUrl} setUrl={setPhotoUrl} />
            </ViewColumnCenter>
          </View>
        </TouchableWithoutFeedback>
        <KeyboardAvoidingView>
          <View style={box}>
            <ViewRow style={{ paddingTop: 26, paddingHorizontal: 30 }}>
              <Label13 style={{ width: 40 }}>닉네임</Label13>
              <TextInput
                value={userName}
                textContentType="nickname"
                placeholder="닉네임 (한글, 영어 알파벳, 숫자, _)"
                autoFocus={true}
                returnKeyType="send"
                placeholderTextColor="#c5c5c5"
                maxLength={30}
                onChangeText={nicknameHandler}
                onSubmitEditing={saveHandler}
                style={textStyle}
              />
            </ViewRow>
            <View
              style={{
                paddingVertical: 5,
                paddingHorizontal: 30,
                paddingLeft: 80,
                paddingBottom: 26
              }}
            >
              {userName.trim().length > 0 &&
                (isInUse ? (
                  <Text style={{ fontSize: 12, color: "#f35f5f" }}>
                    {warningMsg}
                  </Text>
                ) : (
                  <Text style={{ fontSize: 12 }}>
                    "{userName}"은 사용가능 합니다.
                  </Text>
                ))}
            </View>
            <LineSeperator />
            <ViewRow style={{ paddingVertical: 26, paddingHorizontal: 30 }}>
              <Label13 style={{ width: 40 }}>이메일</Label13>
              <Text style={textStyle}>{email}</Text>
            </ViewRow>
          </View>
        </KeyboardAvoidingView>
      </ViewColumnStretch>
    </>
  );
};
