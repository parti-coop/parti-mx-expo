import React from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLazyQuery } from "@apollo/react-hooks";
import { useDebounce } from "use-debounce";

import { Image } from "../components/Image";
import { ViewRow, V0, View } from "../components/View";
import { Text, Title16, Title24, Mint24, Grey12 } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { TO0, TouchableOpacity } from "../components/TouchableOpacity";
import { Round35 } from "../components/Round";
import { SmallVerticalDivider, LineSeperator } from "../components/LineDivider";
import { boardTypes } from "../components/boardTypes";

import { useStore } from "../Store";
import { searchPosts } from "../graphql/query";
import { formatDateFromString } from "../Utils/CalculateDays";
import { SearchResultType } from "../types";

import iconBack from "../../assets/iconBack.png";
import iconCommentUser from "../../assets/iconCommentUser.png";

export default function Search() {
  const { navigate, goBack } = useNavigation();
  const [{ group_id, user_id }, dispatch] = useStore();

  const [keyword, setKeyword] = React.useState("");
  const [debouncedKeyword] = useDebounce(`%${keyword}%`, 500);
  function backHandler() {
    goBack();
  }

  const [search, { loading, data, error }] = useLazyQuery(searchPosts, {
    variables: { searchKeyword: debouncedKeyword, group_id, user_id },
  });
  if (error) {
    console.log(error);
  }
  function searchHandler() {
    search();
  }

  function results() {
    if (keyword.length && data) {
      if (data.mx_posts?.length > 0) {
        return (
          <View style={{ paddingVertical: 10 }}>
            {data.mx_posts.map((posts: SearchResultType, index: number) => {
              const { title, createdBy, created_at, board, id } = posts;
              const date = formatDateFromString(created_at);
              function postPressHandler() {
                switch (board.type) {
                  case boardTypes.SUGGESTION:
                    return navigate("SuggestionDetail", { postId: id });
                  case boardTypes.NOTICE:
                    return navigate("NoticeDetail", { postId: id });
                  case boardTypes.VOTE:
                    return navigate("VoteDetail", { postId: id });
                }
              }
              return (
                <TouchableOpacity key={index} onPress={postPressHandler}>
                  <View style={{ marginHorizontal: 30, marginVertical: 10 }}>
                    <ViewRow>
                      <Title16 numberOfLines={1}>{title}</Title16>
                    </ViewRow>
                    <ViewRow>
                      <Image
                        source={iconCommentUser}
                        style={{ marginRight: 8, tintColor: "#909090" }}
                      />
                      <Grey12 style={{ marginRight: 8 }}>
                        {createdBy.name}
                      </Grey12>
                      <Grey12>{date}</Grey12>
                      <SmallVerticalDivider />
                      <Grey12>{board.title}</Grey12>
                    </ViewRow>
                  </View>
                  {data.mx_posts.length !== index + 1 && <LineSeperator />}
                </TouchableOpacity>
              );
            })}
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
        <Round35 onPress={searchHandler} />
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
}
