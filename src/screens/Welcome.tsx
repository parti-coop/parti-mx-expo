import React from "react";
import { Image, Share, ImageBackground } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { View, ViewRow } from "../components/View";
import { Text } from "../components/Text";
import ViewGroupImg from "../components/ViewGroupImg";
import ViewQrCode from "../components/ViewQrCode";
import ViewIconInvite from "../components/ViewIconInvite";
import ViewRedDot from "../components/ViewRedDot";
import ButtonBoardSetting from "../components/ButtonBoardSetting";
import { TouchableOpacity, TOEasy } from "../components/TouchableOpacity";
import { useSubscription } from "@apollo/react-hooks";
import { subscribeBoardsByGroupId } from "../graphql/subscription";
import iconOut from "../../assets/icon-out.png";
import useGroupExit from "../components/HooksGroupExit";
import { useStore } from "../Store";
import imgParti from "../../assets/splash.png";
export default () => {
  const navigation = useNavigation();
  const { navigate } = navigation;
  const [{ group_id, user_id }, dispatch] = useStore();
  const { exitGroup, joinGroup } = useGroupExit();
  const { data, loading, error } = useSubscription(subscribeBoardsByGroupId, {
    variables: { group_id, user_id }
  });
  if (error) {
    console.warn(error);
  }
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  React.useEffect(() => {
    if (group_id === null) {
      navigation.dispatch(DrawerActions.openDrawer());
    }
  }, [navigation.dispatch]);
  if (data && data.parti_2020_groups_by_pk) {
    const {
      title,
      boards,
      users_aggregate,
      users,
      bg_img_url
    } = data.parti_2020_groups_by_pk;
    const userCount = users_aggregate.aggregate.count;
    const hasJoined = users[0] && users[0].status !== "requested";
    const userStatus = !users[0]
      ? ""
      : users[0].status === "requested"
      ? "가입 신청 중"
      : users[0].status === "user"
      ? "유저"
      : users[0].status === "admin"
      ? "오거나이저"
      : "미확인";

    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={bg_img_url ? { uri: bg_img_url } : imgParti}
          style={{ width: "100%" }}
        >
          <ViewRow
            style={{
              justifyContent: "space-between",
              paddingTop: 30,
              paddingBottom: 50,
              paddingHorizontal: 30,
              alignItems: "flex-start"
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
              >
                <ViewGroupImg color={false} />
              </TouchableOpacity>
              <Text style={{ fontSize: 28, color: "#333333", marginTop: 25 }}>
                {title}
              </Text>
              <Text style={{ fontSize: 15, color: "#888888", marginTop: 8 }}>
                {userStatus}
              </Text>
            </View>

            <View>
              <TouchableOpacity onPress={() => navigation.navigate("QRcode")}>
                <ViewGroupImg color={true} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("QRcode")}>
                <ViewQrCode style={{ marginTop: 10 }} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={e => Share.share({ message: "제안을 공유합니다." })}
              >
                <ViewIconInvite style={{ marginTop: 10 }} />
              </TouchableOpacity>
            </View>
          </ViewRow>
        </ImageBackground>
        <View style={{ flex: 1, paddingHorizontal: 30 }}>
          <ViewRow
            style={{ justifyContent: "space-between", paddingVertical: 20 }}
          >
            <Text style={{ fontSize: 14, color: "#333333" }}>목록</Text>
            <ButtonBoardSetting />
          </ViewRow>
          {boards.map(
            (
              b: {
                id: number;
                title: string;
                body: string;
                is_member_only: boolean;
              },
              index: number
            ) => (
              <TouchableOpacity
                style={{
                  height: 83,
                  backgroundColor: "#ffffff",
                  marginBottom: 10,
                  borderRadius: 25
                }}
                key={index}
                onPress={() => navigate("SuggestionList", { id: b.id })}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    marginLeft: 30,
                    marginRight: 50
                  }}
                >
                  <ViewRow style={{ justifyContent: "flex-start" }}>
                    <Text style={{ fontSize: 18 }}>{b.title}</Text>
                    {b.is_member_only && (
                      <Text
                        style={{
                          paddingHorizontal: 10,
                          borderWidth: 1,
                          borderColor: "#cb6794",
                          borderRadius: 10,
                          fontSize: 12,
                          padding: 1,
                          color: "#cb6794",
                          marginLeft: 10
                        }}
                      >
                        전체공개
                      </Text>
                    )}
                    <ViewRedDot style={{ marginLeft: 10 }} />
                    <Text
                      style={{
                        color: "#30ad9f",
                        fontSize: 14,
                        position: "absolute",
                        right: 0
                      }}
                    >
                      50분 전
                    </Text>
                  </ViewRow>
                  <Text style={{ fontSize: 14, color: "#888888" }}>
                    {b.body}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          )}
        </View>
        {hasJoined ? (
          <View style={{ marginHorizontal: 30, marginBottom: 20 }}>
            <Text style={{ fontSize: 14, marginBottom: 20 }}>기타</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => navigate("Member")}
                style={{
                  flex: 1,
                  height: 100,
                  borderRadius: 25,
                  backgroundColor: "#30ad9f",
                  marginHorizontal: 5,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ fontSize: 16, color: "#ffffff" }}>
                  멤버 ({userCount})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigate("GroupSetting", { title, bg_img_url })}
                style={{
                  flex: 1,
                  height: 100,
                  borderRadius: 25,
                  backgroundColor: "#30ad9f",
                  marginHorizontal: 5,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ fontSize: 16, color: "#ffffff" }}>
                  그룹 설정
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => exitGroup()}
                style={{
                  flex: 1,
                  height: 100,
                  borderRadius: 25,
                  backgroundColor: "#30ad9f",
                  marginHorizontal: 5,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  source={iconOut}
                  style={{ width: 22, height: 24, marginBottom: 16 }}
                />
                <Text style={{ fontSize: 16, color: "#ffffff" }}>
                  그룹 나가기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={joinGroup}
            style={{
              padding: 10,
              backgroundColor: "#30ad9f",
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              height: 73,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "#ffffff" }}>{title}에 가입합니다.</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  } else if (group_id === null) {
    return (
      <TOEasy onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Text>아직 가입된 그룹이 없습니다.</Text>
      </TOEasy>
    );
  } else {
    return (
      <TOEasy onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Text>그룹을 선택하세요.</Text>
      </TOEasy>
    );
  }
};
