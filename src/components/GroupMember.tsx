import React from "react";
import { ScrollView } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { useDebounce } from "use-debounce";

import { Title22, Mint16, Caption16 } from "../components/Text";
import { ViewRow, V1 } from "../components/View";
import { TORow } from "../components/TouchableOpacity";
import UserProfileNameDate from "../components/UserProfileNameDate";
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

export default (props: {
  searchKeyword: string;
  memberType: "user" | "organizer";
  refetch: () => void;
  userStatus: "user" | "organizer";
}) => {
  const { searchKeyword, memberType, refetch, userStatus } = props;
  const [debouncedKeyword] = useDebounce(`%${searchKeyword}%`, 500);
  const [{ group_id }, dispatch] = useStore();
  const setOrganizer = useSetOrganizer(refetch);
  const deleteUserGroup = useUserGroupDelete(refetch);

  const { data, loading } = useQuery(searchMembers, {
    variables: { searchKeyword: debouncedKeyword, group_id, memberType },
    fetchPolicy: "network-only",
  });
  const list = data?.parti_2020_users_group.map((u: UserGroup, i: number) => {
    const {
      user: { name, photo_url, id },
      created_at,
    } = u;
    const date = new Date(created_at).toLocaleDateString();
    const options = [
      { label: "오거나이저로 지정", handler: setOrganizer, value: id },
      { label: "탈퇴 시키기", handler: deleteUserGroup, value: id },
    ];
    return (
      <ViewRow key={i} style={{ paddingHorizontal: 30 }}>
        <UserProfileNameDate name={name} photoUrl={photo_url} date={date} />
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
};
