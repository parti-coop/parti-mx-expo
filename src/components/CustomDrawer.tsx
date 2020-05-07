import React from "react";
import { ScrollView, Keyboard } from "react-native";
import { useIsDrawerOpen } from "@react-navigation/drawer";

import { Image } from "./Image";
import { ViewRow } from "./View";
import { Text } from "./Text";
import { TouchableOpacity, TORowCenter, TO0 } from "./TouchableOpacity";
import { TextInput } from "./TextInput";
import MyGroupList from "./MyGroupList";
import MySearchList from "./MySearchList";
import useAppRefresh from "../components/useAppRefresh";

import iconUser from "../../assets/iconUser.png";
import ViewGroupImg from "./ViewGroupImg";
import btnSearch from "../../assets/btnSearch.png";
import btnSearchOn from "../../assets/btnSearchOn.png";
import appIcon from "../../assets/appIcon.png";
import iconAdd from "../../assets/iconAdd.png";

export default function CustomDrawer(props) {
  const appRefresh = useAppRefresh();
  const { navigate } = props.navigation;
  const [searchKeyword, setSearchKeyword] = React.useState("");
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
          <Image
            source={appIcon}
            style={{ width: 50, height: 50, borderRadius: 15 }}
          />
        </TO0>

        <TouchableOpacity
          onPress={(e) => props.navigation.navigate("UserSetting")}
          style={{
            width: 35,
            height: 35,
            borderRadius: 15,
            backgroundColor: "#12BD8E",
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
          source={isSearching ? btnSearchOn : btnSearch}
          resizeMode="contain"
          style={{ width: 19, height: 20 }}
        />
        <TextInput
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          onFocus={focusHandler}
          placeholder="그룹명 입력"
          selectionColor="white"
          placeholderTextColor="rgba(57, 202, 186, 0.3)"
          style={{ fontSize: 17, color: "#4bdecd" }}
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
          backgroundColor: "#12BD8E",
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
}
