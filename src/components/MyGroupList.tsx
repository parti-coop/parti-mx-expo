import React from "react";
import { useSubscription } from "@apollo/react-hooks";

import TouchableSideNavGroupList from "./TouchableSideNavGroupList";
import { Text } from "./Text";
import useNavigateToGroup from "./useNavigateToGroup";

import { subscribeGroupsByUserId } from "../graphql/subscription";
import { useStore } from "../Store";
import { UserGroup } from "../types";

export default function MyGroupList() {
  const [{ user_id }] = useStore();
  const { loading, data } = useSubscription(subscribeGroupsByUserId, {
    variables: { user_id },
  });
  const navigateToGroup = useNavigateToGroup();

  return !loading && data && data.mx_users_group.length > 0 ? (
    data.mx_users_group.map((usersGroup: UserGroup, i: number) => (
      <TouchableSideNavGroupList
        usersGroup={usersGroup}
        key={i}
        onPress={navigateToGroup}
      />
    ))
  ) : (
    <Text style={{ flex: 1, fontSize: 16, color: "#39caba" }}>
      아직, 가입된 그룹이 없나요?{"\n"}
      그룹명을 검색하거나 {"\n"}
      그룹 참여 링크를 다시 눌러주세요.{"\n"}
    </Text>
  );
}
