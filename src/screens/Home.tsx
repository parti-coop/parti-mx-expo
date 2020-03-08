import React from "react";
import { Image, Share, ImageBackground } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { View, ViewRow } from "../components/View";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
import {
  TouchableOpacity,
  ButtonRound,
  TOEasy
} from "../components/TouchableOpacity";
import LoadingIndicator from "../components/LoadingIndicator";
import icon from "../../assets/icon.png";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import { subscribeBoardsByGroupId } from "../graphql/subscription";

import useGroupExit from "../components/HooksGroupExit";
import { useStore } from "../Store";
export default () => {
  const navigation = useNavigation();
  const { navigate } = navigation;
  const [{ group_id, user_id }, dispatch] = useStore();
  const { exitGroup, joinGroup } = useGroupExit();
  if (group_id === null) {
    navigation.dispatch(DrawerActions.openDrawer());
    return (
      <TOEasy onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Text>아직 가입된 그룹이 없습니다.</Text>
      </TOEasy>
    );
  }

  const { data, loading } = useSubscription(subscribeBoardsByGroupId, {
    variables: { group_id, user_id }
  });
  console.log(data, loading);
  if (!data && !data.parti_2020_groups_by_pk) {
    return null;
  }
  const {
    title,
    boards,
    users_aggregate,
    users,
    bg_img_url
  } = data.parti_2020_groups_by_pk;
  const userCount = users_aggregate.aggregate.count;
  const hasJoined = users[0] && users[0].status !== "requested";
  return (
    <View style={{ flex: 1 }}>
      <ViewRow
        style={{
          justifyContent: "space-between",
          backgroundColor: "lightyellow",
          padding: 10
        }}
      >
        <ButtonRound
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Text>G</Text>
        </ButtonRound>
        <ViewRow>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "lightgreen",
              marginRight: 10
            }}
            onPress={() => navigation.navigate("QRcode")}
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
      <ImageBackground
        source={{ uri: bg_img_url }}
        style={{
          flexDirection: "row",
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
      </ImageBackground>
      <View style={{ flex: 1 }}>
        <ViewRow style={{ justifyContent: "space-between" }}>
          <Text>목록</Text>
          <Text>설정</Text>
        </ViewRow>
        {boards.map(
          (
            b: {
              id: number;
              title: string;
              body: string;
              isMemberOnly: boolean;
            },
            index: number
          ) => (
            <TouchableOpacity
              style={{
                padding: 10,
                alignItems: "center",
                flexDirection: "row"
              }}
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
          )
        )}
      </View>
      {hasJoined ? (
        <View>
          <Text style={{ backgroundColor: "crimson" }}>기타</Text>

          <Button
            title={`멤버 (${userCount})`}
            onPress={() => navigate("Member")}
          />
          <Button
            color="darkblue"
            title="그룹 설정"
            onPress={() => navigate("GroupSetting", { title, bg_img_url })}
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
