import React from "react";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "./AppContainer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { ViewRowLeft } from "../components/View";
import { TouchableOpacity, TOEasy } from "../components/TouchableOpacity";
import { useStore } from "../Store";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@apollo/react-hooks";
import { updateGroupName } from "../graphql/mutation";
import { uploadImage } from "../firebase";
export default (props: {
  navigation: StackNavigationProp<RootStackParamList, "BoardSetting">;
  route: RouteProp<RootStackParamList, "BoardSetting">;
}) => {
  return (
    <>
      <ViewRowLeft>
        <TouchableOpacity style={{}} onPress={e => props.navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={60} />
        </TouchableOpacity>
        <Text>게시판 목록</Text>
      </ViewRowLeft>
      <Text>게시판 설정 </Text>
    </>
  );
};
