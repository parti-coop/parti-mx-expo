import React from "react";
import { TextProps } from "react-native";
import uuid from "uuid";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useMutation } from "@apollo/react-hooks";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { showMessage } from "react-native-flash-message";
import { useDebouncedCallback } from "use-debounce";

import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import { RootStackParamList } from "./AppContainer";
import { TextInput } from "../components/TextInput";
import { Text, Mint13, Title22 } from "../components/Text";
import { View, ViewRow, ViewColumnStretch, V0 } from "../components/View";
import UserProfileBig from "../components/UserProfileBig";
import HeaderConfirm from "../components/HeaderConfirm";
import { LineSeperator } from "../components/LineDivider";
import { whiteRoundBg } from "../components/Styles";

import { updateUserName } from "../graphql/mutation";
import { whoami, searchDuplicateNameWithoutMine } from "../graphql/query";
import { auth, uploadImage } from "../firebase";
import { useStore } from "../Store";

const textStyle = {
  fontSize: 16,
  color: "#555555",
  paddingHorizontal: 10,
} as TextProps;
const patternUsername = /^[ㄱ-힣a-zA-Z0-9_]*$/;
export default function Profile(props: {
  navigation: StackNavigationProp<RootStackParamList, "Profile">;
  route: RouteProp<RootStackParamList, "Profile">;
}) {
  const { goBack } = props.navigation;
  const email = auth.currentUser.email;
  const [{ user_id }, dispatch] = useStore();
  const [userName, setUserName] = React.useState("");
  const [photoUrl, setPhotoUrl] = React.useState(null);
  const [updateName] = useMutation(updateUserName);
  const [firstFetch, searchDuplicateQuery] = useLazyQuery(
    searchDuplicateNameWithoutMine,
    {
      variables: { name: userName, id: user_id },
      fetchPolicy: "network-only",
    }
  );
  const [isInUse, setInUse] = React.useState(false);
  const userNameQuery = useQuery(whoami, {
    variables: { id: user_id },
  });
  const [debouncedCallback] = useDebouncedCallback(function () {
    if (searchDuplicateQuery.refetch) {
      searchDuplicateQuery.refetch();
    } else {
      firstFetch();
    }
  }, 1000);
  const warningMsg = `"${userName}": 이미 사용중인 닉네임 입니다.`;
  const prevPhoroUrl = userNameQuery?.data?.mx_users_by_pk?.photo_url;
  React.useEffect(() => {
    const { data, loading } = userNameQuery;
    if (data) {
      dispatch({ type: "SET_LOADING", loading });
      setUserName(data?.mx_users_by_pk?.name ?? "");
    }
  }, [userNameQuery]);
  useFocusEffect(
    React.useCallback(() => {
      setUserName(userNameQuery?.data?.mx_users_by_pk?.name ?? "");
    }, [userNameQuery.data])
  );
  React.useEffect(() => {
    const { data } = searchDuplicateQuery;
    if (data?.mx_users?.length) {
      setInUse(true);
    } else {
      setInUse(false);
    }
  }, [searchDuplicateQuery.data]);

  function nicknameHandler(text: string) {
    const test = patternUsername.test(text);
    if (test) {
      setUserName(text);
      if (text.trim().length > 0) {
        debouncedCallback();
      }
    }
  }
  async function saveHandler() {
    if (isInUse) {
      return showMessage({
        type: "warning",
        message: warningMsg,
      });
    }
    if (userName.trim().length === 0) {
      return showMessage({
        type: "warning",
        message: "닉네임을 입력하세요.",
      });
    }
    dispatch({ type: "SET_LOADING", loading: true });
    let url = photoUrl;
    if (photoUrl && photoUrl !== prevPhoroUrl) {
      console.log("new photo uploading");
      url = await uploadImage(photoUrl, `profile/${uuid.v4()}`).then((snap) =>
        snap.ref.getDownloadURL()
      );
    }
    await updateName({
      variables: {
        id: user_id,
        name: userName,
        photo_url: url ?? prevPhoroUrl,
      },
    });
    goBack();
    dispatch({ type: "SET_LOADING", loading: false });
  }
  return (
    <>
      <HeaderConfirm onPress={saveHandler} />
      <ViewColumnStretch style={{ alignItems: "stretch", marginTop: 12 }}>
        <KeyboardAwareScrollView>
          <View style={{ paddingHorizontal: 30 }}>
            <Title22>프로필</Title22>
            <V0 style={{ marginTop: 50, marginBottom: 30 }}>
              <UserProfileBig
                url={photoUrl ?? prevPhoroUrl}
                setUrl={setPhotoUrl}
              />
            </V0>
          </View>

          <View style={[whiteRoundBg]}>
            <ViewRow style={{ paddingTop: 26, paddingHorizontal: 25 }}>
              <Mint13 style={{ width: 40 }}>닉네임</Mint13>
              <TextInput
                value={userName}
                textContentType="nickname"
                placeholder="닉네임 (한글, 영어, 숫자, _)"
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
                paddingLeft: 75,
                paddingBottom: 26,
              }}
            >
              {userName.trim().length > 0 &&
                (isInUse ? (
                  <Text style={{ fontSize: 12, color: "#f35f5f" }}>
                    {warningMsg}
                  </Text>
                ) : (
                  <Text style={{ fontSize: 12 }}>
                    "{userName}": 사용가능한 닉네임 입니다.
                  </Text>
                ))}
            </View>
            <LineSeperator />
            <ViewRow style={{ paddingVertical: 26, paddingHorizontal: 25 }}>
              <Mint13 style={{ width: 40 }}>이메일</Mint13>
              <Text style={textStyle}>{email}</Text>
            </ViewRow>
          </View>
        </KeyboardAwareScrollView>
      </ViewColumnStretch>
    </>
  );
}
