import React from "react";
import { useLazyQuery } from "@apollo/react-hooks";

import TouchableSideNavGroupSearchList from "./TouchableSideNavGroupSearchList";
import { Text } from "./Text";

import { searchGroups } from "../graphql/query";

export default function MySearchList(props) {
  const { navigate, searchKeyword } = props;
  const [update, { data, refetch }] = useLazyQuery(searchGroups, {
    variables: { searchKeyword: `%${searchKeyword}%` },
    fetchPolicy: "network-only",
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
}
