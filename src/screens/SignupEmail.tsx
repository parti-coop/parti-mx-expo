import React from "react";
import { Platform } from "react-native";
import { NavigationSwitchScreenProps } from "react-navigation";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useStore } from "../Store";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { View, ViewRowLeft } from "../components/View";
import { TouchableOpacity } from "../components/TouchableOpacity";
// import { Button } from "../components/Button";

import { auth } from "./firebase";
export default (props: NavigationSwitchScreenProps) => {
  const { navigate } = props.navigation;
  const [store, dispatch] = useStore();
  const [nickname, setNickname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [checkboxes, setCheckboxes] = React.useState([false, false]);
  const [secure, setSecure] = React.useState({
    secureTextEntry: true,
    icEye: "visibility-off"
  });
  const emailTextInput = React.useRef(null);
  const pswTextInput = React.useRef(null);
  function registerHandler() {
    if (checkboxes.includes(false)) {
      return alert("약관에 동의해주세요");
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) =>
        user
          .updateProfile({ displayName: nickname })
          .then(() => console.log(user))
      );
  }
  function checkboxHandler1() {
    setCheckboxes([!checkboxes[0], checkboxes[1]]);
  }
  function checkboxHandler2() {
    setCheckboxes([checkboxes[0], !checkboxes[1]]);
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
        <Text>이메일 주소로 회원가입</Text>
      </ViewRowLeft>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
            onSubmitEditing={registerHandler}
          />
          <TouchableOpacity onPress={changePwdType}>
            <MaterialIcons name={secure.icEye} size={30} />
          </TouchableOpacity>
        </ViewRowLeft>
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
        <ViewRowLeft>
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
        <TouchableOpacity onPress={registerHandler}>
          <Text>회원가입</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
