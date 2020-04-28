import React from "react";
import { Image } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { RouteProp } from "@react-navigation/native";

import { RootStackParamList } from "./AppContainer";
import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import { Title22, Title14 } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { ViewRow, View } from "../components/View";
import { TO0 } from "../components/TouchableOpacity";
import { SmallVerticalDivider } from "../components/LineDivider";
import HeaderBack from "../components/HeaderBack";
import GroupMember from "../components/GroupMember";

import { useStore } from "../Store";
import { getMemberCount } from "../graphql/query";
import { subscribeMemberCount } from "../graphql/subscription";

import iconSearch from "../../assets/iconSearch.png";
const boxStyle = {
  borderRadius: 25,
  backgroundColor: "#ffffff",
};
export default (props: { route: RouteProp<RootStackParamList, "Member"> }) => {
  const { userStatus } = props.route.params;
  const [{ group_id }, dispatch] = useStore();

  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [memberType, setMemberType] = React.useState<"user" | "organizer">(
    "user"
  );

  const { data, refetch } = useQuery(getMemberCount, {
    variables: { group_id },
    fetchPolicy: "network-only",
  });
  function showUsers() {
    setMemberType("user");
  }
  function showOrganizers() {
    setMemberType("organizer");
  }
  return (
    <>
      <HeaderBack />
      <KeyboardAvoidingView>
        <Title22 style={{ marginHorizontal: 30 }}>관리</Title22>
        <ViewRow
          style={{ marginTop: 50, marginHorizontal: 30, marginBottom: 20 }}
        >
          <TO0 onPress={showUsers}>
            <ViewRow style={{ opacity: memberType === "user" ? 1 : 0.5 }}>
              <Title14>멤버</Title14>
              <Title14 style={{ marginLeft: 4 }}>
                {data?.users?.aggregate.count}
              </Title14>
            </ViewRow>
          </TO0>
          <SmallVerticalDivider />
          <TO0 onPress={showOrganizers}>
            <ViewRow style={{ opacity: memberType === "organizer" ? 1 : 0.5 }}>
              <Title14>오거나이저</Title14>
              <Title14 style={{ marginLeft: 4 }}>
                {data?.organizers?.aggregate.count}
              </Title14>
            </ViewRow>
          </TO0>
        </ViewRow>
        <View style={boxStyle}>
          <ViewRow style={{ marginHorizontal: 30, paddingVertical: 10 }}>
            <TextInput
              value={searchKeyword}
              onChangeText={setSearchKeyword}
              placeholder="닉네임 입력"
              style={{ fontSize: 16, color: "#999999", paddingLeft: 0 }}
            />
            <Image source={iconSearch} style={{ tintColor: "#30ad9f" }} />
          </ViewRow>
          <GroupMember
            searchKeyword={searchKeyword}
            memberType={memberType}
            refetch={refetch}
            userStatus={userStatus}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
