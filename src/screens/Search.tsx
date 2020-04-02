import React from "react";
import {
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ViewRow, V1, V0 } from "../components/View";
import { Text, Title16, Title24, Mint24 } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { TouchableOpacity, TO0 } from "../components/TouchableOpacity";

import Round35 from "../components/Round35";

import { useStore } from "../Store";

import iconBack from "../../assets/iconBack.png";
import iconSearchW from "../../assets/iconSearchW.png";

export default () => {
  const { navigate, goBack } = useNavigation();
  const [store] = useStore();
  const [keyword, setKeyword] = React.useState("");
  function backHandler() {
    goBack();
  }
  return (
    <>
      <ViewRow>
        <TO0 style={{ padding: 30 }} onPress={backHandler}>
          <Image source={iconBack} />
        </TO0>
        <TextInput
          value={keyword}
          onChangeText={setKeyword}
          placeholder="검색어를 입력해 주세요"
          style={{
            fontSize: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#e4e4e4"
          }}
        />
        <Round35 source={iconSearchW} />
      </ViewRow>
      <Text
        style={{ fontSize: 13, color: "#999999", marginLeft: 100, top: -15 }}
      >
        검색범위 : 제목, 내용
      </Text>
      {keyword.length > 0 && (
        <ScrollView
          contentContainerStyle={{
            borderRadius: 25,
            backgroundColor: "#ffffff",
            flex: 1
          }}
        >
          <V0 style={{ marginTop: 72, margin: 30}}>
            <ViewRow>
              <Title24>"</Title24>
              <Mint24>{keyword}</Mint24>
              <Title24>"</Title24>
            </ViewRow>
            <Title16>에 대한 검색 결과가 없습니다</Title16>
          </V0>
        </ScrollView>
      )}
    </>
  );
};
