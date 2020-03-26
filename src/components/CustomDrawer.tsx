import React from "react";
import { ScrollView, Image } from "react-native";
import TouchableSideNavGroupSearchList from "./TouchableSideNavGroupSearchList";
import TouchableSideNavGroupList from "./TouchableSideNavGroupList";
import { View, ViewRow } from "./View";
import { Text } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import { useSubscription, useQuery } from "@apollo/react-hooks";
import { subscribeGroupsByUserId } from "../graphql/subscription";
import { searchGroups } from "../graphql/query";
import { useStore } from "../Store";
import { TextInput } from "./TextInput";
import iconUser from "../../assets/icon-user.png";
import ViewGroupImg from "./ViewGroupImg";
import ViewNewRed from "./ViewNewRed";
import btnSearch from "../../assets/btn-search.png";
export default props => {
  const [{ user_id }] = useStore();
  const { loading, data } = useSubscription(subscribeGroupsByUserId, {
    variables: { user_id }
  });
  const { navigate } = props.navigation;
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const query = useQuery(searchGroups, {
    variables: { searchKeyword: `%${searchKeyword}%` }
  });
  React.useEffect(() => {
    setResultList(myGroupList);
  }, [loading, data]);
  const myGroupList =
    !loading && data && data.parti_2020_users_group.length > 0 ? (
      data.parti_2020_users_group.map((usersGroup: any, i: number) => (
        <TouchableSideNavGroupList
          usersGroup={usersGroup}
          key={i}
          navigate={navigate}
        />
      ))
    ) : (
      <Text style={{ flex: 1, fontSize: 16, color: "#39caba" }}>
        아직, 가입된 그룹이 없나요?{"\n"}
        그룹명을 검색하거나 {"\n"}
        그룹 참여 링크를 다시 눌러주세요.{"\n"}
      </Text>
    );
  const [resultList, setResultList] = React.useState(myGroupList);
  function focusHandler() {
    if (searchKeyword.length === 0) {
      setResultList(
        <Text style={{ flex: 1, fontSize: 16, color: "#39caba" }}>
          검색된 그룹이 없습니다.
        </Text>
      );
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
      query.data.parti_2020_groups.map((group: any, i: number) => {
        return (
          <TouchableSideNavGroupSearchList
            group={group}
            key={i}
            navigate={navigate}
          />
        );
      })
    );
  }, [query.data, searchKeyword]);

  function createNewGroup() {
    props.navigation.navigate("GroupCreate");
    props.navigation.closeDrawer();
  }
  return (
    <>
      <ViewRow style={{ marginLeft: 30, marginTop: 40 }}>
        <Text
          style={{ color: "white", fontSize: 28, fontFamily: "notosans500" }}
        >
          빠띠 믹스
        </Text>

        <TouchableOpacity
          onPress={e => props.navigation.navigate("UserSetting")}
          style={{
            width: 35,
            height: 35,
            borderRadius: 15,
            backgroundColor: "#30ad9f",
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            source={iconUser}
            resizeMode="contain"
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            right: -15
          }}
          onPress={e => props.navigation.toggleDrawer()}
        >
          <ViewGroupImg />
        </TouchableOpacity>
      </ViewRow>
      <ViewRow
        style={{
          marginTop: 83,
          marginHorizontal: 30,
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(57, 202, 186, 0.2)"
        }}
      >
        <Image
          source={btnSearch}
          resizeMode="contain"
          style={{ width: 19, height: 20 }}
        />
        <TextInput
          value={searchKeyword}
          onChange={e => setSearchKeyword(e.nativeEvent.text)}
          onFocus={focusHandler}
          placeholder="그룹명 입력"
          placeholderTextColor="rgba(57, 202, 186, 0.3)"
          style={{ fontSize: 17 }}
        />
      </ViewRow>
      <ScrollView
        style={{ marginTop: 42, marginBottom: 10 }}
        contentContainerStyle={{
          flexGrow: 1,
          marginHorizontal: 30,
          paddingVertical: 10
        }}
      >
        {resultList}
      </ScrollView>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "#30ad9f",
          borderTopLeftRadius: 20,
          borderBottomRightRadius: 20,
          height: 73,
          justifyContent: "center"
        }}
        onPress={createNewGroup}
      >
        <Text style={{ fontSize: 20, textAlign: "center" }}>그룹 만들기</Text>
      </TouchableOpacity>
    </>
  );
};
