import React from "react";
import { ScrollView } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Text } from "../components/Text";
import { View } from "../components/View";
import LoadingIndicator from "../components/LoadingIndicator";
import { TouchableOpacity } from "../components/TouchableOpacity";
import { useStore } from "../Store";
import { useQuery } from "@apollo/react-hooks";
import { getSuggestionsByGroupId } from "../graphql/query";
export default (props: NavigationStackScreenProps) => {
  const { loading, data } = useQuery(getSuggestionsByGroupId, {
    variables: { id: 1 }
  });
  const [store, setStore] = useStore();
  if (loading) {
    return LoadingIndicator();
  }
  if (data) {
    const board_id = data.parti_2020_groups_by_pk.boardDefault.id;
    const group_id = data.parti_2020_groups_by_pk.id;
    setStore({ group_id, board_id });
  }
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
        >
          <Text style={{ color: "blue", fontSize: 20 }}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 3, alignItems: "center", padding: 20 }}
        >
          <Text style={{ color: "black", fontSize: 30 }}>
            {data.parti_2020_groups_by_pk.title}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center", padding: 20 }}
        >
          <Text style={{ color: "blue", fontSize: 20 }}>초대</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ flex: 1, alignItems: "stretch", justifyContent: "center" }}
      >
        <ScrollView horizontal style={{ flexGrow: 0, flexShrink: 1 }}>
          {data.parti_2020_groups_by_pk.boards.map((board, index) => (
            <TouchableOpacity key={index}>
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
          <Text style={{ textAlign: "center", fontSize: 20 }}>제안 리스트</Text>
          <View>
            {data.parti_2020_groups_by_pk.boardDefault.suggestions.map(
              (sugg, index) => (
                <TouchableOpacity key={index}>
                  <Text>{sugg.body}</Text>
                  <Text>{sugg.created_at}</Text>
                  <Text>{sugg.updatedBy.email}</Text>
                </TouchableOpacity>
              )
            )}
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
