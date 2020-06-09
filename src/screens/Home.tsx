import React from "react";
import { ImageBackground } from "react-native";
import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";
import { useSubscription, useQuery } from "@apollo/react-hooks";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { subscribeBoardsByGroupId } from "../graphql/subscription";
import { queryNewPostCount } from "../graphql/query";
import { useStore } from "../Store";
import { GroupBoardNewPostCount, HomeGroup } from "../types";

import CustomDrawer from "../components/CustomDrawer";
import { View, ViewRow } from "../components/View";
import { Title14, Text } from "../components/Text";
import ViewGroupImg from "../components/ViewGroupImg";
import ViewQrCode from "../components/ViewQrCode";
import ViewIconInvite from "../components/ViewIconInvite";
import ViewNotification from "../components/ViewNotification";
import ButtonBoardSetting from "../components/ButtonBoardSetting";
import TouchableBoardList from "../components/TouchableBoardList";
import { TouchableOpacity, TO0 } from "../components/TouchableOpacity";
import { Alert1 } from "../components/Alert";
import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import ButtonJoinGroup from "../components/ButtonJoinGroup";
import ViewGroupManage from "../components/ViewGroupManage";
import useNavigateToBoard from "../components/useNavigateToBoard";

import bgGroupMain from "../../assets/bgGroupMain.png";
const Drawer = createDrawerNavigator();
export default function HomeContainer() {
  return (
    <Drawer.Navigator
      initialRouteName={"Home"}
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerStyle={{
        backgroundColor: "#00a580",
        width: 330,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}

function Home() {
  const navigation = useNavigation();
  const [{ group_id, user_id }, dispatch] = useStore();
  const navigateToBoard = useNavigateToBoard();
  const newPostCountQuery = useQuery<GroupBoardNewPostCount>(
    queryNewPostCount,
    {
      variables: { group_id, user_id },
      fetchPolicy: "network-only",
    }
  );

  const { data, loading, error } = useSubscription<HomeGroup>(
    subscribeBoardsByGroupId,
    {
      variables: { group_id, user_id },
    }
  );
  const [newPostCountObj, setNewPostCountObj] = React.useState({});

  if (error) {
    console.warn(error);
  }
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading: true });
  }, [group_id]);
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  useFocusEffect(() => {
    try {
      newPostCountQuery?.refetch();
    } catch (error) {}
  });
  function toggleDrawer() {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }
  const {
    title = "그룹 로딩 중...",
    boards = [],
    users_aggregate,
    users,
    bg_img_url = null,
  } = data?.mx_groups_by_pk ?? {};
  const userCount = users_aggregate?.aggregate?.count;
  const userStatus = users?.[0]?.status;
  const notificationType = users?.[0]?.notification_type;
  const hasJoined = userStatus === "user" || userStatus === "organizer";
  React.useEffect(() => {
    if (newPostCountQuery.data) {
      const emptyObj = {};
      newPostCountQuery.data?.get_new_post_count.every(
        (b) => (emptyObj[b.board_id] = b.new_count || 0)
      );
      setNewPostCountObj(emptyObj);
    }
  }, [newPostCountQuery.data]);
  const userStatusStr = React.useMemo(() => {
    switch (userStatus) {
      case "requested":
        return "가입 신청 중";
      case "user":
        return "유저";
      case "organizer":
        return "오거나이저";
    }
  }, [userStatus]);

  return (
    <>
      <View style={{ height: 197 }} />
      <ImageBackground
        source={bg_img_url ? { uri: bg_img_url } : bgGroupMain}
        style={{ height: 222, position: "absolute", width: "100%" }}
      >
        <View
          style={{
            flex: 1,
            paddingTop: 39,
            paddingHorizontal: 30,
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <View>
            <ViewRow>
              <TouchableOpacity onPress={toggleDrawer}>
                <ViewGroupImg />
              </TouchableOpacity>
              <ViewNotification type={notificationType} />
            </ViewRow>
            <View
              style={{
                marginTop: 5,
                marginRight: 80,
                height: 115,
                justifyContent: "center",
              }}
            >
              <Text
                numberOfLines={1}
                style={{ fontSize: 28, color: "#ffffff" }}
              >
                {title}
              </Text>
              <Text style={{ fontSize: 15, color: "#ffffff" }}>
                {userStatusStr}
              </Text>
            </View>
          </View>

          <View style={{ position: "absolute", right: 30, top: 39 }}>
            <TO0 onPress={() => Alert1()}>
              <ViewGroupImg />
            </TO0>
            <TO0 onPress={() => Alert1()} style={{ marginTop: 10 }}>
              <ViewQrCode style={{}} />
            </TO0>
            <TO0 style={{ marginTop: 10 }} onPress={() => Alert1()}>
              <ViewIconInvite />
            </TO0>
          </View>
        </View>
      </ImageBackground>

      <KeyboardAwareScrollView
        style={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: "#f0f0f0",
        }}
      >
        <View style={{ paddingHorizontal: 30 }}>
          <ViewRow
            style={{ justifyContent: "space-between", paddingVertical: 20 }}
          >
            <Title14>목록</Title14>
            {userStatus === "organizer" && <ButtonBoardSetting />}
          </ViewRow>
          {newPostCountObj &&
            boards.map((b: any, index: number) => (
              <TouchableBoardList
                key={index}
                board={b}
                countObj={newPostCountObj}
                onPress={navigateToBoard}
              />
            ))}
        </View>
        {hasJoined && (
          <ViewGroupManage
            title={title}
            userCount={userCount}
            bg_img_url={bg_img_url}
            userStatus={userStatus}
          />
        )}
      </KeyboardAwareScrollView>
      {!hasJoined && <ButtonJoinGroup title={title} />}
    </>
  );
}
