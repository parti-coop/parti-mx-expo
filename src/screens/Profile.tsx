import React from "react";
import { useStore } from "../Store";
import { Text } from "../components/Text";
import { ViewColumnCenter } from "../components/View";
import { Button } from "../components/Button";
import { TOEasy, TouchableOpacity } from "../components/TouchableOpacity";
import { useLazyQuery } from "@apollo/react-hooks";
import { whoami } from "../graphql/query";
import { auth } from "../firebase";
export default props => {
  const { navigate } = props.navigation;
  const [store, dispatch] = useStore();
  const [askWhoami, { data }] = useLazyQuery(whoami);
  React.useEffect(() => {
    data && data.parti_2020_users.length &&
      dispatch({ type: "SET_USER", user_id: data.parti_2020_users[0].id });
  }, [data]);
  return (
    <ViewColumnCenter>
      <TouchableOpacity
        onPress={() =>
          askWhoami({ variables: { firebase_uid: auth.currentUser.uid } })
        }
      >
        <Text>유저아이디가져오기</Text>
      </TouchableOpacity>
      <Text>Profile</Text>
      <Text>인증</Text>
    </ViewColumnCenter>
  );
};
