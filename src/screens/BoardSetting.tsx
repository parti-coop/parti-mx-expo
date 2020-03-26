import React from "react";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { RootStackParamList } from "./AppContainer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text } from "../components/Text";
import { ViewRow, View } from "../components/View";
import { TouchableOpacity, TOEasy } from "../components/TouchableOpacity";
import BoardSettingList from "../components/BoardSettingList";
import ButtonBoardInsert from "../components/ButtonBoardInsert";
import { useStore } from "../Store";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useSubscription } from "@apollo/react-hooks";
import { subscribeBoardsByGroupId } from "../graphql/subscription";
export default (props: {
  navigation: StackNavigationProp<RootStackParamList, "BoardSetting">;
  route: RouteProp<RootStackParamList, "BoardSetting">;
}) => {
  const [{ group_id, user_id }, dispatch] = useStore();
  const { navigate, goBack } = useNavigation();
  const { data, error } = useSubscription(subscribeBoardsByGroupId, {
    variables: { group_id, user_id }
  });
  if (!data) {
    console.log(error);
    return null;
  }
  const { boards } = data.parti_2020_groups_by_pk;
  return (
    <>
      <ViewRow>
        <TouchableOpacity style={{}} onPress={goBack}>
          <Ionicons name="ios-arrow-back" size={60} />
        </TouchableOpacity>
        <Text>게시판 목록</Text>
      </ViewRow>
      <Text>게시판 설정 </Text>
      <View>
        {boards.map((b: any, i: number) => {
          return <BoardSettingList board={b} key={i} />;
        })}
      </View>
      <ButtonBoardInsert />
    </>
  );
};
