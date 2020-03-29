import React from "react";
import { Image, ViewStyle, TextStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSubscription } from "@apollo/react-hooks";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";

import { Text, Black14 } from "../components/Text";
import { View, ViewRow, ViewColumnCenter } from "../components/View";
import { TouchableOpacity, TO0 } from "../components/TouchableOpacity";
import UserProfileWithName from "../components/UserProfileWithName";

import ButtonVote from "../components/ButtonVote";
import ButtonDevote from "../components/ButtonDevote";
import HooksDeleteSuggestion from "../components/HooksDeleteSuggestion";
import PopupMenu from "../components/PopupMenu";
import HeaderShare from "../components/HeaderShare";
import HeaderSuggestion from "../components/HeaderSuggestion";
import ViewTitle from "../components/ViewTitle";
import LineSeperator from "../components/LineSeperator";
import SelectMenu from "../components/SelectMenu";
import SuggestionTabs from "../components/SuggestionTabs";

import { useStore } from "../Store";
import { subscribeSuggestion } from "../graphql/subscription";
import { RootStackParamList } from "./AppContainer";

const box = {
  marginTop: 40,
  paddingBottom: 50,
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
  const [deleteSuggestion] = HooksDeleteSuggestion(id);
  const { data, loading } = useSubscription(subscribeSuggestion, {
    variables: { id, user_id }
  });
  const { navigate } = useNavigation();

  if (!(data && data.parti_2020_suggestions_by_pk)) {
    return null;
  }
  const { parti_2020_suggestions_by_pk } = data;
  const options = [
    {
      label: "수정하기",
      handler: () =>
        navigate("SuggestionEdit", {
          suggestion: parti_2020_suggestions_by_pk
        })
    },
    { label: "제안 정리", handler: () => {} },
    { label: "공지 올리기", handler: () => {} },
    { label: "삭제하기", handler: deleteSuggestion }
  ];

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

  return (
    <>
      <HeaderShare id={id} />
      <HeaderSuggestion />
      <ViewTitle title={title} updated_at={updated_at} />
      <KeyboardAwareScrollView
        // contentContainerStyle={[box]}
        keyboardShouldPersistTaps={"handled"}
      >
        <View style={box}>
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
          <SelectMenu items={options} />
          <ViewColumnCenter style={{ marginTop: 50 }}>
            {voteCount > 0 ? (
              <ButtonDevote id={id} />
            ) : (
              <ButtonVote
                id={id}
                created_at={created_at}
                closing_method={closing_method}
              />
            )}
          </ViewColumnCenter>
        </View>
        <SuggestionTabs id={id} comments={comments} voteUsers={voteUsers} />
      </KeyboardAwareScrollView>
    </>
  );
};
