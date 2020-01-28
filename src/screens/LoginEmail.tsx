import React from "react";
import { Platform } from "react-native";
import { NavigationSwitchScreenProps } from "react-navigation";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useStore } from "../Store";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { View, ViewRowLeft } from "../components/View";
import { TouchableOpacity } from "../components/TouchableOpacity";
import { useMutation } from "@apollo/react-hooks";
import { updateUserToken } from "../graphql/mutation";
import { auth } from "./firebase";
export default (props: NavigationSwitchScreenProps) => {
  const { navigate } = props.navigation;
  const [store, dispatch] = useStore();
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
      .then(() => dispatch({ type: "SET_LOADING", loading }))
      .then(() => navigate("Home"));
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="이메일 주소"
          placeholderTextColor="#c5c5c5"
          maxLength={100}
          onChange={e => setEmail(e.nativeEvent.text)}
          ref={emailTextInput}
          onSubmitEditing={() => pswTextInput.current.focus()}
        />
        <ViewRowLeft>
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

        <TouchableOpacity onPress={loginHandler}>
          <Text>로그인</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
