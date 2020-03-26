import React from "react";
import { NavigationSwitchScreenProps } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../Store";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { ViewRow } from "../components/View";
import useDebounce from "../components/useDebounce";
import { TouchableOpacity, TORow } from "../components/TouchableOpacity";
import GroupMember from "../components/GroupMember";
import GroupOrganizer from "../components/GroupOrganizer";
export default (props: NavigationSwitchScreenProps) => {
  const [store, dispatch] = useStore();

  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [showMember, setShowMember] = React.useState(true);

  return (
    <>
      <ViewRow>
        <TouchableOpacity
          style={{ width: 50, padding: 10 }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={60} />
        </TouchableOpacity>
        <Text>멤버</Text>
      </ViewRow>
      <ViewRow>
        <TORow onPress={e => setShowMember(true)}>
          <Text>멤버</Text>
        </TORow>
        <TORow onPress={e => setShowMember(false)}>
          <Text>오거나이저</Text>
        </TORow>
      </ViewRow>
      <ViewRow>
        <Ionicons name="ios-search" size={60} />
        <TextInput
          value={searchKeyword}
          onChange={e => setSearchKeyword(e.nativeEvent.text)}
        />
      </ViewRow>
      {showMember ? (
        <GroupMember searchKeyword={useDebounce(searchKeyword, 500)} />
      ) : (
        <GroupOrganizer searchKeyword={useDebounce(searchKeyword, 500)} />
      )}
    </>
  );
};
