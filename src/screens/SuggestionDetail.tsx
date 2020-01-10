import React from "react";
import { Share, Alert, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { View, ViewRow } from "../components/View";
import LoadingIndicator from "../components/LoadingIndicator";
import Spinner from "react-native-loading-spinner-overlay";
import { TouchableOpacity } from "../components/TouchableOpacity";
import PopupMenu from "../components/PopupMenu";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useStore } from "../Store";
import { getSuggestionList } from "../graphql/query";
import { deleteSuggestion, voteSuggestion } from "../graphql/mutation";
export default (
  props: NavigationStackScreenProps<{ suggestionId: number }>
) => {
  const [{ user_id }] = useStore();
  const id = props.navigation.getParam("suggestionId");
  const { data, loading } = useQuery(getSuggestionList, { variables: { id } });
  const [del, delV] = useMutation(deleteSuggestion, { variables: { id } });
  const [vote, voteV] = useMutation(voteSuggestion, {
    variables: { id, user_id }
  });

  function onPopupEvent(eventName, index) {
    if (eventName !== "itemSelected") return;
    const { parti_2020_suggestions_by_pk } = data;
    switch (index) {
      case 0:
        return props.navigation.navigate("SuggestionEdit", {
          suggestion: parti_2020_suggestions_by_pk
        });
      case 3:
        return Alert.alert("제안 삭제", "삭제하겠습니까? 복구할 수 없습니다.", [
          {
            text: "취소",
            style: "cancel"
          },
          {
            text: "삭제",
            onPress: () =>
              del()
                .then(() => alert("삭제되었습니다."))
                .then(() => props.navigation.goBack())
          }
        ]);
        return;
      default:
        return alert(index);
    }
  }
  if (loading || delV.loading) {
    return LoadingIndicator();
  }

  const {
    title,
    body,
    createdBy,
    updated_at,
    votes_aggregate
  } = data.parti_2020_suggestions_by_pk;
  const voteCount = votes_aggregate.aggregate.sum.count;
  const voteUsers = votes_aggregate.nodes.map((n: any) => n.user.name);
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
          onPress={e => props.navigation.goBack()}
          style={{ flex: 1, alignItems: "center", padding: 20 }}
        >
          <Text style={{ color: "blue", fontSize: 20 }}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 3, alignItems: "center", padding: 20 }}
        >
          <Text style={{ color: "black", fontSize: 28 }}>제안 내용</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={e => Share.share({ message: "제안을 공유합니다." })}
          style={{ flex: 1, alignItems: "center", padding: 20 }}
        >
          <Text style={{ color: "blue", fontSize: 20 }}>공유</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "stretch",
          padding: 10,
          backgroundColor: "lightgreen"
        }}
      >
        <ViewRow
          style={{
            justifyContent: "flex-start"
          }}
        >
          <View
            style={{
              width: 56,
              height: 56,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "lightyellow",
              borderRadius: 30
            }}
          >
            <Text>제안</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "lightgrey"
            }}
          >
            <Text style={{ fontSize: 20 }}>{title}</Text>
            <ViewRow>
              <Text>{createdBy.name}</Text>
              <Text>{updated_at}</Text>
            </ViewRow>
          </View>
          <PopupMenu
            actions={[
              "수정하기",
              "제안 정리",
              "공지로 올리기/ 공지 내리기",
              "삭제하기"
            ]}
            onPress={onPopupEvent}
          />
        </ViewRow>
        <View style={{ paddingTop: 10, backgroundColor: "lightblue" }}>
          <Text>{body}</Text>
        </View>
        <ViewRow>
          {voteCount > 0 ? (
            <Button
              title="이 제안에 동의했습니다."
              color="cadetblue"
              onPress={e =>
                vote()
                  .then(console.log)
                  .catch(console.error)
              }
            />
          ) : (
            <Button
              title="이 제안에 동의합니다."
              color="cadetblue"
              onPress={e =>
                vote()
                  .then(console.log)
                  .catch(console.error)
              }
            />
          )}
        </ViewRow>
        <Spinner visible={voteV.loading} textContent="로딩중입니다..." />
      </ScrollView>
    </>
  );
};
