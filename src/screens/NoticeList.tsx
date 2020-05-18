import React from "react";
import { ScrollView } from "react-native";
import { RootStackParamList } from "./AppContainer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSubscription } from "@apollo/react-hooks";
import PickerSelect from "react-native-picker-select";

import { Mint14, Title24, Title14 } from "../components/Text";
import { View, ViewRow } from "../components/View";
import TouchableNoticeList from "../components/TouchableNoticeList";
import HeaderList from "../components/HeaderList";
import ButtonNew from "../components/ButtonNew";
import { Image } from "../components/Image";

import { useStore } from "../Store";
import { subscribeNoticeList } from "../graphql/subscription";

import btnFormSelect from "../../assets/btnFormSelect.png";

export default (props: {
  navigation: StackNavigationProp<RootStackParamList, "NoticeList">;
  route: RouteProp<RootStackParamList, "NoticeList">;
}) => {
  const [store, dispatch] = useStore();
  const boardId = props.route.params.id;
  const { group_id, user_id } = store;
  const [sort, setSort] = React.useState({ created_at: "desc" });
  const { data, error, loading } = useSubscription(subscribeNoticeList, {
    variables: { id: boardId, user_id, sort: [sort] },
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading: true });
    dispatch({ type: "SET_GROUP", group_id });
  }, [group_id]);
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  const {
    announcements = [],
    posts = [],
    title = "소식 로드 중",
    posts_aggregate = {},
  } = data?.mx_boards_by_pk ?? {};
  const totalCount = posts_aggregate?.aggregate?.count ?? 0;
  function navigateNew() {
    props.navigation.navigate("NoticeNew", { boardId, boardName: title });
  }
  if (error) {
    console.log(error);
  }
  return (
    <>
      <HeaderList />
      <ScrollView>
        <View style={{ paddingHorizontal: 30 }}>
          <Title24>{title}</Title24>
        </View>

        <ViewRow
          style={{
            justifyContent: "space-between",
            marginVertical: 20,
            paddingHorizontal: 30,
          }}
        >
          <ViewRow>
            <Title14 style={{ fontFamily: "notosans700" }}>총</Title14>
            <Mint14 style={{ fontFamily: "notosans700" }}>{totalCount}</Mint14>
            <Title14 style={{ fontFamily: "notosans700" }}>개</Title14>
          </ViewRow>
          <PickerSelect
            items={[
              { label: "최신 등록 순", value: { created_at: "desc" } },
              { label: "오래된 등록 순", value: { created_at: "asc" } },
              { label: "최신 수정 순", value: { updated_at: "desc" } },
              { label: "오래된 수정 순", value: { updated_at: "asc" } },
              {
                label: "많은 댓글 순",
                value: { comments_aggregate: { count: "desc" } },
              },
              {
                label: "많은 공감 순",
                value: { users_aggregate: { sum: { like_count: "desc" } } },
              },
              {
                label: "많은 조회 순",
                value: { users_aggregate: { sum: { view_count: "desc" } } },
              },
            ]}
            onValueChange={(value) => setSort(value)}
            value={sort}
            placeholder={{}}
            Icon={() => <Image source={btnFormSelect} />}
            style={{
              inputIOS: {
                paddingRight: 20,
              },
              inputAndroid: {
                paddingRight: 20,
              },
              iconContainer: {
                top: 5,
              },
            }}
          />
        </ViewRow>
        <View
          style={{
            flex: 1,
            backgroundColor: "#d4e7e4",
            marginHorizontal: 30,
            borderRadius: 25,
            marginBottom: 20,
          }}
        >
          {announcements.map((post: any, i: number) => {
            return (
              <TouchableNoticeList
                key={i}
                post={post}
                style={
                  announcements.length !== i + 1 && { borderBottomWidth: 1 }
                }
              />
            );
          })}
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            marginHorizontal: 30,
            borderRadius: 25,
            marginBottom: 60,
          }}
        >
          {posts.map((post: any, i: number) => {
            return (
              <TouchableNoticeList
                key={i}
                post={post}
                style={posts.length !== i + 1 && { borderBottomWidth: 1 }}
              />
            );
          })}
        </View>
      </ScrollView>
      <ButtonNew onPress={navigateNew} />
    </>
  );
};
