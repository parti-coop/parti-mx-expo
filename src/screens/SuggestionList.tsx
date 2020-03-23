import React from "react";
import { ScrollView, Share } from "react-native";
import { RootStackParamList } from "./AppContainer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, TextRound } from "../components/Text";
import { View, ViewRow } from "../components/View";
import { TouchableOpacity } from "../components/TouchableOpacity";
import TouchableSuggestionList from "../components/TouchableSuggestionList";
import HeaderBoardList from "../components/HeaderBoardList";
import { useStore } from "../Store";
import { useSubscription } from "@apollo/react-hooks";
import { subscribeSuggestionsByBoardId } from "../graphql/subscription";
export default (props: {
  navigation: StackNavigationProp<RootStackParamList, "SuggestionList">;
  route: RouteProp<RootStackParamList, "SuggestionList">;
}) => {
  const [store, dispatch] = useStore();
  const board_id = props.route.params.id;
  const { group_id, user_id } = store;
  React.useEffect(() => {
    dispatch({ type: "SET_GROUP_AND_BOARD", group_id, board_id });
  }, [group_id, board_id]);
  const { data, loading } = useSubscription(subscribeSuggestionsByBoardId, {
    variables: { id: board_id, userId: user_id }
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  if (data && data.parti_2020_boards_by_pk) {
    const { suggestions, title } = data.parti_2020_boards_by_pk;
    return (
      <>
        <HeaderBoardList />
        <View style={{ paddingHorizontal: 30 }}>
          <Text
            style={{
              fontSize: 24,
              color: "#333333"
            }}
          >
            {title}🌱
          </Text>
        </View>
        <ScrollView>
          <View>
            <ViewRow
              style={{
                justifyContent: "space-between",
                marginVertical: 20,
                paddingHorizontal: 30
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  color: "#333333"
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
                borderRadius: 25
              }}
            >
              {suggestions.map((sugg: any, i: number) => {
                return <TouchableSuggestionList key={i} suggestion={sugg} />;
              })}
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("SuggestionNew")}
          style={{
            position: "absolute",
            width: 56,
            height: 56,
            alignItems: "center",
            justifyContent: "center",
            right: 20,
            bottom: 20,
            backgroundColor: "#03A9F4",
            borderRadius: 30,
            elevation: 8
          }}
        >
          <Text>제안하기</Text>
        </TouchableOpacity>
      </>
    );
  } else {
    return null;
  }
};
