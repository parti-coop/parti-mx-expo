import React from "react";
import { TextInput as T, TextInputProps, Platform } from "react-native";
import { ViewRowLeft } from "./View";
import { TouchableOpacity } from "./TouchableOpacity";
import { getRandomColor } from "../Utils/RandomColorGenerator";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
export const TextInput = React.forwardRef<T, TextInputProps>(
  (props, ref: React.Ref<T>) => (
    <T
      {...props}
      style={{
        fontFamily: "notosans",
        fontSize: 20,
        flex: 1,
        borderColor: getRandomColor(),
        borderWidth: 1,
        paddingHorizontal: 20,
        ...(props.style as Object)
      }}
      ref={ref}
    >
      {props.children}
    </T>
  )
);

export const EmailInput = React.forwardRef<T, TextInputProps>(
  (props, ref: React.Ref<T>) => (
    <T
      style={{
        fontFamily: "notosans",
        fontSize: 20,
        flex: 1,
        borderColor: getRandomColor(),
        borderWidth: 1,
        paddingHorizontal: 20,
        ...(props.style as Object)
      }}
      ref={ref}
      textContentType="emailAddress"
      keyboardType="email-address"
      returnKeyType="next"
      autoCapitalize="none"
      placeholder="이메일 주소"
      placeholderTextColor="#c5c5c5"
      maxLength={100}
      {...props}
    >
      {props.children}
    </T>
  )
);

export const PasswordInput = React.forwardRef<T, TextInputProps>(
  (props, ref: React.Ref<T>) => {
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
      <ViewRowLeft
        style={{
          flex: 1,
          paddingHorizontal: 0,
          alignContent: "stretch",
          alignItems: "stretch"
        }}
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
        <TouchableOpacity
          onPress={changePwdType}
          style={{ justifyContent: "center" }}
        >
          <MaterialIcons name={secure.icEye} size={30} />
        </TouchableOpacity>
      </ViewRowLeft>
    );
  }
);
