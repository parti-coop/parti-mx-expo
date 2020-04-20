import React from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLazyQuery } from "@apollo/react-hooks";
import { useDebounce } from "use-debounce";

import { Image } from "../components/Image";
import { ViewRow, V1, V0, View } from "../components/View";
import { Text, Title16, Title24, Mint24, Grey12 } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { TO0, TouchableOpacity } from "../components/TouchableOpacity";
import Round35 from "../components/Round35";
import { SmallVerticalDivider, LineSeperator } from "../components/LineDivider";

import { useStore } from "../Store";
import { searchPosts } from "../graphql/query";

import iconBack from "../../assets/iconBack.png";
import iconSearchW from "../../assets/iconSearchW.png";
import iconUser from "../../assets/iconUser.png";
interface SearchResultType {
  id: number;
  title: string;
  created_at: string;
  createdBy: {
    name: string;
  };
  board: {
    title: string;
  };
}
export default () => {
  const { navigate, goBack } = useNavigation();
  const [{ group_id, user_id }, dispatch] = useStore();

  const [keyword, setKeyword] = React.useState("");
  const [debouncedKeyword] = useDebounce(`%${keyword}%`, 500);
  function backHandler() {
    goBack();
  }

  const [search, { loading, refetch, data }] = useLazyQuery(searchPosts, {
    variables: { searchKeyword: debouncedKeyword, group_id, user_id },
  });
  function searchHandler() {
    search();
  }
  function postPressHandler(id: number) {
    navigate("SuggestionDetail", {
      suggestionId: id,
    });
  }
  function results() {
    if (keyword.length && data) {
      if (data.parti_2020_posts?.length > 0) {
        return (
          <View style={{ paddingVertical: 10 }}>
            {data.parti_2020_posts.map(
              (posts: SearchResultType, index: number) => {
                const { title, createdBy, created_at, board, id } = posts;
                const date = new Date(created_at).toLocaleString("ko");
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => postPressHandler(id)}
                  >
                    <View style={{ marginHorizontal: 30, marginVertical: 10 }}>
                      <ViewRow>
                        <Title16>{title}</Title16>
                      </ViewRow>
                      <ViewRow>
                        <Image source={iconUser} style={{ marginRight: 8 }} />
                        <Grey12 style={{ marginRight: 8 }}>
                          {createdBy.name}
                        </Grey12>
                        <Grey12>{date}</Grey12>
                        <SmallVerticalDivider />
                        <Grey12>{board.title}</Grey12>
                      </ViewRow>
                    </View>
                    {data.parti_2020_posts.length !== index + 1 && (
                      <LineSeperator />
                    )}
                  </TouchableOpacity>
                );
              }
            )}
          </View>
        );
      } else {
        return (
          <V0 style={{ marginTop: 72, margin: 30 }}>
            <ViewRow>
              <Title24>"</Title24>
              <Mint24>{keyword}</Mint24>
              <Title24>"</Title24>
            </ViewRow>
            <Title16>에 대한 검색 결과가 없습니다</Title16>
          </V0>
        );
      }
    }
    return null;
  }
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
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
          onSubmitEditing={searchHandler}
          style={{
            fontSize: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#e4e4e4",
          }}
        />
        <Round35 source={iconSearchW} onPress={searchHandler} />
      </ViewRow>
      <Text
        style={{ fontSize: 13, color: "#999999", marginLeft: 100, top: -15 }}
      >
        검색범위 : 제목, 내용
      </Text>
      <ScrollView
        contentContainerStyle={{
          borderRadius: 25,
          backgroundColor: "#ffffff",
        }}
      >
        {results()}
      </ScrollView>
    </>
  );
};
