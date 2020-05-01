import React from "react";
import { ScrollView } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { useDebounce } from "use-debounce";

import { Title22, Mint16, Caption16 } from "../components/Text";
import { ViewRow, V1 } from "../components/View";
import { TORow } from "../components/TouchableOpacity";
import UserProfileNameString from "./UserProfileNameString";
import SelectMenu from "../components/SelectMenu";
import useSetOrganizer from "../components/useSetOrganizer";
import useUserGroupDelete from "../components/useUserGroupDelete";

import { useStore } from "../Store";
import { searchMembers } from "../graphql/query";
interface UserGroup {
  user: { name: string; email: string; photo_url: string; id: number };
  status: string;
  created_at: string;
}

export default function GroupMember(props: {
  searchKeyword: string;
  memberType: "user" | "organizer";
  refetchCount: () => void;
  userStatus: "user" | "organizer";
}) {
  const { searchKeyword, memberType, refetchCount, userStatus } = props;
  const [debouncedKeyword] = useDebounce(`%${searchKeyword}%`, 500);
  const [{ group_id }, dispatch] = useStore();

  const { data, loading, refetch } = useQuery(searchMembers, {
    variables: { searchKeyword: debouncedKeyword, group_id, memberType },
    fetchPolicy: "network-only",
  });
  function refresh() {
    refetch && refetch();
    refetchCount && refetchCount();
  }
  const setOrganizer = useSetOrganizer(refresh);
  const deleteUserGroup = useUserGroupDelete(refresh);
  const list = data?.mx_users_group.map((u: UserGroup, i: number) => {
    const {
      user: { name, photo_url, id, email },
      // created_at,
    } = u;
    const options = [
      { label: "오거나이저로 지정", handler: setOrganizer, value: id },
      { label: "탈퇴 시키기", handler: deleteUserGroup, value: id },
    ];
    return (
      <ViewRow key={i} style={{ paddingHorizontal: 30 }}>
        <UserProfileNameString name={name} photoUrl={photo_url} sub={email} />
        {memberType === "user" && userStatus === "organizer" && (
          <SelectMenu items={options} />
        )}
      </ViewRow>
    );
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  return <ScrollView>{list}</ScrollView>;
}
