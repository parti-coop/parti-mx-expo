import React from "react";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../Store";
import { Text } from "../components/Text";
import { View, ViewRow } from "../components/View";
import { TouchableOpacity, TOEasy } from "../components/TouchableOpacity";
import { Button } from "../components/Button";
import { PasswordInput } from "../components/TextInput";
import { auth, Firebase } from "../firebase";
import { showMessage } from "react-native-flash-message";
export default props => {
  const { navigate, goBack } = props.navigation;
  const [store, dispatch] = useStore();
  const [password, setPassword] = React.useState("");
  function exitHandler() {
    const credential = Firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    Alert.alert("회원탈퇴", "회원탈퇴 하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
        onPress: () => goBack()
      },
      {
        text: "네",
        onPress: async () => {
          try {
            await auth.currentUser.reauthenticateWithCredential(credential);
            await auth.currentUser.delete();
            showMessage({ type: "success", message: "회원탈퇴 하였습니다." });
          } catch (error) {
            showMessage({ type: "danger", message: JSON.stringify(error) });
          }
        }
      }
    ]);
  }
  return (
    <>
      <ViewRow>
        <TouchableOpacity
          style={{ width: 50, padding: 10 }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={60} />
        </TouchableOpacity>
        <Text>회원탈퇴</Text>
      </ViewRow>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <PasswordInput
          value={password}
          onChangeText={setPassword}
          autoFocus={true}
          onSubmitEditing={exitHandler}
        />
        <TOEasy onPress={exitHandler}>
          <Text>탈퇴</Text>
        </TOEasy>
      </View>
    </>
  );
};
