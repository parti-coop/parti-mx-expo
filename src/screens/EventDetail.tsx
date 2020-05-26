import React from "react";

import { useSubscription } from "@apollo/react-hooks";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";

import { Mint13, Body16 } from "../components/Text";
import { View, V0, ViewRow } from "../components/View";
import UserProfileNameDate from "../components/UserProfileNameDate";
import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import ButtonEventLike from "../components/ButtonEventLike";
import ButtonUnlike from "../components/ButtonUnlike";
import usePostDelete from "../components/usePostDelete";
import HeaderShare from "../components/HeaderShare";
import HeaderBreadcrumb from "../components/HeaderBreadcrumb";
import ViewEventTitle from "../components/ViewEventTitle";
import { LineSeperator } from "../components/LineDivider";
import SelectMenu from "../components/SelectMenu";
import EventTabs from "../components/EventTabs";
import ViewDetailImageFile from "../components/ViewDetailImageFile";
import { whiteRoundBg } from "../components/Styles";
import TOEventAddCalendar from "../components/TOEventAddCalendar";

import { useStore } from "../Store";
import { getEventDate } from "../Utils/CalculateDays";
import { subscribeEvent } from "../graphql/subscription";
import { RootStackParamList } from "./AppContainer";

import { EventDetailType } from "../types";

export default function EventDetail(props: {
  navigation: StackNavigationProp<RootStackParamList, "EventDetail">;
  route: RouteProp<RootStackParamList, "EventDetail">;
}) {
  const [{ user_id }, dispatch] = useStore();
  const id = props.route.params.postId;

  const [deletePost] = usePostDelete(id);
  const { data, loading } = useSubscription(subscribeEvent, {
    variables: { id, user_id },
  });
  const scrollRef = React.useRef(null);
  const { navigate } = useNavigation();

  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  const event: EventDetailType = data?.mx_posts_by_pk ?? {};
  const options = [
    {
      label: "수정하기",
      handler: () =>
        navigate("EventEdit", {
          event,
        }),
    },
    // { label: "제안 정리", handler: () => {} },
    // { label: "공지 올리기", handler: () => {} },
    { label: "삭제하기", handler: deletePost },
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
    meLiked = [],
    likedUsers = [],
    board = { title: "" },
  } = event;
  const liked = meLiked?.[0]?.like_count ?? 0;
  const participants = likedUsers.map((n: any) => ({
    name: n.user.name,
    created_at: n.created_at,
    photo_url: n.user.photo_url,
  }));

  const eventEnum = [
    ["모임 일시", getEventDate(metadata?.eventDate)],
    ["모임 장소", metadata?.place],
    ["모집 인원", metadata?.countPeople],
    ["신청 기간", getEventDate(metadata?.deadline)],
  ];
  return (
    <>
      <HeaderShare id={id} />
      <KeyboardAwareScrollView ref={scrollRef}>
        <HeaderBreadcrumb boardName={board.title} />
        <ViewEventTitle title={title} date={metadata?.deadline} />
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

          {eventEnum.map(([t, b], index) => {
            return (
              <View key={index} style={{ marginHorizontal: 30, marginTop: 20 }}>
                <Mint13 style={{ marginBottom: 5, fontFamily: "notosans700" }}>
                  {t}
                </Mint13>
                <Body16>{b}</Body16>
              </View>
            );
          })}

          <View style={{ marginHorizontal: 30, marginTop: 25 }}>
            <Body16>{body}</Body16>
          </View>
          <ViewDetailImageFile files={files} images={images} />
          <TOEventAddCalendar
            metadata={metadata}
            title={title}
            style={{ marginTop: 40 }}
          />
          <V0 style={{ marginTop: 50 }}>
            {liked > 0 ? (
              <ButtonUnlike id={id} />
            ) : (
              <ButtonEventLike id={id} created_at={created_at} />
            )}
          </V0>
        </View>
        <EventTabs
          id={id}
          comments={comments}
          users={participants}
          scrollRef={scrollRef}
        />
      </KeyboardAwareScrollView>
    </>
  );
}
