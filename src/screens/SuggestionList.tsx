import React from "react";
import { ScrollView } from "react-native";
import { RootStackParamList } from "./AppContainer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSubscription } from "@apollo/react-hooks";

import { Text } from "../components/Text";
import { View, ViewRow } from "../components/View";
import TouchableSuggestionList from "../components/TouchableSuggestionList";
import HeaderList from "../components/HeaderList";
import ButtonNew from "../components/ButtonNew";

import { useStore } from "../Store";
import { subscribePostsByBoardId } from "../graphql/subscription";

export default (props: {
  navigation: StackNavigationProp<RootStackParamList, "SuggestionList">;
  route: RouteProp<RootStackParamList, "SuggestionList">;
}) => {
  const [{ group_id, user_id }, dispatch] = useStore();
  const boardId = props.route.params.id;
  const { data, loading } = useSubscription(subscribePostsByBoardId, {
    variables: { id: boardId, userId: user_id },
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
  return (
    <>
      <HeaderList />
      <ScrollView>
        <View style={{ paddingHorizontal: 30 }}>
          <Text
            style={{
              fontSize: 24,
              color: "#333333",
            }}
          >
            {title}
          </Text>
        </View>

        <ViewRow
          style={{
            justifyContent: "space-between",
            marginVertical: 20,
            paddingHorizontal: 30,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              textAlign: "left",
              color: "#333333",
            }}
          >
            진행중인 제안
          </Text>
        </ViewRow>
        <View
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            marginHorizontal: 30,
            borderRadius: 25,
            marginBottom: 60,
          }}
        >
          {posts.map((sugg: any, i: number) => {
            return (
              <TouchableSuggestionList
                key={i}
                suggestion={sugg}
                style={posts.length !== i + 1 && { borderBottomWidth: 1 }}
              />
            );
          })}
        </View>
      </ScrollView>
      <ButtonNew onPress={navigateNew} />
    </>
  );
};
