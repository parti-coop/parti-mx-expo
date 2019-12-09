import React from "react";
import { NavigationDrawerScreenProps } from "react-navigation-drawer";
import { View, ViewRow } from "../components/View";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
import { TouchableOpacity, ButtonRound } from "../components/TouchableOpacity";
import { Image } from "react-native";
import icon from "../../assets/icon.png";
import { MaterialIcons } from "@expo/vector-icons";
export default (props: NavigationDrawerScreenProps<{ name: string }>) => {
  const { navigate } = props.navigation;
  return (
    <View style={{ flex: 1 }}>
      <ViewRow
        style={{
          justifyContent: "space-between",
          backgroundColor: "lightyellow",
          padding: 10
        }}
      >
        <ButtonRound>
          <Text>G</Text>
        </ButtonRound>
        <ViewRow>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "lightgreen",
              marginRight: 10
            }}
          >
            <Text>QR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10, backgroundColor: "coral" }}>
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
          <Text>빠띠 소프트팀</Text>
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
        <ViewRow style={{ justifyContent: "flex-start", padding: 10 }}>
          <MaterialIcons name="move-to-inbox" size={30} />
          <View style={{ flex: 1, backgroundColor: "darkcyan" }}>
            <Text>소식 게시판</Text>
            <Text>11월 워크숍 내용 공유 겸 (시간이 허락한다면) 팀</Text>
          </View>
          <View>
            <Text>50분 전</Text>
            <Text>111</Text>
          </View>
        </ViewRow>
      </View>
      <View>
        <Text style={{ backgroundColor: "crimson" }}>기타</Text>

        <Button title="멤버" onPress={() => navigate("Suggestions")} />
        <Button
          color="darkblue"
          title="그룹 설정/ 그룹 나가기 (멤버) "
          onPress={() => navigate("Suggestions")}
        />
      </View>
    </View>
  );
};
