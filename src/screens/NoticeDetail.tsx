import React from "react";
import { useSubscription } from "@apollo/react-hooks";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";

import { Body16, Title14 } from "../components/Text";
import { View, V0, ViewRow } from "../components/View";
import UserProfileNameDate from "../components/UserProfileNameDate";
import Hyperlink from "../components/Hyperlink";
import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import ButtonPostLike from "../components/ButtonPostLike";
import ButtonPostUnlike from "../components/ButtonPostUnlike";
import usePostDelete from "../components/usePostDelete";
import useReport from "../components/useReport";
import usePostAnnounce from "../components/usePostAnnounce";
import usePostDenounce from "../components/usePostDenounce";
import HeaderShare from "../components/HeaderShare";
import HeaderBreadcrumb from "../components/HeaderBreadcrumb";
import ViewTitle from "../components/ViewTitle";
import { LineSeperator } from "../components/LineDivider";
import SelectMenu from "../components/SelectMenu";
import Comments from "../components/Comments";
import ViewDetailImageFile from "../components/ViewDetailImageFile";
import { whiteRoundBg } from "../components/Styles";

import { useStore } from "../Store";
import { subscribeNotice } from "../graphql/subscription";
import { RootStackParamList } from "./AppContainer";

import { NoticeDetailType } from "../types";
import { boardTypes } from "../components/boardTypes";

export default function NoticeDetail(props: {
  navigation: StackNavigationProp<RootStackParamList, "NoticeDetail">;
  route: RouteProp<RootStackParamList, "NoticeDetail">;
}) {
  const [{ user_id }, dispatch] = useStore();
  const id = props.route.params.postId;

  const [deletePost] = usePostDelete(id);
  const [reportPost] = useReport(id, "post");
  const [announcePost] = usePostAnnounce(id);
  const [denouncePost] = usePostDenounce(id);
  const { data, loading, error } = useSubscription(subscribeNotice, {
    variables: { id, user_id },
  });
  if (error) {
    console.log(error);
  }
  const scrollRef = React.useRef(null);
  const { navigate } = useNavigation();

  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  const notice: NoticeDetailType = data?.mx_posts_by_pk ?? {};
  function navigateEdit() {
    navigate("NoticeEdit", { notice });
  }
  const options = [];

  const {
    title = "제목 로딩 중",
    body = "",
    createdBy = { photo_url: "", name: "", id: null },
    updated_at = "",
    metadata = { announcement: false },
    comments = [],
    images = [],
    files = [],
    meLiked = [],
    board = { title: "" },
    users_aggregate,
  } = notice;
  const liked = meLiked?.[0]?.like_count ?? 0;
  const totalLiked = users_aggregate?.aggregate?.sum?.like_count ?? 0;
  if (createdBy.id === user_id) {
    if (metadata.announcement) {
      options.unshift({ label: "공지 내리기", handler: denouncePost });
    } else {
      options.unshift({ label: "공지 올리기", handler: announcePost });
    }
    options.push(
      { label: "수정하기", handler: navigateEdit },
      { label: "삭제하기", handler: deletePost },
      { label: "신고하기", handler: reportPost }
    );
  } else {
    options.push({ label: "신고하기", handler: reportPost });
  }
  return (
    <>
      <HeaderShare id={id} type={boardTypes.NOTICE} />
      <KeyboardAwareScrollView ref={scrollRef}>
        <HeaderBreadcrumb boardName={board.title} />
        <ViewTitle title={title} />
        <View style={[whiteRoundBg, { marginTop: 30, paddingBottom: 50 }]}>
          <ViewRow style={{ margin: 30, marginBottom: 20 }}>
            <UserProfileNameDate
              name={createdBy.name}
              photoUrl={createdBy.photo_url}
              date={updated_at}
            />
            <SelectMenu items={options} />
          </ViewRow>
          <LineSeperator />
          <View style={{ marginHorizontal: 30, marginTop: 40 }}>
            <Hyperlink text={body} />
          </View>
          <ViewDetailImageFile files={files} images={images} />
          <V0 style={{ marginTop: 50 }}>
            {liked > 0 ? (
              <ButtonPostUnlike id={id} total={totalLiked} />
            ) : (
              <ButtonPostLike id={id} total={totalLiked} />
            )}
          </V0>
        </View>
        <ViewRow style={{ paddingVertical: 20, paddingHorizontal: 30 }}>
          <Title14>댓글 {comments.length}</Title14>
        </ViewRow>
        <Comments comments={comments} postId={id} scrollRef={scrollRef} />
      </KeyboardAwareScrollView>
    </>
  );
}
