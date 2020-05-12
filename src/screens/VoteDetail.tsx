import React from "react";
import { Linking } from "expo";
import { TextStyle } from "react-native";
import { useSubscription } from "@apollo/react-hooks";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";

import { Text, Title14, Body16 } from "../components/Text";
import { View, V0, ViewRow } from "../components/View";
import { TO0, TORow } from "../components/TouchableOpacity";
import UserProfileWithName from "../components/UserProfileWithName";
import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import ButtonSuggestionLike from "../components/ButtonSuggestionLike";
import ButtonUnlike from "../components/ButtonUnlike";
import usePostDelete from "../components/usePostDelete";
import HeaderShare from "../components/HeaderShare";
import HeaderBreadcrumb from "../components/HeaderBreadcrumb";
import ViewTitleCalendar from "../components/ViewTitleCalendar";
import { LineSeperator } from "../components/LineDivider";
import SelectMenu from "../components/SelectMenu";
import SuggestionTabs from "../components/SuggestionTabs";
import { whiteRoundBg } from "../components/Styles";
import ViewDetailImageFile from "../components/ViewDetailImageFile";
import UserProfileNameDate from "../components/UserProfileNameDate";
import Comments from "../components/Comments";

import { useStore } from "../Store";
import { subscribeSuggestion } from "../graphql/subscription";
import { RootStackParamList } from "./AppContainer";
import { isAfterString, closingMonthDateFrom } from "../Utils/CalculateDays";

import { SuggestionDetailType, File } from "../types";

const labelStyle = {
  fontSize: 13,
  textAlign: "left",
  color: "#12BD8E",
} as TextStyle;
const bodyTextStyle = {
  fontSize: 16,
  textAlign: "left",
  color: "#555555",
} as TextStyle;
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
  const [visible, setIsVisible] = React.useState(false);
  const [imgIndex, setImgIndex] = React.useState(0);
  function showImageViewerHandler(index: number) {
    setIsVisible(true);
    setImgIndex(index);
  }

  function openFileHandler(file: File) {
    Linking.openURL(file.uri);
  }

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
  const closingDays = metadata?.closingMethod?.replace("days", "");
  const closingAt = closingMonthDateFrom(created_at, Number(closingDays));

  return (
    <>
      <HeaderShare id={id} />
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
          <View style={{ marginHorizontal: 30, marginTop: 40 }}>
            <Text style={[labelStyle, { marginBottom: 19 }]}>제안 배경</Text>
            <Text style={bodyTextStyle}>{context}</Text>
          </View>
          <View style={{ marginHorizontal: 30, marginTop: 40 }}>
            <Text style={[labelStyle, { marginBottom: 19 }]}>제안 내용</Text>
            <Text style={bodyTextStyle}>{body}</Text>
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
        <ViewRow style={{ paddingVertical: 20, paddingHorizontal: 30 }}>
          <Title14>댓글 {comments.length}</Title14>
        </ViewRow>
        <Comments comments={comments} postId={id} scrollRef={scrollRef} />
      </KeyboardAwareScrollView>
    </>
  );
}
