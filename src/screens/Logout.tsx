import React from "react";
import { Alert } from "react-native";
import { NavigationSwitchScreenProps } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../Store";
import { Text } from "../components/Text";
import { View, ViewRowLeft } from "../components/View";
import { TouchableOpacity } from "../components/TouchableOpacity";
import { Button } from "../components/Button";
import { auth } from "../firebase";
import { showMessage } from "react-native-flash-message";
export default (props: NavigationSwitchScreenProps) => {
  const { navigate, goBack } = props.navigation;
  const [store, dispatch] = useStore();
  React.useEffect(() => {
    Alert.alert("로그아웃", "로그아웃 하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
        onPress: () => goBack()
      },
      {
        text: "네",
        onPress: () =>
          auth
            .signOut()
            .then(() => dispatch({ type: "LOGOUT" }))
            .finally(() =>
              showMessage({ type: "success", message: "로그아웃 하였습니다." })
            )
      }
    ]);
  }, []);
  return (
    <>
      <ViewRowLeft>
        <TouchableOpacity
          style={{ width: 50, padding: 10 }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={60} />
        </TouchableOpacity>
        <Text>로그아웃</Text>
      </ViewRowLeft>
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      ></View>
    </>
  );
};
