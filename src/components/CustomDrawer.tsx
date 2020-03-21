import React from "react";
import { ScrollView, Image } from "react-native";
import { View, ViewRowLeft } from "./View";
import { Text } from "./Text";
import { TouchableOpacity } from "./TouchableOpacity";
import { useSubscription, useQuery, useMutation } from "@apollo/react-hooks";
import { subscribeGroupsByUserId } from "../graphql/subscription";
import { searchGroups } from "../graphql/query";
import { useStore } from "../Store";
import { TextInput } from "./TextInput";
import iconUser from "../../assets/icon-user.png";
import ViewGroupImg from "./ViewGroupImg";
import ViewNewRed from "./ViewNewRed";
import btnSearch from "../../assets/btn-search.png";
import { updateUserGroupCheck } from "../graphql/mutation";
export default props => {
  const [{ user_id }, dispatch] = useStore();
  const { loading, data } = useSubscription(subscribeGroupsByUserId, {
    variables: { user_id }
  });
  const [update] = useMutation(updateUserGroupCheck);

  const [searchKeyword, setSearchKeyword] = React.useState("");
  const query = useQuery(searchGroups, {
    variables: { searchKeyword: `%${searchKeyword}%` }
  });
  function goToGroup(group_id: number) {
    dispatch({ type: "SET_GROUP", group_id });
    props.navigation.navigate("Home");
    update({ variables: { group_id, user_id } });
  }
  React.useEffect(() => {
    setResultList(myGroupList);
  }, [loading, data]);
  const myGroupList =
    !loading && data && data.parti_2020_users_group.length > 0 ? (
      data.parti_2020_users_group.map(
        (
          g: {
            group: { title: string; id: number; updated_at: string };
            updated_at: string;
          },
          i: number
        ) => {
          const isNew = new Date(g.updated_at) < new Date(g.group.updated_at);
          return (
            <TouchableOpacity
              key={i}
              style={{
                height: 53,
                borderRadius: 25,
                backgroundColor: "#007075",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 11,
                paddingLeft: 8,
                paddingRight: 15
              }}
              onPress={() => goToGroup(g.group.id)}
            >
              <ViewGroupImg color={false} />
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  flex: 1,
                  marginLeft: 12
                }}
              >
                {g.group.title}
              </Text>
              {isNew && <ViewNewRed />}
            </TouchableOpacity>
          );
        }
      )
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
      query.data.parti_2020_groups.map(
        (g: { title: string; id: number }, i: number) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => goToGroup(g.id)}
              style={{
                height: 53,
                borderRadius: 25,
                backgroundColor: "#007075",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 11
              }}
            >
              <ViewGroupImg color={false} />
              <Text style={{ fontSize: 16, color: "white" }}>{g.title}</Text>
            </TouchableOpacity>
          );
        }
      )
    );
  }, [query.data, searchKeyword]);

  function createNewGroup() {
    props.navigation.navigate("GroupCreate");
    props.navigation.closeDrawer();
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ViewRowLeft style={{ marginLeft: 30, marginTop: 40 }}>
        <Text
          style={{ color: "white", fontSize: 28, fontFamily: "notosans500" }}
        >
          빠띠 데모스
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
            right: 0
          }}
          onPress={e => console.log("??")}
        >
          <ViewGroupImg />
        </TouchableOpacity>
      </ViewRowLeft>
      <ViewRowLeft
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
      </ViewRowLeft>
      <View style={{ flex: 1, marginHorizontal: 30, marginTop: 52 }}>
        {resultList}
      </View>
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
    </ScrollView>
  );
};
