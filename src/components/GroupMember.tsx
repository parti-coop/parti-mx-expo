import React from "react";
import { ScrollView } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { useDebounce } from "use-debounce";

import { Title22, Mint16, Caption16 } from "../components/Text";
import { ViewRow, V1 } from "../components/View";
import { TORow } from "../components/TouchableOpacity";
import UserProfileNameDate from "../components/UserProfileNameDate";
import SelectMenu from "../components/SelectMenu";

import { useStore } from "../Store";
import { searchMembers } from "../graphql/query";
interface UserGroup {
  user: { name: string; email: string; photo_url: string };
  status: string;
  created_at: string;
}

const options = [{ label: "오거나이저로 지정" }, { label: "탈퇴 시키기" }];
export default (props: {
  searchKeyword: string;
  memberType: "user" | "organizer";
}) => {
  const { searchKeyword, memberType } = props;
  const [debouncedKeyword] = useDebounce(`%${searchKeyword}%`, 500);
  const [{ group_id }, dispatch] = useStore();
  const { data, loading } = useQuery(searchMembers, {
    variables: { searchKeyword: debouncedKeyword, group_id, memberType },
  });
  const list = data?.parti_2020_users_group.map((u: UserGroup, i: number) => {
    const {
      user: { name, photo_url },
      created_at,
    } = u;
    const date = new Date(created_at).toLocaleDateString();
    return (
      <ViewRow key={i} style={{ paddingHorizontal: 30 }}>
        <UserProfileNameDate name={name} photoUrl={photo_url} date={date} />
        <SelectMenu
          items={options}
          style={{ position: "relative", right: 0 }}
        />
      </ViewRow>
    );
  });
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  return <ScrollView>{list}</ScrollView>;
};
