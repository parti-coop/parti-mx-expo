import React from "react";
import { Image, ViewStyle, TextStyle, Modal } from "react-native";
import { useSubscription } from "@apollo/react-hooks";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";
import ImageView from "react-native-image-viewing";

import { Text } from "../components/Text";
import { View, V0 } from "../components/View";
import { TO0 } from "../components/TouchableOpacity";
import UserProfileWithName from "../components/UserProfileWithName";
import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import ButtonVote from "../components/ButtonVote";
import ButtonDevote from "../components/ButtonDevote";
import HooksDeleteSuggestion from "../components/HooksDeleteSuggestion";
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
  elevation: 1,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowRadius: 1,
  shadowOpacity: 1,
} as ViewStyle;
const labelStyle = {
  fontSize: 13,
  textAlign: "left",
  color: "#30ad9f",
} as TextStyle;
const bodyTextStyle = {
  fontSize: 16,
  textAlign: "left",
  color: "#555555",
} as TextStyle;
export default (props: {
  navigation: StackNavigationProp<RootStackParamList, "SuggestionDetail">;
  route: RouteProp<RootStackParamList, "SuggestionDetail">;
}) => {
  const [{ user_id }, dispatch] = useStore();
  const id = props.route.params.suggestionId;
  const [deleteSuggestion] = HooksDeleteSuggestion(id);
  const { data, loading } = useSubscription(subscribeSuggestion, {
    variables: { id, user_id },
  });
  const scrollRef = React.useRef(null);
  const { navigate } = useNavigation();
  const [visible, setIsVisible] = React.useState(false);
  const [imgIndex, setImgIndex] = React.useState(0);
  function showImageViewerHandler(index: number) {
    setIsVisible(true);
    setImgIndex(index);
  }

  if (!(data && data.parti_2020_suggestions_by_pk)) {
    return null;
  }
  const { parti_2020_suggestions_by_pk } = data;
  const options = [
    {
      label: "수정하기",
      handler: () =>
        navigate("SuggestionEdit", {
          suggestion: parti_2020_suggestions_by_pk,
        }),
    },
    // { label: "제안 정리", handler: () => {} },
    // { label: "공지 올리기", handler: () => {} },
    { label: "삭제하기", handler: deleteSuggestion },
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
    comments,
    images,
  } = data.parti_2020_suggestions_by_pk;
  const voteCount = votes_aggregate.aggregate.sum.count;
  const voteUsers = votes_aggregate.nodes.map((n: any) => ({
    name: n.user.name,
    created_at: n.created_at,
    photo_url: n.user.photo_url,
  }));

  return (
    <>
      <HeaderShare id={id} />
      <KeyboardAwareScrollView ref={scrollRef}>
        <HeaderSuggestion />
        <ViewTitle title={title} updated_at={updated_at} />
        <View style={box}>
          <View style={{ margin: 30, marginBottom: 20 }}>
            <Text style={[labelStyle, { marginBottom: 19 }]}>제안자</Text>
            <UserProfileWithName
              name={createdBy.name}
              photoUrl={createdBy.photo_url}
            />
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
          <View style={{ marginHorizontal: 30, marginTop: 40 }}>
            {images?.map((o: string, i: number) => {
              return (
                <TO0 onPress={() => showImageViewerHandler(i)} key={i}>
                  <Image
                    source={{ uri: o }}
                    resizeMode="cover"
                    style={{ width: "100%", height: 186, marginBottom: 10 }}
                  />
                </TO0>
              );
            })}
          </View>
          <SelectMenu items={options} />
          <V0 style={{ marginTop: 50 }}>
            {voteCount > 0 ? (
              <ButtonDevote id={id} />
            ) : (
              <ButtonVote
                id={id}
                created_at={created_at}
                closing_method={closing_method}
              />
            )}
          </V0>
        </View>
        <SuggestionTabs
          id={id}
          comments={comments}
          voteUsers={voteUsers}
          scrollRef={scrollRef}
        />
        <ImageView
          images={images.map((i: string) => ({ uri: i }))}
          imageIndex={imgIndex}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      </KeyboardAwareScrollView>
    </>
  );
};
