import React from "react";
import { Updates } from "expo";
import {
  ScrollView,
  SafeAreaView,
  TextInputChangeEventData,
  NativeSyntheticEvent
} from "react-native";
import { DrawerContentComponentProps } from "react-navigation-drawer";
import { View, ViewRowLeft } from "./View";
import { Text } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import { Ionicons } from "@expo/vector-icons";
import { useSubscription, useQuery } from "@apollo/react-hooks";
import { subscribeGroupsByUserId } from "../graphql/subscription";
import { searchGroups } from "../graphql/query";
import { useStore } from "../Store";
import { TextInput } from "./TextInput";

export default (props: DrawerContentComponentProps) => {
  const [{ user_id, group_id }, dispatch] = useStore();
  const { loading, data } = useSubscription(subscribeGroupsByUserId, {
    variables: { user_id }
  });
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const query = useQuery(searchGroups, {
    variables: { searchKeyword: `%${searchKeyword}%` }
  });
  function goToGroup(group_id: number) {
    dispatch({ type: "SET_GROUP", group_id });
    props.navigation.navigate("Home", { groupId: 1 });
    props.navigation.closeDrawer();
  }
  React.useEffect(() => {
    if (
      !loading &&
      data.parti_2020_users_group.length === 0 &&
      group_id === null
    ) {
      props.navigation.navigate("GroupNew");
    }
    setResultList(myGroupList);
  }, [loading, data]);
  const myGroupList =
    !loading && data.parti_2020_users_group.length > 0 ? (
      data.parti_2020_users_group.map(
        (g: { group: { title: string; id: number } }, i: number) => {
          return (
            <TouchableOpacity
              key={i}
              style={{ height: 50, width: 200 }}
              onPress={() => goToGroup(g.group.id)}
            >
              <Text>{g.group.title}</Text>
            </TouchableOpacity>
          );
        }
      )
    ) : (
      <Text style={{ flex: 1 }}>
        아직, 가입된 그룹이 없나요? 그룹명을 검색하거나 그룹 참여 링크를 다시
        눌러주세요.
      </Text>
    );
  const [resultList, setResultList] = React.useState(myGroupList);
  function closeDrawer() {
    props.navigation.closeDrawer();
  }
  function refreshApp() {
    dispatch({ type: "APP_REFRESH" });
    Updates.reload();
  }
  function focusHandler() {
    if (searchKeyword.length === 0) {
      setResultList(<Text style={{ flex: 1 }}>검색된 그룹이 없습니다.</Text>);
    }
  }
  React.useEffect(() => {
    if (searchKeyword.length > 0) {
      query.refetch();
    } else {
      setResultList(myGroupList);
    }
  }, [searchKeyword]);

  React.useEffect(() => {
    if (query.loading || searchKeyword.length === 0) {
      return;
    }
    setResultList(
      query.data.parti_2020_groups.map(
        (g: { title: string; id: number }, i: number) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => goToGroup(g.id)}
              style={{ height: 50, width: 200 }}
            >
              <Text>{g.title}</Text>
            </TouchableOpacity>
          );
        }
      )
    );
  }, [query.data, searchKeyword]);

  function createNewGroup() {
    props.navigation.navigate("GroupCreate");
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "floralwhite" }}>
        <ViewRowLeft>
          <Text>빠띠 2020</Text>

          <TouchableOpacity
            style={{ width: 50, padding: 10 }}
            onPress={closeDrawer}
          >
            <Ionicons name="ios-notifications-outline" size={60} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={e => props.navigation.navigate("UserSetting")}
          >
            <Text>사용자 프로필</Text>
          </TouchableOpacity>
        </ViewRowLeft>
        <ViewRowLeft>
          <Ionicons name="ios-search" size={60} />
          <TextInput
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.nativeEvent.text)}
            onFocus={focusHandler}
          />
        </ViewRowLeft>
        <View style={{ flex: 1 }}>{resultList}</View>
        <TouchableOpacity
          style={{ padding: 10, backgroundColor: "forestgreen" }}
          onPress={refreshApp}
        >
          <Text>앱 새로고침</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 10, backgroundColor: "forestgreen" }}
          onPress={createNewGroup}
        >
          <Text>그룹 만들기</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};
