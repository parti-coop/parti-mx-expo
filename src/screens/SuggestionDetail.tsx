import React from "react";
import { Image, ViewStyle, TextStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSubscription } from "@apollo/react-hooks";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { Text } from "../components/Text";
import { View, ViewRow, ViewColumnCenter } from "../components/View";
import LoadingIndicator from "../components/LoadingIndicator";
import { TouchableOpacity, TOEasy } from "../components/TouchableOpacity";
import UserProfileWithName from "../components/UserProfileWithName";
import SuggestionVoted from "../components/SuggestionVoted";
import Comments from "../components/Comments";
import ButtonVote from "../components/ButtonVote";
import ButtonDevote from "../components/ButtonDevote";
import HooksDeleteSuggestion from "../components/HooksDeleteSuggestion";
import PopupMenu from "../components/PopupMenu";
import HeaderShare from "../components/HeaderShare";
import HeaderSuggestion from "../components/HeaderSuggestion";
import ViewTitle from "../components/ViewTitle";
import LineSeperator from "../components/LineSeperator";

import { useStore } from "../Store";
import { subscribeSuggestion } from "../graphql/subscription";
import { RootStackParamList } from "./AppContainer";

const options = [
  "수정하기",
  "제안 정리",
  "공지로 올리기/ 공지 내리기",
  "삭제하기"
];

const box = {
  marginTop: 40,
  borderRadius: 25,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.15)",
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowRadius: 1,
  shadowOpacity: 1
} as ViewStyle;
const labelStyle = {
  fontSize: 13,
  textAlign: "left",
  color: "#30ad9f"
} as TextStyle;
const bodyTextStyle = {
  fontSize: 16,
  textAlign: "left",
  color: "#555555"
} as TextStyle;
export default (props: {
  navigation: StackNavigationProp<RootStackParamList, "SuggestionDetail">;
  route: RouteProp<RootStackParamList, "SuggestionDetail">;
}) => {
  const [{ user_id }, dispatch] = useStore();
  const id = props.route.params.suggestionId;
  const deleteSuggestion = HooksDeleteSuggestion(id, props.navigation.goBack);
  const { data, loading } = useSubscription(subscribeSuggestion, {
    variables: { id, user_id }
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
    created_at,
    votes_aggregate,
    comments
  } = data.parti_2020_suggestions_by_pk;
  const voteCount = votes_aggregate.aggregate.sum.count;
  const voteUsers = votes_aggregate.nodes.map((n: any) => n.user.name);
  const closingAt = new Date(
    (d => d.setDate(d.getDate() + 30))(new Date(created_at))
  ).toDateString();
  return (
    <>
      <HeaderShare id={id} />
      <HeaderSuggestion />
      <ViewTitle title={title} updated_at={updated_at} />
      <KeyboardAwareScrollView
        contentContainerStyle={[box]}
        keyboardShouldPersistTaps={"handled"}
      >
        <View style={{ margin: 30, marginBottom: 20 }}>
          <Text style={[labelStyle, { marginBottom: 19 }]}>제안자</Text>
          <UserProfileWithName name={createdBy.name} />
        </View>
        <LineSeperator />
        <View style={{ marginHorizontal: 30, marginTop: 40 }}>
          <Text style={[labelStyle, { marginBottom: 19 }]}>제안 배경</Text>
          <Text style={bodyTextStyle}>{context}</Text>
        </View>
        <View style={{ marginHorizontal: 30, marginTop: 40 }}>
          <Text style={[labelStyle, { marginBottom: 19 }]}>제안 내용</Text>
          <Text style={bodyTextStyle}>{body}</Text>
        </View>
        <ViewColumnCenter style={{ marginTop: 50 }}>
          {voteCount > 0 ? <ButtonDevote id={id} /> : <ButtonVote id={id} />}
          {closing_method === 0 && (
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                color: "#f35f5f",
                marginTop: 10
              }}
            >
              {closingAt}까지 동의할 수 있습니다
            </Text>
          )}
        </ViewColumnCenter>
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
