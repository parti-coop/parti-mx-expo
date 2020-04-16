import React from "react";
import { ScrollView, Keyboard } from "react-native";
import { useIsDrawerOpen } from "@react-navigation/drawer";
import { useQuery } from "@apollo/react-hooks";

import { Image } from "./Image";
import { ViewRow } from "./View";
import { Text } from "./Text";
import { TouchableOpacity, TORowCenter, TO0 } from "./TouchableOpacity";
import { TextInput } from "./TextInput";
import MyGroupList from "./MyGroupList";
import MySearchList from "./MySearchList";
import useAppRefresh from "../components/useAppRefresh";

import { searchGroups } from "../graphql/query";
import { useStore } from "../Store";

import iconUser from "../../assets/icon-user.png";
import ViewGroupImg from "./ViewGroupImg";
import btnSearch from "../../assets/btn-search.png";
import partimxLogoWhite from "../../assets/partimxLogoWhite.png";
import iconAdd from "../../assets/iconAdd.png";

export default (props) => {
  const [{ user_id }] = useStore();
  const appRefresh = useAppRefresh();
  const { navigate } = props.navigation;
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const query = useQuery(searchGroups, {
    variables: { searchKeyword: `%${searchKeyword}%` },
  });
  const isDrawerOpen = useIsDrawerOpen();

  React.useEffect(() => {
    if (!isDrawerOpen) {
      Keyboard.dismiss();
    }
  }, [isDrawerOpen]);

  const [isSearching, setSearching] = React.useState(false);
  function focusHandler() {
    setSearching(true);
  }
  function blurHandler() {
    if (!searchKeyword) {
      setSearching(false);
    }
    Keyboard.dismiss();
  }
  React.useEffect(() => {
    setSearching(searchKeyword.length > 0);
  }, [searchKeyword]);

  function createNewGroup() {
    props.navigation.navigate("GroupNew");
    props.navigation.closeDrawer();
    Keyboard.dismiss();
  }
  return (
    <>
      <ViewRow style={{ marginLeft: 30, marginTop: 40 }}>
        <TO0 onPress={appRefresh}>
          <Image source={partimxLogoWhite} />
        </TO0>

        <TouchableOpacity
          onPress={(e) => props.navigation.navigate("UserSetting")}
          style={{
            width: 35,
            height: 35,
            borderRadius: 15,
            backgroundColor: "#30ad9f",
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 33,
          }}
        >
          <Image
            source={iconUser}
            resizeMode="contain"
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
        {isDrawerOpen && (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: -15,
            }}
            onPress={(e) => props.navigation.toggleDrawer()}
          >
            <ViewGroupImg />
          </TouchableOpacity>
        )}
      </ViewRow>
      <ViewRow
        style={{
          marginTop: 83,
          marginHorizontal: 30,
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(57, 202, 186, 0.2)",
        }}
      >
        <Image
          source={btnSearch}
          resizeMode="contain"
          style={{ width: 19, height: 20 }}
        />
        <TextInput
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          onFocus={focusHandler}
          placeholder="그룹명 입력"
          placeholderTextColor="rgba(57, 202, 186, 0.3)"
          style={{ fontSize: 17 }}
          onBlur={blurHandler}
        />
      </ViewRow>
      <ScrollView
        style={{ marginTop: 42, marginBottom: 10 }}
        contentContainerStyle={{
          flexGrow: 1,
          marginHorizontal: 30,
          paddingVertical: 10,
        }}
      >
        {isSearching ? (
          <MySearchList searchKeyword={searchKeyword} navigate={navigate} />
        ) : (
          <MyGroupList navigate={navigate} />
        )}
      </ScrollView>
      <TORowCenter
        style={{
          padding: 10,
          backgroundColor: "#30ad9f",
          borderTopLeftRadius: 20,
          borderBottomRightRadius: 20,
          height: 73,
        }}
        onPress={createNewGroup}
      >
        <Image source={iconAdd} style={{ marginRight: 19 }} />
        <Text style={{ fontSize: 20, textAlign: "center" }}>그룹 만들기</Text>
      </TORowCenter>
    </>
  );
};
