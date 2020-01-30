import React from "react";
import { NavigationSwitchScreenProps } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../Store";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { ViewRow, ViewRowLeft } from "../components/View";
import { TouchableOpacity, TORow } from "../components/TouchableOpacity";
import { Button } from "../components/Button";
import { auth } from "./firebase";
export default (props: NavigationSwitchScreenProps) => {
  const [store, dispatch] = useStore();

  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [showMember, setShowMember] = React.useState(true);
  return (
    <>
      <ViewRowLeft>
        <TouchableOpacity
          style={{ width: 50, padding: 10 }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={60} />
        </TouchableOpacity>
        <Text>멤버</Text>
      </ViewRowLeft>
      <ViewRow>
        <TORow onPress={e => setShowMember(true)}>
          <Text>멤버</Text>
        </TORow>
        <TORow onPress={e => setShowMember(false)}>
          <Text>오거나이저</Text>
        </TORow>
      </ViewRow>
      <ViewRowLeft>
        <Ionicons name="ios-search" size={60} />
        <TextInput
          value={searchKeyword}
          onChange={e => setSearchKeyword(e.nativeEvent.text)}
        />
      </ViewRowLeft>
    </>
  );
};
