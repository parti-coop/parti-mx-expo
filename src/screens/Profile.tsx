import React from "react";
import { useStore } from "../Store";
import { RootStackParamList } from "./AppContainer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useMutation } from "@apollo/react-hooks";
import { TextInput } from "../components/TextInput";
import { Ionicons } from "@expo/vector-icons";
import { Text, Text2 } from "../components/Text";
import { View, ViewRowLeft, ViewColumnCenter } from "../components/View";
import { TouchableOpacity, TOEasy } from "../components/TouchableOpacity";
import { auth, IdTokenResult } from "../firebase";
import { updateUserName } from "../graphql/mutation";
import { useLazyQuery } from "@apollo/react-hooks";
import { whoami, searchDuplicateName } from "../graphql/query";
import { useDebouncedCallback } from "use-debounce";
import { showMessage } from "react-native-flash-message";

export default (props: {
  navigation: StackNavigationProp<RootStackParamList, "Profile">;
  route: RouteProp<RootStackParamList, "Profile">;
}) => {
  const { navigate } = props.navigation;
  const [{ user_id }, dispatch] = useStore();
  const [userName, setUserName] = React.useState("");
  const [updateName] = useMutation(updateUserName, {
    variables: { id: user_id, name: userName }
  });
  const [firstFetch, searchDuplicateQuery] = useLazyQuery(searchDuplicateName, {
    variables: { name: userName, id: user_id }
  });
  const [isInUse, setInUse] = React.useState(false);
  const [fetchName, userNameQuery] = useLazyQuery(whoami, {
    variables: { id: user_id }
  });
  const [debouncedCallback] = useDebouncedCallback(function() {
    // console.log(userName);
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
      });
  }
  React.useEffect(() => {
    if (!user_id) {
      // 처음 가입
      debouncedRefreshToken();
    } else {
      fetchName();
    }
  }, []);
  React.useEffect(() => {
    const { data, loading } = userNameQuery;
    dispatch({ type: "SET_LOADING", loading });
    if (data && data.parti_2020_users.length) {
      setUserName(data.parti_2020_users[0].name || "");
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
    await updateName();
    navigate("Home");
  }
  return (
    <>
      <ViewRowLeft>
        <TouchableOpacity
          style={{ width: 50, padding: 10 }}
          onPress={() => navigate("UserSetting")}
        >
          <Ionicons name="ios-arrow-back" size={60} />
        </TouchableOpacity>
        <Text2>비밀번호 변경</Text2>
      </ViewRowLeft>
      <ViewColumnCenter style={{ alignItems: "stretch" }}>
        <Text>프로필</Text>
        <Text>고유한 닉네임을 입력하세요</Text>
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
        />
        {userName.trim().length > 0 &&
          (isInUse ? (
            <Text>{warningMsg}</Text>
          ) : (
            <Text>"{userName}"은 사용가능 합니다.</Text>
          ))}
        <TOEasy onPress={saveHandler}>
          <Text>별명 저장</Text>
        </TOEasy>
      </ViewColumnCenter>
    </>
  );
};
