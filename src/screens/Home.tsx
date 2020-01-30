import React from "react";
import { Image, Share } from "react-native";
import { NavigationDrawerScreenProps } from "react-navigation-drawer";
import { View, ViewRow } from "../components/View";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
import { TouchableOpacity, ButtonRound } from "../components/TouchableOpacity";
import LoadingIndicator from "../components/LoadingIndicator";
import icon from "../../assets/icon.png";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import { subscribeBoardsByGroupId } from "../graphql/subscription";
import { insertUserGroup } from "../graphql/mutation";
import useGroupExit from "../components/HooksGroupExit";
import { useStore } from "../Store";
export default (props: NavigationDrawerScreenProps<{}>) => {
  const { navigate } = props.navigation;
  const [{ group_id, user_id }, dispatch] = useStore();

  const exitGroup = useGroupExit(group_id);
  const { data, loading } = useSubscription(subscribeBoardsByGroupId, {
    variables: { group_id, user_id }
  });
  const [join, joinO] = useMutation(insertUserGroup, {
    variables: { group_id, user_id }
  });
  if (loading) {
    return LoadingIndicator();
  }
  function joinGroup() {
    join();
  }
  if (!data.parti_2020_groups_by_pk) {
    return null;
  }
  const {
    title,
    boards,
    users_aggregate,
    users
  } = data.parti_2020_groups_by_pk;
  const userCount = users_aggregate.aggregate.count;
  const hasJoined = users[0] && users[0].status !== "requested";
  console.log(hasJoined);
  return (
    <View style={{ flex: 1 }}>
      <ViewRow
        style={{
          justifyContent: "space-between",
          backgroundColor: "lightyellow",
          padding: 10
        }}
      >
        <ButtonRound onPress={() => props.navigation.openDrawer()}>
          <Text>G</Text>
        </ButtonRound>
        <ViewRow>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "lightgreen",
              marginRight: 10
            }}
            onPress={() => props.navigation.navigate("QRcode")}
          >
            <Text>QR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 10, backgroundColor: "coral" }}
            onPress={e => Share.share({ message: "제안을 공유합니다." })}
          >
            <Text>초대</Text>
          </TouchableOpacity>
        </ViewRow>
      </ViewRow>
      <ViewRow
        style={{
          justifyContent: "flex-start",
          paddingLeft: 60,
          backgroundColor: "cadetblue"
        }}
      >
        <Image
          source={icon}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
        <View style={{ paddingLeft: 30, backgroundColor: "chocolate" }}>
          <Text>{title}</Text>
          <Text
            style={{
              borderWidth: 1,
              borderColor: "grey",
              padding: 10,
              paddingTop: 0,
              paddingBottom: 0,
              backgroundColor: "cornsilk",
              borderRadius: 10
            }}
          >
            비공개 그룹
          </Text>
        </View>
      </ViewRow>
      <View style={{ flex: 1 }}>
        <ViewRow style={{ justifyContent: "space-between" }}>
          <Text>목록</Text>
          <Text>설정</Text>
        </ViewRow>
        {boards.map((b, index) => (
          <TouchableOpacity
            style={{ padding: 10, alignItems: "center", flexDirection: "row" }}
            key={index}
            onPress={() => navigate("SuggestionList", { id: b.id, boards })}
          >
            <MaterialIcons name="move-to-inbox" size={30} />
            <View style={{ flex: 1, backgroundColor: "darkcyan" }}>
              <ViewRow style={{ justifyContent: "flex-start" }}>
                <Text>{b.title}</Text>
                {b.isMemberOnly && (
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      backgroundColor: "gainsboro",
                      borderWidth: 1
                    }}
                  >
                    전체공개
                  </Text>
                )}
              </ViewRow>
              <Text>{b.body}</Text>
            </View>
            <View>
              <Text>50분 전</Text>
              <Text>111</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {hasJoined ? (
        <View>
          <Text style={{ backgroundColor: "crimson" }}>기타</Text>

          <Button
            title={`멤버 (${userCount})`}
            onPress={() => navigate("SuggestionList")}
          />
          <Button
            color="darkblue"
            title="그룹 설정"
            onPress={() => navigate("GroupNew")}
          />
          <Button
            color="blue"
            title="그룹 나가기"
            onPress={() => exitGroup()}
          />
        </View>
      ) : (
        <View>
          <Text>{title}에 가입합니다.</Text>
          <Button color="darkblue" title="가입" onPress={joinGroup} />
        </View>
      )}
    </View>
  );
};
