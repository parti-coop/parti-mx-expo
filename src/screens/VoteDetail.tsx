import React from "react";
import { Linking } from "expo";
import { useSubscription } from "@apollo/react-hooks";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";

import { Mint12, Title14, Body16, Body12, White16 } from "../components/Text";
import { View, V0, ViewRow } from "../components/View";
import { TO0, TORowCenter } from "../components/TouchableOpacity";
import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import usePostDelete from "../components/usePostDelete";
import HeaderShare from "../components/HeaderShare";
import HeaderBreadcrumb from "../components/HeaderBreadcrumb";
import ViewTitleCalendar from "../components/ViewTitleCalendar";
import { LineSeperator } from "../components/LineDivider";
import SelectMenu from "../components/SelectMenu";
import { whiteRoundBg } from "../components/Styles";
import ViewDetailImageFile from "../components/ViewDetailImageFile";
import UserProfileNameDate from "../components/UserProfileNameDate";
import Comments from "../components/Comments";
import TouchableCheckBar from "../components/TouchableCheckBar";
import Hyperlink from "../components/Hyperlink";
import COLORS from "../components/Colors";

import { useStore } from "../Store";
import { subscribeVote } from "../graphql/subscription";
import { RootStackParamList } from "./AppContainer";
import { closingMonthDateFrom } from "../Utils/CalculateDays";

import { VoteDetailType, File } from "../types";
import { boardTypes } from "../components/boardTypes";

export default function VoteDetail(props: {
  navigation: StackNavigationProp<RootStackParamList, "VoteDetail">;
  route: RouteProp<RootStackParamList, "VoteDetail">;
}) {
  const [{ user_id }, dispatch] = useStore();
  const id = props.route.params.postId;

  const [deletePost] = usePostDelete(id);
  const { data, loading } = useSubscription(subscribeVote, {
    variables: { id, user_id },
  });
  const scrollRef = React.useRef(null);
  const { navigate } = useNavigation();

  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  const vote: VoteDetailType = data?.mx_posts_by_pk ?? {};
  const options = [
    {
      label: "수정하기",
      handler: () =>
        navigate("VoteEdit", {
          vote,
        }),
    },
    // { label: "제안 정리", handler: () => {} },
    // { label: "공지 올리기", handler: () => {} },
  ];

  const {
    title = "제목 로딩 중",
    body = "",
    metadata,
    createdBy = { photo_url: "", name: "", id: null },
    updated_at = "",
    created_at = "",
    comments = [],
    images = [],
    files = [],
    meLiked,
    board = { title: "" },
    candidates,
    users_aggregate,
  } = vote;
  const [isVoted, setVoted] = React.useState(false);
  React.useEffect(() => {
    setVoted(!!meLiked?.[0]?.like_count);
  }, [vote]);
  function revoteHandler() {
    setVoted(false);
  }
  const totalVoteCount = candidates?.reduce(
    (p, c) => p + c?.votes_aggregate?.aggregate?.sum?.count || 0,
    0
  );
  const maxVoteCount = Math.max(
    ...(candidates?.map(
      (c) => c?.votes_aggregate?.aggregate?.sum?.count || 0
    ) ?? [])
  );
  let closingAt = null;
  switch (metadata?.closingMethod) {
    case "manual":
      closingAt = "정리 할 때";
      break;
    default: {
      const closingDays = Number(metadata?.closingMethod?.replace("days", ""));
      if (closingDays) {
        closingAt = closingMonthDateFrom(created_at, closingDays);
      }
    }
  }
  if (totalVoteCount === 0) {
    options.push({ label: "삭제하기", handler: deletePost });
  }
  return (
    <>
      <HeaderShare id={id} type={boardTypes.VOTE} />
      <KeyboardAwareScrollView ref={scrollRef}>
        <HeaderBreadcrumb boardName={board.title} />
        <ViewTitleCalendar title={title} value={closingAt} />
        <View style={[whiteRoundBg, { marginTop: 30, paddingBottom: 50 }]}>
          <ViewRow style={{ margin: 30, marginBottom: 20 }}>
            <UserProfileNameDate
              name={createdBy.name}
              photoUrl={createdBy.photo_url}
              date={updated_at}
            />
            {createdBy.id === user_id && <SelectMenu items={options} />}
          </ViewRow>
          <LineSeperator />
          <View style={{ marginHorizontal: 30, marginVertical: 15 }}>
            <Hyperlink text={body} />
          </View>
          <View style={{ marginHorizontal: 30 }}>
            <ViewRow style={{ justifyContent: "space-between" }}>
              <Mint12 style={{ fontFamily: "notosans700" }}>
                {metadata?.isAnonymous && "익명투표"}
              </Mint12>
              <ViewRow>
                <Body12 style={{ fontFamily: "notosans700" }}>참여</Body12>
                <Mint12 style={{ fontFamily: "notosans700" }}>
                  {users_aggregate?.aggregate?.sum?.like_count ?? 0}
                </Mint12>
                <Body12 style={{ fontFamily: "notosans700" }}>명</Body12>
              </ViewRow>
            </ViewRow>
            <View style={{ marginTop: 5 }}>
              {candidates?.map((c, i) => {
                return (
                  <TouchableCheckBar
                    key={i}
                    candidate={c}
                    voted={isVoted}
                    max={maxVoteCount}
                    total={totalVoteCount}
                    style={{ marginTop: 10 }}
                  />
                );
              })}
            </View>
            {isVoted && (
              <TORowCenter
                style={{
                  borderRadius: 16,
                  backgroundColor: COLORS.MINT,
                  alignSelf: "center",
                  paddingHorizontal: 20,
                  minHeight: 33,
                  marginTop: 45,
                }}
                onPress={revoteHandler}
              >
                <White16 style={{ fontFamily: "notosans700" }}>
                  다시 투표하기
                </White16>
              </TORowCenter>
            )}
          </View>
          <ViewDetailImageFile files={files} images={images} />
        </View>
        <ViewRow style={{ paddingVertical: 20, paddingHorizontal: 30 }}>
          <Title14>댓글 {comments.length}</Title14>
        </ViewRow>
        <Comments comments={comments} postId={id} scrollRef={scrollRef} />
      </KeyboardAwareScrollView>
    </>
  );
}
