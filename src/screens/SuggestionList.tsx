import React from "react";
import { ScrollView, Share, Picker } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Text, TextRound } from "../components/Text";
import { View, ViewRow } from "../components/View";
import LoadingIndicator from "../components/LoadingIndicator";
import { TouchableOpacity } from "../components/TouchableOpacity";
import { useStore } from "../Store";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { subscribeSuggestionsByBoardId } from "../graphql/subscription";
export default (
  props: NavigationStackScreenProps<{ id: number; boards: any[] }>
) => {
  const [store, dispatch] = useStore();
  const board_id = props.navigation.getParam("id");
  const boards = props.navigation.getParam("boards");
  const { group_id, user_id } = store;
  React.useEffect(() => {
    dispatch({ type: "SET_GROUP_AND_BOARD", group_id, board_id });
  }, [group_id, board_id]);
  const { data, loading } = useSubscription(subscribeSuggestionsByBoardId, {
    variables: { id: board_id, userId: user_id }
  });
  if (loading) {
    return LoadingIndicator();
  }
  const { suggestions, title } = data.parti_2020_boards_by_pk;
  return (
    <>
      <ViewRow style={{ justifyContent: "space-between", padding: 10 }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start"
          }}
          onPress={() => props.navigation.navigate("Home")}
        >
          <Ionicons name="ios-arrow-back" size={60} color="blue" />
          <Text style={{ color: "black", fontSize: 20, paddingLeft: 20 }}>
            {title}🌱
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "flex-end",
            padding: 10,
            backgroundColor: "lavenderblush"
          }}
          onPress={e => Share.share({ message: "제안을 공유합니다." })}
        >
          <Text style={{ color: "blue", fontSize: 20 }}>그룹 초대</Text>
        </TouchableOpacity>
      </ViewRow>
      <ScrollView>
        <View>
          <ViewRow
            style={{
              justifyContent: "space-between",
              backgroundColor: "khaki"
            }}
          >
            <Text>진행중 제안</Text>
          </ViewRow>
          <View style={{ flex: 1, backgroundColor: "lightblue" }}>
            <View>
              {suggestions.map((sugg: any, index: number) => {
                const voteCount = sugg.votes_aggregate.aggregate.sum.count;
                const votedByMe =
                  sugg.votes.length > 0 && sugg.votes[0].count > 0;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={e =>
                      props.navigation.navigate("SuggestionDetail", {
                        suggestionId: sugg.id
                      })
                    }
                  >
                    <ViewRow style={{ justifyContent: "flex-start" }}>
                      <TextRound>🌱</TextRound>
                      <View style={{ flex: 1 }}>
                        <Text>{sugg.title}</Text>
                        <ViewRow style={{ justifyContent: "flex-start" }}>
                          <Text>{sugg.updatedBy.name}</Text>
                          <Text>{votedByMe && "동의함"}</Text>
                          {sugg.closed_at && <Text>{sugg.closed_at}</Text>}
                        </ViewRow>
                      </View>
                      <TextRound>{voteCount}</TextRound>
                    </ViewRow>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("SuggestionCreate")}
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
};
