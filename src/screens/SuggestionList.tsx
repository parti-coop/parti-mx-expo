import React from "react";
import { ScrollView } from "react-native";
import { RootStackParamList } from "./AppContainer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSubscription } from "@apollo/react-hooks";

import { Title14, Title24 } from "../components/Text";
import { View, ViewRow } from "../components/View";
import TouchableSuggestionList from "../components/TouchableSuggestionList";
import HeaderList from "../components/HeaderList";
import ButtonNew from "../components/ButtonNew";
import { flatWhiteBg } from "../components/Styles";

import { useStore } from "../Store";
import { subscribePostsByBoardId } from "../graphql/subscription";
import useNavigateToPost from "../components/useNavigateToPost";

export default function SuggestionList(props: {
  navigation: StackNavigationProp<RootStackParamList, "SuggestionList">;
  route: RouteProp<RootStackParamList, "SuggestionList">;
}) {
  const [{ group_id, user_id }, dispatch] = useStore();
  const navigatePost = useNavigateToPost();
  const boardId = props.route.params.id;
  const { data, error, loading } = useSubscription(subscribePostsByBoardId, {
    variables: { id: boardId, user_id },
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading: true });
    dispatch({ type: "SET_GROUP", group_id });
  }, [group_id]);
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  const { posts = [], title = "소식 로드 중" } = data?.mx_boards_by_pk ?? {};
  function navigateNew() {
    props.navigation.navigate("SuggestionNew", { boardId, boardName: title });
  }
  if (error) {
    console.log(error);
  }
  return (
    <>
      <HeaderList />
      <ScrollView>
        <View style={{ paddingHorizontal: 30 }}>
          <Title24>{title}</Title24>
        </View>
        <ViewRow style={{ marginVertical: 20, paddingHorizontal: 30 }}>
          <Title14>진행중인 제안</Title14>
        </ViewRow>
        <View style={flatWhiteBg}>
          {posts.map((post: any, i: number) => {
            return (
              <TouchableSuggestionList
                key={i}
                post={post}
                style={posts.length !== i + 1 && { borderBottomWidth: 1 }}
                onPress={navigatePost}
              />
            );
          })}
        </View>
      </ScrollView>
      <ButtonNew onPress={navigateNew} />
    </>
  );
}
