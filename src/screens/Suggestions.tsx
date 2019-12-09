import React from "react";
import { ScrollView, Share } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Text } from "../components/Text";
import { View } from "../components/View";
import LoadingIndicator from "../components/LoadingIndicator";
import { TouchableOpacity } from "../components/TouchableOpacity";
import { useStore } from "../Store";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { subscribeSuggestionsByBoardId } from "../graphql/subscription";
export default (
  props: NavigationStackScreenProps<{ id: number; boards: any[] }>
) => {
  const [store, setStore] = useStore();
  const board_id = props.navigation.getParam("id");
  const boards = props.navigation.getParam("boards");
  const { group_id } = store;
  React.useEffect(() => {
    setStore({ group_id, board_id });
  }, [group_id, board_id]);
  const { data, loading } = useSubscription(subscribeSuggestionsByBoardId, {
    variables: { id: board_id }
  });
  if (loading) {
    return LoadingIndicator();
  }
  const { suggestions, title } = data.parti_2020_boards_by_pk;
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center", padding: 20 }}
          onPress={() => props.navigation.navigate("Home")}
        >
          <Text style={{ color: "blue", fontSize: 20 }}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 3, alignItems: "center", padding: 20 }}
        >
          <Text style={{ color: "black", fontSize: 30 }}>{title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center", padding: 20 }}
          onPress={e => Share.share({ message: "제안을 공유합니다." })}
        >
          <Text style={{ color: "blue", fontSize: 20 }}>초대</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ flex: 1, alignItems: "stretch", justifyContent: "center" }}
      >
        <ScrollView horizontal style={{ flexGrow: 0, flexShrink: 1 }}>
          {boards.map((board, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                props.navigation.navigate("Suggestions", {
                  boards,
                  id: board.id
                })
              }
            >
              <Text
                style={{
                  width: 100,
                  fontSize: 18,
                  lineHeight: 50,
                  textAlign: "center",
                  backgroundColor: "yellow"
                }}
              >
                {board.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={{ flex: 1, backgroundColor: "lightblue" }}>
          <View>
            {suggestions.map((sugg, index) => (
              <TouchableOpacity
                key={index}
                onPress={e =>
                  props.navigation.navigate("SuggestionDetail", {
                    suggestionId: sugg.id
                  })
                }
              >
                <Text>{sugg.body}</Text>
                <Text>{sugg.created_at}</Text>
                <Text>{sugg.updatedBy.email}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

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
