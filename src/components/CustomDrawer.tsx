import React from "react";
import { ScrollView, Platform } from "react-native";
import { useIsDrawerOpen } from "@react-navigation/drawer";
import useKeyboard from "@rnhooks/keyboard";

import { Image } from "./Image";
import { ViewRow } from "./View";
import { Text } from "./Text";
import { TouchableOpacity, TORowCenter, TO0 } from "./TouchableOpacity";
import { KAV } from "./KeyboardAvoidingView";
import { TextInput } from "./TextInput";
import MyGroupList from "./MyGroupList";
import MySearchList from "./MySearchList";
import { RoundClear } from "./Round";
import useAppRefresh from "../components/useAppRefresh";

import iconUser from "../../assets/iconUser.png";
import ViewGroupImg from "./ViewGroupImg";
import btnSearch from "../../assets/btnSearch.png";
import partimxLogo from "../../assets/partimxLogo.png";
import iconAdd from "../../assets/iconAdd.png";
export default function CustomDrawer(props) {
  const appRefresh = useAppRefresh();
  const { navigate } = props.navigation;
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const isDrawerOpen = useIsDrawerOpen();
  const [keyboardVisible, keyboardDismiss] = useKeyboard(
    Platform.select({
      ios: {
        useWillShow: true,
      },
    })
  );
  React.useEffect(() => {
    if (!isDrawerOpen) {
      keyboardDismiss();
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
    keyboardDismiss();
  }
  function clear() {
    setSearchKeyword("");
  }
  React.useEffect(() => {
    setSearching(searchKeyword.length > 0);
  }, [searchKeyword]);

  function createNewGroup() {
    props.navigation.navigate("GroupNew");
    props.navigation.closeDrawer();
    keyboardDismiss();
  }
  return (
    <>
      <KAV>
        <ViewRow style={{ marginLeft: 30, marginTop: 40 }}>
          <TO0 onPress={appRefresh}>
            <Image source={partimxLogo} />
          </TO0>

          <TouchableOpacity
            onPress={(e) => navigate("UserSetting")}
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
            paddingTop: keyboardVisible ? 15 : 83,
            marginHorizontal: 30,
            borderBottomWidth: 1,
            borderBottomColor: "rgba(57, 202, 186, 0.2)",
          }}
        >
          <TO0 onPress={blurHandler}>
            <Image
              source={btnSearch}
              resizeMode="contain"
              style={{
                width: 19,
                height: 20,
                opacity: isSearching ? 1 : 0.7,
              }}
            />
          </TO0>
          <TextInput
            onChangeText={setSearchKeyword}
            value={searchKeyword}
            onFocus={focusHandler}
            placeholder="그룹명 입력"
            selectionColor="white"
            placeholderTextColor="rgba(89, 243, 201, 0.7)"
            style={{
              fontSize: 17,
              color: "#4bdecd",
            }}
            onBlur={blurHandler}
            returnKeyType="search"
          />
          {isSearching && <RoundClear onPress={clear} />}
        </ViewRow>
      </KAV>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginHorizontal: 30,
          paddingVertical: 40,
        }}
      >
        {isSearching ? (
          <MySearchList searchKeyword={searchKeyword} navigate={navigate} />
        ) : (
          <MyGroupList />
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
        <Text style={{ fontSize: 20, textAlign: "center", color: "#004d38" }}>
          그룹 만들기
        </Text>
      </TORowCenter>
    </>
  );
}
