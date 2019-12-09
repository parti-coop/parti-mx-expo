import React from "react";
import { Share, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { View, ViewRow } from "../components/View";
import LoadingIndicator from "../components/LoadingIndicator";
import { Button } from "../components/Button";
import { TouchableOpacity } from "../components/TouchableOpacity";
import PopupMenu from "../components/PopupMenu";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useStore } from "../Store";
import { getSuggestion } from "../graphql/query";
import { deleteSuggestion } from "../graphql/mutation";
export default (
  props: NavigationStackScreenProps<{ suggestionId: number }>
) => {
  const id = props.navigation.getParam("suggestionId");
  const { data, loading } = useQuery(getSuggestion, { variables: { id } });
  const [del] = useMutation(deleteSuggestion, { variables: { id } });

  function onPopupEvent(eventName, index) {
    if (eventName !== "itemSelected") return;
    const { parti_2020_suggestions_by_pk } = data;
    switch (index) {
      case 0:
        return props.navigation.navigate("SuggestionEdit", {
          suggestion: parti_2020_suggestions_by_pk
        });
      case 1:
        return Alert.alert("제안 삭제", "삭제하겠습니까? 복구할 수 없습니다.", [
          {
            text: "취소",
            style: "cancel"
          },
          {
            text: "삭제",
            onPress: () =>
              del({
                variables: {
                  id
                }
              })
                .then(() => alert("삭제되었습니다."))
                .then(() => props.navigation.goBack())
          }
        ]);
        return;
      default:
        return alert(index);
    }
  }
  if (loading) {
    return LoadingIndicator();
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
      <View
        style={{
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
            <Text style={{ fontSize: 20 }}>제안 제목을 따로 넣을것인가?</Text>
            <ViewRow>
              <Text>{data.parti_2020_suggestions_by_pk.createdBy.email}</Text>
              <Text>{data.parti_2020_suggestions_by_pk.updated_at}</Text>
            </ViewRow>
          </View>
          {/* <TouchableOpacity
            style={{
              flexBasis: 30,
              backgroundColor: "lightpink"
            }}
          >
            <MaterialIcons name="more-vert" size={30} />
          </TouchableOpacity> */}
          <PopupMenu actions={["Edit", "Remove"]} onPress={onPopupEvent} />
        </ViewRow>
        <View style={{ paddingTop: 10, backgroundColor: "lightblue" }}>
          <Text>{data.parti_2020_suggestions_by_pk.body}</Text>
        </View>
      </View>
    </>
  );
};
