import React from "react";
import { StackHeaderProps } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../Store";
import { Text } from "../components/Text";
import { EmailInput, PasswordInput } from "../components/TextInput";
import { ViewRowLeft } from "../components/View";
import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import { TouchableOpacity, TORow } from "../components/TouchableOpacity";
import { auth } from "../firebase";
import { showMessage } from "react-native-flash-message";
export default (props: StackHeaderProps) => {
  const { navigate } = props.navigation;
  const [{ group_id }, dispatch] = useStore();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const emailTextInput = React.useRef(null);
  const pswTextInput = React.useRef(null);
  
  function loginHandler() {
    dispatch({ type: "SET_LOADING", loading: true });
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => user.uid)
      .then(() =>
        showMessage({
          type: "success",
          message: "로그인 성공 하셨습니다."
        })
      )
      .finally(() =>
        dispatch({
          type: "SET_LOADING",
          loading: false
        })
      );
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
        <Text>이메일 주소로 로그인</Text>
      </ViewRowLeft>
      <KeyboardAvoidingView>
        <EmailInput
          value={email}
          onChange={e => setEmail(e.nativeEvent.text)}
          ref={emailTextInput}
          autoFocus={true}
          onSubmitEditing={() => pswTextInput.current.focus()}
        />
        <PasswordInput
          value={password}
          onChange={e => setPassword(e.nativeEvent.text)}
          ref={pswTextInput}
          onSubmitEditing={loginHandler}
        />
        <TORow onPress={loginHandler}>
          <Text>로그인</Text>
        </TORow>
        <TORow onPress={() => navigate("PasswordFind")}>
          <Text>비밀번호 찾기</Text>
        </TORow>
      </KeyboardAvoidingView>
    </>
  );
};
