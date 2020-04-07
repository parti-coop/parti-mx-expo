import React from "react";
import { TextInput as T, TextInputProps, Platform } from "react-native";
import { ViewRow } from "./View";
import { TouchableOpacity } from "./TouchableOpacity";
import { getRandomColor } from "../Utils/RandomColorGenerator";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
export const TextInput = React.forwardRef<T, TextInputProps>(
  (props, ref: React.Ref<T>) => (
    <T
      ref={ref}
      {...props}
      style={[
        {
          fontFamily: "notosans",
          fontSize: 16,
          flex: 1,
          paddingHorizontal: 20,
          height: 50
        },
        props.style
      ]}
    >
      {props.children}
    </T>
  )
);

export const EmailInput = React.forwardRef<T, TextInputProps>(
  (props, ref: React.Ref<T>) => (
    <T
      ref={ref}
      textContentType="emailAddress"
      keyboardType="email-address"
      returnKeyType="next"
      autoCapitalize="none"
      placeholder="이메일 주소"
      placeholderTextColor="#c5c5c5"
      maxLength={100}
      {...props}
      style={[
        {
          fontFamily: "notosans",
          fontSize: 16,
          flex: 1,
          height: 50,
          paddingHorizontal: 20
        },
        props.style
      ]}
    >
      {props.children}
    </T>
  )
);

export const PasswordInput = React.forwardRef<
  T,
  { showEye?: boolean } & TextInputProps
>((props, ref: React.Ref<T>) => {
  const [secure, setSecure] = React.useState({
    secureTextEntry: true,
    icEye: "visibility-off"
  });
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
    <ViewRow
      style={[
        {
          flex: 1,
          height: 50,
          paddingHorizontal: 0,
          alignContent: "stretch",
          alignItems: "stretch"
        },
        props.style
      ]}
    >
      <TextInput
        ref={ref}
        placeholder="비밀번호 (8자 이상)"
        maxLength={100}
        enablesReturnKeyAutomatically={true}
        secureTextEntry={secure.secureTextEntry}
        placeholderTextColor="#c5c5c5"
        selectionColor={Platform.OS === "android" ? null : "white"}
        {...props}
      />
      {props.showEye && (
        <TouchableOpacity
          onPress={changePwdType}
          style={{ justifyContent: "center" }}
        >
          <MaterialIcons name={secure.icEye} size={30} />
        </TouchableOpacity>
      )}
    </ViewRow>
  );
});
