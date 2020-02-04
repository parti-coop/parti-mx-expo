import React from "react";
import { Platform, KeyboardAvoidingView, Alert } from "react-native";
import { NavigationSwitchScreenProps } from "react-navigation";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useStore } from "../Store";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { View, ViewRowLeft } from "../components/View";
import { TouchableOpacity, TORow } from "../components/TouchableOpacity";
import { useMutation } from "@apollo/react-hooks";
import { updateUserToken } from "../graphql/mutation";
import { auth } from "../firebase";
import { showMessage } from "react-native-flash-message";
import PasswordFind from "./PasswordFind";
export default (props: NavigationSwitchScreenProps) => {
  const { navigate } = props.navigation;
  const [{ group_id }, dispatch] = useStore();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [secure, setSecure] = React.useState({
    secureTextEntry: true,
    icEye: "visibility-off"
  });
  const emailTextInput = React.useRef(null);
  const pswTextInput = React.useRef(null);
  const [update, { loading }] = useMutation(updateUserToken, {
    variables: {
      email,
      token: ""
    }
  });
  function loginHandler() {
    dispatch({ type: "SET_LOADING", loading: true });
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => user.getIdToken())
      .then(token => update({ variables: { token, email } }))
      .then(res => {
        const { token, id } = res.data.update_parti_2020_users.returning[0];
        dispatch({
          type: "SET_TOKEN",
          user_id: id,
          userToken: token
        });
      })
      .then(() => navigate(group_id === null ? "GroupNew" : "Home"))
      .catch(err => showMessage({ type: "danger", message: err.message }))
      .finally(() =>
        dispatch({
          type: "SET_LOADING",
          loading: false
        })
      );
  }
  function changePwdType() {
    if (secure.secureTextEntry) {
      setSecure({
        icEye: "visibility",
        secureTextEntry: false
      });
    } else {
      setSecure({
        icEye: "visibility-off",
        secureTextEntry: true
      });
    }
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignItems: "stretch",
          justifyContent: "center"
        }}
        behavior={Platform.select({ ios: "padding", android: null })}
      >
        <TextInput
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          placeholder="이메일 주소"
          placeholderTextColor="#c5c5c5"
          maxLength={100}
          onChange={e => setEmail(e.nativeEvent.text)}
          ref={emailTextInput}
          onSubmitEditing={() => pswTextInput.current.focus()}
        />
        <ViewRowLeft style={{ flex: 1 }}>
          <TextInput
            value={password}
            textContentType="newPassword"
            placeholder="비밀번호 (8자 이상)"
            maxLength={100}
            enablesReturnKeyAutomatically={true}
            secureTextEntry={secure.secureTextEntry}
            placeholderTextColor="#c5c5c5"
            selectionColor={Platform.OS === "android" ? null : "white"}
            onChange={e => setPassword(e.nativeEvent.text)}
            ref={pswTextInput}
            onSubmitEditing={loginHandler}
          />
          <TouchableOpacity onPress={changePwdType}>
            <MaterialIcons name={secure.icEye} size={30} />
          </TouchableOpacity>
        </ViewRowLeft>

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
