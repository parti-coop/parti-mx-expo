import React from "react";
import { useSubscription } from "@apollo/react-hooks";
import { useLazyQuery } from "@apollo/react-hooks";

import TouchableSideNavGroupSearchList from "./TouchableSideNavGroupSearchList";
import { Text } from "./Text";

import { subscribeGroupsByUserId } from "../graphql/subscription";
import { searchGroups } from "../graphql/query";
import { useStore } from "../Store";

export default (props) => {
  const [{ user_id }] = useStore();
  const { navigate, searchKeyword } = props;
  const [update, { data, refetch }] = useLazyQuery(searchGroups, {
    variables: { searchKeyword: `%${searchKeyword}%` },
  });
  React.useEffect(() => {
    if (refetch) {
      refetch;
    } else {
      update();
    }
  }, [searchKeyword]);
  if (!searchKeyword) {
    return (
      <Text style={{ flex: 1, fontSize: 16, color: "#39caba" }}>
        검색된 그룹이 없습니다.
      </Text>
    );
  }
  if (data?.mx_groups?.length > 0) {
    return data.mx_groups.map((group: any, i: number) => (
      <TouchableSideNavGroupSearchList
        group={group}
        key={i}
        navigate={navigate}
      />
    ));
  } else {
    return (
      <Text style={{ flex: 1, fontSize: 16, color: "#39caba" }}>
        검색된 그룹이 없습니다.
      </Text>
    );
  }
};
