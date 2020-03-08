import React from "react";
import { Keyboard } from "react-native";
import { NavigationSwitchScreenProps } from "react-navigation";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useStore } from "../Store";
import { Text } from "../components/Text";
import { TextInput, EmailInput, PasswordInput } from "../components/TextInput";
import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import { ViewRowLeft } from "../components/View";
import { TouchableOpacity } from "../components/TouchableOpacity";
import { useMutation } from "@apollo/react-hooks";
import { insertUser } from "../graphql/mutation";
import { showMessage } from "react-native-flash-message";
// import { Button } from "../components/Button";

import { auth } from "../firebase";
export default (props: NavigationSwitchScreenProps) => {
  const { navigate } = props.navigation;
  const [store, dispatch] = useStore();
  const [nickname, setNickname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [checkboxes, setCheckboxes] = React.useState([false, false]);
  const emailTextInput = React.useRef(null);
  const pswTextInput = React.useRef(null);
  const [insert, { loading }] = useMutation(insertUser, {
    variables: {
      email,
      nickname,
      userToken: ""
    }
  });
  function keyboardDownHandler() {
    Keyboard.dismiss();
  }
  function registerHandler() {
    if (checkboxes.includes(false)) {
      return showMessage({ type: "warning", message: "약관에 동의해주세요" });
    }
    dispatch({ type: "SET_LOADING", loading: true });
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) =>
        user
          .updateProfile({ displayName: nickname })
          .then(() => user.getIdToken())
          .then(userToken =>
            insert({ variables: { userToken, email, nickname } })
          )
          .then(res => {
            const { token, id } = res.data.insert_parti_2020_users.returning[0];
            dispatch({
              type: "SET_TOKEN",
              user_id: id,
              userToken: token
            });

            return true;
          })
          .then(() => props.navigation.navigate("Home"))
      )
      .catch(err => showMessage({ type: "danger", message: err.message }))
      .finally(() =>
        dispatch({
          type: "SET_LOADING",
          loading: false
        })
      );
  }
  function checkboxHandler1() {
    setCheckboxes([!checkboxes[0], checkboxes[1]]);
  }
  function checkboxHandler2() {
    setCheckboxes([checkboxes[0], !checkboxes[1]]);
  }

  return (
    <>
      <ViewRowLeft>
        <TouchableOpacity
          style={{ width: 50, padding: 10 }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={60} />
        </TouchableOpacity>
        <Text>이메일 주소로 회원가입</Text>
      </ViewRowLeft>
      <KeyboardAvoidingView>
        <TextInput
          value={nickname}
          textContentType="nickname"
          placeholder="닉네임 (한글, 영어 알파벳, 숫자, _)"
          autoFocus={true}
          returnKeyType="next"
          placeholderTextColor="#c5c5c5"
          maxLength={30}
          onChange={e => setNickname(e.nativeEvent.text)}
          onSubmitEditing={() => emailTextInput.current.focus()}
        />
        <EmailInput
          value={email}
          onChange={e => setEmail(e.nativeEvent.text)}
          ref={emailTextInput}
          onSubmitEditing={() => pswTextInput.current.focus()}
        />
        <PasswordInput
          value={password}
          onChange={e => setPassword(e.nativeEvent.text)}
          ref={pswTextInput}
          onSubmitEditing={keyboardDownHandler}
        />
        <ViewRowLeft>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderWidth: 2,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={checkboxHandler1}
          >
            {checkboxes[0] && <Text> X </Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("TermsService")}>
            <Text>서비스 이용약관</Text>
          </TouchableOpacity>
          <Text>에 동의합니다 (필수)</Text>
        </ViewRowLeft>
        <ViewRowLeft style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderWidth: 2,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={checkboxHandler2}
          >
            {checkboxes[1] && <Text> X </Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("TermsPrivacy")}>
            <Text>개인정보 처리방침</Text>
          </TouchableOpacity>
          <Text>에 동의합니다 (필수)</Text>
        </ViewRowLeft>
        <TouchableOpacity onPress={registerHandler} style={{ flex: 1 }}>
          <Text>회원가입</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};
