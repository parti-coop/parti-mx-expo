import React from "react";
import { Share, Alert } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
import { View, ViewRow } from "../components/View";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoadingIndicator from "../components/LoadingIndicator";
import { TouchableOpacity, TOEasy } from "../components/TouchableOpacity";
import UserProfileWithName from "../components/UserProfileWithName";
import SuggestionVoted from "../components/SuggestionVoted";
import Comments from "../components/Comments";
import ButtonVote from "../components/ButtonVote";
import ButtonDevote from "../components/ButtonDevote";
import HooksDeleteSuggestion from "../components/HooksDeleteSuggestion";
import PopupMenu from "../components/PopupMenu";
import { useMutation, useSubscription } from "@apollo/react-hooks";
import { useStore } from "../Store";
import { subscribeSuggestion } from "../graphql/subscription";

export default (
  props: NavigationStackScreenProps<{ suggestionId: number }>
) => {
  const [, , dispatch] = useStore();
  const id = props.navigation.getParam("suggestionId");
  const deleteSuggestion = HooksDeleteSuggestion(id, props.navigation.goBack);
  const { data, loading } = useSubscription(subscribeSuggestion, {
    variables: { id }
  });

  const [showComments, setShowComments] = React.useState(true);

  function onPopupEvent(eventName, index) {
    if (eventName !== "itemSelected") return;
    const { parti_2020_suggestions_by_pk } = data;
    switch (index) {
      case 0:
        return props.navigation.navigate("SuggestionEdit", {
          suggestion: parti_2020_suggestions_by_pk
        });
      case 3:
        return deleteSuggestion();
      default:
        return alert(index);
    }
  }
  if (loading) {
    return LoadingIndicator();
  }

  const {
    title,
    body,
    context,
    closing_method,
    createdBy,
    updated_at,
    votes_aggregate,
    comments
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
      <KeyboardAwareScrollView
        contentContainerStyle={{
          alignItems: "stretch",
          padding: 10,
          backgroundColor: "lightgreen"
        }}
      >
        <View>
          <ViewRow>
            <Text style={{ fontSize: 20 }}>{title}</Text>
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
          <ViewRow>
            <Text>{updated_at}</Text>
          </ViewRow>
        </View>
        <View>
          <Text>제안자</Text>
          <UserProfileWithName name={createdBy.name} />
        </View>
        <View>
          <Text>제안 배경</Text>
          <Text>{context}</Text>
        </View>
        <View style={{ paddingTop: 10, backgroundColor: "lightblue" }}>
          <Text>제안 내용</Text>
          <Text>{body}</Text>
        </View>
        <ViewRow>
          {voteCount > 0 ? <ButtonDevote id={id} /> : <ButtonVote id={id} />}
        </ViewRow>
        <ViewRow>
          <TOEasy style={{ height: 50 }} onPress={e => setShowComments(true)}>
            <Text>댓글</Text>
          </TOEasy>
          <TOEasy style={{ height: 50 }} onPress={e => setShowComments(false)}>
            <Text>제안 동의</Text>
          </TOEasy>
        </ViewRow>
        {showComments ? (
          <Comments comments={comments} suggestionId={id} />
        ) : (
          <SuggestionVoted voteUsers={voteUsers} />
        )}
      </KeyboardAwareScrollView>
    </>
  );
};
