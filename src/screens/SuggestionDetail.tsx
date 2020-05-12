import React from "react";

import { useSubscription } from "@apollo/react-hooks";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";

import { Mint13, Body16 } from "../components/Text";
import { View, V0, ViewRow } from "../components/View";
import UserProfileWithName from "../components/UserProfileWithName";
import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import ButtonSuggestionLike from "../components/ButtonSuggestionLike";
import ButtonUnlike from "../components/ButtonUnlike";
import usePostDelete from "../components/usePostDelete";
import HeaderShare from "../components/HeaderShare";
import HeaderBreadcrumb from "../components/HeaderBreadcrumb";
import ViewTitle from "../components/ViewTitle";
import { LineSeperator } from "../components/LineDivider";
import SelectMenu from "../components/SelectMenu";
import SuggestionTabs from "../components/SuggestionTabs";
import ViewDetailImageFile from "../components/ViewDetailImageFile";
import { whiteRoundBg } from "../components/Styles";

import { useStore } from "../Store";
import { subscribeSuggestion } from "../graphql/subscription";
import { RootStackParamList } from "./AppContainer";

import { SuggestionDetailType } from "../types";

export default function SuggestionDetail(props: {
  navigation: StackNavigationProp<RootStackParamList, "SuggestionDetail">;
  route: RouteProp<RootStackParamList, "SuggestionDetail">;
}) {
  const [{ user_id }, dispatch] = useStore();
  const id = props.route.params.postId;

  const [deletePost] = usePostDelete(id);
  const { data, loading } = useSubscription(subscribeSuggestion, {
    variables: { id, user_id },
  });
  const scrollRef = React.useRef(null);
  const { navigate } = useNavigation();

  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  const suggestion: SuggestionDetailType = data?.mx_posts_by_pk ?? {};
  const options = [
    {
      label: "수정하기",
      handler: () =>
        navigate("SuggestionEdit", {
          suggestion,
        }),
    },
    // { label: "제안 정리", handler: () => {} },
    // { label: "공지 올리기", handler: () => {} },
    { label: "삭제하기", handler: deletePost },
  ];

  const {
    title = "제목 로딩 중",
    body = "",
    context = "",
    metadata = {},
    createdBy = { photo_url: "", name: "", id: null },
    updated_at = "",
    created_at = "",
    comments = [],
    images = [],
    files = [],
    meLiked = [],
    likedUsers = [],
    board = { title: "" },
  } = suggestion;
  const liked = meLiked?.[0]?.like_count ?? 0;
  const voteUsers = likedUsers.map((n: any) => ({
    name: n.user.name,
    created_at: n.created_at,
    photo_url: n.user.photo_url,
  }));

  return (
    <>
      <HeaderShare id={id} />
      <KeyboardAwareScrollView ref={scrollRef}>
        <HeaderBreadcrumb boardName={board.title} />
        <ViewTitle title={title} updated_at={updated_at} />
        <View style={[whiteRoundBg, { marginTop: 30, paddingBottom: 50 }]}>
          <ViewRow style={{ margin: 30, marginBottom: 20 }}>
            <View>
              <Mint13 style={{ marginBottom: 19, fontFamily: "notosans700" }}>
                제안자
              </Mint13>
              <UserProfileWithName
                name={createdBy.name}
                photoUrl={createdBy.photo_url}
              />
            </View>
            {createdBy.id === user_id && <SelectMenu items={options} />}
          </ViewRow>
          <LineSeperator />
          <View style={{ marginHorizontal: 30, marginTop: 40 }}>
            <Mint13 style={{ marginBottom: 19, fontFamily: "notosans700" }}>
              제안 배경
            </Mint13>
            <Body16>{context}</Body16>
          </View>
          <View style={{ marginHorizontal: 30, marginTop: 40 }}>
            <Mint13 style={{ marginBottom: 19, fontFamily: "notosans700" }}>
              제안 내용
            </Mint13>
            <Body16>{body}</Body16>
          </View>
          <ViewDetailImageFile files={files} images={images} />
          <V0 style={{ marginTop: 50 }}>
            {liked > 0 ? (
              <ButtonUnlike id={id} />
            ) : (
              <ButtonSuggestionLike
                id={id}
                created_at={created_at}
                closingMethod={metadata?.closingMethod}
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
      </KeyboardAwareScrollView>
    </>
  );
}
